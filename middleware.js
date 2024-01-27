import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
publicRoutes: ['/','/api/webhooks(.*)','/api(.*)']

});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)' , '/test'],
};
 