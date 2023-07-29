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

    public function AtencionSeguimiento(): HasMany
    {
        return $this->hasMany(AtencionSeguimiento::class);
    }

    public function UsuarioRUCE(): HasOne
    {
        return $this->hasOne(autoridadOrganizacionRUCE::class);
    }

    public function AutoridadComision(): HasMany
    {
        return $this->hasMany(AutoridadComision::class);
    }

    public function AutoridadOrganizacionRUCE(): HasMany
    {
        return $this->hasMany(AutoridadOrganizacionRUCE::class);
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
