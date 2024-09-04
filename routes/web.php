<?php

use App\Models\FilterSubs;
use App\Models\SalesOrder;
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
        $salesQuotations = SalesOrder::all();

        $currentPage = (int) Request::input('page', 1);
        $perPage = (int) Request::input('perPage', 100);
        $sortBy = Request::input('sortBy', 'due_date'); // Default sorting by due date
        $sortOrder = Request::input('sortOrder', 'desc'); // Default descending order

        $query = FilterSubs::query();

        if ($search = Request::input('search')) {
            $query->where('customer_name', 'like', "%{$search}%");
        }

        // Retrieve the filter data from the request
        $filter = Request::input('filter'); // Assume the JSON is sent under the key 'filter'

        // Extract the due_date constraints from the filter
        $dueDateConstraints = $filter['due_date']['constraints'] ?? [];

        // Loop through the constraints to determine date constraints
        foreach ($dueDateConstraints as $constraint) {
            $value = $constraint['value'] ?? null;
            $matchMode = $constraint['matchMode'] ?? '';

            switch ($matchMode) {
                case 'dateBefore':
                    if ($value) {
                        $query->where('due_date', '<', $value);
                    }
                    break;

                case 'dateAfter':
                    if ($value) {
                        $query->where('due_date', '>', $value);
                    }
                    break;

                case 'dateIs':
                    if ($value) {
                        $query->whereDate('due_date', '=', $value);
                    }
                    break;

                case 'dateIsNot':
                    if ($value) {
                        $query->whereDate('due_date', '<>', $value);
                    }
                    break;

                default:
                    // Handle any unexpected match modes or constraints
                    break;
            }
        }

        // Apply sorting
        $query->orderBy($sortBy, $sortOrder);


        // $data = FilterSubs::query()
        //     ->when(Request::input('search'), function ($query, $search) {
        //         $query->where('customer_name', 'like', "%{$search}%");
        //     })
        //     // ->when(Request::input('dateIs'), function ($query, $dateIs) {
        //     //     $query->whereDate('due_date', '=', $dateIs);
        //     // })
        //     // ->when(Request::input('dateIsNot'), function ($query, $dateIsNot) {
        //     //     $query->whereDate('due_date', '!=', $dateIsNot);
        //     // })
        //     // ->when(Request::input('dateIsBefore'), function ($query, $dateIsBefore) {
        //     //     $query->whereDate('due_date', '<', $dateIsBefore);
        //     // })
        //     // ->when(Request::input('dateIsAfter'), function ($query, $dateIsAfter) {
        //     //     $query->whereDate('due_date', '>', $dateIsAfter);
        //     // })
        //     ->orderBy($sortBy, $sortOrder);

        return Inertia::render('Dashboard', [
            'filterSubs' => $query->with('orderLine')->paginate($perPage, ['*'], 'page', $currentPage)->withQueryString(),
            'salesQuotations' => $salesQuotations,
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
