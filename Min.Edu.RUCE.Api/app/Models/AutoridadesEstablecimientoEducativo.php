<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoridadesEstablecimientoEducativo extends Model
{
    use HasFactory;
    protected $table = 'lib_autoridades_establecimiento_educativo';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_persona',
        'fk_establecimiento_educativo',
        'cargo',
    ];
}
