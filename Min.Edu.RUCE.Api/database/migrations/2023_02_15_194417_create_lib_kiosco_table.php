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
            
            $table->boolean('acceso_licitacion')->default(false);
            $table->boolean('documentacion_presentada')->default(false);

            $table->date('periodo_inicio')->nullable();
            $table->date('periodo_fin')->nullable();
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