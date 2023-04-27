<?php

namespace App\Http\Controllers;

use App\Models\PersonaRUCE;
use ArrayObject;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class PersonaRUCEController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = PersonaRUCE::all();
        $respuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => count($data)
            ]
        ];
        return response()->json($respuesta,200);
    }

    public function filtro(Request $request): JsonResponse  
    {
        $estaActivo = $request->query->get('EstaActivo');
        $pageNumber = $request->query->get('PageNumber');
        $pageSize = $request->query->get('PageSize');

        $data = PersonaRUCE::where('estaActivo',$estaActivo)->get()->toArray();

        $errores = [];

        // dd($data, $estaActivo, $pageNumber, $pageSize);

        // determina a partir de que indice toma los registros
        $offset = ($pageNumber - 1) * $pageSize;

        // toma los registros a partir del offset teniendo en cuenta pageSize
        $elementos_pagina = array_slice($data, $offset, $pageSize);

        $total_paginas = intval(ceil(count($data) / $pageSize));

        // dd($offset/5+1,$elementos_pagina,count($elementos_pagina),$total_paginas);

        // cuenta la cantidad de elementos se enviar en elementos_pagina
        $cantidad = count($elementos_pagina);

        $respuesta = [
            'entities' => $elementos_pagina,
            'succeded' => true,
            'message' => "",
            'errors' => $errores,
            'paged' => [
                'entitiyCount' => $cantidad,
                'pageSize' => count($data),
                'pageIndex' => $total_paginas,
                'pageNumber' =>  intval($pageNumber)
            ]
        ];
        return response()->json($respuesta,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //visualiza los datos que se estan mandando en el requiest de la peticion
        // dd($request->all());

        //validacion de la peticion de los datos del modelo
        $request->validate([
            'cuil' => 'required|min:8|max:11',
            'email' =>'required',
            'nombre' =>'required',
            'apellido' =>'required',
            'telefono' =>'required|min:10|max:13',
        ]);

        //instancia de una personaRUCE del model
        $personaRUCE = new PersonaRUCE();

        //* TODO Agregar validaciones para el ingreso de cuil o email que ya se encuentren registrados

        //asignacion de los datos provenientes del request hacia la instancia de personaRUCE
        $personaRUCE->cuil = $request->cuil;
        $personaRUCE->email = $request->email;
        $personaRUCE->nombre = $request->nombre;
        $personaRUCE->apellido = $request->apellido;
        $personaRUCE->telefono = $request->telefono;

        //generacion de registro en la base de datos
        $personaRUCE->save();
        
        return response($personaRUCE);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PersonaRUCE  $personaRUCE
     * @return \Illuminate\Http\Response
     */
    public function show(PersonaRUCE $personaRUCE): JsonResponse
    {
        //Visualiza los datos del objeto con el id obtenido como metodo
        $data = [$personaRUCE];
        $cantidad = count($data);

        $errores = [];

        $respuesta = [
            'entities' => $data,
            'succeded' => true,
            'message' => "",
            'errors' => $errores,
            'paged' => [
                'entitiyCount' => $cantidad
            ]
        ];
        return response()->json($respuesta,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PersonaRUCE  $personaRUCE
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PersonaRUCE $personaRUCE)
    {
        //visualiza los datos que se estan mandando en el requiest de la peticion
        // dd($request->all());

        //validacion de la peticion de los datos del modelo
        $request->validate([
            'cuil' => 'required',
            'email' =>'required',
            'nombre' =>'required',
            'apellido' =>'required',
            'telefono' =>'required',
        ]);

        //obtengo una personaRUCE desde la base de datos y los guardo en una variable
        $personaRUCE->update([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'telefono' => $request->telefono,
                'email' => $request->email,
            ]);

        return response($personaRUCE);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PersonaRUCE  $personaRUCE
     * @return \Illuminate\Http\Response
     */
    public function destroy(PersonaRUCE $personaRUCE)
    {
        //Elimina la personaRUCE con el id que viene como parametro
        $personaRUCE->delete();
        return response()->noContent();
    }
}
