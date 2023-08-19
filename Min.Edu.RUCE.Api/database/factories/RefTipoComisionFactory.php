<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class RefTipoComisionFactory extends Factory
{
    
    public function definition()
    {
        return [
            'tipoComisionDesc' => "Tipo de Comision ".$this->faker->numerify('##'),
        ];
    }
}
