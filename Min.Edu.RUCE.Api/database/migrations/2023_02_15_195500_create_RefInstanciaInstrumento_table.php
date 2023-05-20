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
        Schema::create('RefInstanciaInstrumento', function (Blueprint $table) {
            $table->increments('idRefInstanciaInstrumento');
            $table->string('InstrumentoDesc');
            $table->timestamps();
        });
        
        Schema::table('RefInstanciaInstrumento', function (Blueprint $table) {
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('RefInstanciaInstrumento');
        Schema::table('RefInstanciaInstrumento', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
