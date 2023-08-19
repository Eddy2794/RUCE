<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Cooperadora extends Model  implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory;
    use SoftDeletes;
    protected $table = 'Cooperadora';
    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'fkRefTipoAsociacion',
        'fkOrganizacionRUCE',
        'cuit',
        'legajo',
        'denominacion',
        'estado',
        'convenioCsEconomicas',
        'estadoAfip',
        'estadoRentas',
        'inscripcionRenacopes',
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

    protected $casts = [
        'convenioCsEconomicas' => 'boolean',
        'estadoAfip' => 'boolean',
        'estadoRentas' => 'boolean',
        'inscripcionRenacopes' => 'boolean',
        'estaActivo' => 'boolean',
    ];

    public function OrganizacionRUCE()
    {
        return $this->belongsTo(OrganizacionRUCE::class, 'id');
    }
    
    public function RefTipoAsociacion()
    {
        return $this->hasMany(RefTipoAsociacion::class, 'id', 'fkRefTipoAsociacion');
    }

    public function AtencionSeguimiento()
    {
        return $this->hasMany(AtencionSeguimiento::class, 'fkCooperadora');
    }

    public function Comision()
    {
        return $this->hasMany(Comision::class, 'fkCooperadora');
    }

    public function Balance()
    {
        return $this->hasMany(Balance::class, 'fkCooperadora');
    }

    public function Expediente()
    {
        return $this->hasOne(Expediente::class, 'fkCooperadora');
    }

    public function Fondo()
    {
        return $this->hasMany(Fondo::class, 'fkCooperadora');
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
