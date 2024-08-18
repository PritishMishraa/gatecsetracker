import Meteors from "@/components/Metor";
import WelcomeBox from "@/components/WelcomeBox";
import SubjectBox from "@/components/SubjectBox";
import ChannelBox from "@/components/ChannelBox";

export default async function Home() {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/PritishMishraa/gatecsetracker"
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));

  return (
    <div className="container flex flex-col items-center justify-center gap-12 mt-6 md:mt-10 w-full">
      <WelcomeBox />
      <SubjectBox />
      <ChannelBox />
      <Meteors stars={stars} />
    </div>
  );
}
