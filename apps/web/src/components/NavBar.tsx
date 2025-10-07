import type { ReactElement } from 'react';
import InputWithIcon from './InputWithIcon.tsx';
import { GearIcon, MagnifyingGlassIcon, PlusSquareIcon, UserIcon } from '@phosphor-icons/react';
import ExpandingButton from './ExpandingButton.tsx';

const NavBar = (): ReactElement => {
  return (
    <div
      className={
        'backdrop-blur-2xl rounded-2xl border-2 border-white/30 bg-white/10 text-white px-4 py-2 grid grid-cols-3 shadow-sm shadow-white/20'
      }
    >
      <div className="flex items-center justify-start">
        <h2 className={'font-sono text-2xl font-semibold'}>roadmap-io</h2>
      </div>
      <div className="flex items-center justify-center">
        <InputWithIcon icon={MagnifyingGlassIcon} placeholder={'Search...'} />
      </div>
      <div className={'flex items-center justify-end gap-2 h-full'}>
        <ExpandingButton icon={UserIcon} label={'User'} onclick={() => {}} />
        <ExpandingButton icon={GearIcon} label={'Settings'} onclick={() => {}} />
        <ExpandingButton icon={PlusSquareIcon} label={'Add'} onclick={() => {}} />
      </div>
    </div>
  );
};

export default NavBar;
