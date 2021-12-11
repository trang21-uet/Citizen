<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class b1 extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    
    protected $table = 'b1';
    protected $primaryKey = 'maXa';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $attributes = [
        'quyen' => 0
    ];

    protected $fillable = [
        'tenXa',
        'maXa',
        'quyen',
        'tenTK',
        'MK',
        'A3',
        'trangThai',
    ];

    protected $hidden = [
        'MK',
    ];

    public function a3() {
        return $this->belongsTo(a3::class,'tenTK', 'tenTK');
    }

    public function b2() {
        return $this->hasMany(b2::class, 'B1', 'tenTK');
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
