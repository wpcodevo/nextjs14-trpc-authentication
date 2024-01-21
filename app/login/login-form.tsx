'use client';

import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LoginUserInput, loginUserSchema } from '@/lib/user-schema';
import FormInput from '@/components/form-input';
import { LoadingButton } from '@/components/loading-button';
import { trpc } from '@/utils/trpc';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const { reset, handleSubmit } = methods;

  const { mutate: loginFn } = trpc.loginUser.useMutation({
    onSettled() {
      setSubmitting(false);
    },
    onMutate() {
      setSubmitting(true);
    },
    onError(error) {
      toast.error(error.message);
      console.log('Error message:', error.message);
      reset({ password: '' });
    },
    onSuccess() {
      toast.success('login successfully');
      router.push('/');
    },
  });

  const onSubmitHandler: SubmitHandler<LoginUserInput> = (values) => {
    loginFn(values);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className='max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5'
      >
        <FormInput label='Email' name='email' type='email' />
        <FormInput label='Password' name='password' type='password' />

        <div className='text-right'>
          <Link href='#' className=''>
            Forgot Password?
          </Link>
        </div>
        <LoadingButton loading={submitting} textColor='text-ct-blue-600'>
          Login
        </LoadingButton>
        <span className='block'>
          Need an account?{' '}
          <Link href='/register' className='text-ct-blue-600'>
            Sign Up Here
          </Link>
        </span>
      </form>
    </FormProvider>
  );
}
