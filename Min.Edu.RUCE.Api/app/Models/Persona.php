<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    use HasFactory;
    

    protected $table = 'lib_persona';
    protected $primary_key = 'cuil';
    protected $fillable = [
        'nombre',
        'apellido',
        'telefono',
        'email',
        'fecha_creacion',
        'fecha_actualizacion'
    ];
}
