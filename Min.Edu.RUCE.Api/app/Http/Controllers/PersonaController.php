<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use ArrayObject;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class PersonaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = Persona::all();
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


        $data = Persona::all();
        $cantidad = count($data);

        $respuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => $cantidad
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

        //instancia de una persona del model
        $persona = new Persona();

        //* TODO Agregar validaciones para el ingreso de cuil o email que ya se encuentren registrados

        //asignacion de los datos provenientes del request hacia la instancia de persona
        $persona->cuil = $request->cuil;
        $persona->email = $request->email;
        $persona->nombre = $request->nombre;
        $persona->apellido = $request->apellido;
        $persona->telefono = $request->telefono;

        //generacion de registro en la base de datos
        $persona->save();
        
        return response($persona);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function show(Persona $persona): JsonResponse
    {
        //Visualiza los datos del objeto con el id obtenido como metodo
        $data = [$persona];
        $cantidad = count($data);

        $respuesta = [
            'entities' => $data,
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
     * @param  \App\Models\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Persona $persona)
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

        //obtengo una persona desde la base de datos y los guardo en una variable
        $persona->update([
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'telefono' => $request->telefono,
                'email' => $request->email,
            ]);

        return response($persona);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function destroy(Persona $persona)
    {
        //Elimina la persona con el id que viene como parametro
        $persona->delete();
        return response()->noContent();
    }
}
