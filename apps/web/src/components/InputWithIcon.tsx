import { Input, type InputProps } from '@headlessui/react';
import { type ReactElement, type ForwardedRef, useRef } from 'react';
import type { IconProps } from '@phosphor-icons/react';
import * as React from 'react';
import { clsx } from 'clsx';

interface IInputWithIcon extends InputProps {
  icon: React.ComponentType<IconProps>;
  className?: string;
  isError?: boolean;
}

const InputWithIcon = React.forwardRef(
  (
    { icon: Icon, isError, className, ...rest }: IInputWithIcon,
    ref: ForwardedRef<HTMLInputElement>
  ): ReactElement => {
    const internalRef = useRef<HTMLInputElement>(null);

    const handleIconClick = (): void => {
      internalRef.current?.focus();
    };

    return (
      <div
        className={clsx(
          'rounded-lg border-2 flex transition-colors duration-300',
          {
            'border-red-400/30 bg-red-400/10': isError,
            'border-white/30 bg-white/10': !isError,
          },
          className
        )}
      >
        <div
          className={clsx('px-2 py-1 h-full cursor-pointer border-r-2 flex-none', {
            'border-red-400/30': isError,
            'border-white/30': !isError,
          })}
          onClick={handleIconClick}
        >
          <Icon className={'fill-white/80 h-full'} />
        </div>
        <Input
          {...rest}
          ref={(el: HTMLInputElement | null) => {
            if (ref) {
              if (typeof ref === 'function') {
                ref(el);
              } else {
                ref.current = el;
              }
            }
            internalRef.current = el;
          }}
          className={
            'h-full px-2 py-1 rounded-r-lg focus-visible:bg-white/10 focus:outline-none focus-visible:outline-none focus:bg-white/10 flex-1'
          }
        />
      </div>
    );
  }
);

InputWithIcon.displayName = 'InputWithIcon';

export default InputWithIcon;
