<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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

            $table->string('cuit',11)->nullable();
            $table->string('legajo',50)->nullable();
            $table->string('denominacion')->unique();
            $table->string('estado',200);

            $table->boolean('convenioCsEconomicas')->default(false);
            $table->boolean('estadoAfip')->default(false);
            $table->boolean('estadoRentas')->default(false);
            $table->boolean('inscripcionRenacopes')->default(false);

            $table->string('modalidad')->nullable();

            $table->date('fechaCreacion')->nullable();

            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);
            $table->timestamps();

        });

        DB::statement('CREATE UNIQUE INDEX cooperadora_cuit_unique ON Cooperadora (cuit) WHERE cuit IS NOT NULL;');
        DB::statement('CREATE UNIQUE INDEX cooperadora_legajo_unique ON Cooperadora (legajo) WHERE legajo IS NOT NULL;');
        
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
