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
