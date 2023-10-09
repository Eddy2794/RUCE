<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateExpedienteRequest extends FormRequest
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
            'fkRefInstanciaInstrumento'=>[
                'required',
                'exists:RefInstanciaInstrumento,id'
            ],
            'nroExpediente' => [
                'required',
                'string',
                Rule::unique('Expediente', 'nroExpediente')->where(function ($query) {
                    // Excluye el registro actual por su ID
                    return $query->where('id', '<>', $this->id);
                })->withoutTrashed()
            ],
            'cantObservaciones' => [
                'nullable',
                'integer'
            ],
            'observacionesDesc' => [
                'nullable',
                'string'
            ],
            'observacionesRespondidas' => [
                'required',
                'boolean',
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
            'fkCooperadora.exist' => 'Id de Cooperadora no existe en la tabla Cooperadora.',
            'nroExpediente.unique' => 'El Nro de Expediente ya fue registrado.',
        ];
    }
}
