create-app:
	pnpm create next-app nextjs14-trpc-authentication

install-dependencies:
	pnpm add @tanstack/react-query@4.18.0
	pnpm add @tanstack/react-query-devtools@4.18.0
	pnpm add -D @tanstack/eslint-plugin-query
	pnpm add react-hook-form @hookform/resolvers
	pnpm add tailwind-merge
	pnpm add react-hot-toast
	pnpm add @trpc/client
	pnpm add @trpc/react-query

	pnpm add @trpc/server
	pnpm add superjson
	pnpm add zod
	pnpm add jsonwebtoken
	pnpm add bcryptjs
	pnpm add -D @types/jsonwebtoken @types/bcryptjs
	pnpm add @prisma/client
	pnpm add -D prisma

commands:
	pnpm prisma init --datasource-provider postgresql
	pnpm prisma migrate dev --name init