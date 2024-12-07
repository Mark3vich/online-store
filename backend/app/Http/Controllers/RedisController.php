<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redis;

class RedisController extends Controller
{
    public function index()
    {
        $value = Redis::set('testkey', 'testvalue');
        $retrievedValue = Redis::get('testkey');
        return response()->json([
            'set' => $value,  // Corrected using =>
            'get' => $retrievedValue, // Corrected using =>
        ]);
    }
}
