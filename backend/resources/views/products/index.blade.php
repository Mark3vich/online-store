@extends('adminlte::page')

@section('content')
    <div class="container">
        <h1>Product List</h1>

        @if (session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif

        <!-- Форма фильтрации по категориям -->
        <form action="{{ route('product.filter') }}" method="GET" id="filterForm" enctype="application/x-www-form-urlencoded"
            class="mb-4">
            @csrf
            <div class="form-group">
                <label for="category">Filter by Category:</label>
                <select name="category" id="category" class="form-control">
                    <option value="">Select a Category</option>
                    @if (isset($categories) && $categories->count() > 0)
                        @foreach ($categories as $category)
                            <option value="{{ $category->id }}"
                                {{ request('category') == $category->id ? 'selected' : '' }}>
                                {{ $category->title }}
                            </option>
                        @endforeach
                    @else
                        <option value="">No categories found</option>
                    @endif
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Filter</button>
        </form>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($products as $product)
                    <tr>
                        <td>{{ $product->id }}</td>
                        <td>{{ $product->title }}</td>
                        <td>${{ number_format($product->price, 2) }}</td>
                        <td>
                            <a href="{{ route('product.edit', $product->id) }}" class="btn btn-primary">Edit</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
