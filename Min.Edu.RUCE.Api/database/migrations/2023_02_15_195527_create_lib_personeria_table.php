<?php

use Carbon\Carbon;
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
        Schema::create('lib_personeria', function (Blueprint $table) {
            $table->increments('id');

            $table->boolean('estado_comision_directiva')->default(false);
            $table->boolean('estado_resolucion')->default(false);
            $table->boolean('estado_balance')->default(false);
            $table->dateTime('fecha')->default(Carbon::createFromFormat('Y-m-d H:i:s',Carbon::now())
            ->format('d-m-Y'));

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
        Schema::dropIfExists('lib_personeria');
    }
};
