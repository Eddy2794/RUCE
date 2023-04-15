<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoridadesEstablecimientoEducativo extends Model
{
    use HasFactory;
    protected $table = 'lib_autoridades_establecimiento_educativo';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_persona',
        'fk_establecimiento_educativo',
        'cargo',
        'estadoActivo'
    ];

    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('d-m-Y H:i:s'));
    }

    //public $timestamps = false;
}
