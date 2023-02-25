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
        Schema::create('lib_con_expediente', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nro_expediente',100)->nullable();
            $table->boolean('observaciones')->default(false);
            $table->boolean('observaciones_respondidas')->default(false);
            $table->boolean('instrumento_publico')->default(false);
            $table->boolean('fiscalia_estado')->default(false);
            //Investigar para que cargue la fecha actual automaticamente
            $table->dateTime('fecha')->default(Carbon::createFromFormat('Y-m-d H:i:s',Carbon::now())
                                     ->format('d-m-Y'));

            $table->unsignedInteger('fk_asociacion_civil');
            $table->foreign('fk_asociacion_civil')
                  ->references('id')
                  ->on('lib_asociacion_civil')
                  ->onDelete('cascade'); 

            // $table->timestamp('created')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lib_con_expediente');
    }
};
