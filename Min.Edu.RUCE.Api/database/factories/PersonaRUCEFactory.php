<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\models\RefTipoDocumento;
use App\Models\RefTipoDocumentoRUCE;

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
        $dni = $this->faker->unique()->numerify("#########");
        return [
            'cuil' => intval(strval($this->faker->randomElement([20,23,24,27])).strval($dni).strval($this->faker->numerify("#"))),
            'dni' => $dni,
            'fkIdRefTipoDocumento' => $this->faker->randomElement(RefTipoDocumentoRUCE::all()->getQueueableIds()),
            'email' => $this->faker->unique()->safeEmail(),
            'nombre' => $this->faker->name(),
            'apellido' => $this->faker->lastName(),
            'telefono' => intval("388". strval($this->faker->numerify("#######"))),
            'estaActivo' => true,
        ];
    }
}
