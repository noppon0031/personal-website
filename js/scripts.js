document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('#tab_filters a');
    const images = document.querySelectorAll('.image-list-box img');
    const modal = document.getElementById('myModal');
    const modalText = document.getElementById('modalText');
    const modalImg = document.getElementById('modalImg');
    const closeModal = document.querySelector('.close');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    let currentIndex = 0;
    let filteredImages = Array.from(images).filter(img => !img.classList.contains('no-modal'));

    function openModal(index) {
        currentIndex = index;
        modal.style.display = 'block';
        modalText.innerHTML = filteredImages[currentIndex].getAttribute('data-text');
        modalImg.src = filteredImages[currentIndex].src;
    }

    function closeModalFunc() {
        modal.style.display = 'none';
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % filteredImages.length;
        modalText.innerHTML = filteredImages[currentIndex].getAttribute('data-text');
        modalImg.src = filteredImages[currentIndex].src;
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        modalText.innerHTML = filteredImages[currentIndex].getAttribute('data-text');
        modalImg.src = filteredImages[currentIndex].src;
    }

    filters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            filteredImages = Array.from(images).filter(img => !img.classList.contains('no-modal')).filter(image => {
                const categories = image.getAttribute('data-category').split(' ');
                return filterValue === 'All' || categories.includes(filterValue);
            });
            images.forEach(image => {
                const categories = image.getAttribute('data-category').split(' ');
                if (filterValue === 'All' || categories.includes(filterValue)) {
                    image.style.display = 'block';
                } else {
                    image.style.display = 'none';
                }
            });
        });
    });

    images.forEach((image, index) => {
        image.addEventListener('click', function() {
            if (this.style.display === 'none' || this.classList.contains('no-modal')) {
                return;
            }
            const visibleImages = Array.from(images).filter(img => img.style.display !== 'none' && !img.classList.contains('no-modal'));
            currentIndex = visibleImages.indexOf(this);
            openModal(currentIndex);
        });
    });

    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    prev.addEventListener('click', showPrevImage);
    next.addEventListener('click', showNextImage);
});
