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
        Schema::create('lib_cooperadora', function (Blueprint $table) {
            $table->increments('id');

            $table->string('denominacion',100);
            $table->string('estado',30);
            $table->string('legajo',30);
            $table->string('decreto',30);
            
            $table->boolean('convenio_sc_economicas');
            $table->boolean('inscripcion_afip');
            $table->boolean('inscripcion_rentas');
            $table->boolean('inscripcion_renacopes');
            
            $table->date('fecha_creacion');
            
            $table->unsignedInteger('fk_tipo_asociacion');
            $table->foreign('fk_tipo_asociacion')->references('id')->on('lib_tipo_asociacion')->onDelete('cascade');

            $table->unsignedInteger('fk_kiosco');
            $table->foreign('fk_kiosco')->references('id')->on('lib_kiosco')->onDelete('cascade');

            $table->unsignedInteger('fk_establecimiento_educativo');
            $table->foreign('fk_establecimiento_educativo')->references('id')->on('lib_establecimiento_educativo')->onDelete('cascade');

            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lib_cooperadora');
    }
};
