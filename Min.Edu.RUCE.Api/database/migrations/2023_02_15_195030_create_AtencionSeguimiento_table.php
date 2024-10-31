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
            $table->increments('id');

            $table->unsignedInteger('fkCooperadora');
            $table->foreign('fkCooperadora')->references('id')->on('Cooperadora')->onDelete('cascade');

            // $table->unsignedInteger('fkPersonaRUCE');
            // $table->foreign('fkPersonaRUCE')->references('id')->on('PersonaRUCE')->onDelete('cascade');

            $table->integer('llamadas')->nullable();
            $table->integer('mensajes')->nullable();
            $table->integer('emailEnviados')->nullable();
            $table->integer('atencionOficina')->nullable();
            $table->integer('atencionTerritorial')->nullable();
            $table->text('observacion')->nullable();
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
