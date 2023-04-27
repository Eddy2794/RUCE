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
        Schema::create('MovimientoExpediente', function (Blueprint $table) {
            $table->increments('idMovimientoExpediente');

            $table->unsignedInteger('fkIdExpediente');
            $table->foreign('fkIdExpediente')->references('idExpediente')->on('Expediente')->onDelete('cascade');

            $table->unsignedInteger('fkIdRefInstanciaInstrumento');
            $table->foreign('fkIdRefInstanciaInstrumento')->references('idRefInstanciaInstrumento')->on('RefInstanciaInstrumento')->onDelete('cascade');

            $table->boolean('estaActivo')->default(true);
            $table->dateTime('fechaEliminacion')->nullable(true);
            $table->integer('idUsuarioAlta')->default(null);
            $table->integer('idUsuarioModificacion')->default(null);
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
        Schema::dropIfExists('_movimiento_expediente');
    }
};
