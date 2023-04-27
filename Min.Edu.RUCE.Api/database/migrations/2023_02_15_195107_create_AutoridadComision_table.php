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
            
            $table->unsignedInteger('fkIdPersonaRUCE');
            $table->foreign('fkIdPersonaRUCE')->references('idPersonaRUCE')->on('PersonaRuce')->onDelete('cascade');

            $table->unsignedInteger('fkIdRefCargo');
            $table->foreign('fkIdRefCargo')->references('idRefCargo')->on('RefCargo')->onDelete('cascade');

            $table->unsignedInteger('fkIdComision');
            $table->foreign('fkIdComision')->references('idComision')->on('Comision')->onDelete('cascade');

            $table->date('inicioCargo')->nullable(true);
            $table->date('finCargo')->nullable(true);

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
