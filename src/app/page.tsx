import Image from "next/image";

const whatsappUrl = (message: string) =>
  `https://wa.me/5511999145705?text=${encodeURIComponent(message)}`;

const services = [
  {
    code: "01",
    title: "Limpeza pós-obra",
    description:
      "Preparação cuidadosa do espaço após a obra, com organização e atenção ao momento da entrega.",
    tag: "Entrega final",
  },
  {
    code: "02",
    title: "Grandes lojas",
    description:
      "Experiência em limpezas comerciais de grande porte, respeitando as necessidades de cada espaço.",
    tag: "Escala comercial",
  },
  {
    code: "03",
    title: "Apoio a construtoras",
    description:
      "Equipe preparada e coordenação próxima para apoiar a etapa final de obras e reformas.",
    tag: "Atendimento técnico",
  },
] as const;

const process = [
  ["01", "Entender", "Levantamos as características do espaço e da entrega."],
  ["02", "Planejar", "Organizamos equipe, produtos e sequência de trabalho."],
  ["03", "Executar", "A proprietária coordena o serviço junto à equipe."],
  ["04", "Revisar", "Conferimos o ambiente antes da conclusão do serviço."],
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Image
      alt="MMF Limpezas"
      className="logo-crop"
      height={108}
      priority
      src={light ? "/logo-branco.svg" : "/logo-azul.svg"}
      width={240}
    />
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <header className="site-header">
        <div className="site-container header-inner">
          <a aria-label="MMF Limpezas - início" className="brand" href="#inicio">
            <Logo />
          </a>
          <nav aria-label="Navegação principal" className="desktop-nav">
            <a href="#servicos">Serviços</a>
            <a href="#empresa">A MMF</a>
            <a href="#processo">Como trabalhamos</a>
          </nav>
          <a
            className="button button-small button-dark"
            href={whatsappUrl("Olá! Gostaria de solicitar um contato da MMF Limpezas.")}
            rel="noopener noreferrer"
            target="_blank"
          >
            Solicitar contato <ArrowIcon />
          </a>
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-panel">
            <div className="hero-panel-grid" aria-hidden="true" />
            <Image
              alt="Equipe profissional realizando a limpeza final de um espaço comercial"
              className="hero-background-image"
              height={830}
              priority
              sizes="100vw"
              src="/hero-limpeza-pos-obra.webp"
              width={1894}
            />
            <div className="hero-gradient" aria-hidden="true" />
            <div className="hero-inner">
              <div className="hero-copy">
                <p className="eyebrow eyebrow-light">Especialistas em pós-obra</p>
                <h1>
                  Sua obra limpa e pronta para a <strong>entrega.</strong>
                </h1>
                <p className="hero-lead">
                  Atendemos construtoras e grandes espaços comerciais com
                  organização, coordenação próxima e cuidado em cada etapa.
                </p>
                <div className="hero-actions">
                  <a
                    className="button button-primary"
                    href={whatsappUrl(
                      "Olá! Gostaria de conversar sobre uma limpeza pós-obra.",
                    )}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Solicitar contato <ArrowIcon />
                  </a>
                  <a className="button button-ghost" href="#servicos">
                    Conhecer serviços
                  </a>
                </div>
              </div>

              <div className="hero-side">
                <span className="hero-media-label">MMF / Limpeza técnica</span>
                <div className="hero-credentials" aria-label="Experiência da MMF">
                  <div>
                    <span>Atuação</span>
                    <strong>≈ 5 anos</strong>
                  </div>
                  <div>
                    <span>Especialidade</span>
                    <strong>Pós-obra</strong>
                  </div>
                  <div>
                    <span>Atendimento</span>
                    <strong>Construtoras</strong>
                  </div>
                  <div>
                    <span>Experiência</span>
                    <strong>Grandes lojas</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section" id="servicos">
          <div className="site-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Serviços</p>
                <h2>O cuidado certo para a etapa final.</h2>
              </div>
              <p>
                A execução é organizada conforme o espaço, o momento da obra e
                o padrão esperado para a entrega.
              </p>
            </div>
            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.code}>
                  <div className="service-topline">
                    <span>{service.code}</span>
                    <span>{service.tag}</span>
                  </div>
                  <div className="service-symbol" aria-hidden="true">
                    <span />
                    <span />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <a
                    href={whatsappUrl(
                      `Olá! Gostaria de conversar sobre o serviço de ${service.title.toLowerCase()}.`,
                    )}
                    aria-label={`Conversar sobre ${service.title} pelo WhatsApp`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Solicitar contato <ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark" id="empresa">
          <div className="site-container about-layout">
            <div className="about-copy">
              <p className="eyebrow eyebrow-light">Sobre a MMF</p>
              <h2>Presença e organização do início à revisão final.</h2>
              <p>
                A MMF Limpezas atua há aproximadamente cinco anos em serviços
                de limpeza pós-obra, atendendo principalmente construtoras e
                acumulando experiência em grandes limpezas de lojas.
              </p>
              <a
                className="button button-light"
                href={whatsappUrl(
                  "Olá! Gostaria de falar sobre um projeto com a MMF Limpezas.",
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                Falar sobre seu projeto <ArrowIcon />
              </a>
            </div>
            <div className="about-dashboard blueprint-grid">
              <div className="dashboard-main">
                <span>Coordenação</span>
                <strong>próxima</strong>
                <p>
                  A equipe executa cada etapa com organização, cuidado e
                  atenção aos detalhes.
                </p>
              </div>
              <div className="dashboard-card">
                <span>Experiência</span>
                <strong>≈ 5 anos</strong>
              </div>
              <div className="dashboard-card">
                <span>Especialidade</span>
                <strong>Pós-obra</strong>
              </div>
              <div className="dashboard-line" aria-hidden="true">
                <i /><i /><i /><i /><i />
              </div>
            </div>
          </div>
        </section>

        <section className="section process-section" id="processo">
          <div className="site-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Como trabalhamos</p>
                <h2>Um processo claro para cuidar da entrega.</h2>
              </div>
              <p>
                Cada etapa ajuda a organizar o serviço e manter a comunicação
                simples durante a execução.
              </p>
            </div>
            <ol className="process-grid">
              {process.map(([number, title, description]) => (
                <li key={number}>
                  <span className="process-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="contact-section" id="contato">
          <div className="site-container contact-card">
            <div className="contact-copy">
              <p className="eyebrow eyebrow-light">Próximo passo</p>
              <h2>Vamos preparar sua obra para a entrega?</h2>
              <p>
                Fale diretamente com a MMF pelo WhatsApp e conte sobre o espaço
                e o momento da obra.
              </p>
            </div>
            <div className="contact-panel">
              <span className="contact-panel-label">Atendimento pelo WhatsApp</span>
              <h3>Conte brevemente sobre a sua obra.</h3>
              <p>
                Informe o tipo de espaço, o momento atual da obra e o que
                precisa estar pronto na entrega.
              </p>
              <div className="contact-benefits" aria-label="Como funciona o contato">
                <span>Contato direto</span>
                <span>Conversa inicial</span>
                <span>Próximos passos claros</span>
              </div>
              <a
                className="button button-primary"
                href={whatsappUrl(
                  "Olá! Gostaria de solicitar uma limpeza. Vou contar um pouco sobre a obra:",
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                Conversar no WhatsApp <ArrowIcon />
              </a>
              <small>Você será direcionado para o WhatsApp da MMF Limpezas.</small>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container footer-inner">
          <a aria-label="MMF Limpezas - início" className="footer-brand" href="#inicio">
            <Logo light />
          </a>
          <p>Limpeza pós-obra e grandes limpezas comerciais.</p>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </footer>
    </>
  );
}
