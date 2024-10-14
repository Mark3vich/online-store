@extends('adminlte::page')

@section('title', 'Change Password')

@section('content_header')
    <h1>{{ __('Change Password') }}</h1>
@stop

@section('content')
    <div class="row">
        <div class="col-md-8">
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
