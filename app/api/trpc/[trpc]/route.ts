import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '../trpc-router';
import { createContext } from '@/utils/trpc-context';

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: createContext,
  });
};

export { handler as GET, handler as POST };
