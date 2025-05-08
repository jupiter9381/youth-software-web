import { Link } from 'react-router-dom';

import Home from '../assets/16px/Home.svg';

interface BreadcrumbTypes {
  label: string;
  path: string;
  disableClick?: boolean;
}

const Breadcrumbs = (props: { breadcrumbs: BreadcrumbTypes[] }) => {
  const defaultBreadcrumbs: BreadcrumbTypes[] = [
    { label: 'Home', path: '/', disableClick: false },
    ...props.breadcrumbs,
  ];

  return (
    <nav className="flex items-center space-x-2 text-gray-700">
      {defaultBreadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center">
          {index === 0 ? (
            <Link to={breadcrumb.path}>
              <img src={Home} alt={breadcrumb.label} />
            </Link>
          ) : !breadcrumb.disableClick ? (
            <Link
              to={breadcrumb.path}
              className={`text-caption-reg ${
                defaultBreadcrumbs.length - 1 === index
                  ? 'text-nt-250'
                  : 'text-nt-500'
              }`}
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <span
              className={`text-caption-reg ${
                defaultBreadcrumbs.length - 1 === index
                  ? 'text-nt-250'
                  : 'text-nt-500'
              }`}
            >
              {breadcrumb.label}
            </span>
          )}
          {index < defaultBreadcrumbs.length - 1 && (
            <span className="mx-2 text-nt-200">/</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
