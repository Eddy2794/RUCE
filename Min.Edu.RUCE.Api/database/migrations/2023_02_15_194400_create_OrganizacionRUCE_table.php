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
            $table->string('organizacionDesc')->default('');
            $table->string('cue');
            $table->unique('cue');
            $table->integer('anexo')->nullable();
            $table->string('region',3);
            $table->string('nivel',20);
            $table->string('localidad',100);
            $table->string('departamento',100);
            $table->string('domicilio',100);
            $table->string('telefono');
            $table->string('email',100);
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
