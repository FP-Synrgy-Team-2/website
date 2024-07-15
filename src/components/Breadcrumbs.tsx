import {FC} from 'react';
import { Link } from 'react-router-dom';

type BreadCrumbProps = {
    breadcrumbs: { label: string; path?: string }[];
}
const Breadcrumbs : FC<BreadCrumbProps> = ({ breadcrumbs }) => {
  return (
    <div className="text-4xl font-normal">
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
