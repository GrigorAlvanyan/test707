<?php

namespace TypiCMS\Modules\Core\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use TypiCMS\Modules\Core\Http\Requests\PageSubSectionFormRequest;
use TypiCMS\Modules\Core\Models\Page;
use TypiCMS\Modules\Core\Models\PageSection;
use TypiCMS\Modules\Core\Models\PageSubSection;

class PageSubSectionsAdminController extends BaseAdminController
{
    public function create(Page $page,PageSection $section): View
    {
        $model = new PageSubSection();

        return view('pages::admin.create-sub-section')
            ->with(compact('model', 'page', 'section'));
    }

    public function edit(Page $page, PageSection $section, PageSubSection $subsection): View
    {
        return view('pages::admin.edit-sub-section')
            ->with([
                'page' => $page,
                'model' => $subsection,
                'section' => $section,
            ]);
    }

    public function store(Page $page, PageSection $section, PageSubSectionFormRequest $request): RedirectResponse
    {
        $subSection = PageSubSection::create($request->validated());

        return $this->redirect($request, $subSection)
            ->withMessage(__('Item successfully created.'));
    }

    public function update(Page $page, PageSection $section, PageSubSection $subsection, PageSubSectionFormRequest $request): RedirectResponse
    {

        $subsection->update($request->validated());

        return $this->redirect($request, $subsection)
            ->withMessage(__('Item successfully updated.'));
    }
}
