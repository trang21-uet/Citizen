<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class thongtin extends Model
{

    use HasFactory;
    
    protected $table = 'thongtin';
    protected $primaryKey = 'ID';
    public $timestamps = false;

    protected $attributes = [
        'cccd' => null,
        'tonGiao' => null,
        'ngheNghiep' => null,
        'B2' => null,
    ];

    protected $fillable = [
        'ID',
        'cccd',
        'ho',
        'ten',
        'ngaySinh',
        'gioiTinh',
        'queQuan',
        'thuongTru',
        'tamTru',
        'tonGiao',
        'trinhDoVanHoa',
        'ngheNghiep',
        'B2',
        'B1',
    ];

    protected $hidden = [];

    public function b1() {
        return this.belongsTo(b1::class,'tenTK', 'B1');
    }

    public function b2() {
        return this.belongsTo(b2::class,'tenTK', 'B2');
    }
}
