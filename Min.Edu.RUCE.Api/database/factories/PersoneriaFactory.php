<?php

namespace Database\Factories;

use App\Models\Expediente;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Personeria>
 */
class PersoneriaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fk_expediente' => $this->faker->randomElement(Expediente::all()->getQueueableIds()),
            'estado_comision_directiva' => $this->faker->randomElement([true,false]),
            'estado_resolucion' => $this->faker->randomElement([false,true]),
            'estado_balance' => $this->faker->randomElement([false,true])
        ];
    }
}
