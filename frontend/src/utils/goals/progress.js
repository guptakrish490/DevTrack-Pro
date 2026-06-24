export const calculateTimeProgress = (startDate, endDate, status) => {
    if (status) return 100;

    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()

    const now = Date.now()

    const total = end - start;
    const elapsed = now - start;

    if (total <= 0) return 100;

    const progress = (elapsed / total) * 100;

    return Math.floor(Math.min(100, Math.max(0, progress)));
}