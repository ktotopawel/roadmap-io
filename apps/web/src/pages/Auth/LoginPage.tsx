import { type SubmitHandler, useForm } from 'react-hook-form';
import type { ReactElement } from 'react';
import { AtIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react';
import InputWithIcon from '../../components/InputWithIcon.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import BasicButton from '../../components/BasicButton.tsx';
import { useAppDispatch } from '../../store/hooks.ts';
import { getMagicLink } from '../../store/slices/auth.slice.ts';
import { LoginPayloadSchema } from '@roadmap-io/types';

interface ILoginForm {
  email: string;
}

const LoginPage = (): ReactElement => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: zodResolver(LoginPayloadSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);

    void dispatch(getMagicLink(data));
  };

  return (
    <div className={'min-h-screen max-w-screen w-full flex flex-col justify-center items-center'}>
      <div
        className={
          'p-4 rounded-2xl border-2 border-white/20 backdrop-blur-2xl bg-white/10 flex flex-col gap-2'
        }
      >
        <div className={'flex flex-col gap-1'}>
          <h2 className={'font-bold text-xl'}>Login</h2>
          <p>You will receive an authentication link to the provided email address.</p>
        </div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={'flex gap-2 w-full items-stretch'}>
            <InputWithIcon
              icon={AtIcon}
              type={'email'}
              placeholder={'john.doe@email.com'}
              isError={!!errors.email}
              className={'flex-1'}
              {...register('email')}
            />
            <BasicButton icon={PaperPlaneTiltIcon} type={'submit'} />
          </div>
          {/* Smooth expanding error message */}
          <div
            className={`
            grid transition-all duration-300 ease-out
            ${errors.email ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr] mt-0'}
          `}
          >
            <div className={'overflow-hidden'}>
              <span className={'text-red-400 text-sm block py-1'}>{errors.email?.message}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
