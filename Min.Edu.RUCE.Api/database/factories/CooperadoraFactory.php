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
            'fkRefTipoAsociacion' => $this->faker->randomElement(RefTipoAsociacion::all()->getQueueableIds()),
            'fkOrganizacionRUCE' => $this->faker->randomElement(OrganizacionRUCE::all()->getQueueableIds()),

            'legajo' => "legajo ".$this->faker->unique()->numerify("###"),
            'denominacion' => $this->faker->domainName,
            'estado' => $this->faker->randomElement(["verde","amarillo","rojo"]),
            
            'convenioCsEconomicas' => $this->faker->randomElement([true,false]),
            'estadoAfip' => $this->faker->randomElement([true,false]),
            'estadoRentas' => $this->faker->randomElement([true,false]),
            'inscripcionRenacopes' => $this->faker->randomElement([true,false]),
            
            'idUsuarioAlta' => $this->faker->randomElement(PersonaRUCE::all()->getQueueableIds()),
            'idUsuarioModificacion' => $this->faker->randomElement(PersonaRUCE::all()->getQueueableIds()),

            'estaActivo' => !$valor,
            'fechaEliminacion' => $valor?$this->faker->date():null,
        ];
    }
}
