<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personeria extends Model
{
    use HasFactory;
    protected $table = 'lib_personeria';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_expediente',
        'estado_comision_directiva',
        'estado_resolucion',
        'estado_balance',
        'fecha'
    ];
    //public $timestamps = false;
}
