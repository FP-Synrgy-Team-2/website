import { cn } from '@/utils';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type BreadCrumbProps = {
  breadcrumbs: { label: string; path?: string }[];
  style?: string;
};

const Breadcrumbs: FC<BreadCrumbProps> = ({ breadcrumbs, style }) => {
  return (
    <div
      className={cn(
        style,
        'mb-10 text-md-display font-normal capitalize sm:mx-4 sm:mb-4 sm:text-sm-display'
      )}
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index}>
          {index > 0 && <span className="separator">{' > '}</span>}
          {breadcrumb.path ? (
            <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
          ) : (
            <span>{breadcrumb.label}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
