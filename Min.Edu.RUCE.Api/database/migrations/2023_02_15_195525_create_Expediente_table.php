<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use \Carbon\Carbon;
return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Expediente', function (Blueprint $table) {
            $table->increments('idExpediente');

            $table->unsignedInteger('fkIdCooperadora');
            $table->foreign('fkIdCooperadora')->references('idCooperadora')->on('Cooperadora')->onDelete('cascade');

            $table->string('nro_expediente',100)->nullable(true);
            $table->boolean('observaciones')->default(false);
            $table->boolean('observaciones_respondidas')->default(false);

            $table->unsignedInteger('fkIdRefInstanciaInstrumentoPub');
            $table->foreign('fkIdRefInstanciaInstrumentoPub')->references('idRefInstanciaInstrumentoPub')->on('RefInstanciaInstrumentoPub')->onDelete('cascade');

            $table->boolean('fiscalia_estado')->default(false)->nullable(true);

            $table->datetime('fechaInstrumento')->nullable(true);
            $table->datetime('fechaExpediente')->nullable(true);

            $table->string('nro_resolucion',50)->nullable(true);
            $table->string('decreto',50)->nullable(true);

            $table->boolean('estaActivo')->default(true)->nullable(false);
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
        Schema::dropIfExists('Expediente');
    }
};
