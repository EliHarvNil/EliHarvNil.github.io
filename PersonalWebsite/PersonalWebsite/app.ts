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
                <a class="wordmark" href="${sectionHref('top')}" aria-label="${siteName}, home">Elias<span>.</span></a>
                <nav class="main-nav" aria-label="Main navigation">
                    <a href="${sectionHref('about')}">Profile</a>
                    <a href="${sectionHref('experience')}">Experience</a>
                    <a href="${sectionHref('work')}">Projects</a>
                    <a href="${sectionHref('contact')}">Contact</a>
                </nav>
                <label class="theme-control" for="theme-picker">
                    <span class="theme-icon" aria-hidden="true">◐</span>
                    <span class="visually-hidden">Color theme</span>
                    <select id="theme-picker" aria-label="Color theme">
                        <option value="cobalt">Engaging</option>
                        <option value="mist">Clarifying</option>
                        <option value="midnight">Summarizing</option>
                    </select>
                </label>
            </header>`;
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback(): void {
        const root = this.getAttribute('root') ?? '';
        const homeHref = `${root}index.html#top`;
        this.innerHTML = `
            <footer class="site-footer page-shell">
                <a class="wordmark footer-wordmark" href="${homeHref}">Elias<span>.</span></a>
                <p>Software Engineer</p>
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

interface ProjectHighlight {
    order: number;
    href: string;
    title: string;
    category: string;
    summary: string;
}

async function loadProjectHighlights(): Promise<void> {
    const projectGrid = document.querySelector<HTMLElement>('.project-grid');
    if (!projectGrid) {
        return;
    }

    try {
        const response = await fetch('dist/projects.json');
        if (!response.ok) {
            throw new Error(`Project list request failed: ${response.status}`);
        }

        const projects = await response.json() as ProjectHighlight[];
        for (const project of projects) {
            const card = document.createElement('a');
            card.className = 'project-card';
            card.href = project.href;

            const meta = document.createElement('div');
            meta.className = 'project-meta';
            const details = document.createElement('div');
            const category = document.createElement('p');
            category.className = 'project-type';
            category.textContent = project.category;
            const title = document.createElement('h3');
            title.textContent = project.title;
            details.append(category, title);
            meta.append(details);

            const summary = document.createElement('p');
            summary.className = 'project-description';
            summary.textContent = project.summary;

            const readMore = document.createElement('span');
            readMore.className = 'project-read-more';
            readMore.append(document.createTextNode('Read more '));
            const arrow = document.createElement('span');
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '↗';
            readMore.append(arrow);

            card.append(meta, summary, readMore);
            projectGrid.append(card);
        }

        projectGrid.setAttribute('aria-busy', 'false');
    } catch (error) {
        const message = document.createElement('p');
        message.className = 'project-description';
        message.textContent = 'Project highlights could not be loaded.';
        projectGrid.append(message);
        projectGrid.setAttribute('aria-busy', 'false');
        console.error(error);
    }
}

void loadProjectHighlights();

const copyEmailStatus = document.querySelector<HTMLElement>('#copy-email-status');
const copyEmailFeedbackTimers = new WeakMap<HTMLButtonElement, number>();
document.querySelectorAll<HTMLButtonElement>('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', async () => {
        const email = button.dataset.copyEmail;
        const label = button.querySelector('span');
        if (!email || !copyEmailStatus || !label) {
            return;
        }

        try {
            await navigator.clipboard.writeText(email);
            label.textContent = 'Copied!';
            button.classList.add('is-copied');
            button.setAttribute('aria-label', 'Email address copied to clipboard');
            copyEmailStatus.textContent = 'Email address copied.';

            const previousTimer = copyEmailFeedbackTimers.get(button);
            if (previousTimer !== undefined) {
                window.clearTimeout(previousTimer);
            }
            copyEmailFeedbackTimers.set(button, window.setTimeout(() => {
                label.textContent = email;
                button.classList.remove('is-copied');
                button.setAttribute('aria-label', `Copy ${email} to clipboard`);
            }, 1800));
        } catch {
            copyEmailStatus.textContent = 'Could not copy the email address. Select and copy it instead.';
        }
    });
});

const themePicker = document.querySelector<HTMLSelectElement>('#theme-picker');
const themeStorageKey = 'personal-site-theme';
const themes = ['cobalt', 'mist', 'midnight'] as const;
type Theme = (typeof themes)[number];

function isTheme(value: string | null): value is Theme {
    return themes.some((theme) => theme === value);
}

function applyTheme(theme: Theme): void {
    document.documentElement.dataset.theme = theme;
    if (themePicker) {
        themePicker.value = theme;
    }
}

let savedTheme: string | null = null;
try {
    savedTheme = window.localStorage.getItem(themeStorageKey);
} catch {
    savedTheme = null;
}

applyTheme(isTheme(savedTheme) ? savedTheme : 'cobalt');

themePicker?.addEventListener('change', () => {
    const selectedTheme = themePicker.value;
    if (!isTheme(selectedTheme)) {
        return;
    }

    applyTheme(selectedTheme);
    try {
        window.localStorage.setItem(themeStorageKey, selectedTheme);
    } catch {
        // The selected theme still applies if browser storage is unavailable.
    }
});

