import { Link, useLocation } from 'react-router-dom';
import { NavbarLogo } from '@/components';
import useAuth from '@/hooks/useAuth';

interface NavbarType {
  name: string;
  icon: string;
  link: string;
  className?: string;
  alt?: string;
}

function Sidebar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navbar: NavbarType[] = [
    {
      name: 'Beranda',
      icon: '/images/icons/home.svg',
      link: '/',
      alt: 'Logo Beranda',
    },
    {
      name: 'Transfer',
      icon: '/images/icons/sort-arrow.svg',
      link: '/transfer',
      alt: 'Logo Transfer',
    },
    {
      name: 'Mutasi',
      icon: '/images/icons/print.svg',
      link: '/history',
      alt: 'Logo Mutasi',
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed flex h-full w-1/6 flex-col pb-16 pe-6">
      <div className="ms-3">
        <NavbarLogo />
      </div>

      <div className="mt-8 flex grow flex-col">
        {navbar.map((item, index) => {
          const isActive: boolean = location.pathname === item.link;

          return (
            <Link
              to={item.link}
              key={index}
              className={`sidebar-item body-md flex items-center gap-5 rounded-md p-3 ${
                isActive
                  ? 'bg-primary-blue text-white'
                  : 'hover:bg-primary-dark-blue hover:text-white'
              } ${item.className ? item.className : ''}`}
              aria-label={'Tombol ' + item.name}
            >
              <img
                src={item.icon}
                aria-hidden={true}
                className={`${isActive ? 'img-white' : ''}`}
              />
              <span className="body-md" aria-hidden={true}>
                {item.name}
              </span>
            </Link>
          );
        })}

        <button
          onClick={logout}
          className={`sidebar-item body-md mt-auto flex items-center gap-5 rounded-md p-3 hover:bg-danger hover:text-white`}
        >
          <img
            src="/images/icons/arrow-right.svg"
            alt="Logo Keluar"
            aria-hidden={true}
          />
          <span className="body-md" aria-hidden={true}>
            Keluar
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
