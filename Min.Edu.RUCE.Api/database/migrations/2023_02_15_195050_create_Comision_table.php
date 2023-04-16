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
        Schema::create('Comision', function (Blueprint $table) {
            $table->increments('idComision');

            $table->unsignedInteger('fkIdCooperadora');
            $table->foreign('fkIdCooperadora')->references('idCooperadora')->on('Cooperadora')->onDelete('cascade');

            $table->unsignedInteger('fkIdRefTipoComision');
            $table->foreign('fkIdRefTipoComision')->references('idRefTipoComision')->on('RefTipoComision')->onDelete('cascade');

            $table->date('periodoInicio')->nullable(true);
            $table->date('periodoFin')->nullable(true);
            
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
        Schema::dropIfExists('Comision');
    }
};
