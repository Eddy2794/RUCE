<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeguimientoAtencion extends Model
{
    use HasFactory;
    protected $table = 'lib_seguimiento_atencion';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_cooperadora',
        'llamadas',
        'mesajes',
        'email_enviados',
        'atencion_oficina',
        'atencion_territorial',
        'fecha',
    ];
}
