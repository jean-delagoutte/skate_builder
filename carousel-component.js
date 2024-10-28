class CarouselComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
        .carousel {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 150px;
            margin-bottom: 5px;
            position: relative;
            perspective: 1000px;
            overflow: visible;
        }
        .carousel img {
            width: 150px;
            height: auto;
            transition: transform 0.5s ease, opacity 0.5s ease;
            opacity: 0.2;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) rotateY(45deg);
            cursor: pointer;
        }
        .carousel img.current {
            transform: translateX(0) translateY(-50%) scale(1.2) rotateY(0);
            opacity: 1;
            z-index: 3;
            border-style:groove;
            border-radius: 1cap;
        }
        .carousel img.previous {
            transform: rotateY(-45deg) translateX(-300px) translateY(-50%) scale(0.9);
            opacity: 0.5;
            z-index: 2;
        }
        .carousel img.next {
            transform: rotateY(45deg) translateX(300px) translateY(-50%) scale(0.9);
            opacity: 0.5;
            z-index: 2;
        }
        .carousel img.hidden {
            opacity: 0.5;
            z-index: 2;
        }
                @media (max-width: 768px) {
                    .carousel  {
                        transform: translateX(0)  scale(0.6) ;
                    }
                }
            </style>
            <div class="carousel"></div>
        `;

        this.images = [];
        this.currentIndex = 0;
    }

    connectedCallback() {
        this.images = JSON.parse(this.getAttribute('images'));
        this.renderImages();
        this.updateCarousel();

        this.shadowRoot.querySelector('.carousel').addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.shadowRoot.querySelector('.carousel').addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.shadowRoot.querySelector('.carousel').addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.shadowRoot.querySelector('.carousel').addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.shadowRoot.querySelector('.carousel').addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.shadowRoot.querySelector('.carousel').addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.shadowRoot.querySelector('.carousel').addEventListener('touchend', this.handleTouchEnd.bind(this));
        this.shadowRoot.querySelector('.carousel').addEventListener('click', this.handleClick.bind(this));
    }

    renderImages() {
        const carousel = this.shadowRoot.querySelector('.carousel');
        carousel.innerHTML = '';
        this.images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = this.getAttribute('alt');
            img.className = 'hidden';
            carousel.appendChild(img);
        });
    }

    updateCarousel() {
        const imgs = this.shadowRoot.querySelectorAll('img');
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        imgs.forEach((img, index) => {
            img.className = 'hidden';
            if (index === this.currentIndex) {
                img.className = 'current';
                this.dispatchEvent(new CustomEvent('imageChanged', {
                    detail: {
                        image: img.src
                    }
                }));
            } else if (index === nextIndex) {
                img.className = 'next';
            } else if (index === prevIndex) {
                img.className = 'previous';
            }
        });
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateCarousel();
    }

    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateCarousel();
    }

    handleMouseDown(e) {
        this.startX = e.clientX;
        this.isDragging = true;
    }

    handleMouseMove(e) {
        if (this.isDragging) {
            e.preventDefault();
        }
    }

    handleMouseUp(e) {
        if (this.isDragging) {
            const endX = e.clientX;
            if (this.startX > endX + 50) {
                this.nextImage();
            } else if (this.startX < endX - 50) {
                this.previousImage();
            }
        }
        this.isDragging = false;
    }

    handleMouseLeave() {
        this.isDragging = false;
    }

    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
    }

    handleTouchMove(e) {
        e.preventDefault();
    }

    handleTouchEnd(e) {
        const endX = e.changedTouches[0].clientX;
        if (this.startX > endX + 50) {
            this.nextImage();
        } else if (this.startX < endX - 50) {
            this.previousImage();
        }
    }

    handleClick(e) {
        if (e.target.classList.contains('next')) {
            this.nextImage();
        } else if (e.target.classList.contains('previous')) {
            this.previousImage();
        }
    }
}

customElements.define('carousel-component', CarouselComponent);
