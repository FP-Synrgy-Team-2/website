import { Link } from 'react-router-dom';
import { Button } from '@/components';

function Error404() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/" replace={true}>
        <Button color="primary-blue">Kembali ke Beranda</Button>
      </Link>
    </div>
  );
}

export default Error404;
