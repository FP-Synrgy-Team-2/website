import { Link, useLocation } from 'react-router-dom';
import { NavbarLogo } from '@/components';
import useAuth from '@/hooks/useAuth';
import { memo, useState } from 'react';
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
        className={`flex h-full max-w-[200px] flex-col px-3 pb-16 pt-4 shadow-md transition-transform ease-in-out md:fixed md:top-0 md:z-50 md:w-52 md:bg-white ${isOpen ? 'md:translate-x-0' : 'md:-translate-x-full'}`}
      >
        <div className="ms-3 md:flex md:justify-center">
          <NavbarLogo />
        </div>

        <div className="mt-8 flex grow flex-col">
          {navbar.map((item, index) => {
            const isActive: boolean = location.pathname === item.link;

            return (
              <Link
                to={item.link}
                key={index}
                className={`sidebar-item flex items-center gap-[10%] rounded-md p-3 ${
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
                <span>{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={logout}
            className={`sidebar-item body-md mt-auto flex items-center gap-5 rounded-md p-3 hover:bg-danger hover:text-white md:mt-0`}
            aria-label="Keluar"
          >
            <img src="/images/icons/arrow-right.svg" alt="Logo Keluar" />
            <span className="body-md">Keluar</span>
          </button>
        </div>
      </div>

      <button
        className={`fixed bottom-10 left-5 z-50 hidden h-12.5 w-12.5 rounded-full bg-primary-blue font-bold transition-transform duration-300 md:block ${isOpen ? 'rotate-180' : 'rotate-0'}`}
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

export default memo(Sidebar);
