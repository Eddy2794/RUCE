<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Balances extends Model
{
    use HasFactory;
    protected $table = 'lib_balances';
    protected $primary_key = 'id';
    protected $fillable = [
        'fk_personeria_juridica',
        'estado_balances',
        'fecha',
    ];
}
