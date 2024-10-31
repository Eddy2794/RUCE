<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePersoneriaRequest extends FormRequest
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
            'fkExpediente' => [
                'nullable',
                'exists:Expediente,id'
            ],
            'fkCooperadora' => [
                'required',
                'exists:Cooperadora,id'
            ],
            'decreto' => [
                'nullable',
                'string',
            ],
            'nroResolucion' => [
                'nullable',
                'string',
            ],
            'fecha' => [
                'required',
                'date',
            ],
            'estaActivo' => [
                'required',
                'boolean'
            ],
            'idUsuarioAlta' => [
                'nullable',
                'integer',
            ],
            'idUsuarioModificacion' => [
                'nullable',
                'integer',
            ],
        ];
    }

    public function messages()
    {
        return [
            'fkExpediente.exist' => 'Id de Expediente no existe en la tabla Expediente.',
            'fkCooperadora.exist' => 'Id de Cooperadora no existe en la tabla Cooperadora.',
            'fkExpediente.required' => 'No existe un Expediente cargado',
        ];
    }
}
