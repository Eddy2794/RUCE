<?php

namespace App\Models;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Personeria extends Model  implements Auditable
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'Personeria';
    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'fkExpediente',
        'fkCooperadora',
        'decreto',
        'nroResolucion',
        'fecha',
        'estaActivo',
        'idUsuarioAlta',
        'idUsuarioModificacion'
    ];

    public function Cooperadora()
    {
        return $this->belongsTo(Cooperadora::class, 'id', 'fkCooperadora');
    }

    public function Expediente()
    {
        return $this->belongsTo(Expediente::class, 'id', 'fkExpediente');
    }


    /*
public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('d-m-Y H:i:s'));
    }
*/

    //public $timestamps = false;
}
