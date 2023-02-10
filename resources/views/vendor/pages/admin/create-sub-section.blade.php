@extends('core::admin.master')
@section('title', __('New page sub section'))

@section('content')

    {!! BootForm::open()->action(route('admin::store-page_sub_sections', [$page->id, 'section' => $section]))->multipart()->role('form') !!}
        @include('pages::admin._form-sub-section')
    {!! BootForm::close() !!}

@endsection
