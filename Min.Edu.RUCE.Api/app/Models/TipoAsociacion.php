<?php

namespace App\Models;
use Carbon\Carbon;

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
    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
    }

    //public $timestamps = false;
}
