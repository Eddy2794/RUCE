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
        Schema::create('lib_personeria_juridica', function (Blueprint $table) {
            $table->increments('id');

            $table->boolean('estado_comision_directiva')->default(true);
            $table->boolean('estado_resolucion')->default(true);

            $table->unsignedInteger('fk_asociacion_civil');
            $table->foreign('fk_asociacion_civil')->references('id')->on('lib_asociacion_civil')->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lib_personeria_juridica');
    }
};
