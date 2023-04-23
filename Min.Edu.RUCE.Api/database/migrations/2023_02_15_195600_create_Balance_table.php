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
        Schema::create('_balance', function (Blueprint $table) {
            $table->increments('idBalance');

            $table->unsignedInteger('fkIdCooperadora');
            $table->foreign('fkIdBalance')->references('idCooperadora')->on('Cooperadora')->onDelete('cascade');

            $table->boolean('estaActivo')->default(true);
            $table->dateTime('fechaEliminacion')->nullable(true);
            $table->integer('idUsuarioAlta')->default(null);
            $table->integer('idUsuarioModificacion')->default(null);
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
        Schema::dropIfExists('_balance');
    }
};
