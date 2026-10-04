import { missionVisionContent } from "@/config/mission-vision";
import styles from "./MissionVision.module.css";

export default function MissionVision() {
  return (
    <section className={styles.section} aria-label="Our vision and mission">
      <div className={`container-padded ${styles.grid}`}>
        {missionVisionContent.map((item) => (
          <div key={item.id} className={styles.column}>
            <span className={styles.number} aria-hidden="true">{item.number}</span>
            <h2 id={`home-${item.id}-heading`} className={styles.heading}>{item.heading}</h2>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
