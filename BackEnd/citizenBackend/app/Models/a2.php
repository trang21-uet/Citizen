<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class a2 extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'a2';
    protected $primaryKey = 'maTinh';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $attributes = [
        'quyen' => 0
    ];
    
    protected $fillable = [
        'tenTinh',
        'maTinh',
        'quyen',
        'tenTK',
        'MK',
        'A1'
    ];

    protected $hidden = [
        'MK',
    ];

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
