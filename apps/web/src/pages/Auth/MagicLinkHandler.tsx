import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { type ReactElement, useEffect } from 'react';
import AppRoutes from '../../config/constants/AppRoutes.ts';
import StatusEnum from '../../config/Status.enum.ts';
import { CircleNotchIcon } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { consumeMagicLink } from '../../store/slices/auth.slice.ts';
import { clsx } from 'clsx';
import { fetchUser } from '../../store/slices/user.slice.ts';

const MagicLinkHandler = (): ReactElement => {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.auth.status);

  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const validateSearchParams = (token: string | null, email: string | null): boolean => {
    return !(!token || !email);
  };

  useEffect(() => {
    if (!validateSearchParams(token, email)) {
      return;
    }

    if (typeof email === 'string' && typeof token === 'string') {
      void dispatch(consumeMagicLink({ email: email, token: token }));
    }
  }, [token, email, dispatch]);

  useEffect(() => {
    void dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      void navigator(AppRoutes.HOME);
    }
  }, [isAuth, navigator]);

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
            <h2 className={' text-2xl'}>Error</h2>
            <p className={''}>
              Token validation failed. Please use another magic link obtained from{' '}
              <Link to={AppRoutes.LOGIN} className={'underline hover:text-white/75'}>
                the login page
              </Link>
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
