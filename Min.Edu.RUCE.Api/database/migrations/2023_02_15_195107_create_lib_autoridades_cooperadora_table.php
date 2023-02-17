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
        Schema::create('lib_autoridades_cooperadora', function (Blueprint $table) {
            $table->increments('id');
            $table->string('cargo',30);
            $table->date('inicio_cargo');
            $table->date('fin_cargo')->nullable(true);
            $table->string('tipo_comision',30);

            //$table->unsignedInteger('fk_persona');
            //$table->foreign('fk_persona')->references('cuil')->on('lib_persona')->onDelete('cascade');
            $table->string('fk_email');
            $table->unsignedInteger('fk_cuil');
            $table->foreign(['fk_cuil','fk_email'])->references(['cuil','email'])->on('lib_persona')->onDelete('cascade');

            $table->unsignedInteger('fk_cooperadora');
            $table->foreign('fk_cooperadora')->references('id')->on('lib_cooperadora')->onDelete('cascade');

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
        Schema::dropIfExists('lib_autoridades_cooperadora');
    }
};
