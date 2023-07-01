<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PersonaRUCE extends Model
{
    use HasFactory;
    use SoftDeletes;
    

    protected $table = 'PersonaRuce';
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

    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('Y-m-d H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('Y-m-d H:i:s'));
    }

    // public function autoridadOrganizacionRUCE()
    // {
    //     return $this->hasMany(autoridadOrganizacionRUCE::class);
    // }

    //public $timestamps = false;
}
