import NavbarLogo from '../../components/NavbarLogo';
import { Link, useLocation } from "react-router-dom";

interface NavbarType {
    name: string;
    icon: string;
    link: string;
    className?: string;
    alt?: string;
}

function Sidebar() {
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
        {
            name: 'Profil',
            icon: '/images/icons/user.svg',
            link: '/profile',
            className: 'mt-auto',
            alt: 'Logo Profil',
        },
        {
            name: 'Keluar',
            icon: '/images/icons/arrow-right.svg',
            link: '/logout',
            className: 'text-danger hover:bg-danger hover:text-white',
            alt: 'Logo Keluar',
        }
    ]

    return (
        <>
            <div className='ms-3'>
                <NavbarLogo />
            </div>

            <div className="flex flex-col mt-8 grow">
                {navbar.map((item, index) => {
                    const isActive: boolean = location.pathname === item.link;

                    return (
                        <Link to={item.link} key={index}
                            className={`sidebar-item flex gap-5 items-center p-3 rounded-md 
                                ${item.className ? item.className : ''}
                                ${isActive ? 'bg-primary-blue text-white' : 'hover:bg-primary-dark-blue hover:text-white'} `}>
                            <img src={item.icon} alt={item.alt} className={`${isActive ? 'img-white ' : ''}`} />
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default Sidebar;