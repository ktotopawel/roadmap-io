import { Link, useSearchParams } from 'react-router-dom';
import { type ReactElement, useState, useEffect } from 'react';
import AppRoutes from '../config/constants/AppRoutes.ts';
import StatusEnum, { type StatusKeys } from '../../config/Status.enum.ts';
import { CircleNotchIcon } from '@phosphor-icons/react';

const MagicLinkHandler = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<StatusKeys>(StatusEnum.LOADING);

  useEffect(() => {
    if (!token) {
      setStatus(StatusEnum.FAILED);
    }
  }, [token]);

  return (
    <div className={'min-h-screen w-full flex justify-center items-center'}>
      <div className={'backdrop-blur-2xl rounded-2xl border-2 border-white/20 p-4'}>
        {status === StatusEnum.FAILED && (
          <>
            <h2 className={'text-red-300 text-2xl'}>No token to validate</h2>
            <p className={'text-red-300'}>
              This page is intended to validate a magic link token, please use{' '}
              <Link to={AppRoutes.LOGIN}>the login page</Link> to log in.
            </p>
          </>
        )}
        {status === StatusEnum.LOADING && (
          <>
            <h2 className={'text-2xl'}>Please wait while the link authenticates</h2>
            <div className={'flex items-center justify-center h-24 p-4'}>
              <CircleNotchIcon className={'animate-spin h-full flex-1'} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MagicLinkHandler;
