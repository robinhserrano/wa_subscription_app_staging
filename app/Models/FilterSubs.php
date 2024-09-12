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
}
