/** Parse YYYY-MM-DD from API (date-only string). */
function parseParts(iso) {
  const [y, m, d] = iso.split("T")[0].split("-").map(Number);
  return { y, m, d };
}

/** Days until the next calendar occurrence of month/day (annual birthday). */
export function daysUntilNextBirthday(isoDate) {
  const { m, d } = parseParts(isoDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let next = new Date(today.getFullYear(), m - 1, d);
  if (next < today) next = new Date(today.getFullYear() + 1, m - 1, d);
  return Math.round((next - today) / 86400000);
}

/** e.g. "Mar 22" */
export function formatBirthdayShort(isoDate) {
  const { y, m, d } = parseParts(isoDate);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/** Age they turn on the *next* occurrence of this birthday. */
export function turningAge(isoDate) {
  const { y, m, d } = parseParts(isoDate);
  const birth = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let next = new Date(today.getFullYear(), m - 1, d);
  if (next < today) next = new Date(today.getFullYear() + 1, m - 1, d);
  return next.getFullYear() - birth.getFullYear();
}

// Token storage helpers
export function saveToken(token) {
  localStorage.setItem("candl_token", token);
}
export function getToken() {
  return localStorage.getItem("candl_token");
}
export function clearToken() {
  localStorage.removeItem("candl_token");
}
