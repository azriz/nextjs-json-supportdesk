import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = true;

export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");

  const tickets = await res.json();

  return tickets.map((ticket: { id: number }) => ({
    id: ticket.id,
  }));
}

async function getTicket(id: number) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TicketDetails({
  params,
}: {
  params: { id: number };
}) {
  // const id = params.id
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card hover:bg-transparent">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.author}</small>
        <p>{ticket.message}</p>
        <div className={`pill ${ticket.severity}`}>
          {ticket.severity} severity
        </div>
      </div>
      <div>
        <Link href="/tickets">
          <button className="btn-primary">Back</button>
        </Link>
      </div>
    </main>
  );
}
