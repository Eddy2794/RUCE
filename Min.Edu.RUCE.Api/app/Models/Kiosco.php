<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kiosco extends Model
{
    use HasFactory;
    protected $table = 'lib_kiosco';
    protected $primary_key = 'id';
    protected $fillable = [
        'responsable',
        'acceso_licitacion',
        'documentacion_presentada',
        'periodo_inicio',
        'periodo_fin'
    ];
    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
    }

    //public $timestamps = false;
}
