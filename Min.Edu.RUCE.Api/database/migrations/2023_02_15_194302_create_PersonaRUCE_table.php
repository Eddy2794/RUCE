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
        Schema::create('PersonaRuce', function (Blueprint $table) {
            $table->increments('idPersonaRUCE');
            $table->string('cuil')->unique();
            $table->integer('documento')->unique();

            $table->unsignedInteger('fkIdRefTipoDocumento');
            $table->foreign('fkIdRefTipoDocumento')->references('idRefTipoDocumentoRUCE')->on('RefTipoDocumentoRUCE')->onDelete('cascade');

            $table->string('email');
            $table->unique('email');
            $table->string('nombre',200);
            $table->string('apellido',200);            
            $table->bigInteger('telefono');
            
            $table->dateTime('fechaEliminacion')->nullable(true);
            $table->boolean('estaActivo')->default(true)->nullable(false);
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
        Schema::dropIfExists('PersonaRuce');
    }
};
