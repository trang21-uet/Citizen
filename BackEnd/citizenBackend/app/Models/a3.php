<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class a3 extends Authenticatable
{
    use HasFactory, Notifiable;

    //Table mà model kết nối với
    protected $table = 'a3';

    //Khóa chính
    protected $primaryKey = 'maHuyen';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = true;
    protected $dateFormat = 'Y-m-d H:i:s';

    protected $attributes = [
    ];
    
    //Những field mà user được phép chỉnh sửa
    protected $fillable = [
        'tenHuyen',
        'maHuyen',
        'startPermission',
        'endPermission',
        'A2'
    ];

    //Không cho người dùng nhận được những field này
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function a2() {
        return $this->belongsTo(a2::class, 'tenTK', 'tenTK');
    }

    public function b1() {
        return $this->hasMany(b1::class, 'A3', 'tenTK');
    }

}
