import Edit from '../assets/outline/component_type/Edit';
import Trash from '../assets/outline/component_type/Trash';

type BrandingImageSectionProps = {
  imageType: 'logo' | 'favicon';
  imageUrl: string;
  onRemove?: (type: 'logo' | 'favicon') => void;
  onUpdate?: () => void;
};

const BrandingImageSection = ({
  imageType,
  imageUrl,
  onRemove,
  onUpdate,
}: BrandingImageSectionProps) => {
  const extractFileName = (url: string) => {
    const pathParts = url.split('/');
    return pathParts[pathParts.length - 1];
  };

  return (
    <div className="bg-white flex flex-row w-full">
      <div
        className={`flex flex-row  gap-2 items-center px-5 py-3 ${
          onRemove || onUpdate
            ? 'border border-r-0 border-nt-200 w-9/12 rounded-l-lg '
            : 'border border-nt-200 w-full rounded-lg '
        }`}
      >
        <img src={imageUrl} alt={`${imageType} logo`} className="h-6 w-6" />
        <p className="text-body-small-str overflow-hidden text-ellipsis whitespace-nowrap">
          {extractFileName(imageUrl)}
        </p>
      </div>
      {onRemove && (
        <div
          className="flex w-3/12 items-center justify-center rounded-r-lg border border-dashed border-nt-300 bg-nt-50 hover:bg-nt-100"
          onClick={() => onRemove(imageType)} // Call onRemove with the image type
        >
          <Trash hoverColor="#0046FA" />
        </div>
      )}
      {onUpdate && (
        <div
          className="flex w-3/12 items-center justify-center rounded-r-lg border border-dashed border-nt-300 bg-nt-50 hover:bg-nt-100"
          onClick={onUpdate} // Call onRemove with the image type
        >
          <Edit hoverColor="#0046FA" />
        </div>
      )}
    </div>
  );
};

export default BrandingImageSection;
