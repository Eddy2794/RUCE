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
        Schema::create('lib_establecimiento_educativo', function (Blueprint $table) {
            $table->increments('id');
            $table->biginteger('cue');
            $table->unique('cue');
            $table->string('region',3);
            $table->string('nivel',20);
            $table->string('localidad',100);
            $table->string('departamento',100);
            $table->string('email',100);
            $table->string('domicilio',100);

            $table->biginteger('telefono');
            $table->integer('matricula');
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
        Schema::dropIfExists('lib_establecimiento_educativo');
    }
};
