import { ref } from "vue";
import type { CourseLevel, FreeCourse } from "@/types/course";

/** 解析 CSV 文字為欄位陣列，處理雙引號包住的欄位（可含逗號、換行）。 */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch !== "\r") {
      field += ch;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const VALID_LEVELS: CourseLevel[] = [
  "beginner",
  "intermediate",
  "upper-intermediate",
  "advanced",
];

function toLevel(value: string): CourseLevel {
  const v = value.trim() as CourseLevel;
  return VALID_LEVELS.includes(v) ? v : "beginner";
}

/** 把「一列一堂課」的攤平列，依 course_id 組回巢狀的 FreeCourse[]。 */
function rowsToCourses(rows: string[][]): FreeCourse[] {
  if (rows.length < 2) return [];

  const header = (rows[0] ?? []).map((h) => h.trim());
  const col = (name: string) => header.indexOf(name);
  const idx = {
    term: col("term"),
    course_id: col("course_id"),
    title: col("title"),
    level: col("level"),
    day: col("day"),
    time: col("time"),
    session_no: col("session_no"),
    date: col("date"),
    session_title: col("session_title"),
  };

  const cell = (cells: string[], i: number) => (i >= 0 ? (cells[i] ?? "").trim() : "");

  const byId = new Map<string, FreeCourse>();
  const order: string[] = [];

  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    if (!cells) continue;
    const id = cell(cells, idx.course_id);
    if (!id) continue;

    // 同一 course_id 在不同 term 為不同梯次，故用 term + id 當分組鍵。
    const term = cell(cells, idx.term);
    const key = `${term}||${id}`;

    if (!byId.has(key)) {
      order.push(key);
      byId.set(key, {
        id,
        term: term || undefined,
        title: cell(cells, idx.title),
        level: toLevel(cell(cells, idx.level)),
        day: cell(cells, idx.day),
        time: cell(cells, idx.time),
        dates: [],
        sessions: [],
      });
    }

    const course = byId.get(key)!;
    const date = cell(cells, idx.date);
    if (date) course.dates.push(date);

    const no = Number(cell(cells, idx.session_no));
    if (Number.isFinite(no) && no > 0) {
      course.sessions.push({ no, title: cell(cells, idx.session_title) || "TODO" });
    }
  }

  for (const course of byId.values()) {
    course.sessions.sort((a, b) => a.no - b.no);
  }
  return order.map((id) => byId.get(id)!);
}

/** 從 Google Sheet 發布的 CSV 連結載入課程資料。 */
export function useCourseSheet(csvUrl: string) {
  const courses = ref<FreeCourse[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function load() {
    if (!csvUrl) {
      error.value = "尚未設定 Google Sheet CSV 連結（請填入 src/data/courseSheet.ts）。";
      return;
    }
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(csvUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(`讀取失敗（HTTP ${res.status}）`);
      const text = await res.text();
      const parsed = rowsToCourses(parseCsv(text));
      courses.value = parsed;
      if (parsed.length === 0) {
        error.value = "讀到內容但沒有解析出任何課程，請檢查第一列欄位標題是否正確。";
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err);
    } finally {
      loading.value = false;
    }
  }

  return { courses, loading, error, load };
}
