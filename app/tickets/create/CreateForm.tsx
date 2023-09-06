"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("low");
  const [author, setAuthor] = useState("Person A");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const newTicket = {
      title,
      message,
      severity,
      author,
      timestamp: Date.now(),
    };

    const res = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket),
    });

    if (res.status === 201) {
      router.refresh();
      router.push("/tickets");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
      </label>
      <label>
        <span>Message:</span>
      </label>
      <textarea
        required
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <label>
        <span>Severity:</span>
      </label>
      <select onChange={(e) => setSeverity(e.target.value)} value={severity}>
        <option value="low">Low Severity</option>
        <option value="medium">Medium Severity</option>
        <option value="high">High Severity</option>
      </select>
      <label>
        <span>Author:</span>
      </label>
      <select onChange={(e) => setAuthor(e.target.value)} value={author}>
        <option value="Person A">Person A</option>
        <option value="Person B">Person B</option>
        <option value="Person C">Person C</option>
      </select>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Creating ticket...</span>}
        {!isLoading && <span>Create Ticket</span>}
      </button>
    </form>
  );
}
