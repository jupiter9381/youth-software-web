export interface IconProps {
  color?: string; // Default stroke color of the icon
  hoverColor?: string; // Optional hover color
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  isHovered?: boolean;
  width?: string; // Optional width for the SVG
  height?: string; // Optional height for the SVG
}
