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
        Schema::create('Fondo', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('fkCooperadora');
            $table->foreign('fkCooperadora')->references('id')->on('Cooperadora')->onDelete('cascade');

            $table->unsignedInteger('fkRefTipoFondo');
            $table->foreign('fkRefTipoFondo')->references('id')->on('RefTipoFondo')->onDelete('cascade');

            $table->boolean('inscripta')->default(false);
            $table->boolean('verificada')->default(false);
            $table->boolean('fondoRecibido')->default(false);
            $table->boolean('fondoRendido')->default(false);
            $table->integer('monto')->default(0);
            $table->date('fechaRecibido')->nullable(true);
            $table->date('fechaRendicion')->nullable(true);
            $table->integer('anioOtorgado');

            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->datetime('fechaEliminacion')->nullable(true);
            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);
            $table->timestamps();
        });
        
        Schema::table('Fondo', function (Blueprint $table) {
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
        Schema::dropIfExists('Fondo');
        Schema::table('Fondo', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
