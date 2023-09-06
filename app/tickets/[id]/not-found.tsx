import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">Whoops...</h2>
      <p>Ticket not found.</p>
      <p>
        Go back to <Link href="/tickets">tickets list</Link>.
      </p>
    </main>
  );
}
