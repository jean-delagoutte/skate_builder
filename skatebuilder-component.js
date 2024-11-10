import('./carousel-component.js').then(module => {});

class SkateBuilderComponent extends HTMLElement {
    constructor() {
        super();
        this.noiseImage = '';
        this.centralImage = '';
        this.tailImage = '';
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.applyHeights();
        this.value="otot";
        this.dispatchEvent(new Event('change'));      
    }

    render() {
        this.innerHTML = `
        <style>
            :host {
                display: block;
                height: 100%; /* Prend toute la hauteur de .containskate */
                width: 100%;
            }
            .container {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            carousel-component {
                width: 100%;
            }
        </style>
        <div class="container">
            <carousel-component data-part="noise" class="noise" images='${this.getAttribute('noise')}'></carousel-component>
            <carousel-component data-part="central" class="central" images='${this.getAttribute('central')}'></carousel-component>
            <carousel-component data-part="tail" class="tail" images='${this.getAttribute('tail')}'></carousel-component>
        </div>
        `;
    }

    applyHeights() {
        // Obtenez la hauteur réelle de .containskate
        const containerHeight = this.parentElement.offsetHeight;
        const noiseHeight = (parseInt(this.getAttribute('noise-percentage')) / 100) * containerHeight;
        const centralHeight = (parseInt(this.getAttribute('central-percentage')) / 100) * containerHeight;
        const tailHeight = (parseInt(this.getAttribute('tail-percentage')) / 100) * containerHeight;

        // Appliquez les hauteurs en pixels aux éléments enfants
        this.querySelector('.noise').style.height = `${noiseHeight}px`;
        this.querySelector('.central').style.height = `${centralHeight}px`;
        this.querySelector('.tail').style.height = `${tailHeight}px`;
    }

    setupEventListeners() {
        this.querySelectorAll('carousel-component').forEach(carousel => {
            carousel.addEventListener('imageChanged', (event) => {
                const part = carousel.getAttribute('data-part');
                if (part === 'noise') {
                    this.noiseImage = carousel.images[carousel.currentIndex];
                  //  this.noiseImage = event.detail.image;
                } else if (part === 'central') {
                    this.centralImage = event.detail.image;
                } else if (part === 'tail') {
                    this.tailImage = event.detail.image;
                }
                
                this.updateValue();
            });
        });
    }
    updateValue() {
        this.value = `noise=${this.noiseImage};central=${this.centralImage};tail=${this.tailImage}`;
        this.dispatchEvent(new Event('change'));
    }
}

customElements.define('skatebuilder-component', SkateBuilderComponent);
