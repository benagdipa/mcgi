<?php

namespace App\Http\Controllers;

use App\Models\BannerImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BannerController extends Controller
{
    public function admin_banner_index()
    {
        $imageData = BannerImage::select('id', 'title', 'bannerpath', 'position')
            ->orderBy('position', 'asc')
            ->get()
            ->sortBy(function ($image) {
                return $image->position == 0 ? PHP_INT_MAX : $image->position;
            })
            ->map(function ($image) {
                return [
                    'id' => $image->id,
                    'title' => $image->title,
                    'bannerpath' => Storage::url('uploads/' . $image->bannerpath),
                    'position' => $image->position
                ];
            });
        $imageDataArray = $imageData->values()->toArray();
        return Inertia::render('Banner/BannerAdmin', [
            'banners' => $imageDataArray,
        ]);
    }

    public function admin_banner_store(Request $request)
    {
        $data = $request->validate([
            'banners' => ['required', 'max:2048'],
            'title' => 'required|string|max:255',
        ]);

        if (auth()->check()) {
            $userId = auth()->id();
            foreach ($data['banners'] as $file) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('public/uploads', $fileName);
                $upload = new BannerImage;
                $upload->bannerpath = $fileName;
                $upload->userid = $userId;
                $upload->title = $data['title'];
                $upload->save();
            }
        }
    }


    public function admin_banner_delete($id)
    {
        $banner = BannerImage::findOrFail($id);

        if ($banner) {
            $banner->delete();
            return to_route('admin.banner.index');
        }
    }

    public function admin_banner_reorder(Request $request, $id)
    {
        $banner = BannerImage::findOrFail($id);
        if ($banner) {
            $banner->update([
                'position' => $request->position
            ]);
        }
    }

    public function admin_banner_reorder_all(Request $request)
    {
        $positions = $request->validate([
            'positions' => 'required|array',
            'positions.*.id' => 'required|exists:banner_images,id',
            'positions.*.position' => 'required|integer|min:1'
        ]);

        // Use database transaction to ensure all updates succeed or none do
        DB::beginTransaction();
        try {
            foreach ($positions['positions'] as $item) {
                BannerImage::where('id', $item['id'])->update(['position' => $item['position']]);
            }
            DB::commit();
            return response()->json(['success' => true, 'message' => 'Banner positions updated successfully']);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'Failed to update banner positions'], 500);
        }
    }

}


