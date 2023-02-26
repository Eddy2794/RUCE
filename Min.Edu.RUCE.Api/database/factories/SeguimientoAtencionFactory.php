<?php

namespace Database\Factories;

use App\Models\Cooperadora;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SeguimientoAtencion>
 */
class SeguimientoAtencionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'llamadas' => $this->faker->numerify("###"),
            'mensajes' => $this->faker->numerify("###"),
            'email_enviados' => $this->faker->numerify("###"),
            'atencion_oficina' => $this->faker->numerify("###"),
            'atencion_territorial' => $this->faker->numerify("###"),
            'fecha' => $this->faker->date(),
            'fk_cooperadora' => $this->faker->randomElement(Cooperadora::all()->getQueueableIds())
        ];
    }
}
