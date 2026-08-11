"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          message: form.get("message"),
          website: form.get("website") ?? "",
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p role="status" className="text-ink-900/90">Mèsi — mesaj ou a voye.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink-900">
          Non
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={200}
          className="mt-1 w-full rounded-lg border border-line-200 bg-white px-4 py-2.5"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-line-200 bg-white px-4 py-2.5"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink-900">
          Mesaj
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          className="mt-1 w-full rounded-lg border border-line-200 bg-white px-4 py-2.5"
        />
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px]"
        aria-hidden="true"
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "…" : "Voye"}
      </Button>
      {status === "error" && (
        <p role="alert" className="text-sm text-ink-900/70">
          Sèvis la poko disponib — tanpri eseye pita.
        </p>
      )}
    </form>
  );
}
