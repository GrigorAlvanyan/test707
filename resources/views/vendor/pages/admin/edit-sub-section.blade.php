@extends('core::admin.master')

@section('title', $model->present()->title)

@section('content')
    {!! BootForm::open()->put()->action(route('admin::update-page_sub_sections', [$page->id, $section->id, $model->id]))->multipart()->role('form') !!}
    {!! BootForm::bind($model) !!}
        @include('pages::admin._form-sub-section')
    {!! BootForm::close() !!}

@endsection
