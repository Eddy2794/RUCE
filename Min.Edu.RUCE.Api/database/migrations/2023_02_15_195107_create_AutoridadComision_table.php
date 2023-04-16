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
        Schema::create('AutoridadComision', function (Blueprint $table) {
            $table->increments('idAutoridadComision');
            
            $table->unsignedInteger('fkPersonaRUCE');
            $table->foreign('fkPersonaRUCE')->references('idPersonaRUCE')->on('PersonaRuce')->onDelete('cascade');

            $table->unsignedInteger('fkRefCargo');
            $table->foreign('fkRefCargo')->references('idRefCargo')->on('RefCargo')->onDelete('cascade');

            $table->unsignedInteger('fkComision');
            $table->foreign('fkComision')->references('idComision')->on('Comision')->onDelete('cascade');

            $table->date('inicio_cargo')->nullable(true);
            $table->date('fin_cargo')->nullable(true);

            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->datetime('fechaEliminacion')->nullable(true);
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
        Schema::dropIfExists('AutoridadComision');
    }
};
