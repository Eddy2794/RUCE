<?php

namespace App\Http\Controllers;

use App\Models\EstablecimientoEducativo;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class EstablecimientoEducativoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = EstablecimientoEducativo::all();
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

        $data = EstablecimientoEducativo::where('estaActivo',$estaActivo)->get()->toArray();

        $errores = array();

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
    public function store(Request $request): JsonResponse
    {
        $errores = array();

        $establecimientoEducativo = new EstablecimientoEducativo();

        if($request->cue)
            $establecimientoEducativo->cue = $request->cue;
        else
            array_push($errores,'El campo CUE es obligatorio.');

        if($request->region)
            $establecimientoEducativo->region = $request->region;
        else
            array_push($errores,'El campo REGION es obligatorio.');

        if($request->nivel)
            $establecimientoEducativo->nivel = $request->nivel;
        else
            array_push($errores,'El campo NIVEL es obligatorio.');

        if($request->localidad)
            $establecimientoEducativo->localidad = $request->localidad;
        else
            array_push($errores,'El campo LOCALIDAD es obligatorio.');

        if($request->departamento)
            $establecimientoEducativo->departamento = $request->departamento;
        else
            array_push($errores,'El campo DEPARTAMENTO es obligatorio.');

        if($request->telefono)
            $establecimientoEducativo->telefono = $request->telefono;
        else
            array_push($errores,'El campo TELEFONO es obligatorio.');

        if($request->email)
            $establecimientoEducativo->email = $request->email;
        else
            array_push($errores,'El campo EMAIL es obligatorio.');

        if($request->matricula)
            $establecimientoEducativo->matricula = $request->matricula;
        else
            array_push($errores,'El campo MATRICULA es obligatorio.');

        if($request->domicilio)
            $establecimientoEducativo->domicilio = $request->domicilio;
        else
            array_push($errores,'El campo DOMICILIO es obligatorio.');

        $success = true;
        $mensaje = "";
        $status = 201;

        if($errores==[])
            $establecimientoEducativo->save();
        else{
            $success = false;
            $mensaje =  "Errores al procesar la solicitud.";
            $status = 400;
        }

        $respuesta = [
            'entities' => $success?$establecimientoEducativo:null,
            'succeded' => $success,
            'message' => $mensaje,
            'errors' => $errores,
            'paged' => [
                'entitiyCount' => $success?1:0,
                'pageSize' => $success?1:0,
                'pageIndex' => $success?1:0,
                'pageNumber' => $success?1:0
            ]
        ];

        return response()->json($respuesta,$status);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse 
    {
        $data = EstablecimientoEducativo::where('id', $id)->get();

        $data = $data->toArray();

        $cantidad = count($data);

        $errores = [];
        
        $success=false;

        $mensaje = "";

        if($data != [])
            if(!$data[0]['estaActivo']){
                
                $mensaje = "Error al procesar la solicitud.";
                array_push($errores, "El elemento no esta activo.");
            }
            else
                $success = true;
        else{
            $mensaje = "Error al procesar la solicitud.";
            array_push($errores, "Elemento no encontrado.");
        }

        $respuesta = [
            'entities' => $data,
            'succeded' => $success,
            'message' => $mensaje,
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
     * @param  \App\Models\EstablecimientoEducativo  $establecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $errores = array();
        $success = true;
        $mensaje = "";
        $status = 200;
        $establecimientoEducativo = [];

        if(!EstablecimientoEducativo::where('id',$id)->get()->toArray()[0]['estaActivo'])
            array_push($errores,'El Establecimiento Educativo no esta activo.');
        else{
            if(!$request->region)
                array_push($errores,'El campo REGION es obligatorio.');

            if(!$request->nivel)
                array_push($errores,'El campo NIVEL es obligatorio.');

            if(!$request->localidad)
                array_push($errores,'El campo LOCALIDAD es obligatorio.');

            if(!$request->departamento)
                array_push($errores,'El campo DEPARTAMENTO es obligatorio.');

            if(!$request->telefono)
                array_push($errores,'El campo TELEFONO es obligatorio.');

            if(!$request->email)
                array_push($errores,'El campo EMAIL es obligatorio.');

            if(!$request->matricula)
                array_push($errores,'El campo MATRICULA es obligatorio.');

            if(!$request->domicilio)
                array_push($errores,'El campo DOMICILIO es obligatorio.');
        }

        if($errores==[]){
            EstablecimientoEducativo::where('id',$id)->update([
                'region' => $request->region,
                'nivel' => $request->nivel,
                'localidad' => $request->localidad,
                'departamento' => $request->departamento,
                'telefono' => $request->telefono,
                'email' => $request->email,
                'matricula' => $request->matricula,
                'domicilio' => $request->domicilio,
            ]);
            $establecimientoEducativo = EstablecimientoEducativo::where('id',$id)->get();
        }
        else{
            $success = false;
            $mensaje = "Errores al procesar la solicitud.";
            $status = 400;
        }

        $respuesta = [
            'entities' => $establecimientoEducativo,
            'succeded' => $success,
            'message' => $mensaje,
            'errors' => $errores,
            'paged' => [
                'entitiyCount' => count($establecimientoEducativo),
                'pageSize' => count($establecimientoEducativo),
                'pageIndex' => count($establecimientoEducativo),
                'pageNumber' => count($establecimientoEducativo)
            ]
        ];

        return response()->json($respuesta,$status);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EstablecimientoEducativo  $establecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id): JsonResponse
    {
        EstablecimientoEducativo::where('id',$id)->update([
            'estaActivo' => false,
        ]);
        $respuesta = [
            'entities' => [],
            'succeded' => true,
            'message' => "Elemento eliminado correctamente",
            'errors' => [],
            'paged' => [
                'entitiyCount' => 0,
                'pageSize' => 0,
                'pageIndex' => 0,
                'pageNumber' => 0
            ]
        ];
        return response()->json($respuesta,200);
    }
}
