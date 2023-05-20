<?php

use Carbon\Carbon;
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
        Schema::create('Personeria', function (Blueprint $table) {
            $table->increments('idPersoneria');

            $table->unsignedInteger('fkIdExpediente');
            $table->foreign('fkIdExpediente')->references('idExpediente')->on('Expediente')->onDelete('cascade'); 

            $table->unsignedInteger('fkIdCooperadora');
            $table->foreign('fkIdCooperadora')->references('idCooperadora')->on('Cooperadora');

            $table->string('decreto')->nullable();
            $table->string('nroResolucion')->nullable();
            $table->date('fecha');

            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->date('fechaEliminacion');
            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);
            $table->timestamps();
        });
        
        Schema::table('Personaria', function (Blueprint $table) {
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
        Schema::dropIfExists('Personaria');
        Schema::table('Personaria', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
