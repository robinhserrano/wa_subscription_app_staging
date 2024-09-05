<?php

namespace App\Http\Controllers;

use App\Models\SalesOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Exception;

class SalesOrderController extends Controller
{
    public function bulkStoreSalesOrder(Request $request)
    {
        $allowedSalesOrder = [
            'address',
            'customer_name',
            'sales_order_no'
        ];

        $salesOrderList = $request->all();
        $newSalesOrders = [];

        foreach ($salesOrderList as $orderData) {
            $filteredSalesOrder = Arr::only($orderData, $allowedSalesOrder);

            $existingSalesOrder = SalesOrder::where('sales_order_no', $filteredSalesOrder['sales_order_no'])->first();

            if ($existingSalesOrder) {

                $existingSalesOrder->update($filteredSalesOrder);
            } else {
                $newSalesOrders[] =  array_merge($filteredSalesOrder, [
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        if (!empty($newSalesOrders)) {
            $insertedSalesOrders = SalesOrder::insert($newSalesOrders);
        }

        return response()->json(['message' => 'Sales orders created or updated successfully'], 201); // Created
    }

    public function findSalesOrdersBySalesOrderNo(Request $request)
    {
        $request->validate([
            'sales_order_no' => 'required|string',
        ]);

        $salesOrderNo = $request->input('sales_order_no');

        $salesOrder = SalesOrder::where('sales_order_no', $salesOrderNo)->first();

        if ($salesOrder) {
            // Extract addresses from the found sales orders
            $address = $salesOrder->address;

            // Find all sales orders with the same address
            $salesOrdersWithSameAddress = SalesOrder::where('address', $address)
                ->where('sales_order_no', '!=', $salesOrderNo)
                ->get();

            return response()->json(
                $salesOrdersWithSameAddress
                //     [
                //     'message' => 'Sales orders found',
                //     'data' => $salesOrdersWithSameAddress
                // ]
                ,
                200
            ); // OK
        } else {
            // Return an error message if no sales orders are found
            return response()->json([
                'message' => 'No sales orders found for the given sales order number'
            ], 404); // Not Found
        }
    }
}
