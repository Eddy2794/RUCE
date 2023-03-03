<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cooperadora extends Model
{
    use HasFactory;
    protected $table = 'lib_cooperadora';
    protected $primary_key = 'id';
    protected $fillable = [
        'denominacion',
        'fk_tipo_asociacion',
        'fk_kiosco',
        'fk_establecimiento_educativo',
        'estado',
        'convenio_sc_economicas',
        'inscripcion_afip',
        'inscripcion_rentas',
        'inscripcion_renacopes',
        'legajo',
        'decreto',
        'fecha_creacion',
    ];
    //public $timestamps = false;
}
