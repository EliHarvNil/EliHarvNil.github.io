const siteName = 'Elias Harvey-Nilsson';

class SiteHeader extends HTMLElement {
    connectedCallback(): void {
        const root = this.getAttribute('root') ?? '';
        const pageTitle = this.getAttribute('page-title');
        const titleLayout = this.getAttribute('title-layout');
        const homeHref = `${root}index.html`;
        const sectionHref = (section: string): string => root ? `${homeHref}#${section}` : `#${section}`;

        if (pageTitle) {
            document.title = titleLayout === 'site-first'
                ? `${siteName} — ${pageTitle}`
                : `${pageTitle} — ${siteName}`;
        }

        this.innerHTML = `
            <header class="site-header">
                <a class="wordmark" href="${sectionHref('top')}" aria-label="${siteName}, home">Eli<span>.</span>Harv-Nil</a>
                <nav class="main-nav" aria-label="Main navigation">
                    <a href="${sectionHref('about')}">Profile</a>
                    <a href="${sectionHref('experience')}">Experience</a>
                    <a href="${sectionHref('contact')}">Contact</a>
                    <button class="theme-control" id="theme-toggle" type="button" aria-label="Switch to night theme" title="Switch to night theme">
                        <span class="theme-icon" aria-hidden="true">☀</span>
                    </button>
                </nav>
            </header>`;
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback(): void {
        const root = this.getAttribute('root') ?? '';
        const homeHref = `${root}index.html#top`;
        this.innerHTML = `
            <footer class="site-footer page-shell">
                <a class="wordmark footer-wordmark" href="${homeHref}">Eli<span>.</span>Harv-Nil</a>
                <p>Senior Software Engineer</p>
                <p>© <span id="current-year"></span> ${siteName}</p>
            </footer>`;

        const currentYear = this.querySelector<HTMLElement>('#current-year');
        if (currentYear) {
            currentYear.textContent = String(new Date().getFullYear());
        }
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

const themeToggle = document.querySelector<HTMLButtonElement>('#theme-toggle');
const themeStorageKey = 'personal-site-theme';
const themes = ['cobalt', 'midnight'] as const;
type Theme = (typeof themes)[number];

function isTheme(value: string | null): value is Theme {
    return themes.some((theme) => theme === value);
}

function applyTheme(theme: Theme): void {
    document.documentElement.dataset.theme = theme;
    if (themeToggle) {
        const nextTheme = theme === 'cobalt' ? 'night' : 'day';
        const icon = themeToggle.querySelector<HTMLElement>('.theme-icon');
        themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
        themeToggle.title = `Switch to ${nextTheme} theme`;
        if (icon) {
            icon.textContent = theme === 'cobalt' ? '☀' : '☾';
        }
    }
}

let savedTheme: string | null = null;
try {
    savedTheme = window.localStorage.getItem(themeStorageKey);
} catch {
    savedTheme = null;
}

applyTheme(isTheme(savedTheme) ? savedTheme : 'cobalt');

themeToggle?.addEventListener('click', () => {
    const selectedTheme = document.documentElement.dataset.theme === 'cobalt' ? 'midnight' : 'cobalt';
    applyTheme(selectedTheme);
    try {
        window.localStorage.setItem(themeStorageKey, selectedTheme);
    } catch {
        // The selected theme still applies if browser storage is unavailable.
    }
});

