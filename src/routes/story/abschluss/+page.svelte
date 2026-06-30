<script lang="ts">
    import Section from '$story/Story.Section.svelte'
    import charts from '$data/charts.json'

    const f2A1 = charts.wahrnehmung.items.find(item => item.label === 'F2A1')?.percent ?? 0;
    const percentPublic = (charts.vertrauenbetreiber.items.find(item => item.label === '1')?.percent ?? 0) + (charts.vertrauenbetreiber.items.find(item => item.label === '2')?.percent ?? 0);
    const percentSicherheit = charts.kamerabedeutung.items.find(item => item.answer === '1')?.percent ?? 0;
</script>

<Section accent="var(--story-accent-wissen)" eyebrow="ABSCHLUSS">
  <h2>Was bleibt?</h2>

  <div class="summary-card" style="border-color:var(--story-accent-wissen)">
    <p class="summary-card-topic" style="color:var(--story-accent-wissen)">Wissen</p>
    <p class="summary-card-text">
      Sensoren sind vielen nur als Umweltsensoren oder Kameras bekannt.
      Informationslücken sind groß.
    </p>
  </div>

  <div class="summary-card" style="border-color:var(--story-accent-vertrauen)">
    <p class="summary-card-topic" style="color:var(--story-accent-vertrauen)">Vertrauen</p>
    <p class="summary-card-text">
      Öffentliche Betreiber bekommen mehr Vertrauen.
      Transparenz und Anonymisierung erhöhen die Akzeptanz deutlich.
    </p>
  </div>

  <div class="summary-card" style="border-color:var(--story-accent-kameras)">
    <p class="summary-card-topic" style="color:var(--story-accent-kameras)">Kameras</p>
    <p class="summary-card-text">
      Die Mehrheit sieht Sicherheitsgewinn, erlebt
      aber gleichzeitig ein Überwachungsgefühl.
    </p>
  </div>

  <div class="core-message">
    <p class="core-message-quote">
      "Bürger:innen wollen nicht weniger Technologie.
      Sie wollen Kontrolle, Transparenz und Mitsprache."
    </p>
    <p class="core-message-source">Kernbotschaft, ÖFIT 2023</p>
  </div>

  <div class="source-box">
    <p class="source-box-title">Datenquelle</p>
    <p class="source-box-text">
      ÖFIT (2021/2023): Umfrage zur Wahrnehmung von IT-Sensoren im öffentlichen Raum.
      Fraunhofer FOKUS, Berlin.<br>
      N ca. 1.000 Personen ab 16 Jahren, Deutschland.
    </p>
  </div>

  <!-- Navigation -->
  <div class="nav-links">
    <a href="/story/perspektive" class="nav-link" style="color:var(--story-accent-perspektive);border-color:color-mix(in srgb, var(--story-accent-perspektive) 20%, transparent)">
      Eigene Perspektive erkunden
    </a>
    <a href="/story/personas" class="nav-link" style="color:var(--story-accent-wissen);border-color:color-mix(in srgb, var(--story-accent-wissen) 20%, transparent)">
      Personas vergleichen
    </a>
    <a href="/story" class="nav-link" style="color:color-mix(in srgb, var(--story-on-bg) 40%, transparent);border-color:color-mix(in srgb, var(--story-on-bg) 10%, transparent)">
      Zum Anfang
    </a>
  </div>
</Section>

<style>
  h2 {
    font-size: clamp(1.75rem, 6vw, 2.5rem);
    font-weight: 900;
    line-height: 1.15;
    margin: 0 0 1.25rem;
  }

  .summary-card {
    border-left: 3px solid;
    padding: 0.75rem 1rem;
    background: var(--story-surface);
    border-radius: 0 0.5rem 0.5rem 0;
    margin-bottom: 0.625rem;
  }

  .summary-card-topic {
    font-size: 0.8125rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
  }

  .summary-card-text {
    font-size: 0.875rem;
    color: color-mix(in srgb, var(--story-on-bg) 80%, transparent);
    line-height: 1.5;
    margin: 0;
  }

  .core-message {
    background: var(--story-surface);
    border-radius: 0.75rem;
    padding: 1.25rem;
    margin: 1.25rem 0;
  }

  .core-message-quote {
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--story-on-bg);
    line-height: 1.5;
    margin: 0 0 0.5rem;
  }

  .core-message-source {
    font-size: 0.75rem;
	font-family: var(--font-mono);
    color: color-mix(in srgb, var(--story-on-bg) 30%, transparent);
    margin: 0;
  }

  .source-box {
    background: var(--story-surface);
    border-radius: 0.75rem;
    padding: 1rem;
    margin-bottom: 1.25rem;
  }

  .source-box-title {
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--story-on-bg);
    margin: 0 0 0.4rem;
  }

  .source-box-text {
    font-size: 0.8125rem;
	font-family: var(--font-mono);
    color: color-mix(in srgb, var(--story-on-bg) 45%, transparent);
    line-height: 1.6;
    margin: 0;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .nav-link {
    display: block;
    text-align: center;
    background: var(--story-surface);
    border: 1px solid;
    font-weight: 700;
    font-size: 0.9375rem;
    padding: 0.875rem;
    border-radius: 0.75rem;
    text-decoration: none;
    transition: opacity 0.15s;
  }

  .nav-link:hover {
    opacity: 0.8;
  }
</style>
