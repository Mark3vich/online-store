<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class VerifyJwtToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$token = session('jwt_token')) {
            return redirect()->route('login');
        }

        // Попытка проверки токена
        try {
            JWTAuth::setToken($token)->authenticate();
        } catch (\Exception $e) {
            return redirect()->route('login');
        }

        return $next($request);
    }
}
