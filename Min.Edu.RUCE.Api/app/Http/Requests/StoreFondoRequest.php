<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFondoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'fkRefTipoFondo' => [
                'required',
                'exists:RefTipoFondo,id'
            ],
            'fkCooperadora' => [
                'required',
                'exists:Cooperadora,id'
            ],
            'inscripta' =>[
                'required',
                'boolean'
            ],
            'verificada' =>[
                'required',
                'boolean'
            ],
            'fondoRecibido' => [
                'required',
                'boolean',
            ],
            'fondoRendido' => [
                'required',
                'boolean',
            ],
            'monto' => [
                'required',
                'integer',
            ],
            'fechaRecibido' => [
                
                //'date',
            ],
            'fechaRendicion' => [
                
                //'date',
            ],
            'anioOtorgado' => [
                'required',
                'integer',
            ],
            'estaActivo' => [
                'required',
                'boolean'
            ],/*
            'idUsuarioAlta' => [
                'required',
                'integer',
            ],
            'idUsuarioModificacion' => [
                'required',
                'integer',
            ],*/
        ];
    }

    public function messages()
    {
        return [
            'fkCooperadora.exist' => 'Id de Cooperadora no existe en la tabla Cooperadora.',
            'fkRefTipoFondo.exist' => 'Id de Tipo de Fondo no existe en la tabla RefTipoFondo.',
        ];
    }
}
