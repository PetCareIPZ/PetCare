import { UploadButton, UploadDropzone} from '~/utils/uploadthing'

export function UploadZoneWidget() {
  return (
    <div>
        <input type="hidden" name="imageUrl" id="imageUrlId"/>
        <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                const input = document.getElementById(
                    'imageUrlId'
                ) as HTMLInputElement
    
                input.value = res?.[0]?.ufsUrl!;
                window.alert("Sukces" + res?.[0]?.ufsUrl);
            }}
            
            onUploadError={(error: Error) => {
                // Do something with the error.
                window.alert(`ERROR! ${error.message}`);
            }}
        />
    </div>
  )
}