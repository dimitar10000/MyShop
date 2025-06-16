'use server'
import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { ManagementClient } from 'auth0';
import axios from 'axios'
import { ChangePassConstants } from '@/app/components/profile/change-pass-constants';
import { updateUser,deleteUser } from '@/app/actions/user';
import { deleteCart } from './shopping-cart';
import { deleteList } from './wishlist';

const DOMAIN = 'dev-22pxfwuc6cwn74ws.eu.auth0.com';
const MAN_CLIENT_ID = process.env['AUTH0_MAN_CLIENT_ID']; // for auth0 management api
const APP_CLIENT_ID = process.env['AUTH0_CLIENT_ID'] as string; // for default app
const MAN_CLIENT_SECRET = process.env['AUTH0_MAN_CLIENT_SECRET']; // for auth0 management api
const APP_CLIENT_SECRET = process.env['AUTHO_CLIENT_SECRET'] as string;
const API_TOKEN = process.env['AUTHO_API_TOKEN'] as string;

export type FormState = {
    errors?: {
        error?: string
    }
}


export async function saveUserInfo(state: FormState, formData: FormData) {
    const management = new ManagementClient({
        domain: DOMAIN,
        clientId: MAN_CLIENT_ID,
        clientSecret: MAN_CLIENT_SECRET,
        audience: 'https://dev-22pxfwuc6cwn74ws.eu.auth0.com/api/v2/'
    });

    const auth0Client = new Auth0Client();
    const session = await auth0Client.getSession();
    const user = session!.user;
    const userID = user!.sub;

    const givenName = formData.get('first-name')?.toString();
    const familyName = formData.get('last-name')?.toString();
    const phone = formData.get('phone')?.toString();

    const data = {
        user_metadata: {
            phone: phone ?? ''
        },
        given_name: givenName ?? '',
        family_name: familyName ?? ''
    };

    try {
        const response = await management.users.update({ id: userID! }, data);
        console.log('new user data is ', response.data);

        const changedUser = {
            email: user.email!,
            givenName: givenName,
            familyName: familyName,
            phone: phone
        };

        await updateUser(changedUser);
    } catch (e) {
        console.error(e);

        return {
            errors: {
                error: (e instanceof Error) ? e.message : 'error'
            }
        };
    }

    return { errors: undefined };
}

async function verifyUserPassword(domain: string, clientId: string, clientSecret: string,
    username: string | undefined, currPass: string) {
    
    if(!username) {
        return false;
    }

    try {
        // setting the default directory manually
        await axios.patch(`https://${domain}/api/v2/tenants/settings`,
            {
                default_directory: 'Username-Password-Authentication'
            },
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        // making a call to verify the current password
        await axios.post(`https://${domain}/oauth/token`, {
            grant_type: 'password',
            username: username,
            password: currPass,
            client_id: clientId,
            client_secret: clientSecret,
            audience: 'https://dev-22pxfwuc6cwn74ws.eu.auth0.com/api/v2/'
        },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        return true;
    } catch (error) {
        console.error(error);

        return false;
    }
}

export async function updateUserPassword(state: FormState, formData: FormData) {
    const auth0Client = new Auth0Client();
    const session = await auth0Client.getSession();
    const user = session?.user;
    const userID = user?.sub;
    const currPass = formData.get('current-password')?.toString();
    const newPass = formData.get('new-password')?.toString();
    const newPassRepeat = formData.get('new-password-repeat')?.toString();

    if (!currPass || !newPass || !newPassRepeat) {
        return {
            errors: {
                error: ChangePassConstants.EMPTY_FIELDS
            }
        }
    }

    if (!newPass || !!newPass && newPass.length < ChangePassConstants.MIN_PASSWORD_LENGTH) {
        return {
            errors: {
                error: ChangePassConstants.SHORT_PASS_MESSAGE
            }
        }
    }

    if (!!newPass && !!newPassRepeat && newPass !== newPassRepeat) {
        return {
            errors: {
                error: ChangePassConstants.PASS_MISMATCH
            }
        }
    }

    const verifiedPass = await verifyUserPassword(DOMAIN, APP_CLIENT_ID, APP_CLIENT_SECRET, user?.name, currPass ?? '');

    if (verifiedPass) {
        try {
            await axios.patch(
                `https://${DOMAIN}/api/v2/users/${userID}`,
                {
                    password: newPass,
                    connection: 'Username-Password-Authentication',
                },
                {
                    headers: {
                        Authorization: `Bearer ${API_TOKEN}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (e) {
            console.error(e);

            return {
                errors: {
                    error: (e instanceof Error) ? e.message : 'error'
                }
            };
        }
    }
    else {

        return {
            errors: {
                error: ChangePassConstants.OTHER_ERRORS
            }
        }
    }

    return { errors: undefined };
}

export async function deleteUserAccount(state: FormState, formData: FormData) {
    const auth0Client = new Auth0Client();
    const session = await auth0Client.getSession();
    const user = session?.user;
    const userID = user?.sub;

    const management = new ManagementClient({
        domain: DOMAIN,
        clientId: MAN_CLIENT_ID,
        clientSecret: MAN_CLIENT_SECRET,
        audience: 'https://dev-22pxfwuc6cwn74ws.eu.auth0.com/api/v2/'
    });

    try {
        const response = await management.users.delete({ id: userID! });
        console.log(response.data);

        await deleteUser(user?.email);
        await deleteCart(userID);
        await deleteList(userID);
    } catch (e) {
        console.error(e);
        return {
            errors: {
                error: (e instanceof Error) ? e.message : 'error'
            }
        }
    };

    return { errors: undefined };
}