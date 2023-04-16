<?php

namespace Database\Factories;

use App\Models\Cooperadora;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FondosCooperar>
 */
class FondosCooperarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fondos_recibidos' => $this->faker->randomElement([true,false]),
            'fondos_rendidos' => $this->faker->randomElement([true,false]),
            'estado_rendicion' => $this->faker->randomElement([true,false]),
            'fecha_rendicion' => $this->faker->date(),
            'anio_otorgado' => $this->faker->numerify("####"),
            'fk_cooperadora' => $this->faker->randomElement(Cooperadora::all()->getQueueableIds()),
            'estaActivo' => true,
        ];
    }
}
