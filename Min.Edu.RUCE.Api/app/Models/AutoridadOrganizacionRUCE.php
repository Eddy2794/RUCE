<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoridadOrganizacionRUCE extends Model
{
    use HasFactory;
    protected $table = 'AutoridadOrganizacionRUCE';
    protected $primary_key = 'idAutoridadOrganizacionRUCE';
    protected $fillable = [
        'fkIdPersonaRUCE',
        'fkIdRefCargo',
        'inicioCargo',
        'finCargo',
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
