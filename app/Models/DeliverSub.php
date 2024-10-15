<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliverSub extends Model
{
    protected $guarded = [];

    use HasFactory;

    public function orderLine()
    {
        return $this->hasMany(OrderLine::class, 'sales_order_no', 'sales_order_no');
    }

    public function contactAddress()
    {
        return $this->hasMany(Contact::class, 'name', 'customer_name')->with('children', 'parent');
    }

    public function rootSalesOrder()
    {
        return $this->hasOne(FilterSubs::class, 'id', 'filter_sub_id')->select('id', 'sales_order_no');
    }

    public function serviceCode()
    {
        return $this->hasOne(ServiceCode::class, 'id', 'service_code_id')->select('id', 'service_code', 'total_weight', 'number_of_items', 'total_cubit_volume');
    }

    public function deliveredOrDeliveryBookedBy()
    {
        return $this->hasOne(User::class, 'id', 'delivered_or_delivery_booked_by_id')->select('id', 'name');;
    }
    // public function remarksUpdatedBy()
    // {
    //     return $this->hasOne(User::class, 'id', 'remarks_updated_by')->select('id', 'name');;
    // }
}
