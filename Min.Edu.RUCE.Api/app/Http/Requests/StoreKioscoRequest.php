<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKioscoRequest extends FormRequest
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
            'fkCooperadora' => [
                'required',
                'exists:Cooperadora,id'
            ],
            'fkPersonaRUCE' => [
                // 'required',
                // 'exists:PersonaRUCE,id'
            ],
            'accesoLicitacion' => [
                'required',
                'boolean',
            ],
            'documentacionPresentada' => [
                'required',
                'boolean',
            ],
            'periodoInicio' => [
                'required',
                'date',
            ],
            'periodoFin' => [
                'required',
                'date',
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
            'fkPersonaRUCE.exist' => 'Id de Persona no existe en la tabla PersonaRUCE.',
        ];
    }
}
