'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  FingerPrintIcon,
  HomeModernIcon,
  BuildingLibraryIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ClockIcon, CreditCardIcon, LightBulbIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { BuildingOffice2Icon, CheckIcon, CogIcon, ScaleIcon } from '@heroicons/react/20/solid';


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Users', href: '/dashboard/users', icon: UserPlusIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  { name: 'Landlords', href: '/dashboard/owners', icon: HomeModernIcon},
  { name: 'Properties', href: '/dashboard/properties', icon: BuildingOffice2Icon },
  { name: 'Rentals', href: '/dashboard/rentals', icon: ClockIcon },
  { name: 'Payments', href: '/dashboard/payments', icon: CreditCardIcon },


  { name: 'Settings', href: '/dashboard/employee', icon: CogIcon },


];
export default function NavLinks() {
  const pathname = usePathname();
 
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}