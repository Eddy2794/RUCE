<?php

namespace Database\Factories;

use App\Models\PersoneriaJuridica;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Balances>
 */
class BalancesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fk_personeria_juridica' => $this->faker->randomElement(PersoneriaJuridica::all()->getQueueableIds()),
            'estado_balances' => $this->faker->randomElement([true,false]),
            'fecha' => $this->faker->date("Y-m-d")
        ];
    }
}
