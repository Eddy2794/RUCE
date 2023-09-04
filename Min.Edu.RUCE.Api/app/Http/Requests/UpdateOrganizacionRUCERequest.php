<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateOrganizacionRUCERequest extends FormRequest
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
            'organizacionDesc' => [
                'required',
                'string',
                Rule::unique('OrganizacionRUCE','organizacionDesc')->ignore($this->id)
                      ->where(fn($query)=>$query->where('organizacionDesc',$this->organizacionDesc))
                      ->withoutTrashed()
            ],
            'cue' => [
                'required',
                'string',
                Rule::unique('OrganizacionRUCE','cue')
                      ->where('cue',$this->cue)
                      ->withoutTrashed()
            ],
            'anexo' => [
                'required',
                'integer',
            ],
            'telefono' => [
                'required',
                'string',
                Rule::unique('OrganizacionRUCE','telefono')->where('telefono', $this->telefono)->withoutTrashed()
            ],
            'email' => [
                'required',
                'string',
                Rule::unique('OrganizacionRUCE','email')->where('email', $this->email)->withoutTrashed()
            ],
            'domicilio' => [
                'required',
                'string',
                //Rule::unique('OrganizacionRUCE','domicilio')->where('domicilio', $this->domicilio)->withoutTrashed()
            ],
            'region' => [
                'required',
                'string'
            ],
            'localidad' => [
                'required',
                'string'
            ],
            'departamento' => [
                'required',
                'string'
            ],
            'nivel' => [
                'required',
                'string'
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
            'id.exist' => 'Id de OrganizacionRUCE no existe en la tabla OrganizacionRUCE.',
            'organizacionDesc.unique' => 'El nombre de la Oganizacion ya fue registrado.',
            'cue.unique' => 'El CUE de la Ognaizacion ya fue registrado.',
            'telefono.unique' => 'El telefono de la Organizacion ya fue registrado.',
            'email.unique' => 'El email de la Oganizacion ya fue registrado.',
            'domicilio.unique' => 'El domicilio de la Organizacion ya fue registrado.'
        ];
    }
}
