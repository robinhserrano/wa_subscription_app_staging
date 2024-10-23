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
        Schema::table('deliver_subs', function (Blueprint $table) {
            $table->timestamp('start_date')->nullable();
            $table->integer('service_code_updated_by_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('deliver_subs', function (Blueprint $table) {
            //
        });
    }
};
