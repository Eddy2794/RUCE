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
            
            $table->unsignedInteger('idPersonaRUCE');
            $table->foreign('idPersonaRUCE')->references('idPersonaRUCE')->on('PersonaRuce')->onDelete('cascade');

            $table->unsignedInteger('fk_cooperadora');
            $table->foreign('fk_cooperadora')->references('idCooperadora')->on('Cooperadora')->onDelete('cascade');
            
            $table->boolean('acceso_licitacion')->default(false);
            $table->date('periodo_inicio')->nullable(true);
            $table->date('periodo_fin')->nullable(true);
            $table->boolean('documentacion_presentada')->default(false);
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
