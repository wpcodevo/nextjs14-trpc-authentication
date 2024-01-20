import authRouter from '@/server/auth-route';
import { getMeHandler } from '@/server/user-controller';
import { createContext } from '@/utils/trpc-context';
import { protectedProcedure, t } from '@/utils/trpc-server';
import { createServerSideHelpers } from '@trpc/react-query/server';
import SuperJSON from 'superjson';

const healthCheckerRouter = t.router({
  healthchecker: t.procedure.query(() => {
    return {
      status: 'success',
      message: 'Welcome to trpc with Next.js 14 and React Query',
    };
  }),
});

const userRouter = t.router({
  getMe: protectedProcedure.query(({ ctx }) => getMeHandler({ ctx })),
});

export const appRouter = t.mergeRouters(
  healthCheckerRouter,
  authRouter,
  userRouter
);

export const createSSRHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    transformer: SuperJSON,
    ctx: createContext,
  });

export type AppRouter = typeof appRouter;
