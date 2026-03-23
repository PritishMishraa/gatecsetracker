import Link from "next/link";

const Announcment = () => {
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-[#0f1623] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_10%,rgba(37,99,235,0.28)_0%,transparent_70%),radial-gradient(ellipse_50%_40%_at_85%_80%,rgba(37,99,235,0.16)_0%,transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="container relative flex text-sm leading-6">
        <Link
          href="/new"
          className="flex w-full flex-col justify-between gap-1 py-3 sm:flex-row sm:items-center"
        >
          <p>
            Explore the
            <span className="font-bold tracking-wider"> new </span>
            early access experience
          </p>
          <p className="text-white/85">
            Join the next experience
            <span className="font-bold tracking-wider text-white"> HERE </span>
            &nbsp;
            <span aria-hidden="true">→</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Announcment;
