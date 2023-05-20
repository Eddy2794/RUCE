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

            $table->string('nroExpediente',100)->nullable(true);
            $table->integer('cantObservaciones')->default(0);
            $table->boolean('observacionesDesc')->default(false);
            $table->boolean('observacionesRespondidas')->default(false);

            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->dateTime('fechaEliminacion')->nullable(true);
            $table->integer('idUsuarioAlta')->default(null);
            $table->integer('idUsuarioModificacion')->default(null);
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
