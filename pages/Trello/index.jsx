import Trello from "@/components/Trello/Trello";

const TrelloPage = () => {
    return <Trello />;
};

TrelloPage.getLayout = function getLayout(page) {
    return { page };
};

export default TrelloPage;
