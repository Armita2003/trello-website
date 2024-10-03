import SignIn from "@/components/SignIn";

const SignInPage = () => {
    return <SignIn />;
};

SignInPage.getLayout = function getLayout(page) {
    return { page };
};

export default SignInPage;
