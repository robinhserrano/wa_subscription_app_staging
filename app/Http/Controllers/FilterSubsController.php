<?php

namespace App\Http\Controllers;

use App\Models\FilterSubs;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Exception;

class FilterSubsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filterSub = FilterSubs::all();
        return $filterSub;
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
        try {
            // Code that might throw an exception

            $allowedFilterSubs = ['invoice_number', 'sales_order_no', 'customer_name', 'invoice_date', 'payment_status', 'address', 'state_id', 'activity_summary', 'phone_number', 'email', 'due_date'];

            $filterSub = ['invoice_number' => $request['invoice_number'], 'sales_order_no'  => $request['sales_order_no'], 'customer_name' => $request['customer_name'], 'invoice_date' => $request['invoice_date'], 'payment_status' => $request['payment_status'], 'address' => $request['address'], 'state_id' => $request['state_id'], 'activity_summary' => $request['activity_summary'], 'phone_number' => $request['phone_number'], 'email' => $request['email'], 'due_date' => $request['due_date']];

            $existingFilterSub = FilterSubs::where('invoice_number', $filterSub['invoice_number'])
                ->where('sales_order_no', $filterSub['sales_order_no'])
                ->first();

            if ($existingFilterSub) {
                $existingFilterSub->update(Arr::only($filterSub, $allowedFilterSubs));
            } else {
                FilterSubs::create(Arr::only($filterSub, $allowedFilterSubs));
            }
            return response()->json(['message' => 'Filter Subs created successfully'], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to store filterSubs :' + $e], 404);
            // Code to handle the exception
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $filterSub = FilterSubs::findOrFail($id);
        return $filterSub;
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
            $filterSub = FilterSubs::findOrFail($id);
            $filterSub->delete();
            return response()->json(['message' => 'Deleted filter sub successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Filter sub not found'], 404);
        }
    }

    public function bulkStoreFilterSubs(Request $request)
    {
        $allowedFilterSubs = ['invoice_number', 'sales_order_no', 'customer_name', 'invoice_date', 'payment_status', 'address', 'state_id', 'activity_summary', 'phone', 'email', 'due_date'];

        $filterSubsList = $request->all();
        $newFilterSubs = [];

        foreach ($filterSubsList as $orderData) {
            $filteredFilterSubs = Arr::only($orderData, $allowedFilterSubs);

            // Check if sales order already exists by name (unique identifier)
            $existingFilterSubs = FilterSubs::where('invoice_number', $filteredFilterSubs['invoice_number'])->first();

            if ($existingFilterSubs) {
                // Update existing sales order
                $existingFilterSubs->update($filteredFilterSubs);
                // $filterSubsId = $existingFilterSubs->id;
            } else {
                // Prepare new sales order for insertion
                $newFilterSubs[] = array_merge($filteredFilterSubs, [
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        if (!empty($newFilterSubs)) {
            $insertedFilterSubs = FilterSubs::insert($newFilterSubs);
        }

        return response()->json(['message' => 'Sales orders created or updated successfully'], 201); // Created
    }
}
