<?php

namespace Database\Factories;

use App\Models\Cooperadora;
use App\Models\TipoAsociacion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CooperadoraTipoAsociacion>
 */
class CooperadoraTipoAsociacionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fk_tipo_asociacion' => $this->faker->randomElement(TipoAsociacion::all()->getQueueableIds()),
            'fk_cooperadora' => $this->faker->randomElement(Cooperadora::all()->getQueueableIds()),
        ];
    }
}
