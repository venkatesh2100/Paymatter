//web export for the NEXT-AUTH (userside.)
import Nextauth from "next-auth";

const handler = Nextauth(authOptions);

export {handler as GET ,handler as POST};