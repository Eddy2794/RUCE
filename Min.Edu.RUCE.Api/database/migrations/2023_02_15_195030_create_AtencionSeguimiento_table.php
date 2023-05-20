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
            $table->integer('emailEnviados');
            $table->integer('atencionOficina');
            $table->integer('atencionTerritorial');
            $table->text('observacion');
            $table->date('fecha');
            
            $table->boolean('estaActivo')->default(true)->nullable(false);

            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);

            $table->timestamps();
        });
        
        Schema::table('AtencionSeguimiento', function (Blueprint $table) {
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
        Schema::dropIfExists('AtencionSeguimiento');
        Schema::table('AtencionSeguimiento', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
