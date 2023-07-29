<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class AutoridadOrganizacionRUCE extends Model  implements Auditable
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

    public function RefCargo(): HasMany
    {
        return $this->hasMany(RefCargo::class, 'id', 'fkRefCargo');
    }

    public function PersonaRuce()
    {
        return $this->belongsTo(PersonaRUCE::class, 'id', 'fkPersonaRUCE');
    }

    public function OrganizacionRuce()
    {
        return $this->belongsTo(OrganizacionRUCE::class, 'id', 'fkOrganizacionRUCE');
    }

    
    // public function fromDateTime($value){
    //     return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    // }
    
    // public function toDateTime($value){
    //     return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('d-m-Y H:i:s'));
    // }

    //public $timestamps = false;
}
