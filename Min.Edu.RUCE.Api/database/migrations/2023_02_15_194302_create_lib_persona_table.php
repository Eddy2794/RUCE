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
        Schema::create('lib_persona', function (Blueprint $table) {
            $table->increments('id');
            $table->bigInteger('cuil')->unique();
            $table->string('email');
            $table->unique('email');
            $table->string('nombre',30);
            $table->string('apellido',30);            
            $table->bigInteger('telefono');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lib_persona');
    }
};
