<?php

namespace Database\Factories;

use App\Models\AsociacionCivil;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PersoneriaJuridica>
 */
class PersoneriaJuridicaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fk_asociacion_civil' => $this->faker->randomElement(AsociacionCivil::all()->getQueueableIds()),
            'estado_comision_directiva' => $this->faker->randomElement([true,false]),
            'estado_resolucion' => $this->faker->randomElement([false,true])
        ];
    }
}
