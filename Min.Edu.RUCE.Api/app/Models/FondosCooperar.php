<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FondosCooperar extends Model
{
    use HasFactory;

    protected $table = 'Fondo';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_cooperadora',
        'fondos_recibidos',
        'fondos_rendidos',
        'fecha_rendicion',
        'anio_otorgado',
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
