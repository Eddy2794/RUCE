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
        Schema::create('Kiosco', function (Blueprint $table) {
            $table->increments('idKiosco');
            
            $table->unsignedInteger('fkIdPersonaRUCE');
            $table->foreign('fkIdPersonaRUCE')->references('idPersonaRUCE')->on('PersonaRuce')->onDelete('cascade');

            $table->unsignedInteger('fkIdCooperadora');
            $table->foreign('fkIdCooperadora')->references('idCooperadora')->on('Cooperadora')->onDelete('cascade');
            
            $table->boolean('accesoLicitacion')->default(false);
            $table->boolean('documentacionPresentada')->default(false);
            $table->date('periodoInicio')->nullable(true);
            $table->date('periodoFin')->nullable(true);
            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->dateTime('fechaEliminacion')->nullable(true);
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
        Schema::dropIfExists('Kiosco');
    }
};
