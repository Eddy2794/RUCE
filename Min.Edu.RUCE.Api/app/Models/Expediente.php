<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expediente extends Model
{
    use HasFactory;
    protected $table = 'lib_expediente';
    protected $primary_key = 'id';
    protected $fillable = [
        'nro_expediente',
        'observaciones',
        'observaciones_respondidas',
        'instrumento_publico',
        'fiscalia_estado',
        'nro_resolucion',
        'fecha'
    ];
    //public $timestamps = false;
}
