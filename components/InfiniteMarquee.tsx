const subjects = [
  "Aptitude",
  "Algorithms",
  "Digital Logic",
  "C Programming",
  "Data Structure",
  "Compiler Design",
  "Operating System",
  "Computer Network",
  "Discrete Mathematics",
  "Theory of Computation",
  "Engineering Mathematics",
  "Database Management System",
  "Computer Organization & Architecture",
];

const InfiniteMarquee = () => {
  return (
    <div
      className="relative overflow-hidden w-full h-full"
      style={{
        WebkitMaskImage:
          "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 20%, rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)",
      }}
    >
      <div className="animate-marquee max-w-[8rem]">
        {subjects.map((subject, index) => (
          <div key={index} className="py-2 font-semibold">
            {subject}
          </div>
        ))}
      </div>
      <div className="animate-marquee-reverse absolute top-0 max-w-[8rem]">
        {subjects.map((subject, index) => (
          <div key={index} className="py-2 font-semibold">
            {subject}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteMarquee;
