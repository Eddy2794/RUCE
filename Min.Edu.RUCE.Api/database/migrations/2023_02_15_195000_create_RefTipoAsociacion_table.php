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
        Schema::create('RefTipoAsociacion', function (Blueprint $table) {
            $table->increments('idRefTipoAsociacion');
            $table->string('tipoAsociacionDesc');
            $table->timestamps();
        });
        
        Schema::table('RefTipoAsociacion', function (Blueprint $table) {
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
        Schema::dropIfExists('RefTipoAsociacion');
        Schema::table('RefTipoAsociacion', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
