<?php

use App\Http\Controllers\FilterSubsController;
use App\Http\Controllers\OrderLineController;
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

Route::get('/haha', function (Request $request) {
    return 'haha';
});

Route::middleware('auth:sanctum')->resource('/filterSubs', FilterSubsController::class, [
    'except' => ['create', 'edit']
])->middleware('auth:sanctum');

Route::post('/bulkStoreFilterSubs', [FilterSubsController::class, 'bulkStoreFilterSubs']);

Route::post('/bulkStoreOrderLine', [OrderLineController::class, 'bulkStoreOrderLine']);