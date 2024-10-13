<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'name' => 'string|max:255',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
            'role_id' => 'nullable|exists:roles,id',
        ];
    }
}
