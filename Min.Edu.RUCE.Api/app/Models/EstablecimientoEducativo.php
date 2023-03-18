<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstablecimientoEducativo extends Model
{
    use HasFactory;
    protected $table = 'lib_establecimiento_educativo';
    protected $primary_key = 'id';
    protected $fillable = [
        'cue',
        'region',
        'nivel',
        'localidad',
        'departamento',
        'telefono',
        'email',
        'matricula',
        'domicilio',
    ];
    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
    }

    //public $timestamps = false;
}
