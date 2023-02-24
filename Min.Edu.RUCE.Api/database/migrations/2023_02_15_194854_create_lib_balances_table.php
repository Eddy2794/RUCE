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
        Schema::create('lib_balances', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('estado_balances')->default(false);
            //Investigar para que cargue la fecha actual automaticamente
            $table->dateTime('fecha')->default(new \Carbon\Carbon().now()->format('Y-m-d'));
            
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
