import type { Context, Middleware } from "@nuxt/types";

declare module "@nuxt/types" {
  interface Context {
    userAgent?: string;
  }
}

const Auth: Middleware = ({
  redirect,
  route,
}: Context) => {
  if (route.path === "/") {
    return redirect("/reportes");
  }
};

export default Auth;
