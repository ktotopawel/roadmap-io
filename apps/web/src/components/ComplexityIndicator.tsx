import type { ReactElement } from 'react';
import { CircleIcon } from '@phosphor-icons/react';
import { clsx } from 'clsx';

interface IComplexityIndicator {
  complexity: number;
}

const MAX_COMPLEXITY = 5;

const ComplexityIndicator = ({ complexity }: IComplexityIndicator): ReactElement => {
  return (
    <div
      className={clsx('flex items-center gap-2', {
        '**:fill-green-500': complexity < 3,
        '**:fill-yellow-500': complexity === 3,
        '**:fill-red-500': complexity > 3,
      })}
    >
      <p>Complexity: </p>
      <div className={'flex items-center h-full'}>
        {Array.from({ length: MAX_COMPLEXITY }, (_, i) => i < complexity).map((isFilled, index) => (
          <CircleIcon key={index} weight={isFilled ? 'fill' : 'regular'} />
        ))}
      </div>
    </div>
  );
};

export default ComplexityIndicator;
