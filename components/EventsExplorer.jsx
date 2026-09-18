"use client"

import { useState } from "react"
import EventCard from "@/components/EventCard"
import { getUpcomingEvents, getPastEvents, getHubs } from "@/lib/data"

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-jyc-text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 rounded-lg border border-solid bg-jyc-bg-card px-3 pr-8 text-sm text-jyc-text-primary transition-colors focus:border-jyc-accent-gold focus:outline-none"
        style={{ borderColor: "var(--border-tech)" }}
      >
        <option value="all">All Hubs</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  )
}

function SearchInput({ value, onChange }) {
  return (
    <label className="flex flex-1 flex-col gap-1.5">
      <span className="text-xs font-semibold uppercase tracking-wide text-jyc-text-muted">
        Search
      </span>
      <div className="relative">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-jyc-text-muted"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search events by title…"
          className="h-11 w-full rounded-lg border border-solid bg-jyc-bg-card pl-10 pr-4 text-sm text-jyc-text-primary placeholder:text-jyc-text-muted transition-colors focus:border-jyc-accent-gold focus:outline-none"
          style={{ borderColor: "var(--border-tech)" }}
        />
      </div>
    </label>
  )
}

function EventGrid({ events }) {
  if (events.length === 0) {
    return (
      <p className="mt-10 text-center text-sm font-medium uppercase tracking-wide text-jyc-text-muted">
        No events match your filters
      </p>
    )
  }
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

export default function EventsExplorer() {
  const hubs = getHubs()
  const [query, setQuery] = useState("")
  const [hubFilter, setHubFilter] = useState("all")

  const filterEvents = (events) =>
    events.filter(
      (event) =>
        (hubFilter === "all" || event.hubId === hubFilter) &&
        event.title.toLowerCase().includes(query.trim().toLowerCase())
    )

  const upcoming = filterEvents(getUpcomingEvents())
  const past = filterEvents(getPastEvents())

  return (
    <div className="jyc-container">
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-[1fr_auto] lg:max-w-none lg:gap-8">
        <SearchInput value={query} onChange={setQuery} />
        <FilterSelect
          label="Filter by Hub"
          value={hubFilter}
          onChange={setHubFilter}
          options={hubs}
        />
      </div>

      <section className="mb-16">
        <h2 className="jyc-h2 mt-16">Upcoming Events</h2>
        <p className="mt-2 text-sm text-jyc-text-muted">
          What&apos;s next on the JYC calendar.
        </p>
        <EventGrid events={upcoming} />
      </section>

      <section>
        <h2 className="jyc-h2">Past Events</h2>
        <p className="mt-2 text-sm text-jyc-text-muted">
          Relive the moments we&apos;ve already made.
        </p>
        <EventGrid events={past} />
      </section>
    </div>
  )
}