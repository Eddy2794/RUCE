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
            $table->increments('id');

            $table->unsignedInteger('fkCooperadora');
            $table->foreign('fkCooperadora')->references('id')->on('Cooperadora')->onDelete('cascade');

            $table->unsignedInteger('fkRefInstanciaInstrumento');
            $table->foreign('fkRefInstanciaInstrumento')->references('id')->on('RefInstanciaInstrumento')->onDelete('cascade');

            $table->string('nroExpediente',100);
            $table->integer('cantObservaciones')->default(0);
            $table->string('observacionesDesc')->nullable(true);
            $table->boolean('observacionesRespondidas')->default(false);

            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->dateTime('fechaEliminacion')->nullable(true);
            $table->integer('idUsuarioAlta')->default(null)->nullable(true);
            $table->integer('idUsuarioModificacion')->default(null)->nullable(true);
            $table->timestamps();
        });
        
        Schema::table('Expediente', function (Blueprint $table) {
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
        Schema::dropIfExists('Expediente');
        Schema::table('Expediente', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
