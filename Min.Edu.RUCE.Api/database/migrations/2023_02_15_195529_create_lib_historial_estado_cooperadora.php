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
        Schema::create('lib_historial_estado_cooperadora', function (Blueprint $table) {
            $table->id();

            $table->unsignedInteger('fk_cooperadora_tipo_asociacion');
            $table->foreign('fk_cooperadora_tipo_asociacion')
                  ->references('id')
                  ->on('lib_cooperadora_tipo_asociacion')
                  ->onDelete('cascade'); 

            $table->unsignedInteger('fk_expediente');
            $table->foreign('fk_expediente')
                  ->references('id')
                  ->on('lib_expediente')
                  ->onDelete('cascade'); 

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
        Schema::dropIfExists('lib_historial_estado_cooperadora');
    }
};
