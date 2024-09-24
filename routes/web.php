<?php

use App\Models\ActivitySummary;
use App\Models\FilterSubs;
use App\Models\SalesOrder;
use App\Models\StateId;
use App\Models\User;
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
        $query = FilterSubs::query()->whereNull('created_on_odoo');
        if (!empty($dates)) {
            $startDate = Carbon::parse($dates[0]);
            $endDate = isset($dates[1]) ? Carbon::parse($dates[1]) : null;
            $query->where('due_date', '>=', $startDate);
            if ($endDate) {
                $query->whereBetween('due_date', [$startDate, $endDate])
                    ->get();
            }

            $query->orderBy('customer_name', 'asc');
        }

        $categories = Request::input('categories', []);
        if ($categories !== []) {
            $query->whereIn('category', $categories);
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
        return Inertia::render('Dashboard', [
            'filterSubIds' => $query->pluck('id'),
            'filterSubs' => $query->with('orderLine', 'contactAddress')->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString(),
            'stateIds' => StateId::all()->sortByDesc('state_id'),

            // 'activitySummaries' => ActivitySummary::all(),
        ]);
    })->name('dashboard');
    Route::get('/confirmDeliveryRequirement', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $dates = Request::input('dates', []);

        $query = FilterSubs::query()->whereNotNull('created_on_odoo');

        if (!empty($dates)) {
            $startDate = Carbon::parse($dates[0]);
            $endDate = isset($dates[1]) ? Carbon::parse($dates[1]) : null;
            $query->where('due_date', '>=', $startDate);
            if ($endDate) {
                $query->whereBetween('due_date', [$startDate, $endDate])
                    ->get();
            }

            $query->orderBy('customer_name', 'asc');
        }
        $categories = Request::input('categories', []);
        if ($categories !== []) {
            $query->whereIn('category', $categories);
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
            'filterSubs' => $query->with('orderLine', 'contactAddress', 'newSalesOrder')->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString(),
            'stateIds' => StateId::all()->sortByDesc('state_id'),
            'users' => User::all(),
        ]);
    })->name('confirmDeliveryRequirement');

    Route::get('/subscriptionsToDeliver', function () {

        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order
        $dates = Request::input('dates', []);

        $initialQuery = FilterSubs::all()->whereNotNull('created_on_odoo')->whereNotNull('required_delivery')->where('required_delivery', '=', 'Confirm');
        $createdOnOdooIds = $initialQuery->pluck('created_on_odoo');
        $query = FilterSubs::query()
            ->whereIn('sales_order_no', $createdOnOdooIds);
        
        // $query = FilterSubs::query()->whereNotNull('created_on_odoo')->whereNotNull('required_delivery')->where('required_delivery', '=', 'Confirm');

        // $query->distinct();

        if (!empty($dates)) {
            $startDate = Carbon::parse($dates[0]);
            $endDate = isset($dates[1]) ? Carbon::parse($dates[1]) : null;
            $query->where('due_date', '>=', $startDate);
            if ($endDate) {
                $query->whereBetween('due_date', [$startDate, $endDate])
                    ->get();
            }

            $query->orderBy('customer_name', 'asc');
        }

        $categories = Request::input('categories', []);
        if ($categories !== []) {
            $query->whereIn('category', $categories);
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
            // ->orWhere('address', 'like', "%{$search}%");
        }
        $query->orderBy($sortBy, $sortOrder);

        return Inertia::render('SubscriptionsToDeliver', [
            // 'allss' => $query,
            // 'inital' => $createdOnOdooIds,
            // 'initQuery'=> $initialQuery, 
            'filterSubIds' => $query->pluck('id'),
            'filterSubs' => $query->with('orderLine', 'contactAddress')->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString(),
            'stateIds' => StateId::all()->sortByDesc('state_id'),
            'users' => User::all(),
        ]);
    })->name('subscriptionsToDeliver');
});
