<?php

namespace App\Models;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoAsociacion extends Model
{
    use HasFactory;
    protected $table = 'RefTipoAsociacion';
    protected $primary_key = 'id';
    protected $fillable = [
        'descripcion',
        'estaActivo'
    ];

    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('d-m-Y H:i:s'));
    }

    //public $timestamps = false;
}
