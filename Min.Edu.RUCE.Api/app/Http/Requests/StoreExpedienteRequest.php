<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreExpedienteRequest extends FormRequest
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
                Rule::unique('Expediente','nroExpediente')->where('id',$this->id)->withoutTrashed()
            ],
            'cantObservaciones' => [
                'required',
                'integer'
            ],
            'observacionesDesc' => [
                'required',
                'string'
            ],
            'observacionesRespondidas' => [
                'required',
                'boolean',
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
            'nroExpediente.unique' => 'El Nro de Expediente ya fue registrado.',
            'fkRefInstanciaInstrumento' => 'Id de Instancia Instrumento no existe en la tabla RefInstanciaInstrumento.'
        
        ];
    }
}
