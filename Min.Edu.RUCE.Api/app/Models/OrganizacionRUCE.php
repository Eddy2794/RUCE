<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class OrganizacionRUCE extends Model  implements Auditable
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'OrganizacionRUCE';
    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'organizacionDesc',
        'cue',
        'anexo',
        'region',
        'nivel',
        'localidad',
        'departamento',
        'telefono',
        'email',
        'domicilio',
        'estaActivo',
        'idUsuarioAlta',
        'idUsuarioModificacion'
    ];

    public function AutoridadOrganizacionRUCE(): HasMany
    {
        return $this->hasMany(AutoridadOrganizacionRUCE::class);
    }

    public function Matricula(): HasMany
    {
        return $this->hasMany(Matricula::class);
    }

    public function Cooperadora(): HasOne
    {
        return $this->hasOne(Cooperadora::class);
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
