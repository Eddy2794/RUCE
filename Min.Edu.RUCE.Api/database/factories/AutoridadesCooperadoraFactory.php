<?php

namespace Database\Factories;

use App\Models\Cooperadora;
use App\Models\Persona;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AutoridadesCooperadora>
 */
class AutoridadesCooperadoraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'cargo' => $this->faker->randomElement(["presidente","secretario","tesorero","vice-presidente"]),
            'inicio_cargo' => $this->faker->date(),
            'fin_cargo' => $this->faker->date(),
            'tipo_comision' => $this->faker->randomElement(["regularizadora","directiva"]),
            'fkIdPersonaRUCE' => $this->faker->randomElement(Persona::all()->getQueueableIds()),
            'fk_cooperadora' => $this->faker->randomElement(Cooperadora::all()->getQueueableIds()),
            'estaActivo' => true,
        ];
    }
}
