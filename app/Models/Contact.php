<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Contact extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function children()
    {
        return $this->hasMany(Contact::class, 'parent_contact_id', 'contact_id');
    }

    // Define a relationship where a contact belongs to a parent
    public function parent()
    {
        return $this->belongsTo(Contact::class, 'parent_contact_id', 'contact_id');
    }

    // public function scopeWithRelations(Builder $query)
    // {
    //     return $query->whereHas('children') // Contacts that have children
    //         ->orWhereHas('parent'); // Contacts that have a parent
    // }
}
