import Link from 'next/link';

import Menu from './Menu';
import CartIcon from './CartIcon';
import Image from 'next/image';
import UserLinks from './UserLinks';

const links = [
  { id: 1, title: 'hompage' },
  { id: 2, title: 'menu' },
  { id: 3, title: 'contact' },
];

const Navbar = () => {
  const linksMapped = links.map(item => (
    <Link
      key={item.id}
      href={item.title}
    >
      {item.title}
    </Link>
  ))

  return (
    <div className="h-12 text-red-500 p-4 flex justify-between items-center border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-40">
      {/* LEFT LINKS */}
      <div className='hidden md:flex gap-4 flex-1'>
        {linksMapped}
      </div>
      {/* LOGO */}
      <div className="text-xl md:font-bold flex-1 md:text-center">
        <Link href='/'>Massimo</Link>
      </div>
      {/* MENU */}
      <div className='md:hidden'>
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className='hidden md:flex gap-4 items-center justify-end flex-1'>
        <div className='md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md'>
          <Image src="/phone.png" alt='' width={20} height={20} />
          <span>123 458 78</span>
        </div>
        
        <UserLinks />
        <CartIcon />
      </div>
    </div>
  )
}

export default Navbar;
