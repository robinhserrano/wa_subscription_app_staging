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
        Schema::create('deliver_subs', function (Blueprint $table) {
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
            // $table->string('created_on_odoo')->nullable();
            $table->integer('odoo_created_by_id')->nullable();
            $table->string('required_delivery')->nullable();
            $table->integer('required_delivery_updated_by_id')->nullable();
            $table->unique(['sales_order_no', 'due_date', 'filter_sub_id']);
            $table->unsignedBigInteger('filter_sub_id')->nullable(); // Reference to the primary key in filter_subs
            $table->foreign('filter_sub_id')->references('id')->on('filter_subs')->onDelete('cascade');
            $table->integer('service_code_id')->nullable();
            $table->string('delivered_or_delivery_booked')->nullable();
            $table->integer('delivered_or_delivery_booked_by_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliver_subs');
    }
};
