<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsociacionCivil extends Model
{
    use HasFactory;
    protected $table = 'lib_asociacion_civil';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_tipo_asociacion',
        'descripcion',
    ];
}
