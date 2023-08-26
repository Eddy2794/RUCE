<?php

namespace Database\Factories;

use App\Models\Persona;
use App\Models\PersonaRUCE;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usuario>
 */
class UsuarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fkPersonaRUCE' => $this->faker->randomElement(PersonaRUCE::all()->getQueueableIds()),
            'username' => $this->faker->userName(),
            'password' => $this->faker->password(),
            'estaActivo' => true,
        ];
    }
}
