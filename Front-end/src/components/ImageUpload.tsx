import { useState } from 'react';
import TrashIcon from '../assets/outline/Trash.svg';
import UploadIcon from '../assets/outline/Arrow-up-tray.svg';
import PhotoIcon from '../assets/filled/Photo.svg';
import SvgColorChanger from '../functions/SvgColorChanger';

interface ImageUploadProps {
  label?: string;
  onFileChange: (file: File | null) => void;
}

const ImageUpload = ({ label = 'Upload', onFileChange }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileChange(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileChange(null);
  };

  return (
    <div className="h-12 w-85 bg-nt-50 rounded-lg items-center justify-between">
      {!file ? (
        <label className="flex w-full border-dashed border-1 border-nt-200 items-center h-full w-[340px] justify-center cursor-pointer bg-nt-50 rounded-md text-nt-300 hover:bg-nt-100 transition-colors">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex items-center gap-3">
            <span className="text-caption-reg">Drag the image here or</span>
            <div className="flex flex-row gap-2">
              <SvgColorChanger svgPath={UploadIcon} strokeColor="#0046FA" />
              <span className="text-pm-500 text-body-small-str">{label}</span>
            </div>
          </div>
        </label>
      ) : (
        <div className="flex items-center justify-between h-full w-[340px] rounded-lg ">
          <div className="flex border-2 px-2 border-nt-200 items-center h-full gap-2 rounded-tl-lg rounded-bl-lg border-r-0">
            <img src={PhotoIcon} alt="Thumbnail" />
            <span className="text-body-small-str text-nt-700 truncate w-full overflow-hidden whitespace-nowrap">
              {file.name}
            </span>
          </div>
          <button
            onClick={handleRemoveFile}
            className="h-full border-dashed border-2 border-nt-200 rounded-tr-lg rounded-br-lg px-4 py-2 text-nt-300 hover:text-red-600 transition-colors"
            aria-label="Remove file"
          >
            <img src={TrashIcon} alt="Trash" className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
