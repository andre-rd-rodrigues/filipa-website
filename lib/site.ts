/**
 * Central site configuration: navigation, contact, socials, legal.
 * Real contact/social data from the current Canva site; the rest is mocked
 * structure ready to be replaced with final content.
 */

export const site = {
  name: "Filipa Marques",
  tagline: "Coaching & PNL",
  fullName: "Filipa Marques — Coaching & PNL",
  description:
    "Mental coach e coach de PNL, com pós-graduação em Psicologia do Desporto. Coaching, inteligência emocional e comunicação para atletas, treinadores e profissionais do desporto. Resultados concretos, em português.",
  url: "https://filipamarques.pt",
  locale: "pt-PT",
  quote: "A tua mente joga a teu favor. O primeiro passo é teu.",
} as const;


export const quotes = {
  home: "O movimento é a ponte entre o que idealizas e o que conquistas.",
  servicos:
    "A verdadeira liberdade é quando deixas de reagir ao que te acontece e passas a responder com intenção.",
  sobre: "A estratégia mental não ganha o jogo, mas é o primeiro passo que te coloca em campo.",
} as const;

export const contact = {
  phone: "+351 933 327 567",
  phoneHref: "tel:+351933327567",
  email: "filipamarques.coaching.pnl@gmail.com",
  emailHref: "mailto:filipamarques.coaching.pnl@gmail.com",
  location: "Portugal · Presencial e online",
} as const;

export const socials = [
  {
    label: "Instagram",
    handle: "@filipamarques.coaching.pnl",
    href: "https://www.instagram.com/filipamarques.coaching.pnl",
  },
  {
    label: "LinkedIn",
    handle: "Filipa Marques",
    href: "https://www.linkedin.com/in/filipa-marques-37585aa7/",
  },
  {
    label: "Facebook",
    handle: "Filipa Marques",
    href: "https://www.facebook.com/profile.php?id=100077925214783",
  },
] as const;

export type NavLink = { label: string; href: string };

/** Primary navigation (header). */
export const navLinks: NavLink[] = [
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Cursos", href: "/cursos" },
  { label: "Blog", href: "/blog" },
  { label: "Podcast", href: "/podcast" },
  { label: "Contactos", href: "/contactos" },
];

/** Legal / policy pages (footer + cookie banner). */
export const legalLinks: NavLink[] = [
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Termos e Condições", href: "/termos" },
  { label: "Política de Cookies", href: "/cookies" },
];

/** Primary call to action, used across pages. */
export const primaryCta = { label: "Marcar conversa", href: "/contactos" } as const;

/** Site design / development credit (footer). */
export const siteCredit = {
  name: "André Rodrigo",
  href: "https://andrerodrigo.com",
} as const;
