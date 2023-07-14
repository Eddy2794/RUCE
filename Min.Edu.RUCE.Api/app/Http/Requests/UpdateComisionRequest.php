<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateComisionRequest extends FormRequest
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
            'fkRefTipoComision' => [
                'required',
                'exists:RefTipoComision,idTipoComision'
            ],
            'periodoInicio' => [
                'required',
                'dateTime'
            ],
            'periodoFin' => [
                'required',
                'dateTime'
            ],
            'nroSocios' => [
                'required',
                'integer'
            ],
            'estadoResolucion' => [
                'required',
                'boolean'
            ],
            'estaActivo' => [
                'required',
                'boolean'
            ],
            'idUsuarioModificacion' => [
                'required',
                'integer'
            ]
        ];
    }

    public function messages()
    {
        return [
            'fkCooperadora.exist' => 'Id de Cooperadora no existe en la tabla Cooperdora.',
            'fkRefTipoComision.exist' => 'Id de TipoComision no existe en la tabla RefTipoComision.'
        ];
    }
}