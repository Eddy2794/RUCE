<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCooperadoraRequest extends FormRequest
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
            'fkRefTipoAsociacion' => [
                'required',
                'exists:RefTipoAsociacion,id'
            ],
            'fkOrganizacionRUCE' => [
                'required',
                'exists:OrganizacionRUCE,id'
            ],
            'cuit' => [
                'required',
                'string',
                Rule::unique('Cooperadora','cuit')->where('id',$this->id)->withoutTrashed()
            ],
            'legajo' => [
                'required',
                'string',
                Rule::unique('Cooperadora','legajo')->where('id',$this->id)->withoutTrashed()
            ],
            'denominacion' => [
                'required',
                'string',
                Rule::unique('Cooperadora','denominacion')->where('id',$this->id)->withoutTrashed()
            ],
            'estado' => [
                'required',
                'string'
            ],
            'convenioCsEconomicas' => [
                'required',
                'boolean'
            ],
            'estadoAfip' => [
                'required',
                'boolean'
            ],
            'estadoRentas' => [
                'required',
                'boolean'
            ],
            'inscripcionRenacopes' => [
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
            'fkRefTipoAsociacion.exist' => 'Id de Tipo Asociacion no existe en la tabla RefTipoAsociacion.',
            'fkOrganizacionRUCE.exist' => 'Id de Organizacion no existe en la tabla OrganizacionRUCE.',
            'cuit.unique' => 'El CUIT de la Cooperadora ya fue registrado.',
            'legajo.unique' => 'El Legajo de la Cooperadora ya fue registrado.',
            'denominacion.unique' => 'La Denominacion de la Cooperadora ya fue registrado.',
        ];
    }
}
