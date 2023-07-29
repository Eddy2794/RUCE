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
            $table->increments('id');

            $table->unsignedInteger('fkRefCargo');
            $table->foreign('fkRefCargo')->references('id')->on('RefCargo')->onDelete('cascade');

            $table->unsignedInteger('fkPersonaRUCE')->unique();
            $table->foreign('fkPersonaRUCE')->references('id')->on('PersonaRUCE')->onDelete('cascade');

            $table->unsignedInteger('fkOrganizacionRUCE');
            $table->foreign('fkOrganizacionRUCE')->references('id')->on('OrganizacionRUCE')->onDelete('cascade');

            $table->date('inicioCargo')->nullable(true);
            $table->date('finCargo')->nullable(true);

            $table->boolean('estaActivo')->default(true);
            $table->date('fechaEliminacion')->nullable(true);
            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);
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
