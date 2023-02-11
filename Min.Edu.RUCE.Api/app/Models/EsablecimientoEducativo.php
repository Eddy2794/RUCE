<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstablecimientoEducativo extends Model
{
    use HasFactory;
    protected $table = 'lib_establecimiento_educativo';
    protected $primary_key = 'cue';
    protected $fillable = [
        'region',
        'nivel',
        'localidad',
        'departamento',
        'telefono',
        'email',
        'matricula',
        'domicilio',
        'fecha_creacion',
        'fecha_actualizacion'
    ];
}
