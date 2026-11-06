import { siFacebook, siInstagram, siMessenger, siWhatsapp } from "simple-icons";

const icons = { whatsapp: siWhatsapp, messenger: siMessenger, facebook: siFacebook, instagram: siInstagram };

type Props = {
  name: keyof typeof icons;
  size?: number;
  className?: string;
};

/** WhatsApp, Messenger, Facebook and Instagram glyphs from Simple Icons, inheriting the current text colour. */
export function BrandIcon({ name, size = 20, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d={icons[name].path} />
    </svg>
  );
}
