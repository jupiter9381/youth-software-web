// assets
import { useEffect, useState } from 'react';
import BannerIllustration from '../assets/logos&Illustrations/BannerIllustration.svg';
import Close from '../assets/outline/component_type/Close';

const Banner = (props: {
  contents?: string;
  upgradeAction: () => void;
  closeAction: () => void;
  orientation: 'vertical' | 'horizontal';
  fullScreenWidth?: boolean;
}) => {
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (props.fullScreenWidth) {
        // Only hide if width is below 550px when fullScreenWidth is true
        setShowImage(window.innerWidth >= 550);
      } else {
        // Default behavior: hide if width is below 1230px
        setShowImage(window.innerWidth >= 1230);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [props.fullScreenWidth]);
  return (
    <div className="h-full">
      <div
        className={`flex ${
          props.orientation === 'vertical' ? 'flex-col' : 'flex-row'
        } justify-between h-full relative bg-pm-50 rounded-2xl overflow-hidden`}
      >
        <div className="absolute z-50 top-5 right-5">
          <Close
            color="#9497A3"
            hoverColor="#0046FA"
            onClick={props.closeAction}
          />
        </div>

        <div className="p-9 flex flex-col gap-5 relative z-0">
          <div className="flex flex-col gap-4">
            <h3>Upgrade to business</h3>
            <span className="text-body-base-reg text-nt-700">
              {props.contents}
            </span>
          </div>
          <div
            className={`flex ${props.orientation === 'vertical' && 'justify-center'} relative z-10`}
          >
            <button
              className={`secondary-btn ${
                props.orientation === 'vertical' ? 'base-btn' : 'small-btn'
              } relative z-10`}
              onClick={props.upgradeAction}
            >
              <span className="text-body-small-str">Upgrade Now</span>
            </button>
          </div>
        </div>

        {props.fullScreenWidth
          ? showImage && (
              <img
                src={BannerIllustration}
                className={`${props.orientation === 'horizontal' && 'h-[220px]'} z-0`}
              />
            )
          : showImage && (
              <div
                className={`${props.orientation === 'horizontal' && 'absolute bottom-2 -right-5'} z-0`}
              >
                <img
                  src={BannerIllustration}
                  className={`${props.orientation === 'horizontal' && 'h-32'} z-0`}
                />
              </div>
            )}
      </div>
    </div>
  );
};

export default Banner;
