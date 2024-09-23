'use server'
import {getSession,updateSession } from '@auth0/nextjs-auth0';
import { ManagementClient } from 'auth0';

export type FormState = {
    errors?: {
        error?: string
    }
}

export async function saveUserInfo(state: FormState, formData: FormData) {
    const management = new ManagementClient({
        domain: 'dev-22pxfwuc6cwn74ws.eu.auth0.com',
        clientId: 'BsW2h1eMGEdiFuYF5teNs12rUz5LQ6qW',
        clientSecret: '13vxsPPXzmNOAZ07oO-44XGto-JHfPuwpsOyea4t7_eX6wrKDJQu0I5o0QAsZ8iN',
        audience: 'https://dev-22pxfwuc6cwn74ws.eu.auth0.com/api/v2/'
      });

      let session = await getSession();
      let user = session?.user!;
      const userID = user?.user_id;
      
      console.log('SESSION ',session);
      console.log('USER ',session?.user);

      const givenName = formData.get('first-name')?.toString();
      const familyName = formData.get('last-name')?.toString();
      const email = formData.get('email')?.toString();
      const phone = formData.get('phone')?.toString();

      let data: any = {
        user_metadata: { 
            phone: phone ?? ' '
        }
    };

    data['given_name'] = givenName ?? ' ';
    data['family_name'] = familyName ?? ' ';

    if (email) {
        data['email'] = email;
    }

    try {
        const response = await management.users.update({id: userID}, data);
        console.log('new user data is ', response.data);

        session = await getSession();
        await updateSession({...session, user: {...session?.user}});
    } catch (e) {
        console.error(e);
        
        return {errors: {
            error: (e instanceof Error) ? e.message : 'error'
        }};
    }
    
    return {errors: undefined};
}