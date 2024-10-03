import Home from "@/components/Trello/Home";

const HomePage = () => {
    return <Home />;
};

HomePage.getLayout = function getLayout(page) {
    return { page };
};

export default HomePage;
