import { createEffect, createSignal } from 'solid-js';
import {
    formatTime,
    storeTimer,
    getStoredTimer,
    clearStoredTimer,
} from './lib/timer';
import { ScoreboardDisplay } from './components/scoreboard_display';
import { Play, Pause, Square, Trash2 } from 'lucide-solid';

function App() {
    const [timer, setTimer] = createSignal(0);
    const [timerPaused, setTimerPaused] = createSignal(false);
    const [homeTeam, setHomeTeam] = createSignal('Home Team');
    const [awayTeam, setAwayTeam] = createSignal('Away Team');
    const [homeScore, setHomeScore] = createSignal(0);
    const [awayScore, setAwayScore] = createSignal(0);
    const [period, setPeriod] = createSignal('1st');
    const [timerShown, setTimerShown] = createSignal(true);

    const formattedTime = () => formatTime(timer());

    createEffect(() => {
        const storedTimer = getStoredTimer();
        if (storedTimer) {
            setTimer(() => storedTimer);
        }
    });

    createEffect(() => {
        const interval = setInterval(() => {
            if (timerPaused()) return;
            setTimer(timer() + 1);
            storeTimer(timer());
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <>
            <ScoreboardDisplay
                homeTeam={homeTeam()}
                awayTeam={awayTeam()}
                homeScore={homeScore()}
                awayScore={awayScore()}
                time={formattedTime()}
                period={period()}
                timerShown={timerShown()}
            />
            <main class="flex flex-col items-center bg-slate-800 text-slate-200">
                <div class="flex justify-center gap-4 border-black bg-slate-400 p-8 text-black">
                    <button
                        onClick={() => setTimerPaused(false)}
                        class={`cursor-pointer rounded-md ${timerPaused() ? 'bg-slate-200 hover:bg-slate-300' : 'bg-green-400 hover:bg-green-500'} p-2 hover:bg-slate-300`}
                    >
                        <Play fill="black" />
                    </button>
                    <button
                        onClick={() => setTimerPaused(true)}
                        class={`cursor-pointer rounded-md ${!timerPaused() ? 'bg-slate-200 hover:bg-slate-300' : 'bg-blue-400 outline-2 outline-white hover:bg-blue-500'} p-2 hover:bg-slate-300`}
                    >
                        <Pause fill="black" />
                    </button>
                    <button
                        onClick={() => {
                            setTimer(0);
                            setTimerPaused(true);
                            clearStoredTimer();
                        }}
                        class="cursor-pointer rounded-md bg-slate-200 p-2 hover:bg-slate-300"
                    >
                        <Square fill="black" />
                    </button>
                    <button
                        onClick={() => {
                            setTimer(0);
                            setTimerPaused(true);
                            setHomeScore(0);
                            setAwayScore(0);
                            setPeriod('1st');
                        }}
                        class="cursor-pointer rounded-md bg-red-300 p-2 hover:bg-red-400"
                    >
                        <Trash2 fill="black" />
                    </button>
                </div>
                <section class="grid grid-cols-2 gap-8 p-8 lg:grid-cols-4">
                    <label
                        for="home-team"
                        class="flex flex-col gap-4 font-semibold"
                    >
                        Home team name
                        <input
                            id="home-team"
                            type="text"
                            class="p-2 font-normal text-black"
                            value={homeTeam()}
                            onInput={(e) => setHomeTeam(e.currentTarget.value)}
                        />
                    </label>

                    <label
                        for="away-team"
                        class="flex flex-col gap-4 font-semibold"
                    >
                        Choose name of away team
                        <input
                            id="away-team"
                            type="text"
                            class="p-2 font-normal text-black"
                            value={awayTeam()}
                            onInput={(e) => setAwayTeam(e.currentTarget.value)}
                        />
                    </label>

                    <label
                        for="home-score"
                        class="flex flex-col gap-4 font-semibold"
                    >
                        Home Score
                        <input
                            id="home-score"
                            type="number"
                            class="p-2 font-normal text-black"
                            value={homeScore()}
                            onInput={(e) =>
                                setHomeScore(Number(e.currentTarget.value))
                            }
                        />
                    </label>

                    <label
                        for="away-score"
                        class="flex flex-col gap-4 font-semibold"
                    >
                        Away Score
                        <input
                            id="away-score"
                            type="number"
                            class="p-2 font-normal text-black"
                            value={awayScore()}
                            onInput={(e) =>
                                setAwayScore(Number(e.currentTarget.value))
                            }
                        />
                    </label>
                </section>
                <section class="grid grid-cols-2 items-center gap-8 p-8">
                    <label
                        for="timer"
                        class="flex flex-col gap-4 font-semibold"
                    >
                        Timer (seconds)
                        <input
                            id="timer"
                            type="number"
                            class="p-2 font-normal text-black"
                            value={timer()}
                            onInput={(e) =>
                                setTimer(Number(e.currentTarget.value))
                            }
                        />
                    </label>

                    <label
                        for="period"
                        class="flex flex-col gap-4 font-semibold"
                    >
                        Period
                        <input
                            id="period"
                            type="text"
                            class="p-2 font-normal text-black"
                            value={period()}
                            onChange={(e) => setPeriod(e.currentTarget.value)}
                        />
                    </label>
                </section>
                <button
                    on:click={() => setTimerShown(!timerShown())}
                    class="cursor-pointer rounded-md bg-slate-200 p-2 text-black hover:bg-slate-300"
                >
                    Toggle timer
                </button>
            </main>
        </>
    );
}

export default App;
