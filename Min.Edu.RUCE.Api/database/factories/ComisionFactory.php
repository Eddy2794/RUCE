<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Cooperadora;
use App\Models\RefTipoComision;
use App\Models\UsuarioRUCE;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comision>
 */
class ComisionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $valor = $this->faker->randomElement([true,false]);
        return [
            'fkCooperadora' => $this->faker->unique()->randomElement(Cooperadora::all()->getQueueableIds()),
            'fkRefTipoComision' => $this->faker->randomElement(RefTipoComision::all()->getQueueableIds()),
            'periodoInicio' => $this->faker->dateTime(),
            'periodoFin' => $this->faker->dateTime(),
            'nroSocios' => $this->faker->numerify('###'),
            'estadoResolucion' => $this->faker->randomElement([true,false]),

            // 'estadoActivo' => $valor,
            'deleted_at' => $valor?null:$this->faker->date(),

            'idUsuarioAlta' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
            'idUsuarioModificacion' => $this->faker->randomElement(UsuarioRUCE::all()->getQueueableIds()),
        ];
    }
}
