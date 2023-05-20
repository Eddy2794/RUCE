<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
    {
        Schema::create('Comision', function (Blueprint $table) {
            $table->increments('idComision');

            $table->unsignedInteger('fkIdCooperadora');
            $table->foreign('fkIdCooperadora')->references('idCooperadora')->on('Cooperadora')->onDelete('cascade');

            $table->unsignedInteger('fkIdRefTipoComision');
            $table->foreign('fkIdRefTipoComision')->references('idRefTipoComision')->on('RefTipoComision')->onDelete('cascade');

            $table->dateTime('periodoInicio')->nullable(false);
            $table->dateTime('periodoFin')->nullable(false);
            $table->integer('nroSocios')->default(1);
            $table->boolean('estadoResolucion')->default(false);
            
            $table->boolean('estaActivo')->default(true)->nullable(false);
            

            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);

            $table->timestamps();
        });
        
        Schema::table('Comision', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('Comision');
        Schema::table('Comision', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
