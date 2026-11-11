import { phoneLink } from "../../lib/contact";
import { usePageWhatsApp } from "../../lib/usePageWhatsApp";
import { Icon } from "../ui/Icon";
import styles from "./StickyContactBar.module.css";

/**
 * Phones only: a floating bar fixed to the bottom of the screen with
 * WhatsApp (main action) and Call. The WhatsApp message matches the page.
 */
export function StickyContactBar() {
  const whatsapp = usePageWhatsApp();
  const tel = phoneLink();
  if (!whatsapp && !tel) return null;

  return (
    <div className={styles.bar}>
      {whatsapp && (
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.whatsapp}>
          <Icon name="whatsapp" size={20} />
          Plan on WhatsApp
        </a>
      )}
      {tel && (
        <a href={tel} className={styles.call} aria-label="Call CHS Tours">
          <Icon name="phone" size={20} />
        </a>
      )}
    </div>
  );
}
