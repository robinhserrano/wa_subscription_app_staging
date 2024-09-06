<?php

namespace App\Http\Controllers;

use App\Models\StateId;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class StateIdController extends Controller
{
    public function bulkStateIdStore(Request $request)
    {
        $allowedWarehouse = [
            'state_id',
            'name',
            'code',
        ];

        $warehouseList = $request->all();
        $newWarehouses = [];

        foreach ($warehouseList as $warehouse) {
            $filteredWarehouse = Arr::only($warehouse, $allowedWarehouse);
            $existingWarehouse = StateId::where('state_id', $filteredWarehouse['state_id'])->first();

            if ($existingWarehouse) {

                $existingWarehouse->update($filteredWarehouse);
            } else {

                $newWarehouses[] = $filteredWarehouse;
            }

            $orderLines[] = $filteredWarehouse;
        }

        if (!empty($newWarehouses)) {
            StateId::insert($newWarehouses);
        }

        $existingWarehouseIds = StateId::pluck('state_id')->toArray();

        // Find IDs to delete
        $incomingWarehouseIds = array_column($warehouseList, 'state_id'); // Assuming 'id' exists in incoming data
        $idsToDelete = array_diff($existingWarehouseIds, $incomingWarehouseIds);

        // Delete warehouses with missing IDs
        if (!empty($idsToDelete)) {
            StateId::whereIn('state_id', $idsToDelete)->delete();
        }
    }
}
