const themePicker = document.querySelector<HTMLSelectElement>('#theme-picker');
const themeStorageKey = 'personal-site-theme';
const themes = ['midnight', 'paper', 'forest'] as const;
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

applyTheme(isTheme(savedTheme) ? savedTheme : 'midnight');

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

const currentYear = document.querySelector<HTMLElement>('#current-year');
if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}
