import Image from "next/image";
import { CalendarDays, Images, MapPin } from "lucide-react";
import type { RecruitmentEvent } from "@/types/events";
import styles from "./EventsGallery.module.css";

function EventMetadata({ event }: { event: RecruitmentEvent }) {
  if (event.isDemo) return null;
  const date = event.date ? new Date(event.date) : null;
  const validDate = date && !Number.isNaN(date.getTime());
  if (!validDate && !event.location) return null;

  return (
    <div className={styles.metadata}>
      {validDate && <span><CalendarDays size={14} aria-hidden="true" /><time dateTime={event.date}>{new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(date)}</time></span>}
      {event.location && <span><MapPin size={14} aria-hidden="true" />{event.location}</span>}
    </div>
  );
}

export default function EventsGallery({ events }: { events: readonly RecruitmentEvent[] }) {
  const visibleEvents = events.filter((event) => event.status === "published")
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  const hasSamples = visibleEvents.some((event) => event.isDemo);

  return (
    <section className={styles.section} aria-labelledby="events-heading">
      <div className="container-padded">
        <header className={styles.header}>
          <div><p className={styles.eyebrow}>Our activities</p><h2 id="events-heading">Recruitment Events <br />&amp; Activities</h2></div>
          <p className={styles.introduction}>A space for candidate preparation, employer engagement and agency event updates, as confirmed stories become available.</p>
        </header>
        {hasSamples && <p className={styles.notice}><Images size={19} aria-hidden="true" /><span><strong>Development preview.</strong> These illustrative samples show the gallery’s presentation. They are not records or photographs of actual A-One events.</span></p>}
        {visibleEvents.length > 0 ? (
          <div className={styles.gallery}>
            {visibleEvents.map((event, index) => (
              <article key={event.id} className={`${styles.card} ${index === 0 && event.isFeatured ? styles.featured : ""}`}>
                <div className={styles.imageFrame}>
                  <Image src={event.coverImage.src} alt={event.coverImage.alt} fill sizes={index === 0 && event.isFeatured ? "(min-width: 1280px) 670px, (min-width: 900px) 55vw, 100vw" : "640px"} style={{ objectPosition: event.coverImage.position }} />
                  {event.isDemo && <span className={styles.sampleLabel}>Development Sample</span>}
                </div>
                <div className={styles.body}>
                  <p className={styles.category}>{event.category}</p>
                  <h3>{event.title}</h3>
                  <EventMetadata event={event} />
                  <p className={styles.summary}>{event.summary}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.empty}><Images size={36} aria-hidden="true" /><h3>New stories will appear here.</h3><p>Confirmed recruitment activities and agency event updates will be shared as they become available.</p></div>
        )}
      </div>
    </section>
  );
}
