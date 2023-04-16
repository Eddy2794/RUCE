<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Persona>
 */
class PersonaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'cuil' => intval(strval($this->faker->randomElement([20,23,24,27])).strval($this->faker->unique()->numerify("#########")).strval($this->faker->numerify("#"))),
            'email' => $this->faker->unique()->safeEmail(),
            'nombre' => $this->faker->name(),
            'apellido' => $this->faker->lastName(),
            'telefono' => intval("388". strval($this->faker->numerify("#######"))),
            'estaActivo' => true,
        ];
    }
}
