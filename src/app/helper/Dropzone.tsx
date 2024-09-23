import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { commonFileUpload } from "../services/_requests";
function MyDropzone({ onSendData }) {
    const dispatch: any = useDispatch();
    const onDrop = useCallback((acceptedFiles) => {
       (async () => {
         let returnedArray = await uploadImages(acceptedFiles);
         const updatedArr = returnedArray.map(item => item.replace('/uploads', 'uploads'));
         onSendData(updatedArr);
       })();
    }, []);


    const { getRootProps, acceptedFiles, getInputProps, isDragActive } = useDropzone({ onDrop });

    const filesData = () => {
        return acceptedFiles?.map((file: any) => (
            <li className="list" key={file.path}>
                {file.name}
            </li>
        ));
    }

    const uploadImages = async (acceptedFiles: any) => {
      let localCoverImages: any = [];
      for (const image of acceptedFiles) {
        let formData = new FormData();
        formData.append(`image`, image);
        try {
          const res = await commonFileUpload(formData);
          if (res.data.responseCode === 200) {
            const item = res.data.data.url;
            localCoverImages.push(item);
          }
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }

      if (localCoverImages.length) {
        return localCoverImages;
      }
      return [];
    };


    return (
        <section className="container-fluid px-0">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
            {/* <aside>
                {filesData()}
            </aside> */}
        </section>
    );
}

export { MyDropzone };
