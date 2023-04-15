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
        Schema::create('lib_usuario', function (Blueprint $table) {
            $table->increments('id');

            $table->string('password');
            $table->string('username');
            $table->boolean('administrador')->default(false);

            $table->unsignedInteger('fk_persona');
            $table->foreign('fk_persona')->references('id')->on('lib_persona')->onDelete('cascade');

            $table->boolean('estadoActivo')->default(true);
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
        Schema::dropIfExists('lib_usuario');
    }
};
