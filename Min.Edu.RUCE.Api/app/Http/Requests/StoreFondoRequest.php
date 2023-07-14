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
            'fkTipoFondo' => [
                'required',
                'exists:TipoFondo,id'
            ],
            'fkCooperadora' => [
                'required',
                'exists:Cooperadora,id'
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
                'required',
                'date',
            ],
            'fechaRendicion' => [
                'required',
                'date',
            ],
            'anioOtorgado' => [
                'required',
                'date',
            ],
            'idUsuarioAlta' => [
                'required',
                'integer',
            ],
        ];
    }

    public function messages()
    {
        return [
            'fkCooperadora.exist' => 'Id de Cooperadora no existe en la tabla Cooperadora.',
            'fkTipoFondo.exist' => 'Id de Tipo de Fondo no existe en la tabla TipoFondo.',
        ];
    }
}
