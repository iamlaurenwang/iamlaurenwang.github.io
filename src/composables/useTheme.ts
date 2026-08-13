import { ref, watch } from "vue";

export type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const media = window.matchMedia("(prefers-color-scheme: dark)");

function readPreference(): ThemePreference {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

function resolveDark(pref: ThemePreference): boolean {
  return pref === "dark" || (pref === "system" && media.matches);
}

// Module-level singleton state shared across all callers.
const preference = ref<ThemePreference>(readPreference());
const isDark = ref(resolveDark(preference.value));

function apply() {
  isDark.value = resolveDark(preference.value);
  document.documentElement.classList.toggle("dark", isDark.value);
}

watch(preference, (val) => {
  if (val === "system") localStorage.removeItem(STORAGE_KEY);
  else localStorage.setItem(STORAGE_KEY, val);
  apply();
});

// Follow the OS when no explicit choice has been made.
media.addEventListener("change", () => {
  if (preference.value === "system") apply();
});

apply();

export function useTheme() {
  function toggle() {
    preference.value = resolveDark(preference.value) ? "light" : "dark";
  }

  function setTheme(pref: ThemePreference) {
    preference.value = pref;
  }

  return { isDark, preference, toggle, setTheme };
}
