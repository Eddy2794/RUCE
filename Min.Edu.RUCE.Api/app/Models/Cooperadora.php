<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cooperadora extends Model
{
    use HasFactory;
    protected $table = 'Cooperadora';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_kiosco',
        'idOrganizacionRUCE',
        'denominacion',
        'estado',
        'convenioScEconomicas',
        'inscripcion_afip',
        'inscripcion_rentas',
        'inscripcion_renacopes',
        'legajo',
        'decreto',
        'fecha_creacion',
        'estaActivo'
    ];

    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('d-m-Y H:i:s'));
    }

    //public $timestamps = false;
}
