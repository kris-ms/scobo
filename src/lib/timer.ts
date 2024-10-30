export function storeTimer(timer: number) {
    localStorage.setItem('timer', timer.toString());
}

export function getStoredTimer(): number | null {
    const storedTimer = localStorage.getItem('timer');
    if (!storedTimer) {
        return null;
    }
    return Number(storedTimer);
}

export function clearStoredTimer() {
    localStorage.removeItem('timer');
}

export function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(1, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
}
