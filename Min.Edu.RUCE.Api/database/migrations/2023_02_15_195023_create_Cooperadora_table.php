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

            $table->unsignedInteger('fk_idRefTipoAsociacion');
            $table->foreign('fk_idRefTipoAsociacion')->references('idRefTipoAsociacion')->on('RefTipoAsociacion')->onDelete('cascade');

            $table->unsignedInteger('idOrganizacionRUCE');
            $table->foreign('idOrganizacionRUCE')->references('idOrganizacionRUCE')->on('OrganizacionRUCE')->onDelete('cascade');

            $table->string('legajo',200)->nullable(true);
            $table->string('denominacion',100);
            $table->string('estado',200)->nullable(true);
            $table->string('decreto',200)->nullable(true);
            $table->string('nroResolucion',200)->nullable(true);

            $table->boolean('convenioScEconomicas')->default(false);
            $table->boolean('inscripcion_afip')->default(false);
            $table->boolean('inscripcion_rentas')->default(false);
            $table->boolean('inscripcion_renacopes')->default(false);

            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);

            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->datetime('fechaEliminacion')->nullable(true);
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
        Schema::dropIfExists('Cooperadora');
    }
};
