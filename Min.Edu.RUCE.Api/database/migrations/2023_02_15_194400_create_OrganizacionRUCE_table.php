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
        Schema::create('OrganizacionRUCE', function (Blueprint $table) {
            $table->increments('id');
            $table->string('organizacionDesc');
            $table->string('cueAnexo',9)->unique();
            $table->string('region',3);
            $table->string('nivel',30);
            $table->string('localidad',100);
            $table->string('departamento',100);
            // $table->string('domicilio',100)->nullable();
            $table->string('calle',100);
            $table->string('numero',10)->nullable(true);
            $table->string('barrio',100);
            $table->string('cp',100)->nullable(true);
            $table->string('telefono')->nullable(true);
            $table->string('email')->nullable(true);
            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->integer('idUsuarioAlta')->default(null)->nullable(true);
            $table->integer('idUsuarioModificacion')->default(null)->nullable(true);
            $table->timestamps();
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
        Schema::dropIfExists('OrganizacionRUCE');
        Schema::table('OrganizacionRUCE', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
