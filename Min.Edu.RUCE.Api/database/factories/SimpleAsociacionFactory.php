<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use \App\Models\TipoAsociacion;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SimpleAsociacion>
 */
class SimpleAsociacionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'descripcion' => 'simple asociacion '.strval($this->faker->unique()->numerify("##")+1),
            'fk_tipo_asociacion' => $this->faker->randomElement(TipoAsociacion::all()->getQueueableIds())
        ];
    }
}
