import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@headlessui/react';
import type { ReactElement } from 'react';

interface ILoginForm {
  email: string;
}

const LoginPage = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <div>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type={'email'}
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$/,
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
