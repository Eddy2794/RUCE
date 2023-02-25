<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Carbon\Carbon;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lib_balances', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('estado_balances')->default(false);
            //Investigar para que cargue la fecha actual automaticamente
            $table->dateTime('fecha')->default(Carbon::createFromFormat('Y-m-d H:i:s',Carbon::now())
                                     ->format('d-m-Y'));

            $table->unsignedInteger('fk_personeria_juridica');
            $table->foreign('fk_personeria_juridica')->references('id')->on('lib_personeria_juridica')->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lib_balances');
    }
};
