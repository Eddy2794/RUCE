<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    protected $table = 'lib_usuario';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_persona',
        'password',
        'username',
        'administrador',
    ];
    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
    }

    //public $timestamps = false;
}
