@extends('adminlte::page')

@section('content')
    <div class="container">
        <h1>Users List</h1>
        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Reviews</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($users as $user)
                    <tr>
                        <td>{{ $user->id }}</td>
                        <td>{{ $user->name }}</td>
                        <td>{{ $user->email }}</td>
                        @if ($user->reviews->isEmpty() == false)
                            <td>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Rating</th>
                                            <th>Review</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($user->reviews as $review)
                                            <tr>
                                                <td>{{ $review->product->title }}</td> <!-- Название продукта -->
                                                <td>{{ $review->rating }} / 5</td> <!-- Оценка -->
                                                <td>{{ $review->review }}</td> <!-- Комментарий -->
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </td>
                        @else
                            <!-- Если нет отзывов -->
                            <td>No reviews</td>
                        @endif
                        <td>
                            <a href="{{ route('users.edit', $user->id) }}" class="btn btn-primary">Edit</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
