<?php

namespace Database\Factories;

use App\Models\AsociacionCivil;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ConExpediente>
 */
class ConExpedienteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'nro_expediente' => 'exp. nro 0'.strval($this->faker->unique()->numerify("###")),

            'fk_asociacion_civil' => $this->faker->randomElement(AsociacionCivil::all()->getQueueableIds()),
            
            'fecha' => $this->faker->date("Y-m-d"),

            'observaciones' => $this->faker->randomElement([true,false]),
            'observaciones_respondidas' => $this->faker->randomElement([false,true]),
            'instrumento_publico' => $this->faker->randomElement([true,false]),
            'fiscalia_estado' => $this->faker->randomElement([false,true])
        ];
    }
}
