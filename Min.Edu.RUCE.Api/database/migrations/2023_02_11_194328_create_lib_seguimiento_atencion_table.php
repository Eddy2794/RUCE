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
        Schema::create('lib_seguimiento_atencion', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('llamadas');
            $table->integer('mensajes');
            $table->integer('email_enviados');
            $table->integer('atencion_oficina');
            $table->integer('atencion_territorial');
            
            $table->date('fecha');

            $table->unsignedInteger('fk_cooperadora');
            $table->foreign('fk_cooperadora')->references('id')->on('lib_cooperadora')->onDelete('cascade');

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
        Schema::dropIfExists('lib_seguimiento_atencion');
    }
};
