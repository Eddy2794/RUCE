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
            $table->string('cargo',30);

            $table->unsignedInteger('fk_persona');
            $table->foreign('fk_persona')->references('idPersonaRUCE')->on('PersonaRuce')->onDelete('cascade');

            $table->unsignedInteger('idOrganizacionRUCE');
            $table->foreign('idOrganizacionRUCE')->references('idOrganizacionRUCE')->on('OrganizacionRUCE')->onDelete('cascade');
            $table->boolean('estaActivo')->default(true)->nullable(false);
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
        Schema::dropIfExists('AutoridadOrganizacionRUCE');
    }
};
