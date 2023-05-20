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
        Schema::create('Cooperadora', function (Blueprint $table) {
            $table->increments('idCooperadora');

            $table->unsignedInteger('fkIdRefTipoAsociacion');
            $table->foreign('fkIdRefTipoAsociacion')->references('idRefTipoAsociacion')->on('RefTipoAsociacion')->onDelete('cascade');

            $table->unsignedInteger('fkIdOrganizacionRUCE');
            $table->foreign('fkIdOrganizacionRUCE')->references('idOrganizacionRUCE')->on('OrganizacionRUCE')->onDelete('cascade');

            $table->string('cuit',13)->nullable(true);
            $table->string('legajo',200)->nullable(true);
            $table->string('denominacion',100);
            $table->string('estado',200)->nullable(true);

            $table->boolean('convenioCsEconomicas')->default(false);
            $table->boolean('estadoAfip')->default(false);
            $table->boolean('estadoRentas')->default(false);
            $table->boolean('inscripcionRenacopes')->default(false);


            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);
            $table->timestamps();

        });
        
        Schema::table('Cooperadora', function (Blueprint $table) {
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
        Schema::dropIfExists('Cooperadora');
        Schema::table('Cooperadora', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
