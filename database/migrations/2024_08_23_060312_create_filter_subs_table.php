<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('filter_subs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('invoice_number')->nullable();
            $table->string('sales_order_no')->nullable();
            $table->string('customer_name')->nullable();
            $table->timestamp('invoice_date')->nullable();
            $table->string('payment_status')->nullable();
            $table->string('address')->nullable();
            $table->string('state_id')->nullable();
            $table->string('activity_summary')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->timestamp('due_date')->nullable();
            $table->string('created_on_odoo')->nullable();
            $table->integer('last_updated_by')->nullable();
            // $table->integer('last_confirmed_by')->nullable();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filter_subs');
    }
};
