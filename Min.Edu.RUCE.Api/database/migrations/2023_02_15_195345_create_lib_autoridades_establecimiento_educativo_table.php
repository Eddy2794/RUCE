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
        Schema::create('lib_autoridades_establecimiento_educativo', function (Blueprint $table) {
            $table->increments('id');
            $table->string('cargo',30);

            $table->unsignedInteger('fk_persona');
            $table->foreign('fk_persona')->references('id')->on('lib_persona')->onDelete('cascade');

            $table->unsignedInteger('fk_establecimiento_educativo');
            $table->foreign('fk_establecimiento_educativo')->references('id')->on('lib_establecimiento_educativo')->onDelete('cascade');

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
        Schema::dropIfExists('lib_autoridades_establecimiento_educativo');
    }
};
