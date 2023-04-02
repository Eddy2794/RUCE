<?php

namespace App\Models;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeguimientoAtencion extends Model
{
    use HasFactory;
    protected $table = 'lib_seguimiento_atencion';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_cooperadora',
        'llamadas',
        'mesajes',
        'email_enviados',
        'atencion_oficina',
        'atencion_territorial',
        'fecha',
    ];

    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('Y-m-d H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('Y-m-d H:i:s'));
    }

    //public $timestamps = false;
}
