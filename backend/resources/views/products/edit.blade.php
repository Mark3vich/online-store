@extends('adminlte::page')

@section('content')
    <div class="container">
        <h1>Edit Product: {{ $product->title }}</h1>

        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('product.update', $product->id) }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="name">Product Name</label>
                <input type="text" name="title" id="title" class="form-control" value="{{ old('title', $product->title) }}" required>
            </div>

            <div class="form-group">
                <label for="price">Price</label>
                <input type="number" name="price" id="price" class="form-control" value="{{ old('price', $product->price) }}" required>
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" id="description" class="form-control">{{ old('description', $product->description) }}</textarea>
            </div>

            <button type="submit" class="btn btn-success">Update Product</button>
            <a href="{{ route('product.index') }}" class="btn btn-secondary">Back</a>
        </form>
    </div>
@endsection
