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
        Schema::create('RefTipoFondo', function (Blueprint $table) {
            $table->increments('id');
            $table->string('tipoFondoDesc',200);
            $table->timestamps();
        });
        
        Schema::table('RefTipoFondo', function (Blueprint $table) {
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
        Schema::dropIfExists('RefTipoFondo');
        Schema::table('RefTipoFondo', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
