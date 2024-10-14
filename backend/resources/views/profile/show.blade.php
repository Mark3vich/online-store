@extends('adminlte::page')

@section('title', 'Profile')

@section('content_header')
    <h1>{{ __('Profile') }}</h1>
@stop

@section('content')
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">{{ __('Profile Information') }}</h3>
                </div>
                <div class="card-body">
                    <form action="{{ route('profile.update') }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        @method('POST')
                        <div class="form-group">
                            <label for="name">{{ __('Name') }}</label>
                            <input type="text" name="name" class="form-control"
                                value="{{ old('name', $user->name) }}">
                        </div>

                        <div class="form-group">
                            <label for="email">{{ __('Email') }}</label>
                            <input type="email" name="email" class="form-control"
                                value="{{ old('email', $user->email) }}">
                        </div>

                        <div class="form-group">
                            <label for="avatar" class="font-weight-bold">{{ __('Avatar') }}</label>
                            @if ($user->image)
                                <div class="avatar-wrapper mt-2" style="position: relative; display: inline-block;">
                                    <img src="{{ asset('storage/' . $user->image) }}" alt="Avatar" width="100"
                                        height="100"
                                        style="border-radius: 50%; border: 3px solid #ccc; object-fit: cover;">
                                </div>
                            @endif
                            <label class="custom-file-upload mt-3">
                                <input type="file" name="avatar" id="avatarInput">
                                {{ __('Change the avatar') }}
                            </label>
                            <span class="file-name" id="fileName">No file chosen</span> <!-- Отображение имени файла -->
                        </div>

                        <button type="submit" class="btn btn-warning mt-4"
                            style="background-color: #ffc107; color: #fff; border: none;">
                            {{ __('Upgrade Profile') }}
                        </button>
                    </form>
                </div>
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </div>
        </div>
    </div>
@section('js')
    <script src="{{ asset('js/file.js') }}"></script>
@endsection
@section('css')
    <link rel="stylesheet" href="{{ asset('css/file.css') }}">
@endsection

@endsection
