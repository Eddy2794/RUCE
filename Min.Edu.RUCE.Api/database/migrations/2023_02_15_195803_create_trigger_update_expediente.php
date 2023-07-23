<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
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
        DB::unprepared('
            CREATE TRIGGER update_expediente AFTER UPDATE ON Expediente
            FOR EACH ROW
            BEGIN
                INSERT INTO MovimientoExpediente 
                (fkExpediente, nroExpediente, cantObservacionnes, observacionesDesc, observacionesRespondidas, fkRefInstanciaInstrumento, estaActivo, idUsuarioAlta, idUsuarioModificacion)
                VALUES (OLD.id, OLD.nroExpediente, OLD.cantObservaciones, OLD.observacionesDesc, OLD.observacionesRespondidas, OLD.fkRefInstanciaInstrumento, OLD.estaActivo, OLD.idUsuarioAlta, OLD.idUsuarioModificacion);
            END;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('DROP TRIGGER IF EXISTS update_expediente');
    }
};
