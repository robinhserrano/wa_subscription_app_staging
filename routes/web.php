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
        $dates = Request::input('dates', []);

        $query = FilterSubs::query(); //->whereNull('created_on_odoo');

        if (!empty($dates)) {
            $startDate = Carbon::parse($dates[0])->startOfDay();
            $query->where('due_date', '>=', $startDate);

            if (isset($dates[1])) {
                $endDate = Carbon::parse($dates[1])->endOfDay();
                $query->where('due_date', '<=', $endDate);
            }
            $query->orderBy('customer_name', 'asc');
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

        $filterSubs = $query->with('orderLine', 'contactAddress',)->orderBy($sortBy, $sortOrder)->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        $stateIds = Cache::remember('state_ids', 60, function () {
            return StateId::all()->sortByDesc('state_id');
        });

        return Inertia::render('Dashboard', [
            'filterSubIds' => $query->pluck('id'),
            'filterSubs' =>  $filterSubs,
            'stateIds' => $stateIds,
        ]);
    })->name('dashboard');
    Route::get('/confirmDeliveryRequirement', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $dates = Request::input('dates', []);

        $query = DeliverSub::query(); //->whereNull('created_on_odoo');

        if (!empty($dates)) {
            $startDate = Carbon::parse($dates[0])->startOfDay();
            $query->where('due_date', '>=', $startDate);

            if (isset($dates[1])) {
                $endDate = Carbon::parse($dates[1])->endOfDay();
                $query->where('due_date', '<=', $endDate);
            }
            $query->orderBy('customer_name', 'asc');
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

        $filterSubs = $query->with('orderLine', 'contactAddress', 'rootSalesOrder', 'requiredDeliveryUpdatedBy', 'odooCreatedBy')
            ->whereDoesntHave('orderLine', function ($query) {
                $query->where('product', 'like', '%Filter Subscription%')
                    ->orWhere('description', 'like', '%Filter Subscription%');
            })
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage, ['*'], 'page', $currentPage)
            ->withQueryString();

        $stateIds = Cache::remember('state_ids', 60, function () {
            return StateId::all()->sortByDesc('state_id');
        });

        return Inertia::render('ConfirmDeliveryRequirement', [
            'filterSubIds' => $query->pluck('id'),
            'filterSubs' =>  $filterSubs,
            'stateIds' => $stateIds,
            'users' => User::all(),
        ]);
    })->name('confirmDeliveryRequirement');
    Route::get('/confirmDeliveryFilterSubscription', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $dates = Request::input('dates', []);

        $query = DeliverSub::query(); //->whereNull('created_on_odoo');

        if (!empty($dates)) {
            $startDate = Carbon::parse($dates[0])->startOfDay();
            $query->where('due_date', '>=', $startDate);

            if (isset($dates[1])) {
                $endDate = Carbon::parse($dates[1])->endOfDay();
                $query->where('due_date', '<=', $endDate);
            }
            $query->orderBy('customer_name', 'asc');
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


        $filterSubs = $query->with('orderLine', 'contactAddress', 'rootSalesOrder', 'requiredDeliveryUpdatedBy', 'odooCreatedBy')->has('orderLine', '>', 2)->orderBy($sortBy, $sortOrder)->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        $filterSubs->transform(function ($filterSub) {
            $filterSub->hasCallOutService = $filterSub->orderLine->contains(function ($orderLine) {
                return strpos($orderLine->product, 'Call Out Service') !== false || strpos($orderLine->description, 'Call Out Service') !== false;
            });
            return $filterSub;
        });

        $stateIds = Cache::remember('state_ids', 60, function () {
            return StateId::all()->sortByDesc('state_id');
        });

        return Inertia::render('ConfirmDeliveryFilterSubscription', [
            'filterSubIds' => $query->pluck('id'),
            'filterSubs' =>  $filterSubs,
            'stateIds' => $stateIds,
            'users' => User::all(),
        ]);
    })->name('confirmDeliveryFilterSubscription');

    Route::get('/subscriptionsToDeliver', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $dates = Request::input('dates', []);

        $query = DeliverSub::query()->whereNotNull('required_delivery')->where('required_delivery', '=', 'Confirm');

        if (!empty($dates)) {
            $startDate = Carbon::parse($dates[0])->startOfDay();
            $query->where('due_date', '>=', $startDate);

            if (isset($dates[1])) {
                $endDate = Carbon::parse($dates[1])->endOfDay();
                $query->where('due_date', '<=', $endDate);
            }
            $query->orderBy('customer_name', 'asc');
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

        $filterSubs = $query->with('orderLine', 'contactAddress', 'rootSalesOrder', 'serviceCode', 'deliveredOrDeliveryBookedBy', 'serviceCodeUpdatedBy')->orderBy($sortBy, $sortOrder)->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        $stateIds = Cache::remember('state_ids', 60, function () {
            return StateId::all()->sortByDesc('state_id');
        });


        $serviceCodes = Cache::remember('service_code', 60, function () {
            return ServiceCode::all();
        });

        return Inertia::render('SubscriptionsToDeliver', [
            'filterSubIds' => $query->pluck('id'),
            'filterSubs' =>  $filterSubs,
            'stateIds' => $stateIds,
            'serviceCodes' => $serviceCodes,
        ]);
    })->name('subscriptionsToDeliver');


    Route::get('/forUpselling', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $dates = Request::input('dates', []);

        $query = FilterSubs::query(); //->whereNull('created_on_odoo');

        if (!empty($dates)) {
            $startDate = Carbon::parse($dates[0])->startOfDay();
            $query->where('due_date', '>=', $startDate);

            if (isset($dates[1])) {
                $endDate = Carbon::parse($dates[1])->endOfDay();
                $query->where('due_date', '<=', $endDate);
            }
            $query->orderBy('customer_name', 'asc');
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
        ]);
    })->name('forUpselling');
});
