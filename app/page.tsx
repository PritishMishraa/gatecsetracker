import Announcment from "@/components/Announcment";
import Footer from "@/components/Footer";
import WelcomeBox from "@/components/WelcomeBox";
import Meteors from "@/components/Metor";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Announcment />
      <div className="container flex-1 flex flex-col items-center justify-center mt-6 md:mt-10 w-full">
        <WelcomeBox />
        <Meteors />
      </div>

      {/* Footer */}
      <div className="h-px bg-secondary w-full"></div>
      <Footer />
    </div>
  );
};

export default Home;
