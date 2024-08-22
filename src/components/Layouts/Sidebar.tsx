import { Link, useLocation } from 'react-router-dom';
import { NavbarLogo } from '@/components';
import useAuth from '@/hooks/useAuth';
import { useState } from 'react';
interface NavbarType {
  name: string;
  icon: string;
  link: string;
  className?: string;
  alt?: string;
}

function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navbar: NavbarType[] = [
    {
      name: 'Beranda',
      icon: '/images/icons/home.svg',
      link: '/dashboard',
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

  return (
    <>
      <div
        className={`fixed flex h-full w-1/6 flex-col pb-16 pe-6 transition-transform ease-in-out sm:top-0 sm:z-50 sm:w-52 sm:bg-white ${isOpen ? 'sm:translate-x-0' : 'sm:-translate-x-full'}`}
      >
        <div className="ms-3 sm:flex sm:justify-center">
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
                } ${item.className ?? ''}`}
                aria-label={'Tombol ' + item.name}
                role="link"
              >
                <img
                  src={item.icon}
                  className={`${isActive ? 'img-white' : ''}`}
                />
                <span className="body-md">{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={logout}
            className={`sidebar-item body-md mt-auto flex items-center gap-5 rounded-md p-3 hover:bg-danger hover:text-white sm:mt-0`}
            aria-label="Keluar"
          >
            <img src="/images/icons/arrow-right.svg" alt="Logo Keluar" />
            <span className="body-md">Keluar</span>
          </button>
        </div>
      </div>

      <button
        className={`fixed bottom-10 left-5 z-50 hidden h-12.5 w-12.5 rounded-full bg-primary-blue font-bold transition-transform duration-300 sm:block ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center">
          <img
            src={
              isOpen
                ? '../images/icons/close-icon.svg'
                : '../images/icons/list.svg'
            }
            alt={isOpen ? 'Close Menu' : 'Open Menu'}
            className="h-10 w-10"
          />
        </div>
      </button>
    </>
  );
}

export default Sidebar;
