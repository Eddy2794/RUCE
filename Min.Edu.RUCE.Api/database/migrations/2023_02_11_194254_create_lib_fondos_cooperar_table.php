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
        Schema::create('lib_fondos_cooperar', function (Blueprint $table) {
            $table->increments('id');

            $table->boolean('fondos_recibidos');
            $table->boolean('fondos_rendidos');

            $table->date('fecha_rendicion');

            $table->integer('anio_otorgado');

            $table->unsignedInteger('fk_cooperadora');
            $table->foreign('fk_cooperadora')->references('id')->on('lib_cooperadora')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lib_fondos_cooperar');
    }
};
