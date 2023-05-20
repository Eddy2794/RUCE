<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('RefCargo', function (Blueprint $table) {
            $table->increments('idRefCargo');
            $table->string('cargoDesc');
            $table->timestamps();
        });
        
        Schema::table('RefCargo', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('RefCargo');
        Schema::table('RefCargo', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
