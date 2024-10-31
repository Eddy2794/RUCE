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
        Schema::create('PersonaRUCE', function (Blueprint $table) {
            $table->increments('id');
            $table->string('cuil')->unique();
            $table->integer('documento')->unique();

            $table->unsignedInteger('fkRefTipoDocumentoRUCE');
            $table->foreign('fkRefTipoDocumentoRUCE')->references('id')->on('RefTipoDocumentoRUCE')->onDelete('cascade');

            $table->string('email')->nullable();
            $table->string('nombre',200);
            $table->string('apellido',200);
            $table->bigInteger('telefono')->unique();
            
            $table->dateTime('fechaEliminacion')->nullable(true);
            $table->boolean('estaActivo')->default(true)->nullable(false);
            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);
            $table->timestamps();
        });
        DB::statement('CREATE UNIQUE INDEX persona_email_unique ON PersonaRUCE (email) WHERE email IS NOT NULL;');
        
        Schema::table('PersonaRUCE', function (Blueprint $table) {
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
        Schema::dropIfExists('PersonaRUCE');
        Schema::table('PersonaRUCE', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
