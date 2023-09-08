<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdmin = Role::create(['name' => 'super_admin', 'guard_name' => 'api',]);
        $admin = Role::create(['name' => 'admin', 'guard_name' => 'api',]);
        $writer = Role::create(['name' => 'writer', 'guard_name' => 'api',]);
        $user = Role::create(['name' => 'user', 'guard_name' => 'api',]);

        $viewer = Permission::create(['name' => 'viewer', 'guard_name' => 'api',]);
        $register = Permission::create(['name' => 'register', 'guard_name' => 'api',]);
        $refs = Permission::create(['name' => 'refs', 'guard_name' => 'api',]);
        $users = Permission::create(['name' => 'users', 'guard_name' => 'api',]);

        $user->syncPermissions([$viewer]);
        $writer->syncPermissions([$viewer, $register]);
        $admin->syncPermissions([$viewer, $register,$refs]);
        $superAdmin->syncPermissions([$viewer, $register,$refs,$users]);
    }
}
