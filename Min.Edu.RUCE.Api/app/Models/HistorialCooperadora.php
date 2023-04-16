<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialCooperadora extends Model
{
    use HasFactory;
    protected $table = 'lib_historial_cooperadora';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_cooperadora',
        'fk_tipo_asociacion',
        'fk_expediente',
        'fecha',
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
