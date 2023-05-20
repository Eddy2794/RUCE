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
        Schema::create('AutoridadOrganizacionRUCE', function (Blueprint $table) {
            $table->increments('idAutoridadOrganizacionRUCE');

            $table->unsignedInteger('fkIdRefCargo');
            $table->foreign('fkIdRefCargo')->references('idRefCargo')->on('RefCargo')->onDelete('cascade');

            $table->unsignedInteger('fkIdPersonaRUCE');
            $table->foreign('fkIdPersonaRUCE')->references('idPersonaRUCE')->on('PersonaRuce')->onDelete('cascade');

            $table->unsignedInteger('fkIdOrganizacionRUCE');
            $table->foreign('fkIdOrganizacionRUCE')->references('idOrganizacionRUCE')->on('OrganizacionRUCE')->onDelete('cascade');

            $table->dateTime('inicioCargo')->nullable(true);
            $table->dateTime('finCargo')->nullable(true);

            $table->boolean('estaActivo')->default(true);
            $table->dateTime('fechaEliminacion')->nullable(true);
            $table->integer('idUsuarioAlta')->default(null);
            $table->integer('idUsuarioModificacion')->default(null);
            $table->timestamps();
        });
        
        Schema::table('AutoridadOrganizacionRUCE', function (Blueprint $table) {
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
        Schema::dropIfExists('AutoridadOrganizacionRUCE');
        Schema::table('AutoridadOrganizacionRUCE', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
