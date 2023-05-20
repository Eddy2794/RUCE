<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AutoridadComision extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'AutoridadComision';
    protected $primary_key = 'idAutoridadComision';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'fkIdPersonaRUCE',
        'fkIdRefCargo',
        'fkIdComision',
        'inicioCargo',
        'finCargo',
        'estaActivo',
        'idUsuarioAlta',
        'idUsuarioModificacion'
    ];

    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('d-m-Y H:i:s'));
    }

    //public $timestamps = false;
}
