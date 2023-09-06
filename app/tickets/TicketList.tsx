import Link from "next/link";

async function getTickets() {
  const res = await fetch("http://localhost:4000/tickets", {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });

  return res.json();
}

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map(
        (ticket: {
          id: number;
          title: string;
          message: string;
          severity: string;
        }) => (
          <Link href={`/tickets/${ticket.id}`}>
            <li key={ticket.id} className="card">
              <h3>{ticket.title}</h3>
              <p>{ticket.message.slice(0, 200)}...</p>
              <div className={`pill ${ticket.severity}`}>
                {ticket.severity} severity
              </div>
            </li>
          </Link>
        )
      )}
      {tickets.length === 0 && (
        <p className="text-center">There are currently no open tickets.</p>
      )}
    </>
  );
}
