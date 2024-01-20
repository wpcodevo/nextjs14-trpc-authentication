import { TRPCError } from '@trpc/server';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export const deserializeUser = async ({
  req,
  res,
}: {
  req: NextRequest;
  res: NextResponse;
}) => {
  try {
    let token;
    if (
      req.headers.get('authorization') &&
      req.headers.get('authorization')?.startsWith('Bearer')
    ) {
      token = req.headers.get('authorization')?.split(' ')[1];
    } else if (req.cookies.get('token')) {
      token = req.cookies.get('token')?.value;
    }

    const notAuthenticated = {
      req,
      res,
      user: null,
    };

    if (!token) {
      return notAuthenticated;
    }

    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { sub: string };

    if (!decoded) {
      return notAuthenticated;
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.sub } });

    if (!user) {
      return notAuthenticated;
    }

    return {
      req,
      res,
      user: { ...user, password: user.password === undefined },
    };
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};
