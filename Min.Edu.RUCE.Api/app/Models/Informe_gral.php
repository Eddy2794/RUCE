<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Contracts\Auditable;

class Informe_gral extends Model  implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;
    use SoftDeletes;

    protected $table = 'Informe_gral';
    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'fkCooperadora',
        'datos',
        'esReporte',
        'estaActivo',
        'idUsuarioAlta',
        'idUsuarioModificacion'
    ];

    protected $casts = [
        'datos' => 'array'
    ];


    public function Cooperadora()
    {
        return $this->belongsTo(Cooperadora::class, 'fkCooperadora', 'id');
    }
}
