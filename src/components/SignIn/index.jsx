import { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Alert,
    Snackbar,
    Stack,
    InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { AccountCircle } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { useRouter } from "next/router";

const SignIn = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = () => {
        setOpenSnackbar(true);
        setTimeout(() => {
            router.push("/Trello");
        }, 1000);
    };

    return (
        <Stack justifyContent='center' alignItems='center' height='100vh'>
            <Container
                maxWidth='xs'
                sx={{
                    p: 4,
                    borderRadius: 1,
                    bgcolor: "white",
                }}
            >
                <Stack
                    sx={{
                        px: 2,
                    }}
                >
                    <Typography
                        variant='h5'
                        color='#3d3d4e'
                        align='center'
                        mb={2}
                    >
                        Welcome
                    </Typography>
                    <Formik
                        initialValues={{ username: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit, handleChange, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label='Enter your Username'
                                    variant='outlined'
                                    fullWidth
                                    margin='normal'
                                    name='username'
                                    placeholder='Username'
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    label='Enter your Password'
                                    type='password'
                                    variant='outlined'
                                    fullWidth
                                    margin='normal'
                                    name='password'
                                    placeholder='Password'
                                    onChange={handleChange}
                                    required
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    disabled={isSubmitting}
                                    sx={{
                                        py: 1.5,
                                        mt: 2,
                                        textTransform: "none",
                                    }}
                                >
                                    Sign In
                                </Button>
                            </form>
                        )}
                    </Formik>
                </Stack>
                <Snackbar open={openSnackbar} autoHideDuration={3000}>
                    <Alert
                        severity='success'
                        variant='filled'
                        sx={{ width: "100%" }}
                    >
                        Sign-in successful!
                    </Alert>
                </Snackbar>
            </Container>
        </Stack>
    );
};

export default SignIn;
