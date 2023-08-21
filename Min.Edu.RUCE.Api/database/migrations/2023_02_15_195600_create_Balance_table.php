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
        Schema::create('Balance', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('fkCooperadora');
            $table->foreign('fkCooperadora')->references('id')->on('Cooperadora')->onDelete('cascade');

            $table->boolean('estadoBalance')->default(false);
            $table->integer('anio')->default(null);
            $table->boolean('estaActivo')->default(true);
            $table->dateTime('fechaEliminacion')->nullable(true);
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
        Schema::dropIfExists('Balance');
        Schema::table('Balance', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
