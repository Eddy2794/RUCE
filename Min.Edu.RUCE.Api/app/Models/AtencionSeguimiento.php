<?php

namespace App\Models;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AtencionSeguimiento extends Model
{
    use HasFactory;
    protected $table = 'AtencionSeguimiento';
    protected $primary_key = 'idAtencionSeguimiento';
    protected $fillable = [
        'fkIdCooperadora',
        'fkIdPersonaRUCE',
        'llamadas',
        'mesajes',
        'emailEnviados',
        'atencionOficina',
        'atencionTerritorial',
        'observacion',
        'fecha',
        'estaActivo',
        'fechaEliminacion',
        'idUsuarioAlta',
        'idUsuarioModificacion'
    ];

    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('d-m-Y H:i:s'));
    }

    //public $timestamps = false;
}
