import Meteors from "@/components/Metor";
import WelcomeBox from "@/components/WelcomeBox";
import SubjectBox from "@/components/SubjectBox";
import ChannelBox from "@/components/ChannelBox";

const Home = () => {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 mt-6 md:mt-10 w-full">
      <WelcomeBox />
      <SubjectBox />
      <ChannelBox />
      <Meteors />
    </div>
  );
};

export default Home;
