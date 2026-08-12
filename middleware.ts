import createMiddleware from "next-intl/middleware";
import { routing } from "./routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for API routes, static files, and Next internals.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
