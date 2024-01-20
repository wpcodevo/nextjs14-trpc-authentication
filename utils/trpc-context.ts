import { deserializeUser } from '@/server/auth-middleware';
import { inferAsyncReturnType } from '@trpc/server';
import { NextRequest, NextResponse } from 'next/server';

export function createContext({
  req,
  res,
}: {
  req: NextRequest;
  res: NextResponse;
}) {
  return deserializeUser({ req, res });
}

export type Context = inferAsyncReturnType<typeof createContext>;
