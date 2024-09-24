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
        Schema::table('filter_subs', function (Blueprint $table) {
            $table->string('delivered_or_delivery_booked')->nullable();
            $table->integer('delivered_or_delivery_booked_by_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('filter_subs', function (Blueprint $table) {
            //
        });
    }
};
