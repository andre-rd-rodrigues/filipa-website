/* PLACEHOLDER LEGAL TEXT — mock content for structure. Must be reviewed by a qualified professional before publishing. */
import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";
import { PageHero } from "@/components/page-hero";
import { site, contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Filipa Marques — Coaching & PNL trata os teus dados pessoais: formulário de contacto, Google Analytics, base legal, direitos RGPD e contactos.",
};

export default function PrivacidadePage() {
  return (
    <>
      <PageHero title="Política de Privacidade" />

      <Section tone="page" narrow>
        <p className="eyebrow text-fg-muted">Última atualização: julho de 2026</p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Introdução
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          A tua privacidade é importante. Esta Política de Privacidade explica
          que dados pessoais são recolhidos quando visitas ou contactas através
          deste site, com que finalidades são tratados, qual a base legal do
          tratamento e quais os direitos que a lei te reconhece. Ao utilizar o
          site, aceitas as práticas aqui descritas.
        </p>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Este documento deve ser lido em conjunto com a{" "}
          <Link
            href="/cookies"
            className="text-action-deep underline underline-offset-2"
          >
            Política de Cookies
          </Link>{" "}
          e com os{" "}
          <Link
            href="/termos"
            className="text-action-deep underline underline-offset-2"
          >
            Termos e Condições
          </Link>
          .
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Responsável pelo tratamento
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          O responsável pelo tratamento dos dados pessoais recolhidos através
          deste site é <strong className="text-fg">{site.name}</strong> (
          {site.tagline}). Para qualquer questão relacionada com privacidade e
          proteção de dados, podes contactar:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-fg-muted mb-4">
          <li>
            Email:{" "}
            <a
              href={contact.emailHref}
              className="text-action-deep underline underline-offset-2"
            >
              {contact.email}
            </a>
          </li>
          <li>
            Telefone:{" "}
            <a
              href={contact.phoneHref}
              className="text-action-deep underline underline-offset-2"
            >
              {contact.phone}
            </a>
          </li>
          <li>{contact.location}</li>
        </ul>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Que dados recolhemos
        </h2>
        <h3 className="text-lg font-semibold mt-8 mb-3">
          Dados do formulário de contacto
        </h3>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Quando nos contactas através do formulário ou por email, podemos
          recolher os seguintes dados, que nos forneces voluntariamente:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-fg-muted mb-4">
          <li>Nome;</li>
          <li>Endereço de email;</li>
          <li>Número de telefone (opcional);</li>
          <li>Conteúdo da mensagem que decides partilhar.</li>
        </ul>

        <h3 className="text-lg font-semibold mt-8 mb-3">
          Dados de navegação (Google Analytics)
        </h3>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Se aceitares os cookies de análise, recolhemos dados agregados sobre a
          forma como o site é utilizado, através do Google Analytics:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-fg-muted mb-4">
          <li>Páginas visitadas e tempo de permanência;</li>
          <li>Tipo de dispositivo, navegador e sistema operativo;</li>
          <li>Dados aproximados de localização (país / região);</li>
          <li>
            Endereço IP, tratado de forma anonimizada (com truncagem do IP).
          </li>
        </ul>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Estes dados só são recolhidos após o teu consentimento expresso. Se
          recusares, o Google Analytics não é carregado.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Finalidades e base legal
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-fg-muted mb-4">
          <li>
            <strong className="text-fg">Responder aos teus contactos</strong> e
            dar seguimento a pedidos de marcação de sessões ou informações — base
            legal: execução de diligências pré-contratuais a teu pedido (art.º
            6.º, n.º 1, al. b) do RGPD).
          </li>
          <li>
            <strong className="text-fg">
              Análise estatística e melhoria do site
            </strong>{" "}
            através do Google Analytics — base legal: o teu consentimento (art.º
            6.º, n.º 1, al. a) do RGPD), que podes retirar a qualquer momento.
          </li>
        </ul>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Google Analytics
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Este site utiliza o Google Analytics, um serviço de análise de tráfego
          fornecido pela Google. Os scripts do Google Analytics{" "}
          <strong className="text-fg">
            só são carregados depois de aceitares os cookies de análise
          </strong>{" "}
          no banner de consentimento. Enquanto não deres o teu consentimento,
          nenhum dado é enviado para a Google.
        </p>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Neste contexto, a Google atua como subcontratante / terceiro,
          processando os dados por nossa conta e de acordo com as suas próprias
          condições. Para saber que cookies são usados e como podes gerir a tua
          preferência, consulta a{" "}
          <Link
            href="/cookies"
            className="text-action-deep underline underline-offset-2"
          >
            Política de Cookies
          </Link>
          .
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Partilha de dados com terceiros
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Não vendemos nem cedemos os teus dados pessoais a terceiros para fins
          comerciais. Os dados de navegação recolhidos com o teu consentimento
          são partilhados com a Google, enquanto fornecedora do Google
          Analytics, exclusivamente para efeitos de análise estatística. Esta
          partilha pode implicar a transferência de dados para fora do Espaço
          Económico Europeu, sujeita às garantias legais aplicáveis.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Conservação dos dados
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Os dados do formulário de contacto são conservados apenas durante o
          tempo necessário para responder ao teu pedido e cumprir eventuais
          obrigações legais. Os dados de análise recolhidos pelo Google
          Analytics são conservados de acordo com os prazos definidos nessa
          ferramenta. Findos estes prazos, os dados são eliminados ou
          anonimizados.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Os teus direitos
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Enquanto titular dos dados, tens os seguintes direitos, que podes
          exercer a qualquer momento:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-fg-muted mb-4">
          <li>Direito de acesso aos teus dados pessoais;</li>
          <li>Direito de retificação de dados incorretos ou incompletos;</li>
          <li>Direito ao apagamento (&ldquo;direito a ser esquecido&rdquo;);</li>
          <li>Direito de oposição ao tratamento;</li>
          <li>Direito à portabilidade dos dados;</li>
          <li>
            Direito de retirar o consentimento a qualquer momento, sem
            comprometer a licitude do tratamento anterior.
          </li>
        </ul>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Para exercer qualquer destes direitos, basta enviar um pedido para{" "}
          <a
            href={contact.emailHref}
            className="text-action-deep underline underline-offset-2"
          >
            {contact.email}
          </a>
          .
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Reclamações
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Se considerares que o tratamento dos teus dados viola a legislação
          aplicável, tens o direito de apresentar reclamação junto da autoridade
          de controlo competente em Portugal — a{" "}
          <strong className="text-fg">
            CNPD (Comissão Nacional de Proteção de Dados)
          </strong>
          .
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Alterações a esta política
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Esta Política de Privacidade pode ser atualizada sempre que necessário,
          para refletir alterações legais ou na forma como o site funciona. A
          versão em vigor é sempre a publicada nesta página, com a respetiva data
          de atualização.
        </p>

        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mt-12 mb-4">
          Contacto
        </h2>
        <p className="text-pretty text-fg-muted leading-relaxed mb-4">
          Para qualquer questão sobre esta política ou sobre o tratamento dos
          teus dados, contacta-nos por email para{" "}
          <a
            href={contact.emailHref}
            className="text-action-deep underline underline-offset-2"
          >
            {contact.email}
          </a>
          . Podes também consultar a nossa{" "}
          <Link
            href="/cookies"
            className="text-action-deep underline underline-offset-2"
          >
            Política de Cookies
          </Link>{" "}
          e os{" "}
          <Link
            href="/termos"
            className="text-action-deep underline underline-offset-2"
          >
            Termos e Condições
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
