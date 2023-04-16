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
        Schema::create('Fondo', function (Blueprint $table) {
            $table->increments('idFondo');

            $table->unsignedInteger('fkIdCooperadora');
            $table->foreign('fkIdCooperadora')->references('idCooperadora')->on('Cooperadora')->onDelete('cascade');

            $table->unsignedInteger('fkIdRefTipoFondo');
            $table->foreign('fkIdRefTipoFondo')->references('idRefTipoFondo')->on('RefTipoFondo')->onDelete('cascade');

            $table->boolean('fondo_recibido')->default(false);
            $table->boolean('fondo_rendido')->default(false);
            $table->integer('monto')->default(0);
            $table->date('fecha_recibido')->nullable(true);
            $table->date('fecha_rendicion')->nullable(true);
            $table->integer('anio_otorgado');

            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->datetime('fechaEliminacion')->nullable(true);
            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);
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
        Schema::dropIfExists('Fondo');
    }
};
