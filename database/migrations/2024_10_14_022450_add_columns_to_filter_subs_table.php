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
            $table->string('remarks')->nullable();
            $table->integer('remarks_updated_by')->nullable();
            $table->string('status')->nullable();
            $table->integer('status_updated_by')->nullable();
            $table->integer('assigned_user_id')->nullable();
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
