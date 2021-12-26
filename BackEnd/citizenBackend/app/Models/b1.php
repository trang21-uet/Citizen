<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class b1 extends Authenticatable
{
    use HasFactory, Notifiable;
    
    //Table mà model kết nối với
    protected $table = 'b1';

    //Khóa chính
    protected $primaryKey = 'maXa';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = true;
    protected $dateFormat = 'Y-m-d H:i:s';

    protected $attributes = [
    ];

    //Những field mà user được phép chỉnh sửa
    protected $fillable = [
        'tenXa',
        'maXa',
        'startPermission',
        'endPermission',
        'A3',
        'trangThai',
    ];

    //Không cho người dùng nhận được những field này
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function a3() {
        return $this->belongsTo(a3::class,'tenTK', 'tenTK');
    }

    public function b2() {
        return $this->hasMany(b2::class, 'B1', 'tenTK');
    }

    public function thongtin() {
        return $this->hasMany(thongtin::class, 'B1', 'tenTK');
    }

}
