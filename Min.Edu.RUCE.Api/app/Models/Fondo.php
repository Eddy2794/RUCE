<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Fondo extends Model  implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory;
    use SoftDeletes;

    protected $table = 'Fondo';
    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'fkTipoFondo',
        'fkCooperadora',
        'fondoRecibido',
        'fondoRendido',
        'monto',
        'fechaRecibido',
        'fechaRendicion',
        'anioOtorgado',
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
        'fondoRecibido' => 'boolean',
        'fondoRendido' => 'boolean',
    ];

    public function RefTipoFondo()
    {
        return $this->hasMany(RefTipoFondo::class, 'id', 'fkRefTipoFondo');
    }

    public function Cooperadora()
    {
        return $this->belongsTo(Cooperadora::class, 'fkCooperadora', 'id');
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
