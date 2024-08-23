import { useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { UPLOAD_IMAGE } from "@/queries";

const FileUploader = ({ isDialogOpen, closeDialog }) => {
  const [updateImage] = useMutation(UPLOAD_IMAGE);
  const [image, setImage] = useState({});
  const fileRef = useRef(null);

  const handleFileClick = () => {
    console.log(fileRef.current);
    if (fileRef.current) fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    console.log("Selected file:", file);
    if (file && file.type.startsWith("image")) {
      console.log("File meets criteria, reading...");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage({
          mimetype: file.type,
          data: reader.result,
        });
      };
    } else {
      console.log("File does not meet criteria");
    }
  };

  const handleFileChangeConfirm = () => {
    updateImage({ variables: { file: image, empId: 4 } });
    closeDialog();
  };

  return (
    <div>
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Profile Image</DialogTitle>

            <DialogClose
              className=" absolute left-[94%] top-[2%]"
              onClick={closeDialog}
            >
              <X className="w-5 h-5" />
            </DialogClose>
          </DialogHeader>
          <div className=" p-6 flex flex-col gap-6 items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gray-200"></div>
            <div className="flex gap-2">
              <Button onClick={handleFileClick}>Upload</Button>
              <Button onClick={handleFileChangeConfirm} variant={"outline"}>
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <input type={"file"} hidden ref={fileRef} onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
