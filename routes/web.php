<?php

use App\Models\FilterSubs;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Request;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/filterSubs', function () {

//     $currentPage = (int) Request::input('page', 1);
//     $perPage = (int) Request::input('perPage', 10);

//     $data = FilterSubs::query()->paginate($perPage, ['*'], 'page', $currentPage);

//     return $data;
// });

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

        $data = FilterSubs::query()
            ->when(Request::input('search'), function ($query, $search) {
                $query->where('customer_name', 'like', "%{$search}%");
            })->orderBy($sortBy, $sortOrder);

        return Inertia::render('Dashboard', [
            'filterSubs' => $data->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString(),
        ]);
    })->name('dashboard');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/confirmDeliveryRequirement', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);

        $data = FilterSubs::query()
            ->when(Request::input('search'), function ($query, $search) {
                $query->where('customer_name', 'like', "%{$search}%");
                // $query->where('customer_name', 'like', "%{$search}%");
            })->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        return Inertia::render('ConfirmDeliveryRequirement', [
            'filterSubs' => $data,
        ]);
    })->name('confirmDeliveryRequirement');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/subscriptionsToDeliver', function () {
        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);

        $data = FilterSubs::query()
            ->when(Request::input('search'), function ($query, $search) {
                $query->where('customer_name', 'like', "%{$search}%");
            })->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString();

        return Inertia::render('SubscriptionsToDeliver', [
            'filterSubs' => $data,
        ]);
    })->name('subscriptionsToDeliver');
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
