import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

interface UseScrollSpyReturn {
  activeId: Ref<string | null>;
  scrollTo: (id: string) => void;
}

/**
 * Tracks which section (by element id) is currently in view and exposes a
 * smooth-scroll helper. Scroll offset for the sticky header/sub-nav is handled
 * by the target element's `scroll-mt-*` Tailwind class, not here.
 */
export function useScrollSpy(ids: string[]): UseScrollSpyReturn {
  const activeId = ref<string | null>(null);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id;
          }
        }
      },
      // Offset for the sticky header (64px) + sub-nav so the active tab flips
      // when a section reaches just below the sticky bars.
      { rootMargin: "-120px 0px -55% 0px", threshold: 0 },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = null;
  });

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return { activeId, scrollTo };
}
