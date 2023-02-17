<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersoneriaJuridica extends Model
{
    use HasFactory;
    protected $table = 'lib_personeria_juridica';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_asociacion_civil',
        'estado_comision_directiva',
        'estado_resolucion'
    ];
    public $timestamps = false;
}
