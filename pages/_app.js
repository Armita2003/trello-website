import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import { createTheme } from "@mui/material/styles";

// const theme = createTheme();

// function MyApp({ Component, pageProps }) {
//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Component {...pageProps} />
//         </ThemeProvider>
//     );
// }

// export default MyApp;
