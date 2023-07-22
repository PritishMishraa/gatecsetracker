import SubjectCard from "@/components/SubjectCard";

const Home = () => {
  const subjects = require("../../data/subjects.json");

  return (
    <div className="max-w-2xl mx-auto mb-20 p-4 md:p-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
        {subjects.map(
          (subject: { subjectCode: string; subjectName: string }) => (
            <SubjectCard
              key={subject.subjectCode}
              subjectCode={subject.subjectCode}
              subjectName={subject.subjectName}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
