<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FondosCooperar extends Model
{
    use HasFactory;

    protected $table = 'lib_fondos_cooperar';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_cooperadora',
        'fondos_recibidos',
        'fondos_rendidos',
        'fecha_rendicion',
        'anio_otorgado'
    ];
    public $timestamps = false;
}
