<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kiosco>
 */
class KioscoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'responsable' => $this->faker->lastName().', '.$this->faker->name(),
            'acceso_licitacion' => $this->faker->randomElement([true,false]),
            'documentacion_presentada' => $this->faker->randomElement([true,false]),
            'periodo_inicio' => $this->faker->date("Y-m-d"),
            'periodo_fin' => $this->faker->date("Y-m-d"),

        ];
    }
}
