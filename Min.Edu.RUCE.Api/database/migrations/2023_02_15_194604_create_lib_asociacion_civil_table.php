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
        Schema::create('lib_asociacion_civil', function (Blueprint $table) {
            $table->increments('id');
            $table->string('descripcion',100);

            $table->unsignedInteger('fk_tipo_asociacion');
            $table->foreign('fk_tipo_asociacion')->references('id')->on('lib_tipo_asociacion')->onDelete('cascade');
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
        Schema::dropIfExists('lib_asociacion_civil');
    }
};
