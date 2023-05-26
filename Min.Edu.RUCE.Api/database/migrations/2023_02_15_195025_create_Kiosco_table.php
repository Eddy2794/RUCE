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
        Schema::create('Kiosco', function (Blueprint $table) {
            $table->increments('id');
            
            $table->unsignedInteger('fkPersonaRUCE');
            $table->foreign('fkPersonaRUCE')->references('id')->on('PersonaRuce')->onDelete('cascade');

            $table->unsignedInteger('fkCooperadora');
            $table->foreign('fkCooperadora')->references('id')->on('Cooperadora')->onDelete('cascade');
            
            $table->boolean('accesoLicitacion')->default(false);
            $table->boolean('documentacionPresentada')->default(false);
            $table->date('periodoInicio')->nullable(true);
            $table->date('periodoFin')->nullable(true);
            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);
            $table->timestamps();
        });
        
        Schema::table('Kiosco', function (Blueprint $table) {
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
        Schema::dropIfExists('Kiosco');
        Schema::table('Kiosco', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
