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
        Schema::create('lib_cooperadora_tipo_asociacion', function (Blueprint $table) {
            $table->increments('id');

            $table->unsignedInteger('fk_tipo_asociacion');
            $table->foreign('fk_tipo_asociacion')
                  ->references('id')
                  ->on('lib_tipo_asociacion')
                  ->onDelete('cascade');
            
            $table->unsignedInteger('fk_cooperadora');
            $table->foreign('fk_cooperadora')
                  ->references('id')
                  ->on('lib_cooperadora')
                  ->onDelete('cascade');
            
            $table->dateTime('fecha')->default(Carbon::createFromFormat('Y-m-d H:i:s',Carbon::now())
            ->format('d-m-Y'));

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
        Schema::dropIfExists('lib_cooperadora_tipo_asociacion');
    }
};