import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ArrowUp from '../assets/outline/component_type/ArrowUp';

interface DragImageUploadProps {
  imageDetails: {
    data: File | null;
    setImageDetails: (file: File | null) => void;
  };
  note?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

function truncateFileNameCenter(name: any, maxLength = 20) {
  // Find the last dot to separate extension
  const dotIndex = name.lastIndexOf('.');
  let baseName = name;
  let extension = '';

  // Extract extension if it exists (e.g. ".png")
  if (dotIndex !== -1) {
    baseName = name.substring(0, dotIndex);
    extension = name.substring(dotIndex);
  }

  // If it's already short enough, return as is
  if (baseName.length + extension.length <= maxLength) {
    return name;
  }

  // We want to keep the extension, so reduce from `maxLength` first
  const maxBaseLength = maxLength - extension.length;

  // For a center ellipsis, split the maxBaseLength in half
  // This ensures we keep some chars at the start & some at the end
  // before adding the ellipsis in the middle.
  const frontChars = Math.ceil(maxBaseLength / 2);
  const backChars = Math.floor(maxBaseLength / 2);

  const frontPart = baseName.substring(0, frontChars);
  const backPart = baseName.substring(baseName.length - backChars);

  return `${frontPart}...${backPart}${extension}`;
}

const DragImageUpload = ({
  imageDetails,
  note,
  error,
  helperText,
  disabled = false,
}: DragImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (disabled) return; // Safeguard if onDrop is called while disabled

    const file = acceptedFiles[0];
    if (file) {
      setFileType(file.type);

      if (file.type === 'image/x-icon') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }

      imageDetails.setImageDetails(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/gif': [],
      'image/svg+xml': [],
      'image/x-icon': ['.ico'],
    },
    noClick: disabled,
    noDrag: disabled,
  });

  useEffect(() => {
    if (imageDetails.data) {
      const file = imageDetails.data;
      if (file.type === 'image/x-icon') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }
    } else {
      // If no file is present, reset preview
      setPreview(null);
      setFileType(null);
    }
  }, [imageDetails.data]);

  return (
    <div className="flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`
    border-2 border-dashed rounded-lg w-full transition-colors duration-300 
    ${
      disabled
        ? // When disabled: lock pointer & use bg-nt-100
          'cursor-not-allowed bg-nt-100 border-nt-200'
        : isDragActive
          ? // When dragging:
            'cursor-pointer border-pm-500 bg-pm-50'
          : error
            ? // When there's an error:
              'cursor-pointer border-sys-rd600 bg-sys-rd50'
            : // Default active state:
              'cursor-pointer border-nt-200 bg-white'
    }
  `}
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-center px-[16px] py-[8px] gap-2">
          {isDragActive ? (
            <span
              className={`text-caption-reg text-center ${disabled ? 'text-nt-250' : 'text-nt-300'}`}
            >
              Drop the file here...
            </span>
          ) : !preview ? (
            <>
              <span className="text-caption-reg text-center text-nt-300">
                {note || 'Drag your image here'}
              </span>
              <span
                className={`text-body-small-str flex items-center gap-[8px] p-2 ${
                  disabled ? 'text-nt-250' : 'text-pm-500'
                }`}
              >
                <ArrowUp color={disabled ? '#C6CBD9' : '#0046FA'} />
                Upload
              </span>
            </>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {imageDetails.data?.name && (
                <span className="text-caption-reg text-center text-nt-300">
                  {truncateFileNameCenter(imageDetails.data.name, 20)}
                </span>
              )}
              {preview &&
                (fileType === 'image/x-icon' ? (
                  <object
                    data={preview}
                    type="image/x-icon"
                    className="h-10 w-10"
                  >
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-10 object-cover rounded"
                    />
                  </object>
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-10 object-cover rounded"
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      {helperText && (
        <div className="w-full">
          <p
            className={`mt-1 text-caption-reg ${error ? 'text-sys-rd600' : 'text-nt-700'}`}
          >
            {helperText}
          </p>
        </div>
      )}
    </div>
  );
};

export default DragImageUpload;
