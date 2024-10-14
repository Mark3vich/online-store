@extends('adminlte::page')

@section('content')
    <div class="container">
        <h1>Edit Category: {{ $category->name }}</h1>

        @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('category.update', $category->id) }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="name">Category Name</label>
                <input type="text" name="title" id="title" class="form-control" value="{{ old('name', $category->title) }}" required>
            </div>

            <button type="submit" class="btn btn-success">Update Category</button>
            <a href="{{ route('category.index') }}" class="btn btn-secondary">Back</a>
        </form>
    </div>
@endsection
