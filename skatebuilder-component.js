class SkateBuilderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    width: 100%;
                    padding: 10px;
                    box-sizing: border-box;
                    text-align: center;
                    display: grid;
                    grid-template-rows: auto auto auto;
                }
                .carousel {
                    margin-bottom: 10px; /* Réduisez cette valeur pour rapprocher les carrousels */
                    position: static; /* Utilisez position: static pour les carrousels */
                }
                .title {
                    margin-bottom: 20px; /* Ajoutez un espace entre le titre et les carrousels */
                    font-size: 1.5em;
                    font-weight: bold;
                }
            </style>
            <div class="container">
                <h2 class="title">${this.getAttribute('title') || 'Skate Builder Carousel'}</h2>
                <div class="carousel" id="carousel-noise"></div>
                <div class="carousel" id="carousel-central"></div>
                <div class="carousel" id="carousel-tail"></div>
            </div>
        `;

        this.noiseImage = '';
        this.centralImage = '';
        this.tailImage = '';
    }

    connectedCallback() {
        this.renderCarousels();
    }

    renderCarousels() {
        const noiseImages = JSON.parse(this.getAttribute('noise'));
        const centralImages = JSON.parse(this.getAttribute('central'));
        const tailImages = JSON.parse(this.getAttribute('tail'));

        const noiseCarousel = document.createElement('carousel-component');
        noiseCarousel.setAttribute('images', JSON.stringify(noiseImages));
        noiseCarousel.setAttribute('alt', 'noise');
        noiseCarousel.addEventListener('imageChanged', (event) => {
            this.noiseImage = event.detail.image;
            this.updateValue();
        });
        this.shadowRoot.querySelector('#carousel-noise').appendChild(noiseCarousel);

        const centralCarousel = document.createElement('carousel-component');
        centralCarousel.setAttribute('images', JSON.stringify(centralImages));
        centralCarousel.setAttribute('alt', 'central');
        centralCarousel.addEventListener('imageChanged', (event) => {
            this.centralImage = event.detail.image;
            this.updateValue();
        });
        this.shadowRoot.querySelector('#carousel-central').appendChild(centralCarousel);

        const tailCarousel = document.createElement('carousel-component');
        tailCarousel.setAttribute('images', JSON.stringify(tailImages));
        tailCarousel.setAttribute('alt', 'tail');
        tailCarousel.addEventListener('imageChanged', (event) => {
            this.tailImage = event.detail.image;
            this.updateValue();
        });
        this.shadowRoot.querySelector('#carousel-tail').appendChild(tailCarousel);
    }

    updateValue() {
        this.value = `noise=${this.noiseImage};central=${this.centralImage};tail=${this.tailImage}`;
        this.dispatchEvent(new Event('change'));
    }
}

customElements.define('skatebuilder-component', SkateBuilderComponent);
