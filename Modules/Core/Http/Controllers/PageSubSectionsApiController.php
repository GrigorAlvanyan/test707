<?php

namespace TypiCMS\Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use TypiCMS\Modules\Core\Filters\FilterOr;
use TypiCMS\Modules\Core\Http\Requests\PageSectionFormRequest;
use TypiCMS\Modules\Core\Models\Page;
use TypiCMS\Modules\Core\Models\PageSection;
use TypiCMS\Modules\Core\Models\PageSubSection;

class PageSubSectionsApiController extends BaseApiController
{
    public function index(page $page, PageSection $section, Request $request): LengthAwarePaginator
    {
//        dd($request->all());
        $data = QueryBuilder::for(PageSubSection::class)
            ->selectFields($request->input('fields.page_sub_sections'))
            ->allowedSorts(['status_translated', 'position', 'title_translated'])
            ->allowedFilters([
                AllowedFilter::custom('title', new FilterOr()),
            ])
            ->allowedIncludes(['image'])
            ->where('section_id', $section->id)
            ->paginate($request->input('per_page'));

        return $data;
    }

    protected function updatePartial(Page $page, PageSection $section, PageSubSection $subSection,  Request $request)
    {

        foreach ($request->only('status', 'position') as $key => $content) {
            if ($subSection->isTranslatableAttribute($key)) {
                foreach ($content as $lang => $value) {
                    $section->setTranslation($key, $lang, $value);
                }
            } else {
                $subSection->{$key} = $content;
            }
        }

        $subSection->save();
    }

    public function destroy(Page $page, PageSection $section, PageSubSection $subSection)
    {
        $subSection->delete();
    }
}
