<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Contracts\Auditable;
use Spatie\Permission\Traits\HasRoles;
// use Laravel\Sanctum\HasApiTokens;

class UsuarioRUCE  extends Authenticatable implements Auditable
{
    use \OwenIt\Auditing\Auditable;
    use HasApiTokens;
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
  
    // /**
    //  * The attributes that should be hidden for arrays.
    //  *
    //  * @var array
    //  */
    // protected $hidden = [
    //     'password',
    //     'remember_token',
    // ];
  
    // /**
    //  * The attributes that should be cast to native types.
    //  *
    //  * @var array
    //  */
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    // ];


    public function PersonaRuce()
    {
        return $this->hasOne(PersonaRUCE::class, 'id', 'fkPersonaRUCE');
    }
}
