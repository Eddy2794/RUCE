<?php

namespace Database\Factories;

use App\Models\TipoAsociacion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AsociacionCivil>
 */
class AsociacionCivilFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'descripcion' => 'asociacion civil '.strval($this->faker->unique()->numerify("##")+1),
            'fk_tipo_asociacion' => $this->faker->randomElement(TipoAsociacion::all()->getQueueableIds())
        ];
    }
}
