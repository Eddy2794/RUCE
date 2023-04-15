<?php

namespace Database\Factories;

use App\Models\EstablecimientoEducativo;
use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Persona;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AutoridadesEstablecimientoEducativo>
 */
class AutoridadesEstablecimientoEducativoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fk_persona' => $this->faker->randomElement(Persona::all()->getQueueableIds()),
            'fk_establecimiento_educativo' => $this->faker->randomElement(EstablecimientoEducativo::all()->getQueueableIds()),
            'cargo' => $this->faker->randomElement(["director","secretario","vice-director"]),
            'estadoActivo' => true,
        ];
    }
}
