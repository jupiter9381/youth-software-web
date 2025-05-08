import SvgColorChanger from '../../functions/SvgColorChanger';
// import SvgColorChanger from "./SvgColorChanger";

interface TextContentProps {
  caption: string; // Caption text
  content: string; // Main content text
  svgPath?: string; // Optional path to the SVG icon
  hoverColor?: string; // Color of the SVG icon on hover (default is red)
  layout?: 'vertical' | 'horizontal'; // Layout type, either "vertical" or "horizontal"
  textStyle?: string; //need this so that we can set other than text-body-small reg
  children?: React.ReactNode;
  isNotTruncate?: boolean;
}

const TextContent = ({
  caption,
  content,
  svgPath,
  hoverColor = '#FA1D6D',
  layout = 'vertical',

  textStyle,
  children,
  isNotTruncate = false,
}: TextContentProps) => {
  return (
    <div
      className={`flex ${layout === 'vertical' ? 'flex-col items-start' : 'flex-row items-center'} gap-2 w-auto`}
    >
      <p
        className={`text-caption-all-caps uppercase text-nt-400 ${layout === 'horizontal' ? 'w-[124px]' : ''}`}
      >
        {caption}
      </p>

      <div
        className={`flex items-center ${layout === 'horizontal' ? 'gap-2' : 'gap-1'} flex-1 min-w-0 w-full`}
      >
        {svgPath && (
          <SvgColorChanger svgPath={svgPath} strokeColor={hoverColor} />
        )}
        {children && children}
        <p
          className={`${textStyle ? textStyle : 'text-body-small-reg text-nt-900'} ${!isNotTruncate ? 'truncate' : ''} ${
            caption === 'Email' &&
            'max-[430px]:max-w-[250px] max-[380px]:max-w-[230px]'
          }`}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default TextContent;
