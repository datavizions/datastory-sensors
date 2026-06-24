<script lang="ts">
    import Section from "$components/story/Story.Section.svelte";
    import StatBlock from "$components/story/Story.StatBlock.svelte";
    import charts from "$data/charts.json";

    const wahrnehmung_F2A1 = charts.wahrnehmung.items.find(item => item.label === "F2A1");
    const überwachung = charts.überwachungsgefühl.percent;
</script>

<!-- To Do add color vars in css -->
 <!-- Issue with btnLabel import -->
<Section accent="#2DD4BF" next="/story/wissen" bntLabel="Story starten">
    <p class="kicker"> ÖFIT · FRAUNHOFER FOKUS · 2021</p>>
    <span class="badge">Datenstory</span>
    <h1>Sensoren im öffentlichen Raum</h1>
    <p class="description">
        Was wissen Bürger:innen über Sensoren in ihrer Stadt?
        Wen stört eine Kamera und wen nicht?
        Eine Datenstory über Wahrnehmung, Vertrauen und Kontrolle.
    </p>

    <!--To Do Was sind Sensoren Annoation zum aufklappen -->


    <!--Statistiken-->

    <div class="stat-grid">
        <div class="stat-card">
            <div class="stat-card-number" style="color: var(--red)">{wahrnehmung_F2A1}%</div>
            <div class="stat-card-label">nehmen Sensoren im Alltag wahr</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-number" style="color: var(--red)">{überwachung}%</div>
            <div class="stat-card-label">empfinden ein Überwachungsgefühl</div>
        </div>
        <!--To Do Platzhalter auswechseln / Je eine Statistik pro Kategorie-->
        <div class="stat-card">
            <div class="stat-card-number" style="color: var(--red)">51%</div>
            <div class="stat-card-label">vertrauen öffentlichen Betreibern</div>
        </div>
        <div class="stat-card">
            <div class="stat-card-number" style="color: var(--red)">3 von 4</div>
            <div class="stat-card-label">wollen mehr Informationen über Sensoren</div>
        </div>
    </div>

    <!--To Do add color vars in css -->

    <div class="content-table">
        <p class="content-table-label">INHALT</p>
            <ul>
                <li>
                    <span class="dot" style="background: #2DD4BF"></span>
                    <a href="/story/wissen"><strong>Wissen</strong></a>
                    <span class="content-table-description">Was kennen Bürger:innen?</span>
                </li>
                <li>
                    <span class="dot" style="background: var(--red)"></span>
                    <a href="/story/vertrauen"><strong>Vertrauen</strong></a>
                    <span class="content-table-description">Wem wird vertraut?</span>
                </li>
                <li>
                    <span class="dot" style="background: var(--red)"></span>
                    <a href="/story/kameras"><strong>Fokus Kameras</strong></a>
                    <span class="content-table-description">Sicherheit oder Kontrolle</span>
                </li>
                <li>
                    <span class="dot" style="background: var(--red)"></span>
                    <a href="/story/personas"><strong>Personas erkunden</strong></a>
                    <span class="content-table-description">Drei Perspektiven</span>
                </li>
                <li>
                    <span class="dot" style="background: var(--red)"></span>
                    <a href="/story/perspektive"><strong>Eigener Blick</strong></a>
                    <span class="content-table-description">Erkunde Deine Gruppe</span>
                </li>
            </ul>
    </div>

    <style>
        .kicker {
            font-size: 0.7rem;
            color: var(--color-gray);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: rgba(255, 255, 255, 0.4);
            margin-bottom: 0 0 0.7rem;
        }

        .badge {
            display: inline-block;
            background-color: #2DD4BF;
            color: #0d1b2a;
            padding: 0.2rem 0.6rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 1rem;
        }

        h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0 0 1rem;
        }

        .description {
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 2rem;
        }
        .stat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .stat-card {
            background-color: #122030;
            padding: 1rem;
            border-radius: 0.75rem;
            text-align: center;
        }
        .stat-card-number {
            font-size: 1.5rem;
            font-weight: 700;
            color:#2DD4BF;
            line-height: 1;
            margin-bottom: 0.35rem;
        }
        .stat-card-label {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.2;   
            
        }
        .content-table {
            background-color: #122030;
            padding: 1rem;
            border-radius: 0.75rem;
        }
        .content-table-label {
            font-size: 0.9rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 0.5rem;
        }
        .content-table ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        .content-table li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
        }
        .dot {
            width: 0.75rem;
            height: 0.75rem;
            border-radius: 50%;
            display: inline-block;
        }
        .content-table-description {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.7);
            margin-left: auto;
        }
    </style>

</Section>