<?php

namespace App\Http\Controllers;

use App\Models\OrderLine;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Exception;

class OrderLineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orderLine = OrderLine::all();
        return $orderLine;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // try {
        //     // Code that might throw an exception

        //     $allowedOrderLineOrderLine = ['invoice_number', 'sales_order_no', 'customer_name', 'invoice_date', 'payment_status', 'address', 'state_id', 'activity_summary', 'phone_number', 'email', 'due_date'];

        //     $orderLine = ['invoice_number' => $request['invoice_number'], 'sales_order_no'  => $request['sales_order_no'], 'customer_name' => $request['customer_name'], 'invoice_date' => $request['invoice_date'], 'payment_status' => $request['payment_status'], 'address' => $request['address'], 'state_id' => $request['state_id'], 'activity_summary' => $request['activity_summary'], 'phone_number' => $request['phone_number'], 'email' => $request['email'], 'due_date' => $request['due_date']];

        //     $existingorderLine = OrderLine::where('invoice_number', $orderLine['invoice_number'])
        //         ->where('sales_order_no', $orderLine['sales_order_no'])
        //         ->first();

        //     if ($existingorderLine) {
        //         $existingorderLine->update(Arr::only($orderLine, $allowedOrderLineOrderLine));
        //     } else {
        //         OrderLine::create(Arr::only($orderLine, $allowedOrderLineOrderLine));
        //     }
        //     return response()->json(['message' => 'Order Lines created successfully'], 201);
        // } catch (Exception $e) {
        //     return response()->json(['error' => 'Failed to storeOrderLine :' + $e], 404);
        //     // Code to handle the exception
        // }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $orderLine = OrderLine::findOrFail($id);
        return $orderLine;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $orderLine = OrderLine::findOrFail($id);
            $orderLine->delete();
            return response()->json(['message' => 'Deleted Order Line successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Order Line not found'], 404);
        }
    }

    public function bulkStoreOrderLine(Request $request)
    {
        $salesOrderList = $request->all();
        $orderLines = [];


        foreach ($salesOrderList as $orderData) {
            // Collect order lines separately to process later
            $orderLines[] = [
                'order_data' => $orderData,
                'sales_order_no' => $orderData['sales_order_no']
            ];
        }

        foreach ($orderLines as $lineData) {
            saveOrUpdateOrderLines($lineData['order_data'], $lineData['sales_order_no']);
        }

        return response()->json([
            'message' => "Order line created or updated successfully."
            //  Created: $createdCount, Updated: $updatedOrderLineOrderLine"
        ], 201); // Created
    }
}


function saveOrUpdateOrderLines(array $orderData, ?String $salesOrderNo = null): void
{
    $existingOrderLineProducts = [];
    $orderLinesToUpdate = [];
    $incomingOrderLineProducts = [];

    // Extract incoming order line data
    $incomingOrderLines = [];
    foreach ($orderData['order_line'] as $index => $orderLineData) {
        $filteredOrderLine = new OrderLine([
            'product' => $orderLineData['product'],
            'description' => $orderLineData['description'] ?? null,
            'quantity' => $orderLineData['quantity'],
            // 'unit_price' => $orderLineData['unit_price'],
            // 'tax_excl' => $orderLineData['tax_excl'] ?? null,
            // 'disc' => $orderLineData['disc'] ?? null,
            // 'taxes' => $orderData['taxes'] ?? null,
            // 'delivered' => $orderLineData['delivered'] ?? null,
            // 'invoiced' => $orderLineData['invoiced'] ?? null,
        ]);
        $incomingOrderLines[$index] = $filteredOrderLine;
        $incomingOrderLineProducts[] = $filteredOrderLine->product;
    }

    // Find existing order lines
    $existingOrderLines = $salesOrderNo ? OrderLine::where('sales_order_no', $salesOrderNo)->get() : collect([]);

    // Separate existing and incoming order lines
    foreach ($existingOrderLines as $existingOrderLine) {
        $existingOrderLineProducts[] = $existingOrderLine->product;
        foreach ($incomingOrderLines as $index => $incomingOrderLine) {
            if ($existingOrderLine->product === $incomingOrderLine->product) {
                $orderLinesToUpdate[] = [
                    'id' => $existingOrderLine->id,
                    'product' => $incomingOrderLine->product,
                    'description' => $incomingOrderLine->description ?? null,
                    'quantity' => $incomingOrderLine->quantity,
                    // 'unit_price' => $incomingOrderLine->unit_price,
                    // 'tax_excl' => $incomingOrderLine->tax_excl ?? null,
                    // 'disc' => $incomingOrderLine->disc ?? null,
                    // 'taxes' => $incomingOrderLine->taxes ?? null,
                    // 'delivered' => $incomingOrderLine->delivered ?? null,
                    // 'invoiced' => $incomingOrderLine->invoiced ?? null,
                ];
                unset($incomingOrderLines[$index]);
                break; // Exit the loop after finding a match
            }
        }
    }

    // Create or update order lines
    foreach ($orderLinesToUpdate as $orderLineData) {
        $orderLineData['sales_order_no'] = $salesOrderNo;
        OrderLine::updateOrCreate(['id' => $orderLineData['id']], $orderLineData);
    }

    // Insert new order lines
    foreach ($incomingOrderLines as $orderLine) {
        $orderLine->sales_order_no = $salesOrderNo;
        $orderLine->save();
    }

    // Identify and delete order lines to be removed
    $existingOrderLineIdsToDelete = $existingOrderLines
        ->whereNotIn('product', $incomingOrderLineProducts)
        ->pluck('id');

    if (!empty($existingOrderLineIdsToDelete)) {
        OrderLine::whereIn('id', $existingOrderLineIdsToDelete)->delete();
    }
}
