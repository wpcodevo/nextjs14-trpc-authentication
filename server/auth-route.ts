import { createUserSchema, loginUserSchema } from '@/lib/user-schema';
import { t } from '@/utils/trpc-server';
import {
  loginHandler,
  logoutHandler,
  registerHandler,
} from './auth-controller';

const authRouter = t.router({
  registerUser: t.procedure
    .input(createUserSchema)
    .mutation(({ input }) => registerHandler({ input })),
  loginUser: t.procedure
    .input(loginUserSchema)
    .mutation(({ input, ctx }) => loginHandler({ input, ctx })),
  logoutUser: t.procedure.mutation(({ ctx }) => logoutHandler({ ctx })),
});

export default authRouter;
