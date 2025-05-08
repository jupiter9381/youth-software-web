import SearchIcon from '../assets/outline/Search.svg';
import SvgColorChanger from '../functions/SvgColorChanger';

interface SearchInputProps {
  placeholder: string;
  type: 'global' | 'local'; // Type of search input,
  width?: string;
  value?: any;
  onChange?: (value: string) => void;
}

const SearchInput = ({
  placeholder,
  type,
  width,
  value,
  onChange,
}: SearchInputProps) => {
  let widthClass = '';
  if (width === 'none') {
    widthClass = '';
  } else if (width === 'sm') {
    widthClass = 'w-64';
  } else if (width === 'md') {
    widthClass = 'w-80';
  } else if (width === '' || undefined || null) {
    widthClass = '';
  } else {
    widthClass = 'w-auto';
  }

  return (
    <div
      className={`flex items-center gap-2 ${widthClass ? widthClass : ''} h-10 ${
        type === 'local' ? 'border border-nt-200 rounded-full p-2 pl-4 ' : ''
      }`}
    >
      <SvgColorChanger svgPath={SearchIcon} strokeColor="#DBDEE7" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={`outline-none bg-transparent text-nt-900 text-body-small-reg placeholder-nt-300`}
        {...(onChange ? { onChange: (e) => onChange(e.target.value) } : {})}
      />
    </div>
  );
};

export default SearchInput;
