<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up()
    {
        Schema::create('Comision', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('fkCooperadora')->unique();
            $table->foreign('fkCooperadora')->references('id')->on('Cooperadora')->onDelete('cascade');

            $table->unsignedInteger('fkRefTipoComision');
            $table->foreign('fkRefTipoComision')->references('id')->on('RefTipoComision')->onDelete('cascade');

            $table->date('periodoInicio')->nullable(false);
            $table->date('periodoFin')->nullable(false);
            $table->integer('nroSocios')->default(1);
            $table->string('estadoResolucion');
            
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
