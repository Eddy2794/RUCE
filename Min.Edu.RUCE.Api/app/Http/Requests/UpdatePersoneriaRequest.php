<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePersoneriaRequest extends FormRequest
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
                'required',
                'exists:Expediente,id'
            ],
            'fkCooperadora' => [
                'required',
                'exists:Cooperadora,id'
            ],
            'decreto' => [
                'required',
                'string',
            ],
            'nroResolucion' => [
                'required',
                'string',
            ],
            'fecha' => [
                'required',
                'date',
            ],
            'idUsuarioModificacion' => [
                'required',
                'integer',
            ],
        ];
    }

    public function messages()
    {
        return [
            'fkExpediente.exist' => 'Id de Expediente no existe en la tabla Expediente.',
            'fkCooperadora.exist' => 'Id de Cooperadora no existe en la tabla Cooperadora.',
        ];
    }
}