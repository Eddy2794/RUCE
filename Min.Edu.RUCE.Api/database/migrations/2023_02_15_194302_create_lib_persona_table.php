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
            $table->integer('cuil');
            $table->string('email');

            // clave primaria compuesta
            $table->primary(['cuil','email']);
            
            $table->string('nombre',30);
            $table->string('apellido',30);
            
            $table->integer('telefono');

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
        Schema::dropIfExists('lib_persona');
    }
};
