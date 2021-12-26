<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\a2;

class a1 extends Authenticatable
{
    use HasFactory, Notifiable;

    //Table mà model kết nối với
    protected $table = 'a1';

    //Khóa chính
    protected $primaryKey = 'maTongCuc';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = true;
    protected $dateFormat = 'Y-m-d H:i:s';

    //Những field mà user được phép chỉnh sửa
    protected $fillable = [
        'maTongCuc',
        'created_at',
        'updated_at',
    ];

    //Không cho người dùng nhận được những field này
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function a2() {
        return $this->hasMany(a2::class, 'A1', 'tenTK');
    }

}
