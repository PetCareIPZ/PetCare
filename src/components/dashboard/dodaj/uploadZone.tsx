import "@uploadthing/react/styles.css";
import { UploadButton, UploadDropzone} from '~/utils/uploadthing'

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
    
                input.value = res?.[0]?.ufsUrl!;
                window.alert("Sukces" + res?.[0]?.ufsUrl);
            }}
            
            onUploadError={(error: Error) => 
                window.alert(`ERROR! ${error.message}`)
            }
        />
    </div>
  )
}