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
    
                if(!res || res.length === 0){
                    window.alert("Nie udało się przesłać pliku.")
                    return;
                }
                if(input && res[0]) {
                    input.value = res[0].ufsUrl ?? "/svg/no-image.svg";
                }
            }}
            
            onUploadError={(error: Error) => 
                window.alert(`Błąd podczas wysyłania: ${error.message}`)
            }
        />
    </div>
  )
}