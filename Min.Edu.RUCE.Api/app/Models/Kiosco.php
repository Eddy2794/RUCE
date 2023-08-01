<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kiosco extends Model
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory;
    use SoftDeletes;
    protected $table = 'Kiosco';
    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'fkCooperadora',
        'fkPersonaRUCE',
        'accesoLicitacion',
        'documentacionPresentada',
        'periodoInicio',
        'periodoFin',
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
        'accesoLicitacion' => 'boolean',
        'documentacionPresentada' => 'boolean',
    ];

    public function Cooperadora()
    {
        return $this->belongsTo(Cooperadora::class, 'id', 'fkCooperadora');
    }

    public function PersonaRuce()
    {
        return $this->belongsTo(PersonaRUCE::class, 'id', 'fkPersonaRUCE');
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
