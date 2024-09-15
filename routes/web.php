<?php

use App\Models\ActivitySummary;
use App\Models\FilterSubs;
use App\Models\SalesOrder;
use App\Models\StateId;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Request;
use Carbon\Carbon;

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
        $query = FilterSubs::query();
        #->whereNull('created_on_odoo');
        if (!empty ($dates)) {
            $startDate = Carbon::parse($dates[0]);
            $endDate = isset ($dates[1]) ? Carbon::parse($dates[1]) : null;
            $query->where('due_date', '>=', $startDate);
            if ($endDate) {
                $query->whereBetween('due_date', [$startDate, $endDate])
                    ->get();
            }
        }

        // $activitySummary = Request::input('activitySummary', null);
        // if ($activitySummary !== null) {
        //     $query->where('activity_summary', $activitySummary);
        // }

        $activitySummary = Request::input('activitySummary', []);
        if ($activitySummary !== []) {
            $query->whereIn('activity_summary', $activitySummary);
        }


        $stateId = Request::input('stateId', []);
        if ($stateId !== []) {
            $query->whereIn('state_id', $stateId);
        }

        // $stateId = Request::input('stateId', null);
        // if ($stateId !== null  && $stateId < 9) {
        //     $query->where('state_id', $stateId);
        // }

        if ($search = Request::input('search')) {
            $query->where('customer_name', 'like', "%{$search}%")->orWhere('sales_order_no', 'like', "%{$search}%");
        }
        $query->orderBy($sortBy, $sortOrder);
        return Inertia::render('Dashboard', [
            'filterSubIds' => $query->pluck('id'),
            'filterSubs' => $query->with('orderLine', 'contactAddress')->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString(),
            'stateIds' => StateId::all()->sortByDesc('state_id'),
            'activitySummaries' => ActivitySummary::all(),
        ]);
    })->name('dashboard');
    Route::get('/confirmDeliveryRequirement', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $dates = Request::input('dates', []);

        $query = FilterSubs::query()->whereNotNull('created_on_odoo');

        if (!empty ($dates)) {
            $startDate = Carbon::parse($dates[0]);
            $endDate = isset ($dates[1]) ? Carbon::parse($dates[1]) : null;
            $query->where('due_date', '>=', $startDate);
            if ($endDate) {
                $query->whereBetween('due_date', [$startDate, $endDate])
                    ->get();
            }
        }

        $activitySummary = Request::input('activitySummary', []);
        if ($activitySummary !== []) {
            $query->whereIn('activity_summary', $activitySummary);
        }


        $stateId = Request::input('stateId', []);
        if ($stateId !== []) {
            $query->whereIn('state_id', $stateId);
        }

        if ($search = Request::input('search')) {
            $query->where('customer_name', 'like', "%{$search}%")->orWhere('sales_order_no', 'like', "%{$search}%");
        }
        $query->orderBy($sortBy, $sortOrder);
        return Inertia::render('ConfirmDeliveryRequirement', [
            'filterSubIds' => $query->pluck('id'),
            'filterSubs' => $query->with('orderLine', 'contactAddress')->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString(),
            'stateIds' => StateId::all()->sortByDesc('state_id'),
            'activitySummaries' => ActivitySummary::all(),
        ]);
    })->name('confirmDeliveryRequirement');

    Route::get('/subscriptionsToDeliver', function () {
        $salesQuotations = SalesOrder::all();

        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order

        $query = FilterSubs::query()->whereNotNull('required_delivery')->where('required_delivery', '=', 'Confirm');
        ;

        $activitySummary = Request::input('activitySummary', []);
        if ($activitySummary !== []) {
            $query->whereIn('activity_summary', $activitySummary);
        }


        $stateId = Request::input('stateId', []);
        if ($stateId !== []) {
            $query->whereIn('state_id', $stateId);
        }


        if ($search = Request::input('search')) {
            $query->where('customer_name', 'like', "%{$search}%")->orWhere('sales_order_no', 'like', "%{$search}%");
            // ->orWhere('address', 'like', "%{$search}%");
        }
        $query->orderBy($sortBy, $sortOrder);

        return Inertia::render('SubscriptionsToDeliver', [
            'filterSubIds' => $query->pluck('id'),
            'filterSubs' => $query->with('orderLine', 'contactAddress')->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString(),
            'stateIds' => StateId::all()->sortByDesc('state_id'),
            'activitySummaries' => ActivitySummary::all(),
        ]);
    })->name('subscriptionsToDeliver');
    // Route::get('/subscriptionsToDeliver', function () {
    //     $currentPage = (int) Request::input('page', 1);
    //     $perPage = (int) Request::input('perPage', 100);
    //     $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
    //     $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
    //     $dates = Request::input('dates', []);

    //     $query = FilterSubs::query()->whereNotNull('required_delivery')->where('required_delivery', '=', 'Confirm');

    //     if (!empty($dates)) {
    //         $startDate = Carbon::parse($dates[0]);
    //         $endDate = isset($dates[1]) ? Carbon::parse($dates[1]) : null;
    //         $query->where('due_date', '>=', $startDate);
    //         if ($endDate) {
    //             $query->whereBetween('due_date', [$startDate, $endDate])
    //                 ->get();
    //         }
    //     }

    //     $activitySummary = Request::input('activitySummary', null);
    //     if ($activitySummary !== null) {
    //         $query->where('activity_summary', $activitySummary);
    //     }

    //     $stateId = Request::input('stateId', null);
    //     if ($stateId !== null  && $stateId < 9) {
    //         $query->where('state_id', $stateId);
    //     }

    //     if ($search = Request::input('search')) {
    //         $query->where('customer_name', 'like', "%{$search}%")->orWhere('sales_order_no', 'like', "%{$search}%");
    //     }
    //     $query->orderBy($sortBy, $sortOrder);
    //     return Inertia::render('SubscriptionsToDeliver', [
    //         'filterSubIds' => $query->pluck('id'),
    //         'filterSubs' => $query->with('orderLine', 'contactAddress')->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString(),
    //         'stateIds'  => StateId::all()->sortByDesc('state_id'),
    //         'activitySummaries'  => ActivitySummary::all(),
    //     ]);
    // })->name('subscriptionsToDeliver');
});
