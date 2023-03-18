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
    ];
    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
    }

    //public $timestamps = false;
}
