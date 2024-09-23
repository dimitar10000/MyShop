/*
'use client'
import { signIn } from '@/app/actions/auth'
import { useFormStatus, useFormState } from 'react-dom'
import Link from 'next/link'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';

function SignInButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
            aria-disabled={pending}
        >
            {pending ? 'Signing in...' : 'Sign in'}

        </Button>
    )
}

function FieldAlert({ messages }: { messages: string[] }) {

    return (
        <Alert icon={false} className="absolute top-5 bg-red-800"
            style={{ right: "-340px", width: "325px" }}>
            <div>
                {messages.map((msg) => (
                    <div key={msg}> {msg}</div>))
                }
            </div>
        </Alert>
    )
}

export default function SignInForm() {
    const [state, action] = useFormState(signIn, undefined);

    const borderUsername = { borderColor: (!!state?.errors?.name ? 'red' : '#b894a3') + "!important" };
    const borderPassword = { borderColor: (!!state?.errors?.password ? 'red' : '#b894a3') + "!important" };

    return (
        <Box sx={{
            border: 1, borderRadius: 3, borderColor: "#b8a994", borderWidth: "2px",
            padding: "20px", margin: "auto"
        }}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ bgcolor: '#b8a994', width: "55px", height: "55px" }}>
                        <StorefrontIcon style={{ fontSize: "40px" }} />
                    </Avatar>

                    <Box component="form" action={action} sx={{ mt: 6 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}
                                className='relative'>
                                <TextField
                                    autoComplete='username'
                                    autoFocus
                                    fullWidth
                                    id="username"
                                    name="username"
                                    label="Username"
                                    sx={{
                                        fieldset: borderUsername,
                                        mb: 2,
                                        "&:hover fieldset": borderUsername,
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": borderUsername
                                        }
                                    }}
                                />
                                {state?.errors?.name
                                    ?
                                    <FieldAlert messages={state.errors.name} />
                                    :
                                    null
                                }
                            </Grid>

                            <Grid item xs={12} sm={12}
                                className='relative'>
                                <TextField
                                    autoComplete='password'
                                    fullWidth
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    sx={{
                                        fieldset: borderPassword,
                                        "&:hover fieldset": borderPassword,
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": borderPassword
                                        }
                                    }}
                                />
                                {state?.errors?.password
                                    ?
                                    <FieldAlert messages={state.errors.password} />
                                    :
                                    null
                                }
                            </Grid>

                            <Grid item xs={4} sm={12}>
                                <SignInButton />
                            </Grid>

                            <Grid container justifyContent="flex-end"
                                sx={{ mb: 2 }}>
                                <Grid item>
                                    <span> Not a member? </span>
                                    <Link href="/sign-up"
                                        className='hover:contrast-75'> Sign up </Link>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
*/