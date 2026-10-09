import { site } from "@/content/site";
import { GithubIcon, LinkedInIcon, MailIcon } from "./icons";

async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer({ location }: { location: string }) {
  return (
    <footer className="border-t border-stroke px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          © <Year /> {site.name} · {location}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}

export function SocialLinks({ size = 20 }: { size?: number }) {
  const links = [
    { href: site.socials.github, label: "GitHub", Icon: GithubIcon },
    { href: site.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: `mailto:${site.email}`, label: "Email", Icon: MailIcon },
  ];
  return (
    <ul className="flex items-center gap-2">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="grid size-10 place-items-center rounded-control border border-stroke text-medium transition-colors duration-150 hover:border-stroke-strong hover:text-bright"
          >
            <Icon size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
