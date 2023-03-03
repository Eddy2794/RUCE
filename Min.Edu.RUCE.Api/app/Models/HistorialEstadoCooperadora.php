<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialEstadoCooperadora extends Model
{
    use HasFactory;
    protected $table = 'lib_historial_estado_cooperadora';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_cooperadora_tipo_asociacion',
        'fk_expediente',
    ];
}
