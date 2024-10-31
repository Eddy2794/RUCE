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
        Schema::create('Informe_gral', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('fkCooperadora')->nullable();
            $table->foreign('fkCooperadora')->references('id')->on('Cooperadora');

            $table->json('datos');

            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->boolean('esReporte')->nullable(false)->default(true);

            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);
            $table->timestamps();
            
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
        Schema::dropIfExists('Informe_gral');
    }
};
