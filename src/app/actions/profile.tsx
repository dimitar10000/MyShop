'use server'
import { Auth0Client } from '@auth0/nextjs-auth0/server';
import { ManagementClient } from 'auth0';
import axios from 'axios'
import { ChangePassConstants } from '@/app/components/profile/change-pass-constants';
import { updateUser } from '@/app/actions/user';

const DOMAIN = 'dev-22pxfwuc6cwn74ws.eu.auth0.com';
const MAN_CLIENT_ID = 'BsW2h1eMGEdiFuYF5teNs12rUz5LQ6qW'; // for auth0 management api
const APP_CLIENT_ID = 'LdzWkCZrWhFbbJPySRCqnUIs7mZ1fhdM'; // for default app
const MAN_CLIENT_SECRET = '13vxsPPXzmNOAZ07oO-44XGto-JHfPuwpsOyea4t7_eX6wrKDJQu0I5o0QAsZ8iN'; // for auth0 management api
const APP_CLIENT_SECRET = 'Oh28bWHeLsUw2FfTJLVnWCaffMyECxWn87LlrjO1lSxocZM6EaiFsPaWjcD6Sred';
const API_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNsTHRydnVhMDRDN0ZRbFQybGlvSiJ9.eyJpc3MiOiJodHRwczovL2Rldi0yMnB4Znd1YzZjd243NHdzLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJBcXZsWnFSTFpxZjNRV0VFYk9Gd1BUUHNaRWZWZ2U5cEBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtMjJweGZ3dWM2Y3duNzR3cy5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTczNzIwMjY0MywiZXhwIjoxNzM4MDY2NjQzLCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIHJlYWQ6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgZGVsZXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDphY3Rpb25zIHVwZGF0ZTphY3Rpb25zIGRlbGV0ZTphY3Rpb25zIGNyZWF0ZTphY3Rpb25zIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6aW5zaWdodHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpsb2dzX3VzZXJzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyB1cGRhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmFub21hbHlfYmxvY2tzIGRlbGV0ZTphbm9tYWx5X2Jsb2NrcyB1cGRhdGU6dHJpZ2dlcnMgcmVhZDp0cmlnZ2VycyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIGNyZWF0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIGRlbGV0ZTpwYXNzd29yZHNfY2hlY2tpbmdfam9iIHJlYWQ6Y3VzdG9tX2RvbWFpbnMgZGVsZXRlOmN1c3RvbV9kb21haW5zIGNyZWF0ZTpjdXN0b21fZG9tYWlucyB1cGRhdGU6Y3VzdG9tX2RvbWFpbnMgcmVhZDplbWFpbF90ZW1wbGF0ZXMgY3JlYXRlOmVtYWlsX3RlbXBsYXRlcyB1cGRhdGU6ZW1haWxfdGVtcGxhdGVzIHJlYWQ6bWZhX3BvbGljaWVzIHVwZGF0ZTptZmFfcG9saWNpZXMgcmVhZDpyb2xlcyBjcmVhdGU6cm9sZXMgZGVsZXRlOnJvbGVzIHVwZGF0ZTpyb2xlcyByZWFkOnByb21wdHMgdXBkYXRlOnByb21wdHMgcmVhZDpicmFuZGluZyB1cGRhdGU6YnJhbmRpbmcgZGVsZXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMgY3JlYXRlOnNpZ25pbmdfa2V5cyByZWFkOnNpZ25pbmdfa2V5cyB1cGRhdGU6c2lnbmluZ19rZXlzIHJlYWQ6bGltaXRzIHVwZGF0ZTpsaW1pdHMgY3JlYXRlOnJvbGVfbWVtYmVycyByZWFkOnJvbGVfbWVtYmVycyBkZWxldGU6cm9sZV9tZW1iZXJzIHJlYWQ6ZW50aXRsZW1lbnRzIHJlYWQ6YXR0YWNrX3Byb3RlY3Rpb24gdXBkYXRlOmF0dGFja19wcm90ZWN0aW9uIHJlYWQ6b3JnYW5pemF0aW9uc19zdW1tYXJ5IGNyZWF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6YXV0aGVudGljYXRpb25fbWV0aG9kcyB1cGRhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyBkZWxldGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOm9yZ2FuaXphdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGNyZWF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgcmVhZDpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgdXBkYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIHJlYWQ6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyBjcmVhdGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpzY2ltX2NvbmZpZyBjcmVhdGU6c2NpbV9jb25maWcgdXBkYXRlOnNjaW1fY29uZmlnIGRlbGV0ZTpzY2ltX2NvbmZpZyBjcmVhdGU6c2NpbV90b2tlbiByZWFkOnNjaW1fdG9rZW4gZGVsZXRlOnNjaW1fdG9rZW4gZGVsZXRlOnBob25lX3Byb3ZpZGVycyBjcmVhdGU6cGhvbmVfcHJvdmlkZXJzIHJlYWQ6cGhvbmVfcHJvdmlkZXJzIHVwZGF0ZTpwaG9uZV9wcm92aWRlcnMgZGVsZXRlOnBob25lX3RlbXBsYXRlcyBjcmVhdGU6cGhvbmVfdGVtcGxhdGVzIHJlYWQ6cGhvbmVfdGVtcGxhdGVzIHVwZGF0ZTpwaG9uZV90ZW1wbGF0ZXMgY3JlYXRlOmVuY3J5cHRpb25fa2V5cyByZWFkOmVuY3J5cHRpb25fa2V5cyB1cGRhdGU6ZW5jcnlwdGlvbl9rZXlzIGRlbGV0ZTplbmNyeXB0aW9uX2tleXMgcmVhZDpzZXNzaW9ucyBkZWxldGU6c2Vzc2lvbnMgcmVhZDpyZWZyZXNoX3Rva2VucyBkZWxldGU6cmVmcmVzaF90b2tlbnMgY3JlYXRlOnNlbGZfc2VydmljZV9wcm9maWxlcyByZWFkOnNlbGZfc2VydmljZV9wcm9maWxlcyB1cGRhdGU6c2VsZl9zZXJ2aWNlX3Byb2ZpbGVzIGRlbGV0ZTpzZWxmX3NlcnZpY2VfcHJvZmlsZXMgY3JlYXRlOnNzb19hY2Nlc3NfdGlja2V0cyBkZWxldGU6c3NvX2FjY2Vzc190aWNrZXRzIHJlYWQ6Zm9ybXMgdXBkYXRlOmZvcm1zIGRlbGV0ZTpmb3JtcyBjcmVhdGU6Zm9ybXMgcmVhZDpmbG93cyB1cGRhdGU6Zmxvd3MgZGVsZXRlOmZsb3dzIGNyZWF0ZTpmbG93cyByZWFkOmZsb3dzX3ZhdWx0IHJlYWQ6Zmxvd3NfdmF1bHRfY29ubmVjdGlvbnMgdXBkYXRlOmZsb3dzX3ZhdWx0X2Nvbm5lY3Rpb25zIGRlbGV0ZTpmbG93c192YXVsdF9jb25uZWN0aW9ucyBjcmVhdGU6Zmxvd3NfdmF1bHRfY29ubmVjdGlvbnMgcmVhZDpmbG93c19leGVjdXRpb25zIGRlbGV0ZTpmbG93c19leGVjdXRpb25zIHJlYWQ6Y29ubmVjdGlvbnNfb3B0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnNfb3B0aW9ucyByZWFkOnNlbGZfc2VydmljZV9wcm9maWxlX2N1c3RvbV90ZXh0cyB1cGRhdGU6c2VsZl9zZXJ2aWNlX3Byb2ZpbGVfY3VzdG9tX3RleHRzIHJlYWQ6Y2xpZW50X2NyZWRlbnRpYWxzIGNyZWF0ZTpjbGllbnRfY3JlZGVudGlhbHMgdXBkYXRlOmNsaWVudF9jcmVkZW50aWFscyBkZWxldGU6Y2xpZW50X2NyZWRlbnRpYWxzIHJlYWQ6b3JnYW5pemF0aW9uX2NsaWVudF9ncmFudHMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jbGllbnRfZ3JhbnRzIGRlbGV0ZTpvcmdhbml6YXRpb25fY2xpZW50X2dyYW50cyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsImF6cCI6IkFxdmxacVJMWnFmM1FXRUViT0Z3UFRQc1pFZlZnZTlwIn0.HfxRQWpPShcg3sNxAC4xUFKafn6xOPXqTpjIVRDJQ032sYKbtv0y3R9cUlJVNkmIZ_bljUYJEsH9IeL3UKExSqvWXljd4rhfE73fwPYMFtStPQZJVl4aRfy_z1gzx81aB5Ocwm47pw4SwIGo1zzi005Z69fqkV7UbxmZA8puJ-ZREL2zL3DoRKtUozVk4vohhIUeocp4TDjoNb9aWs6qLNEutEahXoKaXGo_Mg6JDjrbPOXxesN_28OeqVpxu4D2F1SZc4WZZ8lIk2UA6_9y9tMo5Uit93eL9Jg8fa-4BmaA37uNS4SsxOQ3hp0fW0uuRqcn2vVh9-gQZJCscAOOBw';

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
    let session = await auth0Client.getSession();
    let user = session!.user;
    const userID = user!.sub;

    const givenName = formData.get('first-name')?.toString();
    const familyName = formData.get('last-name')?.toString();
    const phone = formData.get('phone')?.toString();

    let data: any = {
        user_metadata: {
            phone: phone ?? ''
        }
    };

    data['given_name'] = givenName ?? '';
    data['family_name'] = familyName ?? '';

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
    username: string, currPass: string) {

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
    let session = await auth0Client.getSession();
    let user = session?.user;
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

    const verifiedPass = await verifyUserPassword(DOMAIN, APP_CLIENT_ID, APP_CLIENT_SECRET, user?.name!, currPass ?? '');

    console.log("verified pass?", verifiedPass);

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
    let session = await auth0Client.getSession();
    let user = session?.user;
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