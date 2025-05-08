import { useEffect, useState } from 'react';

interface SvgFillColorChangerProps {
  svgPath: string; // Path to the SVG file
  fillColor: string; // Color to change the fill to
}

const SvgFillColorChanger = ({
  svgPath,
  fillColor,
}: SvgFillColorChangerProps) => {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const fetchSvg = async () => {
      const response = await fetch(svgPath);
      const svgText = await response.text();
      const updatedSvg = changeFillColor(svgText, fillColor);
      setSvgContent(updatedSvg);
    };

    fetchSvg();
  }, [svgPath, fillColor]);

  const changeFillColor = (svgString: string, color: string): string => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
    const paths = svgDoc.querySelectorAll('path');

    paths.forEach((path) => {
      path.setAttribute('fill', color);
    });

    return new XMLSerializer().serializeToString(svgDoc);
  };

  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
};

export default SvgFillColorChanger;
