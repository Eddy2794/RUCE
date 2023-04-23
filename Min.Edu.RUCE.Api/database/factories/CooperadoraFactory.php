<?php

namespace Database\Factories;

use App\Models\OrganizacionRUCE;
use App\Models\PersonaRUCE;
use App\Models\RefTipoAsociacion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cooperadora>
 */
class CooperadoraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $valor = $this->faker->randomElement([false,true]);
        return [
            'fk_idRefTipoAsociacion' => $this->faker->randomElement(RefTipoAsociacion::all()->getQueueableIds()),
            'idOrganizacionRUCE' => $this->faker->randomElement(OrganizacionRUCE::all()->getQueueableIds()),

            'legajo' => "legajo ".$this->faker->unique()->numerify("###"),
            'denominacion' => $this->faker->domainName,
            'estado' => $this->faker->randomElement(["verde","amarillo","rojo"]),
            'decreto' => "decreto ".$this->faker->unique()->numerify("###"),
            'nro_resolucion' => $valor ? strval($this->faker->numerify('###')).$this->faker->randomAscii():null,

            'convenioScEconomicas' => $this->faker->randomElement([true,false]),
            'inscripcion_afip' => $this->faker->randomElement([true,false]),
            'inscripcion_rentas' => $this->faker->randomElement([true,false]),
            'inscripcion_renacopes' => $this->faker->randomElement([true,false]),
            
            'idUsuarioAlta' => $this->faker->randomElement(PersonaRUCE::all()->getQueueableIds()),
            'idUsuarioModificacion' => $this->faker->randomElement(PersonaRUCE::all()->getQueueableIds()),

            'fecha_creacion' => $this->faker->date(),
            'estaActivo' => !$valor,
            'fechaEliminacion' => $valor?$this->faker->date():null,
        ];
    }
}
