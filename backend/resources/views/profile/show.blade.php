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
                    <div class="form-group">
                        <label for="name">{{ __('Name') }}</label>
                        <input type="text" name="name" class="form-control" value="{{ old('name', $user->name) }}">
                    </div>

                    <div class="form-group">
                        <label for="email">{{ __('Email') }}</label>
                        <input type="email" name="email" class="form-control" value="{{ old('email', $user->email) }}">
                    </div>

                    <div class="form-group">
                        <label for="avatar">{{ __('Avatar') }}</label>
                        <input type="file" name="avatar" class="form-control-file">
                        @if ($user->avatar)
                            <img src="{{ asset('storage/' . $user->avatar) }}" alt="Avatar" width="100" class="mt-2">
                        @endif
                    </div>

                    <button type="submit" class="btn btn-primary">{{ __('Update Profile') }}</button>
                </form>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                <h3 class="card-title">{{ __('Change Password') }}</h3>
            </div>
            <div class="card-body">
                <form action="{{ route('profile.update.password') }}" method="POST">
                    @csrf
                    <div class="form-group">
                        <label for="current_password">{{ __('Current Password') }}</label>
                        <input type="password" name="current_password" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="new_password">{{ __('New Password') }}</label>
                        <input type="password" name="new_password" class="form-control">
                    </div>

                    <div class="form-group">
                        <label for="new_password_confirmation">{{ __('Confirm New Password') }}</label>
                        <input type="password" name="new_password_confirmation" class="form-control">
                    </div>

                    <button type="submit" class="btn btn-primary">{{ __('Update Password') }}</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
