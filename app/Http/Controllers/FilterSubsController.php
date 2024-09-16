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
        $filterSub = FilterSubs::with('orderLine')->get();
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
        $allowedFilterSubs = ['invoice_number', 'sales_order_no', 'customer_name', 'invoice_date', 'payment_status', 'address', 'state_id', 'activity_summary', 'phone', 'email', 'due_date', 'category'];

        $filterSubsList = $request->all();
        $newFilterSubs = [];
        $updatedFilterSubs = 0;

        foreach ($filterSubsList as $orderData) {
            $filteredFilterSubs = Arr::only($orderData, $allowedFilterSubs);

            // Check if sales order already exists by name (unique identifier)
            if (!empty($filteredFilterSubs['invoice_number'])) {
                $existingFilterSubs = FilterSubs::where('invoice_number', $filteredFilterSubs['invoice_number'])->first();
            } else {
                $existingFilterSubs = FilterSubs::where('sales_order_no', $filteredFilterSubs['sales_order_no'])->first();
            }


            if ($existingFilterSubs) {
                // Update existing sales order
                $existingFilterSubs->update($filteredFilterSubs);
                $updatedFilterSubs++;
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

        $createdCount = count($newFilterSubs);


        return response()->json([
            'message' => "Sales orders created or updated successfully. Created: $createdCount, Updated: $updatedFilterSubs"
        ], 201); // Created
    }

    public function updateCreatedOnOdooInFilterSubs(Request $request, string $id)
    {
        try {
            $filterSub = FilterSubs::findOrFail($id);
            $createdOnOdoo = $request->input('created_on_odoo');

            $filterSub->created_on_odoo = $createdOnOdoo;
            $filterSub->save();

            return response()->json(['filterSub' => $filterSub, 'message' => 'CreatedOnOdoo updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update CreatedOnOdoo in FilterSub: ' . $e->getMessage()], 500);
            // return response()->json(['error' => 'Failed to update CreatedOnOdoo in Sales Order:'], 404);
        }
    }


    public function updateRequiredDeliveryInFilterSubs(Request $request, string $id)
    {
        try {
            $filterSub = FilterSubs::findOrFail($id);
            $requiredDelivery = $request->input('required_delivery');

            $filterSub->required_delivery = $requiredDelivery;
            $filterSub->save();

            return response()->json(['filterSub' => $filterSub, 'message' => 'required_delivery updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update required_delivery in FilterSub: ' . $e->getMessage()], 500);
            // return response()->json(['error' => 'Failed to update CreatedOnOdoo in Sales Order:'], 404);
        }
    }
}
