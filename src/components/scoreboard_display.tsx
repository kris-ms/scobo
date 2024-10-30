import { Component, createEffect, createSignal } from 'solid-js';

type ScoreboardDisplayProps = {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    time: string;
    period: string;
    timerShown: boolean;
};

export const ScoreboardDisplay: Component<ScoreboardDisplayProps> = (props) => {
    const [bgColor, setBgColor] = createSignal('#00FF00');

    const homeTeam = () => props.homeTeam;
    const awayTeam = () => props.awayTeam;
    const homeScore = () => props.homeScore;
    const awayScore = () => props.awayScore;
    const time = () => props.time;
    const period = () => props.period;
    const timerShown = () => props.timerShown;

    createEffect(() => {
        const storedColor = localStorage.getItem('bgColor');
        if (storedColor) {
            setBgColor(storedColor);
        }
    });

    return (
        <section
            class="flex min-h-72 flex-col items-center justify-center gap-8 font-score subpixel-antialiased lg:flex-row"
            style={`background-color: ${bgColor()}`}
        >
            <div class="grid max-h-24 min-w-[640px] grid-cols-2 grid-rows-2 bg-black bg-transparent text-white">
                <div class="z-10 flex items-center justify-between gap-4 overflow-hidden bg-gradient-to-l from-slate-700 to-black pl-4 shadow-sm">
                    <span class="block h-12 w-12 overflow-y-hidden rounded-full bg-blue-500" />
                    <p class="m-0 flex flex-1 justify-start text-3xl font-bold">
                        {homeTeam().substring(0, 3).toUpperCase()}
                    </p>
                    <p class="flex h-full min-w-32 items-center justify-center rounded-l-full bg-gradient-to-r from-slate-200 to-slate-300 px-6 text-right text-4xl font-extrabold text-black">
                        {homeScore()}
                    </p>
                </div>
                <div class="z-10 flex items-center justify-between gap-4 overflow-hidden border-l border-l-slate-800 bg-gradient-to-l from-slate-700 to-black pl-4 shadow-sm">
                    <span class="block h-12 w-12 rounded-full bg-red-500" />
                    <p class="m-0 flex flex-1 justify-start text-3xl font-bold">
                        {awayTeam().substring(0, 3).toUpperCase()}
                    </p>
                    <p class="flex h-full min-w-32 items-center justify-center rounded-l-full bg-gradient-to-r from-slate-200 to-slate-300 px-6 text-right text-4xl font-extrabold text-black">
                        {awayScore()}
                    </p>
                </div>
                <div
                    class={`relative ${timerShown() ? 'bottom-0' : 'bottom-12'} flex items-center justify-end gap-4 border-l border-l-slate-800 bg-gradient-to-l from-slate-600 to-slate-800 px-4 transition-all duration-1000`}
                >
                    <p class="text-3xl font-bold">{period()}</p>
                </div>
                <div
                    class={`relative ${timerShown() ? 'bottom-0' : 'bottom-12'} flex items-center justify-start gap-4 border-l border-l-slate-800 bg-gradient-to-r from-slate-600 to-slate-800 px-4 transition-all duration-1000`}
                >
                    <p class="text-3xl font-bold tracking-wider">{time()}</p>
                </div>
            </div>
            <input
                type="color"
                value={bgColor()}
                onInput={(e) => {
                    localStorage.setItem('bgColor', e.target.value);
                    setBgColor(e.target.value);
                }}
            />
        </section>
    );
};
