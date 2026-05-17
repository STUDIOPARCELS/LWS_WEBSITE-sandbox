// White-Sands-only essay callout (§7). The essay target is a TODO(Lisa)
// stub until the final link is supplied (§9.3).

export default function EssayCallout() {
  return (
    <aside className="border-t border-line py-14">
      <p className="kicker">Essay — A Veiled Sanctuary</p>
      <p className="mt-4 max-w-xl font-serif text-[clamp(18px,2.4vw,26px)] font-light italic leading-snug text-ink">
        A written companion to the White Sands survey — the gypsum dunefield as
        a veiled sanctuary.
      </p>
      {/* TODO(Lisa) §9.3 — replace "#" with the published essay URL. */}
      <a
        href="#"
        className="mt-5 inline-block font-mono text-[11px] uppercase tracking-wide text-ink"
      >
        <span className="border-b border-ink pb-0.5">Read essay →</span>
      </a>
    </aside>
  );
}
