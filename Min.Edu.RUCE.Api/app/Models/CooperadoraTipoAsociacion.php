<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CooperadoraTipoAsociacion extends Model
{
    use HasFactory;
    protected $table = 'lib_cooperadora_tipo_asociacion';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_cooperadora',
        'fk_tipo_asociacion',
        'fecha',
    ];
}
