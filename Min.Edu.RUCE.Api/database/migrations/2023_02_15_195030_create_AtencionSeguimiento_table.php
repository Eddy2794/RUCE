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
        Schema::create('AtencionSeguimiento', function (Blueprint $table) {
            $table->increments('idAtencionSeguimiento');

            $table->unsignedInteger('fkIdCooperadora');
            $table->foreign('fkIdCooperadora')->references('idCooperadora')->on('Cooperadora')->onDelete('cascade');

            $table->unsignedInteger('fkIdPersonaRUCE');
            $table->foreign('fkIdPersonaRUCE')->references('idPersonaRUCE')->on('PersonaRUCE')->onDelete('cascade');

            $table->integer('llamadas');
            $table->integer('mensajes');
            $table->integer('email_enviados');
            $table->integer('atencion_oficina');
            $table->integer('atencion_territorial');
            $table->text('observaciones');
            
            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->date('fechaEliminacion');

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
        Schema::dropIfExists('AtencionSeguimiento');
    }
};
