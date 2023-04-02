<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expediente extends Model
{
    use HasFactory;
    protected $table = 'lib_expediente';
    protected $primary_key = 'id';
    protected $fillable = [
        'nro_expediente',
        'observaciones',
        'observaciones_respondidas',
        'instrumento_publico',
        'fiscalia_estado',
        'nro_resolucion',
        'decreto',
    ];

    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('Y-m-d H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('Y-m-d H:i:s'));
    }

    //public $timestamps = false;
}
