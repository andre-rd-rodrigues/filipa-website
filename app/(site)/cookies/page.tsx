/* PLACEHOLDER LEGAL TEXT — mock content for structure. Must be reviewed by a qualified professional before publishing. */
import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { CookieSettingsButton } from "@/components/consent";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "O que são cookies, como este site usa cookies do Google Analytics apenas após consentimento, os tipos utilizados e como gerir a tua preferência.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Política de Cookies",
    description:
      "O que são cookies, como este site usa cookies do Google Analytics apenas após consentimento, os tipos utilizados e como gerir a tua preferência.",
    type: "website",
  },
};

const cookies = [
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: "Distinguir utilizadores",
    duration: "2 anos",
  },
  {
    name: "_ga_<container-id>",
    provider: "Google Analytics",
    purpose: "Manter o estado da sessão",
    duration: "2 anos",
  },
  {
    name: "_gid",
    provider: "Google Analytics",
    purpose: "Distinguir utilizadores",
    duration: "24 horas",
  },
  {
    name: "fm-cookie-consent",
    provider: "Este site",
    purpose: "Guardar a tua preferência de cookies",
    duration: "12 meses",
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHero title="Política de Cookies" />

      <Section tone="page" narrow>
        <p className="eyebrow text-fg-muted">Última atualização: julho de 2026</p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          O que são cookies
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Os cookies são pequenos ficheiros de texto que os sites guardam no teu
          dispositivo (computador, telemóvel ou tablet) quando os visitas.
          Servem, entre outras finalidades, para recordar preferências e para
          recolher informação estatística sobre a utilização do site. Alguns
          dados semelhantes podem também ser guardados através do armazenamento
          local (localStorage) do navegador.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Como usamos cookies
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Utilizamos cookies para duas finalidades principais: guardar a tua
          preferência de consentimento e, caso aceites, analisar de forma
          estatística e agregada a utilização do site através do Google
          Analytics. Não usamos cookies para publicidade nem para partilhar os
          teus dados com fins comerciais.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Consentimento
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Na primeira visita, é apresentado um banner de consentimento. Os
          cookies de análise (Google Analytics){" "}
          <strong className="text-fg">
            só são carregados depois de clicares em &ldquo;Aceitar&rdquo;
          </strong>
          . Se recusares, nenhum cookie de análise é instalado e nenhum dado é
          enviado para a Google. Podes alterar a tua escolha a qualquer momento:
        </p>
        <div className="mb-4">
          <CookieSettingsButton className="inline-flex items-center rounded-none border border-action bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-action transition-colors hover:border-action hover:bg-action hover:text-fg-inverse">
            Alterar preferências de cookies
          </CookieSettingsButton>
        </div>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Tipos de cookies
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          A tabela seguinte resume os cookies e armazenamento utilizados neste
          site:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[color:var(--border-stone)]">
                <th className="py-3 pr-4 font-semibold text-fg">Cookie</th>
                <th className="py-3 pr-4 font-semibold text-fg">Fornecedor</th>
                <th className="py-3 pr-4 font-semibold text-fg">Finalidade</th>
                <th className="py-3 pr-4 font-semibold text-fg">Duração</th>
              </tr>
            </thead>
            <tbody>
              {cookies.map((cookie) => (
                <tr
                  key={cookie.name}
                  className="border-b border-[color:var(--border-stone)]"
                >
                  <td className="py-3 pr-4 font-mono text-fg">{cookie.name}</td>
                  <td className="py-3 pr-4 text-fg-muted">{cookie.provider}</td>
                  <td className="py-3 pr-4 text-fg-muted">{cookie.purpose}</td>
                  <td className="py-3 pr-4 text-fg-muted">{cookie.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Cookies essenciais vs. de análise
        </h2>
        <h3 className="text-lg font-semibold mt-8 mb-3">Cookies essenciais</h3>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          São necessários ao funcionamento básico do site e à memorização das
          tuas escolhas. É o caso do <code className="font-mono">fm-cookie-consent</code>
          , que guarda a tua preferência de cookies para não te voltarmos a
          perguntar em cada visita. Estes itens não dependem de consentimento
          prévio, por serem estritamente necessários.
        </p>
        <h3 className="text-lg font-semibold mt-8 mb-3">Cookies de análise</h3>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          São instalados pelo Google Analytics para medir, de forma agregada,
          como o site é utilizado. Só são ativados com o teu consentimento
          expresso e podem ser desativados a qualquer momento, retirando o
          consentimento no banner.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Como gerir ou desativar cookies no navegador
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Além do banner de consentimento deste site, podes gerir ou eliminar
          cookies diretamente nas definições do teu navegador. A maioria dos
          navegadores permite bloquear ou apagar cookies — consulta a secção de
          privacidade / cookies do teu navegador (por exemplo, Google Chrome,
          Mozilla Firefox, Safari ou Microsoft Edge). Nota que desativar
          determinados cookies pode afetar algumas funcionalidades.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Alterações a esta política
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Esta Política de Cookies pode ser atualizada sempre que necessário. A
          versão em vigor é sempre a publicada nesta página, com a respetiva data
          de atualização.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Contacto
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Para qualquer questão sobre esta política, contacta-nos por email para{" "}
          <a
            href={contact.emailHref}
            className="text-action-deep underline underline-offset-2"
          >
            {contact.email}
          </a>
          . Para saber como tratamos os teus dados, consulta a{" "}
          <Link
            href="/privacidade"
            className="text-action-deep underline underline-offset-2"
          >
            Política de Privacidade
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
