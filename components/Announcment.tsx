import Link from "next/link";

const Announcment = () => {
  return (
    <div className="border-border/50 bg-card/80 border-b backdrop-blur-sm">
      <div className="container flex text-sm leading-6">
        <Link
          href="/new"
          className="flex w-full flex-col justify-between gap-1 py-3 sm:flex-row sm:items-center"
        >
          <p className="text-foreground">
            Explore the
            <span className="font-semibold"> new </span>
            early access experience
          </p>
          <p className="text-muted-foreground">
            Join here
            <span aria-hidden="true"> &rarr;</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Announcment;
