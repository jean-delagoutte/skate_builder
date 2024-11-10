class CarouselComponent extends HTMLElement {
    constructor() {
        super();      
        this.images = [];
        this.currentIndex = 0;
    }
    render(){
        this.innerHTML = `
            <style>
                .carousel {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    overflow: visible;
                    perspective: 1000px;
                    position: relative;
                }
                .carousel img {      
                    height: 100%;
                    width: auto;
                    object-fit: contain;
                    transition: transform 0.5s ease, opacity 0.5s ease;
                    cursor: pointer;
                    position: absolute;
                }
                .carousel img.current {
                    transform: translateX(0)  scale(1) rotateY(0);
                    opacity: 1;
                    z-index: 3;
                    
                }
                .carousel img.previous {
                    transform: rotateY(-45deg) translateX(-120%) scale(0.8);
                    opacity: 0.5;
                    z-index: 2;
                }
                .carousel img.next {
                    transform: rotateY(45deg) translateX(120%) scale(0.8);
                    opacity: 0.7;
                    z-index: 2;
                }
                .carousel img.hidden {
                    transform: translateY(0) scale(0.5);
                    opacity: 0.1;
                    z-index: 1;
                }
            </style>
            <div class="carousel"></div>
        `;
    }
    dispatchInitialImageEvent() {
        this.dispatchEvent(new CustomEvent('imageChanged', {
            detail: {
                image: this.images[this.currentIndex]
            }
        }));
    }

    connectedCallback() {
        this.images = JSON.parse(this.getAttribute('images'));
        this.render();
        this.renderImages();
        this.updateCarousel();
        this.dispatchInitialImageEvent();
        this.querySelector('.carousel').addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.querySelector('.carousel').addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.querySelector('.carousel').addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.querySelector('.carousel').addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        this.querySelector('.carousel').addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.querySelector('.carousel').addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.querySelector('.carousel').addEventListener('touchend', this.handleTouchEnd.bind(this));
        this.querySelector('.carousel').addEventListener('click', this.handleClick.bind(this));
    }

    renderImages() {
        const carousel = this.querySelector('.carousel');
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
        const imgs = this.querySelectorAll('img');
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        imgs.forEach((img, index) => {
            img.className = 'hidden';
            if (index === this.currentIndex) {
                img.className = 'current';
                this.dispatchEvent(new CustomEvent('imageChanged', {
                    detail: {
                        image: this.images[this.currentIndex]
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
