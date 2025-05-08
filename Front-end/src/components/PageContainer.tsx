import { ReactNode, useEffect, useRef, useState } from 'react';

const PageContainer = (props: { header?: ReactNode; children: ReactNode }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [paddingRight, setPaddingRight] = useState<number>(0);

  useEffect(() => {
    const adjustPadding = () => {
      const content = contentRef.current;
      if (content) {
        const hasScrollbar = content.scrollHeight > content.clientHeight;
        setPaddingRight(
          hasScrollbar ? content.offsetWidth - content.clientWidth : 0,
        );
      }
    };

    adjustPadding(); // Initial adjustment
    window.addEventListener('resize', adjustPadding); // Recalculate on resize

    return () => window.removeEventListener('resize', adjustPadding);
  }, []);
  return (
    <div className="flex h-[calc(90vh+10px)]  w-full">
      <div className="w-full p-10 pt-8 pb-0 flex flex-col gap-5">
        {props.header && <>{props.header}</>}
        {/* content */}
        <div
          ref={contentRef}
          className=" h-full w-full overflow-y-auto overflow-x-hidden scrollbar-transparent"
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            scrollbarWidth: 'thin', // For Firefox
            paddingRight: paddingRight, // Dynamic padding
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PageContainer;
