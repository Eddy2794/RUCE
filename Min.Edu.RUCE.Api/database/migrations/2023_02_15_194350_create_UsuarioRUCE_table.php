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
        Schema::create('UsuarioRUCE', function (Blueprint $table) {
            $table->increments('idUsuarioRUCE');

            $table->string('password');
            $table->string('username');
            $table->boolean('administrador')->default(false);

            $table->unsignedInteger('fkIdPersonaRUCE');
            $table->foreign('fkIdPersonaRUCE')->references('idPersonaRUCE')->on('PersonaRuce')->onDelete('cascade');

            $table->boolean('estaActivo')->default(true)->nullable(false);
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
        Schema::dropIfExists('usuario_ruce');
    }
};
