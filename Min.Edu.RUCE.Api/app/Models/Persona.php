<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    use HasFactory;
    

    protected $table = 'lib_persona';
    protected $primary_key = 'id';
    protected $fillable = [
        'cuil',
        'nombre',
        'apellido',
        'telefono',
        'email',
    ];
    public $timestamps = false;
}
