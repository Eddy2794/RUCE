<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use \Carbon\Carbon;
return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lib_expediente', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nro_expediente',100)->nullable();
            $table->boolean('observaciones')->default(false);
            $table->boolean('observaciones_respondidas')->default(false);
            $table->boolean('instrumento_publico')->default(false);
            $table->boolean('fiscalia_estado')->default(false)->nullable();
            $table->string('nro_resolucion',50)->nullable();
            $table->string('decreto',50)->nullable();

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
        Schema::dropIfExists('lib_expediente');
    }
};
