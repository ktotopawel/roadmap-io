import * as React from 'react';
import type { IconProps } from '@phosphor-icons/react';
import type { ReactElement } from 'react';
import { Button } from '@headlessui/react';
import { clsx } from 'clsx'; // Make sure you're importing clsx if you're using it

interface ExpandingButtonProps {
  icon: React.ComponentType<IconProps>;
  label: string;
  onclick: () => void;
}

const ExpandingButton = ({ icon: Icon, label, onclick }: ExpandingButtonProps): ReactElement => {
  const [isHovered, setHovered] = React.useState(false);

  return (
    <Button
      onClick={onclick}
      className={clsx(
        'flex items-center gap-2 overflow-hidden rounded-lg px-2 py-1 cursor-pointer transition-all duration-300 border-2 border-white/0',
        'hover:bg-white/10 hover:border-white/20',
        'active:bg-white/20 active:border-white/30 active:shadow-sm active:shadow-white/20',
        'focus:bg-white/10 focus:border-white/20'
      )}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      aria-label={label}
    >
      <Icon className={'h-full w-6 shrink-0'} />
      <div
        className={clsx('transition-all duration-300 ease-in-out whitespace-nowrap', {
          'max-w-xs opacity-100': isHovered,
          'max-w-0 opacity-0': !isHovered,
        })}
      >
        {label}
      </div>
    </Button>
  );
};

export default ExpandingButton;
