<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBalanceRequest extends FormRequest
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
            'fkIdCooperadora' => [
                'required',
                'exists:Cooperadora,idCooperadora'
            ],
            'estadoBalance' => [
                'required',
                'boolean'
            ],
            'estaActivo' => [
                'required',
                'boolean'
            ],
            'fechaEliminacion' => [
                'required',
                'dateTime'
            ],
            'idUsuarioAlta' => [
                'required',
                'integer'
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
            'fkIdCooperadora.exist' => 'Id de Cooperadora no existe en la tabla Cooperdora.',
        ];
    }
}
