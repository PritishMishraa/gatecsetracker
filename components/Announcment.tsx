import Link from "next/link";

const Announcment = () => {
  return (
    <div>
      <div className="text-sm leading-6 flex text-white container">
        <Link
          href="/request"
          className="flex flex-col sm:flex-row py-2.5 sm:items-center w-full justify-between"
        >
          <p>
            Introducing{" "}
            <span className="font-bold tracking-wider">Sub-Req</span> for
            Students
          </p>
          <p>
            Join the waitlist for early access &nbsp;
            <span aria-hidden="true">→</span>
          </p>
        </Link>
      </div>
      <div className="h-px bg-secondary w-full"></div>
    </div>
  );
};

export default Announcment;
