<?php

use App\Http\Controllers\ActivitySummaryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FilterSubsController;
use App\Http\Controllers\OrderLineController;
use App\Http\Controllers\SalesOrderController;
use App\Http\Controllers\StateIdController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/sanctum/token', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        // 'device_name' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    }

    return $user->createToken($request->password)->plainTextToken;
});

Route::middleware('auth:sanctum')->resource('/filterSubs', FilterSubsController::class, [
    'except' => ['create', 'edit']
])->middleware('auth:sanctum');

Route::post('/bulkStoreFilterSubs', [FilterSubsController::class, 'bulkStoreFilterSubs']);

Route::post('/bulkStoreOrderLine', [OrderLineController::class, 'bulkStoreOrderLine']);

Route::post('/bulkStoreSalesOrder', [SalesOrderController::class, 'bulkStoreSalesOrder']);

Route::get('/findSalesOrdersBySalesOrderNo', [SalesOrderController::class, 'findSalesOrdersBySalesOrderNo']);

Route::match(['put', 'patch'], '/updateCreatedOnOdooInFilterSubs/{id}', [FilterSubsController::class, 'updateCreatedOnOdooInFilterSubs']);

Route::post('/bulkStateIdStore', [StateIdController::class, 'bulkStateIdStore']);

Route::match(['put', 'patch'], '/updateRequiredDeliveryInFilterSubs/{id}', [FilterSubsController::class, 'updateRequiredDeliveryInFilterSubs']);

Route::post('/bulkContactsStore', [ContactController::class, 'bulkContactsStore']);

Route::post('/bulkActivitySummaryStore', [ActivitySummaryController::class, 'bulkActivitySummaryStore']);

Route::get('/findFilterSubsBySalesOrderNo', [FilterSubsController::class, 'findFilterSubsBySalesOrderNo']);

Route::post('/bulkConfirmFilterSubs', [FilterSubsController::class, 'bulkConfirmFilterSubs']);

Route::post('/bulkDenyFilterSubs', [FilterSubsController::class, 'bulkDenyFilterSubs']);