<?php

use Carbon\Carbon;
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
        Schema::create('Personeria', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('fkExpediente')->nullable();
            $table->foreign('fkExpediente')->references('id')->on('Expediente')->onDelete('cascade'); 

            $table->unsignedInteger('fkCooperadora')->unique();
            $table->foreign('fkCooperadora')->references('id')->on('Cooperadora');

            $table->string('decreto')->nullable();
            $table->string('nroResolucion')->nullable();
            $table->date('fecha');

            $table->boolean('estaActivo')->default(true)->nullable(false);
            
            $table->integer('idUsuarioAlta')->nullable(true);
            $table->integer('idUsuarioModificacion')->nullable(true);
            $table->timestamps();
        });
        DB::statement('CREATE UNIQUE INDEX personeria_fkExpediente_unique ON Personeria (fkExpediente) WHERE fkExpediente IS NOT NULL;');
        
        Schema::table('Personeria', function (Blueprint $table) {
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
        Schema::dropIfExists('Personeria');
        Schema::table('Personeria', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
