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

            $table->unsignedInteger('fkCooperadora')->unique();
            $table->foreign('fkCooperadora')->references('id')->on('Cooperadora');

            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->boolean('esReporte')->nullable(false);

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
