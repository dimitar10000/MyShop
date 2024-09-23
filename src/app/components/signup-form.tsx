/*
'use client'
import { signUp } from '@/app/actions/auth'
import { useFormStatus, useFormState } from 'react-dom'
import {useState} from 'react'
import Link from 'next/link'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Alert from '@mui/material/Alert';

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 2 }}
            aria-disabled={pending}
        >
        {pending ? 'Submitting...' : 'Sign up'}
      </Button>
    
  )
}

function FieldAlert({messages, isPassword = false}: {messages: string[],isPassword?: boolean}) {

  return (
    <Alert icon={false} className="absolute top-5 bg-red-800"
      style={{ right: "-340px",width: "325px" }}>
      <div>
        {isPassword
        ?
          (<div>
            <div> Password must: </div>
            {messages.map((msg) => (
              <li key={msg}> {msg}</li>))}
          </div>)
        : 
        messages.map((msg) => (
          <div key={msg}> {msg}</div>))
        }
      </div>
    </Alert>
  )
}

export default function SignUpForm() {
  const [state, action] = useFormState(signUp, undefined);

  const borderUsername = { borderColor: (!!state?.errors?.name ? 'red' : '#b894a3') + "!important" };
  const borderEmail = { borderColor: (!!state?.errors?.email ? 'red' : '#b894a3') + "!important" };
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
            <AccountCircleOutlinedIcon style={{ fontSize: "42px" }} />
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
                  <FieldAlert messages={state.errors.name}/>
                  :
                  null
                }
              </Grid>

              <Grid item xs={12} sm={12}
                    className='relative'>
                  <TextField
                  autoComplete='email'
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  sx={{
                    fieldset: borderEmail,
                    mb: 2,
                    "&:hover fieldset": borderEmail,
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": borderEmail
                    }
                  }}
                  />
                {state?.errors?.email
                  ?
                  <FieldAlert messages={state.errors.email}/>
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
                  <FieldAlert messages={state.errors.password} isPassword={true}/>
                  :
                  null
                }
              </Grid>

              <Grid item xs={4} sm={12}>
                <SignUpButton />
              </Grid>

              <Grid container justifyContent="flex-end"
                sx={{ mb: 2 }}>
                <Grid item>
                  <span> Already have an account? </span>
                  <Link href="/sign-in"
                    className='hover:contrast-75'> Sign in </Link>
                </Grid>
              </Grid>

            </Grid>
          </Box>
        </Box >
      </Container >
    </Box >
  )
}
*/