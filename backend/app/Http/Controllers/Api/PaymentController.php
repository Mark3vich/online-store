<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    /**
     * Создание PaymentIntent для оплаты
     */
    public function createPaymentIntent(Request $request)
    {
        // Проверка входящих данных
        $validator = Validator::make($request->all(), [
            'amount' => 'required|numeric|min:1', // Проверяем, что сумма указана и больше 0
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Устанавливаем секретный ключ Stripe
            Stripe::setApiKey(config('services.stripe.secret'));

            // Создание PaymentIntent
            $paymentIntent = PaymentIntent::create([
                'amount' => $request->amount * 100, // Преобразуем в центы
                'currency' => 'usd',
                'payment_method_types' => ['card'],
            ]);

            return response()->json([
                'status' => 'success',
                'clientSecret' => $paymentIntent->client_secret,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
