// Main JS for dynamic behavior: nav blur, lazy images, comments (localStorage)
document.addEventListener('DOMContentLoaded', () => {
    // NAV handling: hover with tolerance, click-to-toggle on touch, and ARIA updates
    const items = document.querySelectorAll('.nav-item');
    let navOpenCount = 0;

    function openItem(item) {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        document.body.classList.add('nav-open');
        item.classList.add('open');
        if (link) link.setAttribute('aria-expanded', 'true');
        if (submenu) submenu.setAttribute('aria-hidden', 'false');
    }
    function closeItem(item) {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        item.classList.remove('open');
        if (link) link.setAttribute('aria-expanded', 'false');
        if (submenu) submenu.setAttribute('aria-hidden', 'true');
        // reduce nav-open only if no other open
        setTimeout(() => {
            const anyOpen = document.querySelector('.nav-item.open');
            if (!anyOpen) document.body.classList.remove('nav-open');
        }, 40);
    }

    items.forEach(item => {
        let enterTimer = null;
        let leaveTimer = null;
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');

        // init ARIA
        if (link) link.setAttribute('aria-expanded', 'false');
        if (submenu) submenu.setAttribute('aria-hidden', 'true');

        // hover (desktop) with small delay
        item.addEventListener('mouseenter', () => {
            clearTimeout(leaveTimer);
            enterTimer = setTimeout(() => {
                openItem(item);
            }, 60);
        });
        item.addEventListener('mouseleave', () => {
            clearTimeout(enterTimer);
            leaveTimer = setTimeout(() => {
                closeItem(item);
            }, 120);
        });

        // keyboard accessibility: focus/blur on link
        if (link) {
            link.addEventListener('focus', () => openItem(item));
            link.addEventListener('blur', () => closeItem(item));
        }

        // click toggle for touch / mobile: toggle open state
        item.addEventListener('click', (ev) => {
            // only handle toggle if click on the main link (not submenu link)
            const target = ev.target;
            if (target && target.closest && target.closest('.submenu')) return; // let submenu links work
            if (window.matchMedia && window.matchMedia('(hover: none)').matches) {
                // prevent following link when toggling
                if (link && link.getAttribute('href')) {
                    // if already open, allow navigation
                    if (!item.classList.contains('open')) {
                        ev.preventDefault();
                        openItem(item);
                    }
                }
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const insideNav = !!e.target.closest('.navbar');
        if (!insideNav) {
            document.querySelectorAll('.nav-item.open').forEach(i => closeItem(i));
        }
    });

    // Lazy load images with IntersectionObserver (if images have data-src)
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    if (img.dataset.srcset) img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });
        lazyImages.forEach(img => io.observe(img));
    } else {
        // fallback: load all
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            if (img.dataset.srcset) img.srcset = img.dataset.srcset;
            img.removeAttribute('data-src');
        });
    }

    // COMMENTS system using localStorage
    function getKey(pageId) { return 'comments:' + pageId; }
    window.renderComments = function (pageId) {
        const list = document.getElementById('comments-list-' + pageId);
        const count = document.getElementById('comments-count-' + pageId);
        if (!list) return;
        const raw = localStorage.getItem(getKey(pageId));
        const arr = raw ? JSON.parse(raw) : [];
        list.innerHTML = '';
        arr.slice().reverse().forEach(c => {
            const li = document.createElement('li');
            li.className = 'comment-item';
            li.innerHTML = `<strong>${escapeHTML(c.name)}</strong> <span class="muted">· ${new Date(c.t).toLocaleString()}</span><p>${escapeHTML(c.text)}</p>`;
            list.appendChild(li);
        });
        if (count) count.textContent = arr.length;
    };
    window.submitComment = function (pageId) {
        const nameIn = document.getElementById('comment-name-' + pageId);
        const textIn = document.getElementById('comment-text-' + pageId);
        if (!nameIn || !textIn) return;
        const name = nameIn.value.trim() || 'Anon';
        const text = textIn.value.trim();
        if (!text) return alert('Please write a comment');
        const raw = localStorage.getItem(getKey(pageId));
        const arr = raw ? JSON.parse(raw) : [];
        arr.push({ name: name, text: text, t: Date.now() });
        localStorage.setItem(getKey(pageId), JSON.stringify(arr));
        nameIn.value = '';
        textIn.value = '';
        renderComments(pageId);
    };

    // helper
    function escapeHTML(s) { return String(s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }

    // Auto-render comments for any comment containers present
    document.querySelectorAll('[data-comments-for]').forEach(el => {
        const pageId = el.dataset.commentsFor;
        renderComments(pageId);
    });

});
