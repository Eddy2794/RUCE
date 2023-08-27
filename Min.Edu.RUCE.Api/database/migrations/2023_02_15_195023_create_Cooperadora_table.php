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
            $table->increments('id');

            $table->unsignedInteger('fkRefTipoAsociacion');
            $table->foreign('fkRefTipoAsociacion')->references('id')->on('RefTipoAsociacion')->onDelete('cascade');

            // $table->unsignedInteger('fkOrganizacionRUCE')->unique();
            $table->unsignedInteger('fkOrganizacionRUCE');
            $table->foreign('fkOrganizacionRUCE')->references('id')->on('OrganizacionRUCE')->onDelete('cascade');

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
