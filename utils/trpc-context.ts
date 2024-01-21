import { deserializeUser } from '@/server/auth-middleware';
import { inferAsyncReturnType } from '@trpc/server';

export const createContext = async () => deserializeUser();

export type Context = inferAsyncReturnType<typeof createContext>;
