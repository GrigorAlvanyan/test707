@push('js')
    <script src="{{ asset('components/ckeditor4/ckeditor.js') }}"></script>
    <script src="{{ asset('components/ckeditor4/config-full.js') }}"></script>
@endpush

<div class="header">
    @include('core::admin._button-back', ['url' => $page->editUrl(), 'title' => $page->title])
    @include('core::admin._title', ['default' => __('New page section')])
    @component('core::admin._buttons-form', ['model' => $model])
    @endcomponent
</div>

<div class="content">

    @include('core::admin._form-errors')

    {!! BootForm::hidden('id') !!}
    {!! BootForm::hidden('page_id')->value($page->id) !!}

    <file-manager related-table="{{ $model->getTable() }}" :related-id="{{ $model->id ?? 0 }}"></file-manager>
    <file-field type="image" field="image_id" :init-file="{{ $model->image ?? 'null' }}"></file-field>
    <files-field :init-files="{{ $model->files }}"></files-field>

    @include('core::form._title-and-slug')
    <div class="mb-3">
        {!! TranslatableBootForm::hidden('status')->value(0) !!}
        {!! TranslatableBootForm::checkbox(__('Published'), 'status') !!}
    </div>
    <div class="row">
        <div class="col-md-6">
            {!! BootForm::select(__('Template'), 'template', TypiCMS::pageSectionTemplates()) !!}
        </div>
    </div>
    {!! TranslatableBootForm::textarea(__('Body'), 'body')->addClass('ckeditor-full') !!}

    @can('read page_sub_sections')
        @if ($model->id)
            <item-list
                url-base="/api/page/{{$model->page_id}}/sections/{{ $model->id }}/subsections"
                fields="id,image_id,section_id,position,status,title"
                table="page_sub_sections"
                title="page_sub_sections"
                include="image"
                :sub-list="true"
                :searchable="['title']"
                :sorting="['position']">

                <template slot="add-button" v-if="$can('create page_sub_sections')">
                    @include('core::admin._button-create', ['url' => route('admin::create-page_sub_sections', ['page' => $page->id, 'section' => $model->id]), 'module' => 'page_sub_sections'])
                </template>

                <template slot="columns" slot-scope="{ sortArray }">
                    <item-list-column-header name="checkbox" v-if="$can('update page_sub_sections')||$can('delete page_sub_sections')"></item-list-column-header>
                    <item-list-column-header name="edit" v-if="$can('update page_sub_sections')"></item-list-column-header>
                    <item-list-column-header name="status_translated" sortable :sort-array="sortArray" :label="$t('Status')"></item-list-column-header>
                    <item-list-column-header name="position" sortable :sort-array="sortArray" :label="$t('Position')"></item-list-column-header>
                    <item-list-column-header name="image" :label="$t('Image')"></item-list-column-header>
                    <item-list-column-header name="title_translated" sortable :sort-array="sortArray" :label="$t('Title')"></item-list-column-header>
                </template>

                <template slot="table-row" slot-scope="{ model, checkedModels, loading }">
                    <td class="checkbox" v-if="$can('update page_sub_sections')||$can('delete page_sub_sections')"><item-list-checkbox :model="model" :checked-models-prop="checkedModels" :loading="loading"></item-list-checkbox></td>
                    <td v-if="$can('update page_sub_sections')">@include('core::admin._button-edit', ['segment' => 'subsections', 'module' => 'subsections'])</td>
                    <td><item-list-status-button :model="model"></item-list-status-button></td>
                    <td><item-list-position-input :model="model"></item-list-position-input></td>
                    <td><img :src="model.thumb" alt="" height="27"></td>
                    <td v-html="model.title_translated"></td>
                </template>

            </item-list>
        @else
            <p class="alert alert-info">{{ __('Save this page first, then add sections.') }}</p>
        @endif
    @endcan
</div>
