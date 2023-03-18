<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoridadesCooperadora extends Model
{
    use HasFactory;
    protected $table = 'lib_autoridades_cooperadora';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_persona',
        'fk_cooperadora',
        'cargo',
        'inicio_cargo',
        'fin_cargo',
        'tipo_comision',
    ];
    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
    }

    //public $timestamps = false;
}
