import { BookmarkIcon, BuildingLibraryIcon, BuildingOffice2Icon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { RssIcon } from '@heroicons/react/24/solid';
import { FlagIcon } from '@heroicons/react/20/solid';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BuildingOffice2Icon className="h-12 w-12" />
      <p className="text-[24px]">Guryogoob</p>
    </div>
  );
}
