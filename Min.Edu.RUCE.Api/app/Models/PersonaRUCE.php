<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class PersonaRUCE extends Model  implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory;
    use SoftDeletes;
    

    protected $table = 'PersonaRUCE';
    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'fkRefTipoDocumentoRUCE',
        'documento',
        'cuil',
        'nombre',
        'apellido',
        'telefono',
        'email',
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

    public function AtencionSeguimiento()
    {
        return $this->belongsTo(AtencionSeguimiento::class,'fkPersonaRUCE', 'id');
    }

    public function UsuarioRUCE()
    {
        $usuario = $this->belongsTo(autoridadOrganizacionRUCE::class, 'fkPersonaRUCE', 'id');
        return $usuario;
    }

    public function AutoridadComision()
    {
        return $this->belongsTo(AutoridadComision::class, 'fkPersonaRUCE', 'id');
    }

    public function AutoridadOrganizacionRUCE()
    {
        return $this->belongsTo(AutoridadOrganizacionRUCE::class, 'fkAutoridadOrganizacionRUCE' ,'id');
    }

    public function RefTipoDocumentoRUCE()
    {
        return $this->hasMany(RefTipoDocumentoRUCE::class);
    }
    /*
public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('d-m-Y H:i:s'));
    }
*/

    // public function autoridadOrganizacionRUCE()
    // {
    //     return $this->hasMany(autoridadOrganizacionRUCE::class);
    // }

    //public $timestamps = false;
}
