<?php

use App\Models\ActivitySummary;
use App\Models\DeliverSub;
use App\Models\FilterSubs;
use App\Models\SalesOrder;
use App\Models\ServiceCode;
use App\Models\StateId;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Pagination\LengthAwarePaginator;
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
            $startDate = Carbon::parse($dates[0]);
            $query->where('due_date', '>=', $startDate);

            if (isset($dates[1])) {
                $endDate = Carbon::parse($dates[1]);
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
            $startDate = Carbon::parse($dates[0]);
            $query->where('due_date', '>=', $startDate);

            if (isset($dates[1])) {
                $endDate = Carbon::parse($dates[1]);
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

        $filterSubs = $query->with('orderLine', 'contactAddress', 'rootSalesOrder')->orderBy($sortBy, $sortOrder)->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

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

    Route::get('/subscriptionsToDeliver', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $dates = Request::input('dates', []);

        $query = DeliverSub::query()->whereNotNull('required_delivery')->where('required_delivery', '=', 'Confirm');

        if (!empty($dates)) {
            $startDate = Carbon::parse($dates[0]);
            $query->where('due_date', '>=', $startDate);

            if (isset($dates[1])) {
                $endDate = Carbon::parse($dates[1]);
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

        $filterSubs = $query->with('orderLine', 'contactAddress', 'rootSalesOrder', 'serviceCode')->orderBy($sortBy, $sortOrder)->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

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

        $query = DeliverSub::query()->whereNotNull('required_delivery')->where('required_delivery', '=', 'Confirm');

        if (!empty($dates)) {
            $startDate = Carbon::parse($dates[0]);
            $query->where('due_date', '>=', $startDate);

            if (isset($dates[1])) {
                $endDate = Carbon::parse($dates[1]);
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

        $filterSubs = $query->with('orderLine', 'contactAddress', 'serviceCode')->orderBy($sortBy, $sortOrder)->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        $stateIds = Cache::remember('state_ids', 60, function () {
            return StateId::all()->sortByDesc('state_id');
        });


        $serviceCodes = Cache::remember('service_code', 60, function () {
            return ServiceCode::all();
        });

        return Inertia::render('ForUpselling', [
            'filterSubIds' => $query->pluck('id'),
            'filterSubs' =>  $filterSubs,
            'stateIds' => $stateIds,
            'serviceCodes' => $serviceCodes,
        ]);
    })->name('forUpselling');
    // Route::get('/subscriptionsToDeliver', function () {
    //     $currentPage = (int) Request::input('page', 1);
    //     $perPage = (int) Request::input('perPage', 100);
    //     $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
    //     $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
    //     $dates = Request::input('dates', []);

    //     $query = DeliverSub::query(); //->whereNull('created_on_odoo');

    //     if (!empty($dates)) {
    //         $startDate = Carbon::parse($dates[0]);
    //         $query->where('due_date', '>=', $startDate);

    //         if (isset($dates[1])) {
    //             $endDate = Carbon::parse($dates[1]);
    //             $query->where('due_date', '<=', $endDate);
    //         }
    //         $query->orderBy('customer_name', 'asc');
    //     }

    //     if ($categories = Request::input('categories', [])) {
    //         $query->whereIn('category', $categories);
    //     }

    //     if ($activitySummary = Request::input('activitySummary', [])) {
    //         $query->whereIn('activity_summary', $activitySummary);
    //     }

    //     if ($stateId = Request::input('stateId', [])) {
    //         $query->whereIn('state_id', $stateId);
    //     }

    //     if ($search = Request::input('search')) {
    //         $query->where(function ($q) use ($search) {
    //             $q->where('customer_name', 'like', "%{$search}%")
    //                 ->orWhere('sales_order_no', 'like', "%{$search}%");
    //         });
    //     }

    //     $filterSubs = $query->with('orderLine', 'contactAddress')->orderBy($sortBy, $sortOrder)->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

    //     $stateIds = Cache::remember('state_ids', 60, function () {
    //         return StateId::all()->sortByDesc('state_id');
    //     });

    //     return Inertia::render('ConfirmDeliveryRequirement', [
    //         'filterSubIds' => $query->pluck('id'),
    //         'filterSubs' =>  $filterSubs,
    //         'stateIds' => $stateIds,
    //     ]);


    //     $currentPage = (int) Request::input('page', 1);
    //     $perPage = (int) Request::input('perPage', 100);
    //     $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
    //     $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
    //     $dates = Request::input('dates', []);

    //     $initialQuery = FilterSubs::all()->whereNotNull('created_on_odoo')->whereNotNull('required_delivery')->where('required_delivery', '=', 'Confirm');
    //     $createdOnOdooIds = $initialQuery->pluck('created_on_odoo');
    //     $query = FilterSubs::query()
    //         ->whereIn('sales_order_no', $createdOnOdooIds);

    //     // $query = FilterSubs::query()->whereNotNull('created_on_odoo')->whereNotNull('required_delivery')->where('required_delivery', '=', 'Confirm');

    //     // $query->distinct();

    //     if (!empty($dates)) {
    //         $startDate = Carbon::parse($dates[0]);
    //         $endDate = isset($dates[1]) ? Carbon::parse($dates[1]) : null;
    //         $query->where('due_date', '>=', $startDate);
    //         if ($endDate) {
    //             $query->whereBetween('due_date', [$startDate, $endDate])
    //                 ->get();
    //         }

    //         $query->orderBy('customer_name', 'asc');
    //     }

    //     $categories = Request::input('categories', []);
    //     if ($categories !== []) {
    //         $query->whereIn('category', $categories);
    //     }

    //     $activitySummary = Request::input('activitySummary', []);
    //     if ($activitySummary !== []) {
    //         $query->whereIn('activity_summary', $activitySummary);
    //     }

    //     $stateId = Request::input('stateId', []);
    //     if ($stateId !== []) {
    //         $query->whereIn('state_id', $stateId);
    //     }

    //     if ($search = Request::input('search')) {
    //         $query->where('customer_name', 'like', "%{$search}%")->orWhere('sales_order_no', 'like', "%{$search}%");
    //         // ->orWhere('address', 'like', "%{$search}%");
    //     }
    //     $query->orderBy($sortBy, $sortOrder);

    //     return Inertia::render('SubscriptionsToDeliver', [
    //         // 'allss' => $query,
    //         // 'inital' => $createdOnOdooIds,
    //         // 'initQuery'=> $initialQuery, 
    //         'filterSubIds' => $query->pluck('id'),
    //         'filterSubs' => $query->with('orderLine', 'contactAddress')->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString(),
    //         'stateIds' => StateId::all()->sortByDesc('state_id'),
    //         'users' => User::all(),
    //     ]);
    // })->name('subscriptionsToDeliver');
});
