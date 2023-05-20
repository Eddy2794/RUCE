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
        Schema::create('Matricula', function (Blueprint $table) {
            $table->increments('idMatricula');

            $table->unsignedInteger('fkIdOrganizacionRUCE');
            $table->foreign('fkIdOrganizacionRUCE')->references('idOrganizacionRUCE')->on('OrganizacionRUCE')->onDelete('cascade');

            $table->integer('periodoLectivo');
            $table->integer('matricula');
            $table->boolean('estaActivo')->default(true);
            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);
            $table->timestamps();
        });
        
        Schema::table('Matricula', function (Blueprint $table) {
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
        Schema::dropIfExists('Matricula');
        Schema::table('Matricula', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
