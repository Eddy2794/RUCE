<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kiosco extends Model
{
    use HasFactory;
    protected $table = 'lib_kiosco';
    protected $primary_key = 'id';
    protected $fillable = [
        'responsable',
        'acceso_licitacion',
        'documentacion_presentada',
        'periodo_inicio',
        'periodo_fin'
    ];
    public $timestamps = false;
}
