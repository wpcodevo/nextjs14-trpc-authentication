'use server';

import { createAsyncCaller } from '@/app/api/trpc/trpc-router';
import { redirect } from 'next/navigation';

export const getAuthUser = async ({
  shouldRedirect = true,
}: {
  shouldRedirect?: boolean;
} = {}) => {
  const caller = await createAsyncCaller();
  return caller
    .getMe(undefined)
    .then((result) => result.data.user)
    .catch((e) => {
      if (e.code === 'UNAUTHORIZED' && shouldRedirect) {
        redirect('/login');
      }

      return null;
    });
};
