document.addEventListener('DOMContentLoaded', function() {
    let links = [];
    let favorites = [];

    function loadLinks() {
        fetch('links.json')
            .then(response => response.json())
            .then(data => {
                links = data;
                chrome.storage.sync.get(['favorites'], function(result) {
                    favorites = result.favorites || [];
                    renderLinks();
                });
            })
            .catch(error => {
                console.error('Error loading links:', error);
                document.getElementById('links').innerHTML = 'Error loading links. Please try again later.';
            });
    }

    function renderLinks() {
        const linksContainer = document.getElementById('links');
        linksContainer.innerHTML = '';

        links.sort((a, b) => {
            const aFav = favorites.includes(a.id);
            const bFav = favorites.includes(b.id);
            if (aFav === bFav) {
                return 0;
            }
            return bFav ? 1 : -1;
        });

        links.forEach(link => {
            linksContainer.appendChild(createLinkElement(link));
        });
    }

    function createLinkElement(link) {
        const linkElement = document.createElement('div');
        linkElement.className = 'link';
        const isFavorite = favorites.includes(link.id);
        linkElement.innerHTML = `
            <div class="link-content">
                <span class="info-icon">
                    <i class="bi bi-info-circle"></i>
                    <span class="tooltip">${link.tooltip}</span>
                </span>
                <a href="${link.url}" target="_blank">${link.title}</a>
            </div>
            <button class="star-btn" aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                <i class="bi ${isFavorite ? 'bi-star-fill' : 'bi-star'}"></i>
            </button>
        `;
    
        const infoIcon = linkElement.querySelector('.info-icon');
        infoIcon.addEventListener('mouseenter', positionTooltip);
        infoIcon.addEventListener('mouseleave', hideTooltip);
    
        const starBtn = linkElement.querySelector('.star-btn');
        starBtn.addEventListener('click', () => toggleFavorite(link.id));
    
        return linkElement;
    }
    
    function positionTooltip(event) {
        const tooltip = event.currentTarget.querySelector('.tooltip');
        const rect = event.currentTarget.getBoundingClientRect();
        const popupWidth = document.body.clientWidth;
        const popupHeight = document.body.clientHeight;

        // Show the tooltip to calculate its dimensions
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        tooltip.style.display = 'block';

        const tooltipRect = tooltip.getBoundingClientRect();

        let top, left;

        // Vertical positioning
        if (rect.top + tooltipRect.height + 10 > popupHeight) {
            top = rect.top - tooltipRect.height - 5;
        } else {
            top = rect.bottom + 5;
        }

        // Horizontal positioning
        if (rect.left + tooltipRect.width / 2 > popupWidth) {
            left = popupWidth - tooltipRect.width - 5;
        } else if (rect.left < tooltipRect.width / 2) {
            left = 5;
        } else {
            left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
        tooltip.style.display = 'block';
    }

    function hideTooltip(event) {
        const tooltip = event.currentTarget.querySelector('.tooltip');
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
        tooltip.style.display = 'none';
    }

    function toggleFavorite(id) {
        const index = favorites.indexOf(id);
        if (index === -1) {
            favorites.push(id);
        } else {
            favorites.splice(index, 1);
        }
        chrome.storage.sync.set({favorites: favorites}, function() {
            renderLinks();
        });
    }

    loadLinks();
});