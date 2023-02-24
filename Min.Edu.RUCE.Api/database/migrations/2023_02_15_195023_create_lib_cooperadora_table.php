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
            $table->string('legajo',30)->nullable();
            $table->string('decreto',30)->nullable();

            $table->boolean('convenio_sc_economicas')->default(false);
            $table->boolean('inscripcion_afip')->default(false);
            $table->boolean('inscripcion_rentas')->default(false);
            $table->boolean('inscripcion_renacopes')->default(false);

            $table->date('fecha_creacion')->nullable();

            $table->unsignedInteger('fk_tipo_asociacion');
            $table->foreign('fk_tipo_asociacion')
                  ->references('id')
                  ->nullable()
                  ->on('lib_tipo_asociacion')
                  ->onDelete('cascade');

            $table->unsignedInteger('fk_kiosco');
            $table->foreign('fk_kiosco')
                  ->references('id')
                  ->nullable()
                  ->on('lib_kiosco')
                  ->onDelete('cascade');

            $table->unsignedInteger('fk_establecimiento_educativo');
            $table->foreign('fk_establecimiento_educativo')
                  ->references('id')
                  ->nullable()
                  ->on('lib_establecimiento_educativo')
                  ->onDelete('cascade');

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
