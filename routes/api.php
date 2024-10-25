<?php

use App\Http\Controllers\ActivitySummaryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DeliverSubController;
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

Route::post('/bulkStoreSalesOrder', [SalesOrderController::class, 'bulkStoreSalesOrder']);
Route::get('/findSalesOrdersBySalesOrderNo', [SalesOrderController::class, 'findSalesOrdersBySalesOrderNo']);

Route::post('/bulkStoreFilterSubs', [FilterSubsController::class, 'bulkStoreFilterSubs']);
Route::match(['put', 'patch'], '/updateCreatedOnOdooInFilterSubs/{id}', [FilterSubsController::class, 'updateCreatedOnOdooInFilterSubs']);
Route::get('/findFilterSubsBySalesOrderNo', [FilterSubsController::class, 'findFilterSubsBySalesOrderNo']);
Route::match(['put', 'patch'], '/updateUpsellStatus/{id}', [FilterSubsController::class, 'updateUpsellStatus']);
Route::match(['put', 'patch'], '/updateNotes/{id}', [FilterSubsController::class, 'updateNotes']);

// Route::post('/bulkConfirmFilterSubs', [FilterSubsController::class, 'bulkConfirmFilterSubs']);
// Route::post('/bulkDenyFilterSubs', [FilterSubsController::class, 'bulkDenyFilterSubs']);
// Route::post('/bulkConfirmDeliveryBooked', [FilterSubsController::class, 'bulkConfirmDeliveryBooked']);

Route::post('/createDeliverSub', [DeliverSubController::class, 'createDeliverSub']);
Route::match(['put', 'patch'], '/updateServiceCode/{id}', [DeliverSubController::class, 'updateServiceCode']);
Route::match(['put', 'patch'], '/updateRequiredDeliveryInDeliverSubs/{id}', [DeliverSubController::class, 'updateRequiredDeliveryInDeliverSubs']);
Route::match(['put', 'patch'], '/updateDeliveredOrDeliveryBooked/{id}', [DeliverSubController::class, 'updateDeliveredOrDeliveryBooked']);
Route::post('/bulkConfirmDeliverSubs', [DeliverSubController::class, 'bulkConfirmDeliverSubs']);
Route::post('/bulkDenyDeliverSubs', [DeliverSubController::class, 'bulkDenyDeliverSubs']);
Route::post('/bulkConfirmDeliveryBooked', [DeliverSubController::class, 'bulkConfirmDeliveryBooked']);
Route::delete('deliverSub/{id}',  [DeliverSubController::class, 'destroy']);
Route::post('/getDeliverySubByIds', [DeliverSubController::class, 'getDeliverySubByIds']);

Route::post('/bulkStateIdStore', [StateIdController::class, 'bulkStateIdStore']);

Route::post('/bulkContactsStore', [ContactController::class, 'bulkContactsStore']);

Route::post('/bulkActivitySummaryStore', [ActivitySummaryController::class, 'bulkActivitySummaryStore']);

Route::post('/bulkStoreOrderLine', [OrderLineController::class, 'bulkStoreOrderLine']);
