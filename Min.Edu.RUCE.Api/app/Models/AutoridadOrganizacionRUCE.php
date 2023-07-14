<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AutoridadOrganizacionRUCE extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $table = 'AutoridadOrganizacionRUCE';
    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'fkRefCargo',
        'fkPersonaRUCE',
        'fkOrganizacionRUCE',
        'inicioCargo',
        'finCargo',
        'estaActivo',
        'idUsuarioAlta',
        'idUsuarioModificacion'
    ];

    public function refCargo()
    {
        return $this->belongsTo(RefCargo::class, 'fkRefCargo');
    }

    public function personaRuce()
    {
        return $this->belongsTo(PersonaRUCE::class, 'fkPersonaRUCE');
    }

    public function organizacionRuce()
    {
        return $this->belongsTo(OrganizacionRUCE::class, 'fkOrganizacionRUCE');
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
