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
        Schema::create('RefTipoDocumentoRUCE', function (Blueprint $table) {
            $table->increments('idRefTipoDocumentoRUCE');
            $table->string('tipoDocumentoDesc');
            $table->timestamps();
        });
        
        Schema::table('RefTipoDocumentoRUCE', function (Blueprint $table) {
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
        Schema::dropIfExists('RefTipoDocumentoRUCE');
        Schema::table('RefTipoDocumentoRUCE', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
