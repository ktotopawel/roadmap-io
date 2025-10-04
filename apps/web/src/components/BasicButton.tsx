import { type ReactElement } from 'react';
import { Button, type ButtonProps } from '@headlessui/react';
import { type IconProps } from '@phosphor-icons/react';
import * as React from 'react';
import { clsx } from 'clsx';

interface IBasicButton extends ButtonProps {
  label?: string;
  icon?: React.ComponentType<IconProps>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const BasicButton = ({
  label,
  icon: Icon,
  onClick,
  className,
  ...rest
}: IBasicButton): ReactElement => {
  const isIconOnly = !!Icon && !label;

  return (
    <Button
      onClick={onClick}
      {...rest}
      className={clsx(
        'bg-white/10 rounded-lg border-2 border-white/30 px-2 py-1 flex items-center gap-2 transition-all duration-150 cursor-pointer',
        'hover:bg-white/20 hover:shadow-white/10 hover:shadow-md',
        { 'aspect-square': isIconOnly },
        className
      )}
    >
      {Icon ? <Icon className={clsx({ 'h-6 w-6': isIconOnly, 'h-5 w-5': !isIconOnly })} /> : null}
      {label ? label : null}
    </Button>
  );
};

export default BasicButton;
