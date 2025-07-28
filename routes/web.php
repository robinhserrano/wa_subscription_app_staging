<?php

use App\Models\DeliverSub;
use App\Models\FilterSubs;
use App\Models\ServiceCode;
use App\Models\StateId;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;


if (!function_exists('applyDateConstraints')) {
    function applyDateConstraints($query, $constraints, $dateField)
    {
        $operators = [
            'dateBefore' => '<',
            'dateAfter' => '>',
            'dateIs' => '=',
            'dateIsNot' => '!=',
        ];

        foreach ($constraints as $constraint) {
            if ($constraint['value'] !== null && isset($operators[$constraint['matchMode']])) {
                $adjustedValue = Carbon::parse($constraint['value'])->addHours(8);

                $query->where($dateField, $operators[$constraint['matchMode']], $adjustedValue);

                $query->orderBy('customer_name', 'asc');
            }
        }
    }
}

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $filters = json_decode(Request::input('filters'), true);

        $query = FilterSubs::query();

        if (!empty($filters['start_date']['constraints'])) {
            applyDateConstraints($query, $filters['start_date']['constraints'], 'start_date');
        }

        if (!empty($filters['due_date']['constraints'])) {
            applyDateConstraints($query, $filters['due_date']['constraints'], 'due_date');
        }

        if ($categories = Request::input('categories', [])) {
            $query->whereIn('category', $categories);
        }

        if ($activitySummary = Request::input('activitySummary', [])) {
            $query->whereIn('activity_summary', $activitySummary);
        }

        if ($stateId = Request::input('stateId', [])) {
            $query->whereIn('state_id', $stateId);
        }

        if ($search = Request::input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                    ->orWhere('sales_order_no', 'like', "%{$search}%");
            });
        }

        $filterSubs = $query->with('orderLine', 'contactAddress',)->orderBy($sortBy, $sortOrder);

        $filterSubIds = $filterSubs->pluck('id')->map(function ($id) {
            return ['id' => $id];
        })->values()->all();

        $filterSubsPaginated = $filterSubs->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        $stateIds = Cache::remember('state_ids', 60, function () {
            return StateId::all()->sortByDesc('state_id');
        });

        return Inertia::render('Dashboard', [
            'filterSubIds' => $filterSubIds,
            'filterSubs' =>  $filterSubsPaginated,
            'stateIds' => $stateIds,
            'filters' => $filters,
        ]);
    })->name('dashboard');
    Route::get('/confirmDeliveryRequirement', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $filters = json_decode(Request::input('filters'), true);

        $query = DeliverSub::query(); //->whereNull('created_on_odoo');
        // $query = DeliverSub::query()
        //     ->where(function ($query) {
        //         $query->whereNull('required_delivery')
        //             ->orWhere('required_delivery', '!=', 'Confirm');
        //     });


        if (!empty($filters['start_date']['constraints'])) {
            applyDateConstraints($query, $filters['start_date']['constraints'], 'start_date');
        }

        if (!empty($filters['due_date']['constraints'])) {
            applyDateConstraints($query, $filters['due_date']['constraints'], 'due_date');
        }

        if ($stateId = Request::input('stateId', [])) {
            $query->whereIn('state_id', $stateId);
        }

        if ($categories = Request::input('categories', [])) {
            $query->whereIn('category', $categories);
        }

        if ($activitySummary = Request::input('activitySummary', [])) {
            $query->whereIn('activity_summary', $activitySummary);
        }

        if ($requireDeliveryTypes = Request::input('requireDeliveryTypes', [])) {
            $query->whereIn('required_delivery', $requireDeliveryTypes);

            if (in_array('Pending', $requireDeliveryTypes)) {
                $query->orWhereNull('required_delivery');
            }
        }

        if ($search = Request::input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                    ->orWhere('sales_order_no', 'like', "%{$search}%");
            });
        }

        // $filterSubs = $query->with('orderLine', 'contactAddress', 'rootSalesOrder', 'requiredDeliveryUpdatedBy', 'odooCreatedBy')
        //     ->whereDoesntHave('orderLine', function ($query) {
        //         $query->where('product', 'like', '%Filter Subscription%')
        //             ->orWhere('description', 'like', '%Filter Subscription%');
        //     })
        //     ->orderBy($sortBy, $sortOrder)
        //     ->paginate($perPage, ['*'], 'page', $currentPage)
        //     ->withQueryString();
        $filterSubs = $query->with('orderLine', 'contactAddress', 'rootSalesOrder', 'requiredDeliveryUpdatedBy', 'odooCreatedBy')
            ->whereDoesntHave('orderLine', function ($query) {
                $query->where('product', 'like', '%Filter Subscription%')
                    ->orWhere('description', 'like', '%Filter Subscription%');
            })
            ->orderBy($sortBy, $sortOrder);

        $filterSubIds = $filterSubs->pluck('id')->map(function ($id) {
            return ['id' => $id];
        })->values()->all();

        $filterSubsPaginated = $filterSubs->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        $stateIds = Cache::remember('state_ids', 60, function () {
            return StateId::all()->sortByDesc('state_id');
        });

        return Inertia::render('ConfirmDeliveryRequirement', [
            'filterSubIds' => $filterSubIds,
            'filterSubs' =>  $filterSubsPaginated,
            'stateIds' => $stateIds,
            'users' => User::all(),
            'filters' => $filters,
        ]);
    })->name('confirmDeliveryRequirement');
    Route::get('/confirmDeliveryFilterSubscription', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $filters = json_decode(Request::input('filters'), true);

        $query = DeliverSub::query(); //->whereNull('created_on_odoo');

        if (!empty($filters['start_date']['constraints'])) {
            applyDateConstraints($query, $filters['start_date']['constraints'], 'start_date');
        }

        if (!empty($filters['due_date']['constraints'])) {
            applyDateConstraints($query, $filters['due_date']['constraints'], 'due_date');
        }

        if ($stateId = Request::input('stateId', [])) {
            $query->whereIn('state_id', $stateId);
        }

        if ($categories = Request::input('categories', [])) {
            $query->whereIn('category', $categories);
        }

        if ($activitySummary = Request::input('activitySummary', [])) {
            $query->whereIn('activity_summary', $activitySummary);
        }

        if ($requireDeliveryTypes = Request::input('requireDeliveryTypes', [])) {
            $query->whereIn('required_delivery', $requireDeliveryTypes);

            if (in_array('Pending', $requireDeliveryTypes)) {
                $query->orWhereNull('required_delivery');
            }
        }

        if ($search = Request::input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                    ->orWhere('sales_order_no', 'like', "%{$search}%");
            });
        }

        // $filterSubs = $query->with('orderLine', 'contactAddress', 'rootSalesOrder', 'requiredDeliveryUpdatedBy', 'odooCreatedBy')
        //     ->whereHas('orderLine', function ($query) {
        //         $query->where('product', 'like', '%Filter Subscription%')
        //             ->orWhere('description', 'like', '%Filter Subscription%');
        //     })
        //     ->orderBy($sortBy, $sortOrder)
        //     ->paginate($perPage, ['*'], 'page', $currentPage)
        //     ->withQueryString();

        // $filterSubs->transform(function ($filterSub) {
        //     $filterSub->hasCallOutService = $filterSub->orderLine->contains(function ($orderLine) {
        //         return strpos($orderLine->product, 'Call Out Service') !== false || strpos($orderLine->description, 'Call Out Service') !== false;
        //     });
        //     return $filterSub;
        // });
        $filterSubs = $query->with('orderLine', 'contactAddress', 'rootSalesOrder', 'requiredDeliveryUpdatedBy', 'odooCreatedBy')
            ->whereHas('orderLine', function ($query) {
                $query->where('product', 'like', '%Filter Subscription%')
                    ->orWhere('description', 'like', '%Filter Subscription%');
            })
            ->orderBy($sortBy, $sortOrder);

        $filterSubIds = $filterSubs->pluck('id')->map(function ($id) {
            return ['id' => $id];
        })->values()->all();

        $filterSubsPaginated = $filterSubs->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        $stateIds = Cache::remember('state_ids', 60, function () {
            return StateId::all()->sortByDesc('state_id');
        });

        return Inertia::render('ConfirmDeliveryFilterSubscription', [
            'filterSubIds' => $filterSubIds,
            'filterSubs' =>  $filterSubsPaginated,
            'stateIds' => $stateIds,
            'users' => User::all(),
            'filters' => $filters,
        ]);
    })->name('confirmDeliveryFilterSubscription');

    Route::get('/subscriptionsToDeliver', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $filters = json_decode(Request::input('filters'), true);

        $query = DeliverSub::query()->whereNotNull('required_delivery')->where('required_delivery', '=', 'Confirm');

        if (!empty($filters['start_date']['constraints'])) {
            applyDateConstraints($query, $filters['start_date']['constraints'], 'start_date');
        }

        if (!empty($filters['due_date']['constraints'])) {
            applyDateConstraints($query, $filters['due_date']['constraints'], 'due_date');
        }

        if ($categories = Request::input('categories', [])) {
            $query->whereIn('category', $categories);
        }

        if ($activitySummary = Request::input('activitySummary', [])) {
            $query->whereIn('activity_summary', $activitySummary);
        }

        if ($stateId = Request::input('stateId', [])) {
            $query->whereIn('state_id', $stateId);
        }

        if ($search = Request::input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                    ->orWhere('sales_order_no', 'like', "%{$search}%");
            });
        }

        $filterSubs = $query->with('orderLine', 'contactAddress', 'rootSalesOrder', 'serviceCode', 'deliveredOrDeliveryBookedBy', 'serviceCodeUpdatedBy', 'odooCreatedBy')->orderBy($sortBy, $sortOrder);

        $filterSubIds = $filterSubs->pluck('id')->map(function ($id) {
            return ['id' => $id];
        })->values()->all();

        $filterSubsPaginated = $filterSubs->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        $stateIds = Cache::remember('state_ids', 60, function () {
            return StateId::all()->sortByDesc('state_id');
        });

        $serviceCodes = Cache::remember('service_code', 60, function () {
            return ServiceCode::all();
        });

        return Inertia::render('SubscriptionsToDeliver', [
            'filterSubIds' => $filterSubIds,
            'filterSubs' =>  $filterSubsPaginated,
            'stateIds' => $stateIds,
            'serviceCodes' => $serviceCodes,
            'filters' => $filters,
        ]);
    })->name('subscriptionsToDeliver');

    Route::get('/subscriptionsToDeliverFilterSubscription', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $filters = json_decode(Request::input('filters'), true);
        $query = DeliverSub::query()->whereNotNull('required_delivery')->where('required_delivery', '=', 'Confirm');

        if (!empty($filters['start_date']['constraints'])) {
            applyDateConstraints($query, $filters['start_date']['constraints'], 'start_date');
        }

        if (!empty($filters['due_date']['constraints'])) {
            applyDateConstraints($query, $filters['due_date']['constraints'], 'due_date');
        }

        if ($categories = Request::input('categories', [])) {
            $query->whereIn('category', $categories);
        }

        if ($activitySummary = Request::input('activitySummary', [])) {
            $query->whereIn('activity_summary', $activitySummary);
        }

        if ($stateId = Request::input('stateId', [])) {
            $query->whereIn('state_id', $stateId);
        }

        if ($search = Request::input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                    ->orWhere('sales_order_no', 'like', "%{$search}%");
            });
        }

        $filterSubsQuery = $query->with('orderLine', 'contactAddress', 'rootSalesOrder', 'serviceCode', 'deliveredOrDeliveryBookedBy', 'serviceCodeUpdatedBy', 'odooCreatedBy')->whereHas('orderLine', function ($query) {
            $query->where('product', 'like', '%Filter Subscription%')
                ->orWhere('description', 'like', '%Filter Subscription%');
        })
            ->orderBy($sortBy, $sortOrder);

        $filterSubIds = $filterSubsQuery->pluck('id')->map(function ($id) {
            return ['id' => $id];
        })->values()->all();

        // Create a separate variable for the paginated result
        $filterSubs = $filterSubsQuery->paginate($perPage, ['*'], 'page', $currentPage)
            ->withQueryString();

        $filterSubs->transform(function ($filterSub) {
            $filterSub->hasCallOutService = $filterSub->orderLine->contains(function ($orderLine) {
                return strpos($orderLine->product, 'Call Out Service') !== false || strpos($orderLine->description, 'Call Out Service') !== false;
            });
            return $filterSub;
        });


        $stateIds = Cache::remember('state_ids', 60, function () {
            return StateId::all()->sortByDesc('state_id');
        });


        $serviceCodes = Cache::remember('service_code', 60, function () {
            return ServiceCode::all();
        });

        return Inertia::render('SubscriptionsToDeliverFilterSubscription', [
            'filterSubIds' => $filterSubIds,
            'filterSubs' =>  $filterSubs,
            'stateIds' => $stateIds,
            'serviceCodes' => $serviceCodes,
            'filters' => $filters,
        ]);
    })->name('subscriptionsToDeliverFilterSubscription');

    Route::get('/forUpselling', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $filters = json_decode(Request::input('filters'), true);
        $query = FilterSubs::query(); //->whereNull('created_on_odoo');

        if (!empty($filters['start_date']['constraints'])) {
            applyDateConstraints($query, $filters['start_date']['constraints'], 'start_date');
        }

        if (!empty($filters['due_date']['constraints'])) {
            applyDateConstraints($query, $filters['due_date']['constraints'], 'due_date');
        }

        $query->whereIn('activity_summary', [
            'Independent 3 + 3 Due for Change',
            '3 + 3 Stage Filter',
            '3 Stage Filter',
            'Final Date to Order Filters for Warranty Extension'
        ]);

        if ($categories = Request::input('categories', [])) {
            $query->whereIn('category', $categories);
        }

        if ($stateId = Request::input('stateId', [])) {
            $query->whereIn('state_id', $stateId);
        }

        if ($search = Request::input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('customer_name', 'like', "%{$search}%")
                    ->orWhere('sales_order_no', 'like', "%{$search}%");
            });
        }

        $filterSubs = $query->with('orderLine', 'contactAddress', 'statusUpdatedBy', 'remarksUpdatedBy')->orderBy($sortBy, $sortOrder)->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        $stateIds = Cache::remember('state_ids', 60, function () {
            return StateId::all()->sortByDesc('state_id');
        });

        return Inertia::render('ForUpselling', [
            'filterSubIds' => $query->pluck('id'),
            'filterSubs' =>  $filterSubs,
            'stateIds' => $stateIds,
            'filters' => $filters,
        ]);
    })->name('forUpselling');
});
