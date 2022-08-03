import HomeBarner from "../components/main-contents/barner";
import ContactUs from "../components/main-contents/contactUs";
import CurrentOffer from "../components/main-contents/current-offer";
import HomeAbout from "../components/main-contents/home-about";

function HomePage(props) {
  return (
    <div>
      <HomeBarner />
      <HomeAbout title="Chegbe Homes" subTitle="Welcome to Chegbe Homes" />
      <CurrentOffer />
      <ContactUs />
    </div>
  );
}

export default HomePage;
