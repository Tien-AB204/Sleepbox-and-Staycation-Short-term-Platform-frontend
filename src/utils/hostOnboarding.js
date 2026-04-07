const KEY = "boxhub_host_onboarding_complete";

export function isHostOnboardingComplete() {
  try {
    return localStorage.getItem(KEY) === "true";
  } catch {
    return false;
  }
}

export function setHostOnboardingComplete() {
  try {
    localStorage.setItem(KEY, "true");
  } catch {
    /* ignore */
  }
}

export function clearHostOnboardingComplete() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

/** Dữ liệu nháp giữa các bước (session) */
const DRAFT_KEY = "boxhub_host_onboarding_draft";

export function getHostOnboardingDraft() {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveHostOnboardingDraft(partial) {
  try {
    const cur = getHostOnboardingDraft();
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ ...cur, ...partial }));
  } catch {
    /* ignore */
  }
}

export function clearHostOnboardingDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

// =========================================================================
// KHU VỰC INDEXED_DB: CHUYÊN LƯU FILE ẢNH ĐỂ KHÔNG BỊ MẤT KHI F5
// =========================================================================
const DB_NAME = "BoxHubDraftDB";
const STORE_NAME = "draftFiles";

function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveDraftFilesToDB(filesObj) {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(filesObj, "currentFiles");
  } catch (e) {
    console.error("Lỗi lưu file vào IndexedDB:", e);
  }
}

export async function getDraftFilesFromDB() {
  try {
    const db = await initDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.get("currentFiles");
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => resolve(null);
    });
  } catch (e) {
    console.error("Lỗi lấy file từ IndexedDB:", e);
    return null;
  }
}

export async function clearDraftFilesFromDB() {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.delete("currentFiles");
  } catch (e) {
    /* ignore */
  }
}