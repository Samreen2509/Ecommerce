import { Link } from 'react-router-dom';

function SideNavbar() {
  const navtext = [
    { text: 'Dashboard', link: './' },
    { text: 'Orders', link: './order' },
    { text: 'Products', link: './product' },
    { text: 'Category', link: './category' },
    { text: 'Colors', link: './color' },
    { text: 'Users', link: './user' },
    { text: 'Payments', link: './payment' },
    { text: 'Notification', link: './notification' },
    { text: 'Settings', link: './setting' },
  ];

  return (
    <nav className="flex w-full flex-1">
      <ul className="flex w-full flex-col gap-y-2 px-2 py-3">
        {navtext.map((item, index) => {
          return (
            <li
              key={index}
              className="text-md flex h-11 w-full  rounded-md border-b px-2 font-medium text-opacity-80 hover:bg-gray-200"
            >
              <Link
                className="flex h-full w-full items-center justify-start"
                to={item.link}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default SideNavbar;
