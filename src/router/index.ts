import { trackPageView } from "@/composables/useAnalytics";
import { useAttribution } from "@/composables/useAttribution";
import { useTutoringLock } from "@/composables/useTutoringLock";
import { RouteName } from "@/types/routes";
import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RouteName.Landing,
    component: () => import("@/views/LandingView.vue"),
  },
  {
    path: "/visuals",
    name: RouteName.Visuals,
    component: () => import("@/views/VisualsView.vue"),
    children: [
      {
        path: "",
        name: RouteName.VisualsIndex,
        component: () => import("@/views/visuals/VisualsIndexView.vue"),
      },
      {
        path: "flex-grid",
        name: RouteName.VisualsFlexGrid,
        component: () => import("@/views/visuals/FlexAndGrid.vue"),
      },
      {
        path: "js-concepts",
        name: RouteName.VisualsJs,
        component: () => import("@/views/visuals/JsConcepts.vue"),
      },
      {
        path: "animation",
        name: RouteName.VisualsAnimation,
        component: () => import('@/views/visuals/AnimationDisplay.vue'),
      },
      {
        path: 'base64',
        name: RouteName.VisualsBase64,
        component: () => import('@/views/visuals/Base64Converter.vue'),
      },
    ],
  },
  {
    path: "/teaching",
    name: RouteName.Teaching,
    component: () => import("@/views/TeachingView.vue"),
    children: [
      {
        path: "",
        name: RouteName.TeachingIndex,
        component: () => import("@/views/teaching/TeachingIndexView.vue"),
      },
      // 具名路由要排在動態 :slug 之前，否則會被 slug 吃掉
      {
        path: "toeic-listening",
        name: RouteName.TeachingToeic,
        component: () => import("@/views/teaching/ToeicListeningView.vue"),
      },
      {
        path: ":slug",
        name: RouteName.TeachingDetail,
        component: () => import("@/views/teaching/TeachingDetailView.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/notes",
    name: RouteName.Notes,
    component: () => import("@/views/NotesView.vue"),
  },
  {
    path: "/contact",
    name: RouteName.Contact,
    component: () => import("@/views/ContactView.vue"),
  },
  {
    path: "/tutoring",
    name: RouteName.Tutoring,
    component: () => import("@/views/TutoringView.vue"),
  },
  {
    path: "/course",
    name: RouteName.Course,
    component: () => import("@/views/CourseView.vue"),
  },
  {
    path: "/demo-course",
    name: RouteName.DemoCourse,
    component: () => import("@/views/DemoCourseView.vue"),
  },
  {
    path: "/resume",
    name: RouteName.Resume,
    component: () => import("@/views/ResumeView.vue"),
  },
  {
    path: "/demo",
    name: RouteName.Demo,
    component: () => import("@/views/DemoView.vue"),
    meta: { hideLayout: true },
  },
  {
    path: "/ai",
    name: RouteName.Ai,
    component: () => import("@/views/AiView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: RouteName.NotFound,
    component: () => import("@/views/NotFoundView.vue"),
    meta: { hideLayout: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
});

// 「進站第一個路由」判定用；閉包保存，只在初始導航為 true。
let isInitialNavigation = true;

// 集中偵測 tutoring 來源與 UTM 歸因，並在被鎖定時把 Landing 導回 Tutoring。
// 跑在 afterEach（trackPageView）之前，確保進站第一個 page_view 已帶 campaign。
router.beforeEach((to) => {
  const { isTutoringOrigin, markTutoringOrigin } = useTutoringLock();
  const { detectAttribution } = useAttribution();

  // 從 tutoring 進來：初始導航即為 /tutoring，或連結帶 ?src=tutoring。
  if (
    (isInitialNavigation && to.name === RouteName.Tutoring) ||
    to.query.src === "tutoring"
  ) {
    markTutoringOrigin();
  }
  isInitialNavigation = false;

  // 擷取散發連結帶的 utm_* 參數（只在第一次偵測時保存）。
  detectAttribution(to.query);

  // 被鎖定者不得訪問 LandingView，導回 /tutoring（保留 query 讓 utm 不遺失）。
  if (isTutoringOrigin.value && to.name === RouteName.Landing) {
    return { name: RouteName.Tutoring, query: to.query };
  }
});

// gtag's automatic page view only ever sees "/" under hash history, so every
// navigation is reported by hand. See docs/analytics.md.
router.afterEach((to) => {
  trackPageView(to.fullPath);
});

export default router;
