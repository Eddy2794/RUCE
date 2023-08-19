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
            $table->increments('id');

            $table->unsignedInteger('fkExpediente');
            $table->foreign('fkExpediente')->references('id')->on('Expediente')->onDelete('cascade');

            // $table->unsignedInteger('fkRefInstanciaInstrumento');
            // $table->foreign('fkRefInstanciaInstrumento')->references('id')->on('RefInstanciaInstrumento');
            
            $table->boolean('estaActivo')->default(true);
            $table->dateTime('fechaEliminacion')->nullable(true);
            $table->integer('idUsuarioAlta')->default(null);
            $table->integer('idUsuarioModificacion')->default(null);
            $table->timestamps();
        });
        
        Schema::table('MovimientoExpediente', function (Blueprint $table) {
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
        Schema::dropIfExists('MovimientoExpediente');
        Schema::table('MovimientoExpediente', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
