interface AvatarProps {
  firstName: string;
  lastName: string;
  imgUrl?: string;
  colorVariant?: keyof typeof avatarColors | string;
  customWidth?: string;
  customHeight?: string;
  customFontSize?: string; // must be on the tailwind config like text-h3
}

export const avatarColors = {
  darkblue: 'bg-pm-50 text-pm-500',
  purple: 'bg-sys-pr50 text-pr-600',
  green: 'bg-sys-gr50 text-sys-gr600',
  lightblue: 'bg-sys-bl50 text-sys-bl600',
  red: 'bg-sys-rd50 text-sys-rd600',
  secondary: 'bg-sd-50 text-sd-500',
  neutral: 'bg-nt-100 text-nt-300',
};

const Avatar: React.FC<AvatarProps> = ({
  firstName,
  lastName,
  imgUrl,
  colorVariant = 'lightblue',
  customWidth,
  customHeight,
  customFontSize,
}) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  // Check if colorVariant is a valid key in avatarColors
  const colorClass =
    colorVariant in avatarColors
      ? avatarColors[colorVariant as keyof typeof avatarColors]
      : avatarColors.lightblue;

  return (
    <div
      className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${colorClass}`}
      style={{
        width: customWidth || '32px',
        height: customHeight || '32px',
      }}
    >
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <p className={customFontSize || 'text-caption-str'}>
          {getInitials(firstName, lastName)}
        </p>
      )}
    </div>
  );
};

export default Avatar;
