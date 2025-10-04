import { CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react';
import StatusEnum from './Status.enum.ts';
import type { ReactElement } from 'react';

export interface ModalContent {
  title: string;
  description: string;
  content?: ReactElement;
  icon: ReactElement;
}

const MAGIC_LINK_MODAL_CONTENT: Record<
  (typeof StatusEnum)[keyof typeof StatusEnum],
  ModalContent | null
> = {
  [StatusEnum.SUCCEEDED]: {
    title: 'Success',
    description: 'Magic link sent to your email.',
    icon: <CheckCircleIcon className={'fill-green-400 h-6 w-6'} />,
  },
  [StatusEnum.FAILED]: {
    title: 'Failed',
    description: 'Magic link failed to send. Please try again later.',
    icon: <XCircleIcon className={'fill-red-400 h-6 w-6'} />,
  },
  [StatusEnum.LOADING]: null,
  [StatusEnum.IDLE]: null,
};

export { MAGIC_LINK_MODAL_CONTENT };
