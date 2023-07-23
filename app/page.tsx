import Meteors from "@/components/Metor";
import Footer from "@/components/Footer";
import WelcomeBox from "@/components/WelcomeBox";
import SubjectBox from "@/components/SubjectBox";
import Announcment from "@/components/Announcment";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Announcment />
      <div className="container flex-1 flex flex-col items-center justify-center gap-12 mt-6 md:mt-10 w-full">
        <WelcomeBox />
        <SubjectBox />
        <Meteors />
      </div>

      {/* Footer */}
      <div className="h-px bg-secondary w-full mt-20"></div>
      <Footer />
    </div>
  );
};

export default Home;
