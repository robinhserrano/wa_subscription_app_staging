<?php

namespace App\Http\Controllers;

use App\Models\DeliverSub;
use App\Models\FilterSubs;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class DeliverSubController extends Controller
{
    public function createDeliverSub(Request $request)
    {
        try {
            $allowedDeliverSub = ['invoice_number', 'sales_order_no', 'customer_name', 'invoice_date', 'payment_status', 'address', 'state_id', 'activity_summary', 'phone_number', 'email', 'due_date', 'filter_sub_id', 'start_date'];
            $filterSub  = FilterSubs::where('sales_order_no', $request['created_on_odoo'])->first();
            $deliveryData = Arr::only($filterSub->toArray(), $allowedDeliverSub);



            //    return $request;
            $existingDeliverySub = DeliverSub::where('sales_order_no', $deliveryData['sales_order_no'])
                ->where('due_date', $deliveryData['due_date'])
                ->where('filter_sub_id', $request['filter_sub_id'])
                ->first();


            if ($existingDeliverySub) {
                return response()->json(['error' => 'Filter Sub (for confirmation) already exists, kindly choose another'], 422);
            }


            $deliveryData['filter_sub_id'] = $request['filter_sub_id'];
            $deliveryData['odoo_created_by_id'] = $request['odoo_created_by_id'];




            DeliverSub::create($deliveryData);

            return response()->json(['message' => 'Delivery Sub created successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update CreatedOnOdoo in deliverySub: ' . $e->getMessage()], 500);
            // return response()->json(['error' => 'Failed to update CreatedOnOdoo in Sales Order:'], 404);
        }
    }

    public function updateRequiredDeliveryInDeliverSubs(Request $request, string $id)
    {
        try {

            $deliverSub = DeliverSub::with('orderLine')->findOrFail($id);
            $requiredDelivery = $request->input('required_delivery');
            $requiredDeliveryUpdatedById = $request->input('required_delivery_updated_by_id');

            $deliverSub->required_delivery = $requiredDelivery;
            $deliverSub->required_delivery_updated_by_id = $requiredDeliveryUpdatedById;

            // return $requiredDelivery;
            // $deliverSub->required_delivery_updated_by_id = $requiredDeliveryUpdatedById;
            if ($requiredDelivery == 'Confirm') {


                $stageKeywords = collect(['1st Stage', '2nd Stage', '3rd Stage', '4th Stage', '5th Stage', '6th Stage']);

                $stageCount = $deliverSub->orderLine->filter(function ($orderLine) use ($stageKeywords) {
                    return $stageKeywords->contains(fn($keyword) => str_contains($orderLine->description, $keyword));
                })->count();

                switch ($stageCount) {
                    case 1:
                        $deliverSub->service_code_id = 1;
                        break;
                    case 2:
                    case 3:
                        $deliverSub->service_code_id = 5;
                        break;
                    case 4:
                    case 5:
                    case 6:
                        $deliverSub->service_code_id = 6;
                        break;
                    default:
                        $deliverSub->service_code_id = null;
                }
            } else {
                $deliverSub->delivered_or_delivery_booked = null;
                $deliverSub->delivered_or_delivery_booked_by_id = null;
                $deliverSub->service_code_id = null;
            }

            $deliverSub->save();

            return response()->json(['deliverSub' => $deliverSub, 'message' => 'required_delivery updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update required_delivery in deliverSub: ' . $e->getMessage()], 500);
            // return response()->json(['error' => 'Failed to update CreatedOnOdoo in Sales Order:'], 404);
        }
    }

    public function updateServiceCode(Request $request, string $id)
    {
        try {

            $deliverSub = DeliverSub::findOrFail($id);

            $serviceCodeId = $request->input('service_code_id');
            $serviceCodeUpdatedById = $request->input('service_code_updated_by_id');
            // $deliveredOrDeliveryBookedById = $request->input('delivered_or_delivery_booked_by_id');
            $deliverSub->service_code_id = $serviceCodeId;
            $deliverSub->service_code_updated_by_id = $serviceCodeUpdatedById;
            // $filterSub->delivered_or_delivery_booked_by_id = $deliveredOrDeliveryBookedById;
            $deliverSub->save();

            return response()->json(['deliverSub' => $deliverSub, 'message' => 'deliverSub->service_code updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update deliverSub->service_code in deliverSub: ' . $e->getMessage()], 500);
            // return response()->json(['error' => 'Failed to update CreatedOnOdoo in Sales Order:'], 404);
        }
    }

    public function updateDeliveredOrDeliveryBooked(Request $request, string $id)
    {
        try {

            $filterSub = DeliverSub::findOrFail($id);

            $deliveredOrDeliveryBooked = $request->input('delivered_or_delivery_booked');
            $deliveredOrDeliveryBookedById = $request->input('delivered_or_delivery_booked_by_id');
            $filterSub->delivered_or_delivery_booked = $deliveredOrDeliveryBooked;
            $filterSub->delivered_or_delivery_booked_by_id = $deliveredOrDeliveryBookedById;
            $filterSub->save();

            return response()->json(['filterSub' => $filterSub, 'message' => 'delivered_or_delivery_booked updated successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to update delivered_or_delivery_booked in FilterSub: ' . $e->getMessage()], 500);
            // return response()->json(['error' => 'Failed to update CreatedOnOdoo in Sales Order:'], 404);
        }
    }

    public function bulkConfirmDeliverSubs(Request $request)
    {
        $data = json_decode($request->getContent(), true); // Assuming JSON data
        $updatedFilterSubs = 0;

        foreach ($data['deliverSubIds'] as $subId) {
            $filterSub = DeliverSub::findOrFail($subId);
            $filterSub->required_delivery = 'Confirm';
            $filterSub->required_delivery_updated_by_id = $data['required_delivery_updated_by_id'];
            $filterSub->save();
            $updatedFilterSubs++; // Count updated entries
        }

        $message = "Sales orders updated successfully. Updated: $updatedFilterSubs";
        return response()->json(compact('message'), 200); // Created
    }

    public function bulkDenyDeliverSubs(Request $request)
    {
        $data = json_decode($request->getContent(), true); // Assuming JSON data
        $updatedFilterSubs = 0;

        foreach ($data['deliverSubIds'] as $subId) {
            $filterSub = DeliverSub::findOrFail($subId);
            $filterSub->required_delivery = 'Deny';
            $filterSub->required_delivery_updated_by_id = $data['required_delivery_updated_by_id'];
            $filterSub->save();
            $updatedFilterSubs++; // Count updated entries
        }

        $message = "Sales orders updated successfully. Updated: $updatedFilterSubs";
        return response()->json(compact('message'), 200); // Created
    }

    public function bulkConfirmDeliveryBooked(Request $request)
    {
        $data = json_decode($request->getContent(), true); // Assuming JSON data
        $updatedFilterSubs = 0;

        foreach ($data['deliverSubIds'] as $subId) {
            $filterSub = DeliverSub::findOrFail($subId);
            $filterSub->delivered_or_delivery_booked = 'Delivery Booked';
            $filterSub->delivered_or_delivery_booked_by_id = $data['delivered_or_delivery_booked_by_id'];
            $filterSub->save();
            $updatedFilterSubs++; // Count updated entries
        }

        $message = "Sales orders updated successfully. Updated: $updatedFilterSubs";
        return response()->json(compact('message'), 200); // Created
    }

    public function destroy(string $id)
    {
        try {
            $filterSub = DeliverSub::findOrFail($id);
            $filterSub->delete();
            return response()->json(['message' => 'Deleted deliver sub successfully'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Deliver sub not found'], 404);
        }
    }
}
