import "@uploadthing/react/styles.css";
import {UploadDropzone} from '~/utils/uploadthing'

export function UploadZoneWidget({existingImageUrl}: {existingImageUrl: string}) {
  return (
    <div>
        <input type="hidden" name="imageUrl" id="imageUrlId" defaultValue={existingImageUrl}/>
        <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                const input = document.getElementById(
                    'imageUrlId'
                ) as HTMLInputElement
    
                input.value = res[0]?.ufsUrl!;
            }}
            
            onUploadError={(error: Error) => 
                window.alert(`Błąd podczas wysyłania: ${error.message}`)
            }
        />
    </div>
  )
}