import { Link, useSearchParams } from 'react-router-dom';
import { type ReactElement, useState, useEffect } from 'react';
import AppRoutes from '../../config/constants/AppRoutes.ts';
import StatusEnum, { type StatusKeys } from '../../config/Status.enum.ts';
import { CircleNotchIcon } from '@phosphor-icons/react';
import { useAppDispatch } from '../../store/hooks.ts';
import { consumeMagicLink } from '../../store/slices/auth.slice.ts';
import { clsx } from 'clsx';

const MagicLinkHandler = (): ReactElement => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [status, setStatus] = useState<StatusKeys>(StatusEnum.LOADING);
  const dispatch = useAppDispatch();

  const validateSearchParams = (token: string | null, email: string | null): boolean => {
    if (!token || !email) {
      setStatus(StatusEnum.FAILED);
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!validateSearchParams(token, email)) {
      return;
    }

    if (typeof email === 'string' && typeof token === 'string') {
      dispatch(consumeMagicLink({ email: email, token: token }))
        .then(() => {
          setStatus(StatusEnum.SUCCEEDED);
        })
        .catch(() => {
          setStatus(StatusEnum.FAILED);
        });
    }
  }, [token, email, dispatch]);

  return (
    <div className={'min-h-screen w-full flex justify-center items-center'}>
      <div
        className={clsx('backdrop-blur-2xl rounded-2xl border-2 border-white/20 p-4', {
          'bg-green-300/10': status === StatusEnum.SUCCEEDED,
          'bg-red-300/10': status === StatusEnum.FAILED,
          'bg-white/10': status === StatusEnum.LOADING,
        })}
      >
        {status === StatusEnum.FAILED && (
          <>
            <h2 className={' text-2xl'}>No token to validate</h2>
            <p className={''}>
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
        {status === StatusEnum.SUCCEEDED && (
          <>
            <h2 className={'text-2xl'}>Success!</h2>
            <p>Redirecting...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MagicLinkHandler;
