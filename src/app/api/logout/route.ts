import { revalidatePath } from 'next/cache'
import {redirect} from 'next/navigation';

export async function GET(req: Request) {
    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const returnTo = process.env.APP_BASE_URL;

    const logoutUrl = `${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo!)}`;

    revalidatePath(returnTo!);
    redirect(logoutUrl);
  }