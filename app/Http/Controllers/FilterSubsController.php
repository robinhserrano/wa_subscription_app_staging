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

            $allowedFilterSubs = ['invoice_number', 'sales_order_no', 'customer_name', 'invoice_date', 'payment_status', 'address', 'state_id', 'activity_summary', 'phone', 'email', 'due_date', 'start_date'];

            $filterSub = ['invoice_number' => $request['invoice_number'], 'sales_order_no'  => $request['sales_order_no'], 'customer_name' => $request['customer_name'], 'invoice_date' => $request['invoice_date'], 'payment_status' => $request['payment_status'], 'address' => $request['address'], 'state_id' => $request['state_id'], 'activity_summary' => $request['activity_summary'], 'phone' => $request['phone'], 'email' => $request['email'], 'due_date' => $request['due_date'], 'start_date' => $request['start_date']];

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
        $allowedFilterSubs = ['invoice_number', 'sales_order_no', 'customer_name', 'invoice_date', 'payment_status', 'address', 'state_id', 'activity_summary', 'phone', 'email', 'due_date', 'category', 'start_date'];

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
            $odooCreatedById = $request->input('odoo_created_by_id');

            $filterSub->created_on_odoo = $createdOnOdoo;
            $filterSub->odoo_created_by_id = $odooCreatedById;
            $filterSub->save();

            return response()->json(['filterSub' => $filterSub, 'message' => 'CreatedOnOdoo updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update CreatedOnOdoo in FilterSub: ' . $e->getMessage()], 500);
            // return response()->json(['error' => 'Failed to update CreatedOnOdoo in Sales Order:'], 404);
        }
    }

    public function findFilterSubsBySalesOrderNo(Request $request)
    {
        $request->validate([
            'sales_order_no' => 'required|string',
        ]);

        $salesOrderNo = $request->input('sales_order_no');

        $filterSub = FilterSubs::with('contactAddress')->where('sales_order_no', $salesOrderNo)->first();

        if ($filterSub) {

            $names = [];

            $names[] = $filterSub->customer_name;

            if ($filterSub->contactAddress && $filterSub->contactAddress->isNotEmpty()) {
                // Get the first contact address
                $contactAddress = $filterSub->contactAddress->first();
                if ($contactAddress->parent) {
                    // Assuming parent is a single object, extract its name if it exists
                    if (!empty($contactAddress->parent->name)) {
                        $names[] = $contactAddress->parent->name;
                    }
                }

                if ($contactAddress->children && $contactAddress->children->isNotEmpty()) {
                    foreach ($contactAddress->children as $child) {
                        if (!empty($child->name)) {
                            $names[] = $child->name;
                        }
                    }
                }
            }

            $filteredFilterSub = FilterSubs::query()->whereIn('customer_name', $names) //->where('sales_order_no', '!=', $salesOrderNo)
                ->get()->pluck('sales_order_no');

            return response()->json(
                $filteredFilterSub,
                200
            ); // OK
        } else {
            // Return an error message if no sales orders are found
            return response()->json([
                'message' => 'No sales orders found for the given sales order number'
            ], 404); // Not Found
        }
    }

    public function updateUpsellStatus(Request $request, string $id)
    {
        try {

            $filterSub = FilterSubs::findOrFail($id);
            $status = $request->input('status');
            $statusUpdatedBy = $request->input('status_updated_by');

            $filterSub->status = $status;
            $filterSub->status_updated_by = $statusUpdatedBy;

            $filterSub->save();

            return response()->json(['filterSub' => $filterSub, 'message' => 'status updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update status in filterSub: ' . $e->getMessage()], 500);
            // return response()->json(['error' => 'Failed to update CreatedOnOdoo in Sales Order:'], 404);
        }
    }

    public function updateNotes(Request $request, string $id)
    {
        try {

            // $filterSub = FilterSubs::findOrFail($id);
            // $filterSub = FilterSubs::with('contactAddress')->where('sales_order_no', $id)->first();
            $filterSub = FilterSubs::findOrFail($id);
            $remarks = $request->input('remarks');
            $remarksUpdatedBy = $request->input('remarks_updated_by');

            $filterSub->remarks = $remarks;
            $filterSub->remarks_updated_by = $remarksUpdatedBy;

            $filterSub->save();

            return response()->json(['filterSub' => $filterSub, 'message' => 'notes updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update notes in filterSub: ' . $e->getMessage()], 500);
            // return response()->json(['error' => 'Failed to update CreatedOnOdoo in Sales Order:'], 404);
        }
    }

    public function getFilterSubByIds(Request $request)
    {
        try {
            $data = json_decode($request->getContent(), true); // Assuming JSON data
            
            $ids = array_column($data['filterSubIds'], 'id');

            $filterSubs = FilterSubs::with('orderLine','contactAddress')->whereIn('id', $ids)->get();

            return response()->json(['filterSubs' => $filterSubs, 'message' => 'Filter subs retrieved successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Filter subs not found'], 404);
        }
    }
}
