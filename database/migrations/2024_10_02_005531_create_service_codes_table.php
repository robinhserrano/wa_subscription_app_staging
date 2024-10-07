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
        Schema::create('service_codes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('service_code')->nullable();
            $table->integer('number_of_items')->nullable();
            $table->integer('total_weight')->nullable();
            $table->string('total_cubit_volume')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_codes');
    }
};
