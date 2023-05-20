<?php

namespace App\Models;
use Carbon\Carbon;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RefInstanciaInstrumento extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'RefInstanciaInstrumento';
    protected $primary_key = 'idRefInstanciaInstrumento';
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'instrumentoDesc'
    ];

    public function fromDateTime($value){
        return Carbon::parse(parent::fromDateTime($value))->format('d-m-Y H:i:s');
    }
    
    public function toDateTime($value){
        return parent::toDateTime(Carbon::createFromFormat('d/m/Y H:i:s', $value)->format('d-m-Y H:i:s'));
    }
}
