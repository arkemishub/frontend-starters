import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getToken } from "next-auth/jwt";
import { getClient } from "@/arke/getClient";

export function withAuth<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return async function nextGetServerSidePropsHandlerWrappedWithLoggedInRedirect(
    context: GetServerSidePropsContext
  ) {
    const session = await getToken({ req: context?.req });
    const client = getClient(context);

    if (!session)
      return {
        redirect: {
          destination: `/login`,
          permanent: false,
        },
      };

    return handler(context);
  };
}
