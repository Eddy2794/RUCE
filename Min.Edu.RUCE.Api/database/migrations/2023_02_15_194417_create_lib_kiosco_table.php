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
        Schema::create('lib_kiosco', function (Blueprint $table) {
            $table->increments('id');
            
            $table->string('responsable',100);
            
            $table->boolean('acceso_licitacion');
            $table->boolean('documentacion_presentada');

            $table->date('periodo_inicio');
            $table->date('periodo_fin');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lib_kiosco');
    }
};
