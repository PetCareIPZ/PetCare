"use client";

import { UploadDropzone } from '~/utils/uploadthing';

export function UploadZoneWidget({ existingImageUrl }: { existingImageUrl: string }) {
  return (
    <div>
      <input 
        type="hidden" 
        name="imageUrl" 
        id="imageUrlId" 
        defaultValue={existingImageUrl}
      />
      
      <UploadDropzone
        endpoint="imageUploader"
        appearance={{
          container: "border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-xl p-8",
          button: "ut-ready:bg-blue-600 bg-blue-600 rounded-lg px-4 py-2 text-sm font-semibold",
          label: "text-blue-600 font-medium",
          allowedContent: "text-gray-400 text-xs mt-1"
        }}
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          const input = document.getElementById(
            'imageUrlId'
          ) as HTMLInputElement;

          if (!res || res.length === 0) {
            window.alert("Nie udało się przesłać pliku.");
            return;
          }
          if (input && res[0]) {
            input.value = res[0].ufsUrl ?? "/svg/no-image.svg";
          }
        }}
        onUploadError={(error: Error) => 
          window.alert(`Błąd podczas wysyłania: ${error.message}`)
        }
      />
    </div>
  );
}