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
        Schema::create('RefTipoComision', function (Blueprint $table) {
            $table->increments('id');
            $table->string('tipoComisionDesc');
            $table->timestamps();
        });
        
        Schema::table('RefTipoComision', function (Blueprint $table) {
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
        Schema::dropIfExists('RefTipoComision');
        Schema::table('RefTipoComision', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
