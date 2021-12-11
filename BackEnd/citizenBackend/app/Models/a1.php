<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class a1 extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $table = 'a1';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $fillable = [
        'tenTK',
        'MK'
    ];

    protected $hidden = [
        'MK',
    ];

    public function a2() {
        return $this->hasMany(A2::class, 'A1', 'tenTK');
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
