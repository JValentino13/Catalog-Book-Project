<?php

namespace App\Repositories\Auth\Role;

use App\Models\Role;
use App\Models\moduleMenu;
use App\Repositories\Auth\Role\RoleDesign;
use LaravelEasyRepository\Implementations\Eloquent;

class RoleResponse extends Eloquent implements RoleDesign {

/*
|--------------------------------------------------------------------------
| Rumah Dev
| Backend Developer : ibudirsan
| Email             : ibnudirsan@gmail.com
| Copyright © RumahDev 2022
|--------------------------------------------------------------------------
*/

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected $model;

    public function __construct(Role $model, moduleMenu $module)
    {
        $this->model    = $model;
        $this->module   = $module;
    }

    /**
     * List Role
     */
    public function datatable()
    {
        return $this->model->select('id','uuid','name','guard_name','created_at')
                                    ->whereNotIn('name',['SuperAdmin']);
    }

    /**
     * List Permissions
     */
    public function permission()
    {
       return $this->module->with('permissions')
                          ->orderby('module_name','asc')
                          ->get();
    }

    /**
     * Create Role
     */
    public function store($param)
    {
        $role   = $this->model->create(['name' => $param->roleName]);
            return $role->givePermissionTo($param->permissions);
    }
}
