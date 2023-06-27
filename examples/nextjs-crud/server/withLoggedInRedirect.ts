import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSession } from 'next-auth/react';

export function withLoggedInRedirect<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return async function nextGetServerSidePropsHandlerWrappedWithLoggedInRedirect(
    context: GetServerSidePropsContext
  ) {
    const session = await getSession(context);

    if (session)
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };

    return handler(context);
  };
}
