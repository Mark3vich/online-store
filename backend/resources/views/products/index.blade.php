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
        <form action="{{ route('product.index') }}" method="GET" id="filterForm" enctype="application/x-www-form-urlencoded"
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
            <!-- Поля для сортировки -->
            <div class="form-group">
                <label for="sort_by">Sort by:</label>
                <select name="sort_by" id="sort_by" class="form-control">
                    <option value="id" {{ request('sort_by') == 'id' ? 'selected' : '' }}>ID</option>
                    <option value="title" {{ request('sort_by') == 'title' ? 'selected' : '' }}>Title</option>
                    <option value="price" {{ request('sort_by') == 'price' ? 'selected' : '' }}>Price</option>
                </select>
            </div>

            <div class="form-group">
                <label for="order">Order:</label>
                <select name="order" id="order" class="form-control">
                    <option value="asc" {{ request('order') == 'asc' ? 'selected' : '' }}>Ascending</option>
                    <option value="desc" {{ request('order') == 'desc' ? 'selected' : '' }}>Descending</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Filter</button>
        </form>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Discount</th>
                    <th>Price (Original)</th>
                    <th>Price (With Discount)</th>
                    <th>Reviews</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($products as $product)
                    <tr>
                        <td>{{ $product->id }}</td>
                        <td>{{ $product->title }}</td>
                        <td>{{ $product->category->title }}</td>
                        <td>{{ is_null($product->discount) || $product->discount === 0 ? 'No discount' : $product->discount . '%' }}
                        </td>
                        <td>${{ number_format($product->price, 2) }}</td>
                        <td>${{ number_format($product->discounted_price, 2) }}</td>
                        @if ($product->reviews->isEmpty() == false)
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
                                        @foreach ($product->reviews as $review)
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
                            <a href="{{ route('product.edit', $product->id) }}" class="btn btn-primary">Edit</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
