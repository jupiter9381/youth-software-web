import { useEffect, useState } from 'react';

interface SvgColorChangerProps {
  svgPath: string; // Path to the SVG file
  strokeColor: string; // Color to change the stroke to
  width?: string; // Optional width for the SVG
  height?: string; // Optional height for the SVG
}

const SvgColorChanger = ({
  svgPath,
  strokeColor,
  width,
  height,
}: SvgColorChangerProps) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const fetchSvg = async () => {
      const response = await fetch(svgPath);
      const svgText = await response.text();
      const updatedSvg = changeStrokeColor(svgText, strokeColor);
      setSvgContent(updatedSvg);
    };

    fetchSvg();
  }, [svgPath, strokeColor]);

  const changeStrokeColor = (svgString: string, color: string): string => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
    const paths = svgDoc.querySelectorAll('path');

    paths.forEach((path) => {
      path.setAttribute('stroke', color);
    });

    const svgElement = svgDoc.querySelector('svg');
    if (svgElement) {
      if (width) svgElement.setAttribute('width', width);
      if (height) svgElement.setAttribute('height', height);
    }

    return new XMLSerializer().serializeToString(svgDoc);
  };

  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

export default SvgColorChanger;
