import { Link } from 'react-router-dom';
import { ButtonPrimary } from '@/components';

function Error404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/" replace={true}>
        <ButtonPrimary color="primary-blue">Kembali ke Beranda</ButtonPrimary>
      </Link>
    </div>
  );
}

export default Error404;
