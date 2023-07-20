import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import {object, string, TypeOf} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid, Link,
  TextField,
  Typography
} from "@mui/material";
import {sendData} from "../utils";
import {registerUrl} from "../constants/endpoints";


const registerSchema = object({
  username: string().nonempty('Username is required'),
  email: string().nonempty('Username is required').email("Email is invalid'"),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  password_confirm: string()
    .nonempty('Password Confirm is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})

type RegisterInput = TypeOf<typeof registerSchema>;

export const RegisterPage = () => {

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });


  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const navigate = useNavigate()

  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    const {password, password_confirm, email, username} = values
    const response = await sendData(registerUrl, {password, password_confirm, email, username});
    if (response.ok) {
      navigate("/login")
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 5, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type={"email"}
            autoComplete="email"
            error={!!errors['email']}
            helperText={errors['email'] ? errors['email'].message : ''}
            {...register('email')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            error={!!errors['username']}
            helperText={errors['username'] ? errors['username'].message : ''}
            {...register('username')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            error={!!errors['password']}
            helperText={errors['password'] ? errors['password'].message : ''}
            {...register('password')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password Confrim"
            type="password"
            error={!!errors['password_confirm']}
            helperText={errors['password_confirm'] ? errors['password_confirm'].message : ''}
            {...register('password_confirm')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => navigate("/login")}  variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}