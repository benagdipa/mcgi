<?php

namespace App\Http\Controllers;

use App\Models\BannerImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function admin_banner_index()
    {
    
            // Access authenticated user's ID
            
          
            // You can now use $userId as needed
        
        $imageData = BannerImage::select('id', 'title', 'bannerpath')->where('userId', $userId)->get()->toArray();
    
        // // Construct the URLs for the images using the base URL and image paths
        // $imageUrls = array_map(function ($imageData) {
        //     return Storage::url('uploads/' . $imageData[0]); // Assuming bannerpath is the first item in the array
        // }, $imageData);
        
        // // Extract titles and IDs from the array
        // $imageTitles = array_column($imageData, 1); // Assuming title is the second item in the array
        // $imageIds = array_keys($imageData);
        $ids=[];
        $titles=[];
        $bannerpath=[];
        $imageUrls=[];
        foreach ($imageData as $image) {
    $ids[] = $image['id'];
    $titles[] = $image['title'];
    $bannerpath[] = $image['bannerpath'];
    $imageUrls[] = Storage::url('uploads/' . $image['bannerpath']);
    // Use $id, $title, and $bannerpath as needed
 
}

        return Inertia::render('Banner/BannerAdmin', [
            'banners' => $imageUrls,
            'titles'=>$titles,
            'ids'=>$ids
        ]);
    }

    public function admin_banner_store(Request $request)
    {
       
        $data=$request->validate([
            'banners.*' => 'image|mimes:jpeg,png,webp,jpg,gif|max:2048',
            'title'=>'required|string|max:255',
        ]);
     
       if (auth()->check()) {
        // Access authenticated user's ID
        $userId = auth()->id();
    
        // Loop through each uploaded file
        foreach ($data['banners'] as $file) {
            $fileName = time() . '_'  . $file->getClientOriginalName();
            $file->storeAs('public/uploads', $fileName);
    
            // Check if there's an existing upload for the user and delete it
            // $oldUpload = BannerImage::where('userId', $userId)->first();
            // if ($oldUpload) {
            //     Storage::delete('uploads/' . $oldUpload->bannerpath);
            //     $oldUpload->delete();
            // }
    
            // Save the new upload record
            $upload = new BannerImage;
            $upload->bannerpath = $fileName;
            $upload->userid = $userId;
            $upload->title=$data['title'];
            // Add other file details like size, type if necessary
            $upload->save();
        }
    } 
    else {
        // User is not authenticated
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

}


