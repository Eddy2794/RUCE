<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConExpediente extends Model
{
    use HasFactory;
    protected $table = 'lib_con_expediente';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_asociacion_civil',
        'nro_expediente',
        'observaciones',
        'observaciones_respondidas',
        'instrumento_publico',
        'fiscalia_estado',
        'fecha'
    ];
    public $timestamps = false;
}
