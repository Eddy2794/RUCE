<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoAsociacion extends Model
{
    use HasFactory;
    protected $table = 'lib_tipo_asociacion';
    protected $primary_key = 'id';
    protected $fillable = [
        'descripcion',
    ];
}
