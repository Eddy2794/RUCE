<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SimpleAsociacion extends Model
{
    use HasFactory;
    protected $table = 'lib_simple_asociacion';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_tipo_asociacion',
        'descripcion',
    ];
    public $timestamps = false;
}
