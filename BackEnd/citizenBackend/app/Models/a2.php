<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\a3;

class a2 extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'a2';
    protected $primaryKey = 'maTinh';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = true;
    protected $dateFormat = 'Y-m-d H:i:s';

    protected $attributes = [
        
    ];
    
    protected $fillable = [
        'tenTinh',
        'maTinh',
        'startPermission',
        'endPermission',
        'A1',
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'startPermission',
        'endPermission',
        'MK',
        'created_at',
        'updated_at',
    ];

    public function a1() {
        return $this->belongsTo(a1::class, 'tenTK', 'tenTK');
    }

    public function a3() {
        return $this->hasMany(a3::class, 'A2', 'tenTK');
    }

    public function getAuthPassword() {
        return $this->MK;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }
}
