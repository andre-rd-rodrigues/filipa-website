/* PLACEHOLDER LEGAL TEXT — mock content for structure. Must be reviewed by a qualified professional before publishing. */
import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { site, contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description:
    "Termos e condições de utilização do site da Filipa Marques — Coaching & PNL: objeto, propriedade intelectual, isenção de responsabilidade e lei aplicável.",
};

export default function TermosPage() {
  return (
    <>
      <PageHero title="Termos e Condições" />

      <Section tone="page" narrow>
        <p className="eyebrow text-fg-muted">Última atualização: julho de 2026</p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Aceitação dos termos
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Ao aceder e utilizar este site, aceitas integralmente os presentes
          Termos e Condições. Se não concordares com alguma das condições aqui
          previstas, deves abster-te de utilizar o site. Estes termos aplicam-se
          a todos os visitantes e utilizadores.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Objeto do site
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Este site tem natureza meramente informativa e destina-se a apresentar
          os serviços de coaching, Programação Neurolinguística (PNL) e
          inteligência emocional de <strong className="text-fg">{site.name}</strong>{" "}
          ({site.tagline}), bem como a permitir o contacto para marcação de
          sessões e esclarecimento de dúvidas.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Propriedade intelectual
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Todos os conteúdos deste site — incluindo textos, imagens, logótipo,
          marca, grafismos, estrutura e código — são propriedade de{" "}
          {site.name} ou de terceiros que autorizaram a sua utilização, estando
          protegidos pela legislação de propriedade intelectual aplicável. Não é
          permitida a reprodução, distribuição, modificação ou utilização
          comercial dos conteúdos sem autorização prévia e por escrito.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Utilização permitida
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Comprometes-te a utilizar o site de forma lícita e de acordo com estes
          termos. É, nomeadamente, proibido:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-fg-muted mb-4">
          <li>Utilizar o site para fins ilícitos ou não autorizados;</li>
          <li>
            Tentar aceder, sem autorização, a áreas restritas ou a sistemas
            associados ao site;
          </li>
          <li>
            Introduzir vírus, código malicioso ou qualquer elemento que
            prejudique o funcionamento do site;
          </li>
          <li>Reproduzir ou explorar comercialmente os conteúdos sem autorização.</li>
        </ul>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Isenção de responsabilidade
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          A informação disponibilizada neste site tem carácter geral e
          informativo. Os conteúdos de coaching, PNL e inteligência emocional{" "}
          <strong className="text-fg">
            não substituem acompanhamento clínico, médico ou psicológico
          </strong>{" "}
          individualizado. Em caso de necessidade, deves procurar aconselhamento
          profissional adequado à tua situação específica. Não garantimos que a
          informação esteja sempre completa, atual ou isenta de erros.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Ligações para sites terceiros
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Este site pode conter ligações para sites de terceiros (por exemplo,
          redes sociais). Essas ligações são disponibilizadas apenas por
          conveniência e não implicam qualquer responsabilidade nossa pelos
          respetivos conteúdos, políticas ou práticas. O acesso a esses sites é
          feito por tua conta e risco.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Proteção de dados
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          O tratamento dos teus dados pessoais rege-se pela nossa{" "}
          <Link
            href="/privacidade"
            className="text-action-deep underline underline-offset-2"
          >
            Política de Privacidade
          </Link>
          , que te recomendamos ler com atenção.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Cookies
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Este site utiliza cookies, incluindo cookies de análise (Google
          Analytics) carregados apenas após o teu consentimento. Para mais
          detalhes, consulta a{" "}
          <Link
            href="/cookies"
            className="text-action-deep underline underline-offset-2"
          >
            Política de Cookies
          </Link>
          .
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Alterações aos termos
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Reservamo-nos o direito de alterar estes Termos e Condições a qualquer
          momento. As alterações produzem efeitos a partir da sua publicação
          nesta página. A utilização continuada do site após a publicação de
          alterações implica a aceitação das mesmas.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Lei aplicável e foro
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Os presentes Termos e Condições regem-se pela legislação portuguesa.
          Para a resolução de qualquer litígio emergente da sua interpretação ou
          aplicação, será competente o foro da comarca portuguesa
          territorialmente aplicável, com expressa renúncia a qualquer outro.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Contacto
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Para qualquer questão relacionada com estes termos, contacta-nos por
          email para{" "}
          <a
            href={contact.emailHref}
            className="text-action-deep underline underline-offset-2"
          >
            {contact.email}
          </a>
          .
        </p>
      </Section>
    </>
  );
}
