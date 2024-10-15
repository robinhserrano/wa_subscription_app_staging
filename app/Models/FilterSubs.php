<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilterSubs extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function orderLine()
    {
        return $this->hasMany(OrderLine::class, 'sales_order_no', 'sales_order_no');
    }

    public function contactAddress()
    {
        return $this->hasMany(Contact::class, 'name', 'customer_name')->with('children', 'parent');
    }

    public function deliverSubs()
    {
        return $this->hasMany(DeliverSub::class, 'filter_sub_id', 'id');
    }

    public function statusUpdatedBy()
    {
        return $this->hasOne(User::class, 'id', 'status_updated_by')->select('id', 'name');;
    }

    public function remarksUpdatedBy()
    {
        return $this->hasOne(User::class, 'id', 'remarks_updated_by')->select('id', 'name');;
    }

    public function assignedUserId()
    {
        return $this->hasOne(User::class, 'id', 'assigned_user_id')->select('id', 'name');;
    }
}
