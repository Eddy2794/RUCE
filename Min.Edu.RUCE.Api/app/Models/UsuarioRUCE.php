<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuarioRUCE extends Model
{
    use HasFactory;
    protected $table = 'UsuarioRuce';
    protected $primary_key = 'idusuarioRuce';
    protected $fillable = [
        'fkIdPersonaRUCE',
        'password',
        'username',
        'estaActivo',
        'fechaEliminacion',
        'idUsuarioAlta',
        'idUsuarioModificacion',
        'administrador',
    ];

    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('d-m-Y H:i:s'));
    }

    //public $timestamps = false;
}
