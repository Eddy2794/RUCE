<?php

namespace App\Models;

use ArrayObject;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class AutoridadOrganizacionRUCE extends Model  implements Auditable
{
    use \OwenIt\Auditing\Auditable;
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

    /**
     * Attributes to include in the Audit.
     *
     * @var array
     */
    protected $auditInclude = [];

    /**
     * Attributes to exclude from the Audit.
     *
     * @var array
     */
    protected $auditExclude = [];

    public function RefCargo()
    {
        return $this->hasMany(RefCargo::class, 'id', 'fkRefCargo');
    }

    public function PersonaRUCE()
    {
        $persona = $this->hasMany(PersonaRUCE::class, 'id', 'fkPersonaRUCE');
        // dd($persona->getParent()->toArray());
        // dd($persona->getModels()[0]->getAttributes());
        return $persona;
        // return $persona->getModels()[0]->getAttributes();
    }

    public function OrganizacionRUCE()
    {
        return $this->belongsTo(OrganizacionRUCE::class, 'fkOrganizacionRUCE', 'id');
    }

    
    // public function fromDateTime($value){
    //     return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    // }
    
    // public function toDateTime($value){
    //     return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('d-m-Y H:i:s'));
    // }

    //public $timestamps = false;
}
