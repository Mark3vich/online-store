<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CartRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            '*.product_id' => 'required|exists:products,id',   // Каждый элемент массива должен иметь product_id, который существует в таблице products
            '*.quantity' => 'required|integer|min:1',         // Количество должно быть числом и минимум 1
            '*.status' => 'required|boolean'
        ];
    }
}
