<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Permission\Traits\HasRoles;

class UsuarioRUCE  extends Authenticatable implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasFactory, Notifiable;
    use HasRoles;
    use SoftDeletes;
    protected $table = 'UsuarioRUCE';
    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'fkPersonaRUCE',
        'password',
        'username',
        'estaActivo',
        'idUsuarioAlta',
        'idUsuarioModificacion'
    ];

    protected $guard_name = 'api';

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


    public function PersonaRuce()
    {
        return $this->hasOne(PersonaRUCE::class, 'id', 'fkPersonaRUCE');
    }
}
