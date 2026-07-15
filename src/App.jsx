import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { useRef, useState } from "react";

const OPTIONS = [
  {
    label: "Stardust & Us",
    posterSrc: null,
    msg: "I can already picture us sharing popcorn for this one.",
  },
  {
    label: "Two Tickets, One Seat",
    posterSrc: null,
    msg: "Popcorn, dim lights, and your shoulder to lean on.",
  },
  {
    label: "The Rerun",
    posterSrc: null,
    msg: "A story worth watching more than once, just like this.",
  },
  {
    label: "Paper Moons",
    posterSrc: null,
    msg: "Just us, the screen, and all the time in the world.",
  },
];
function App() {
  const [stage, setStage] = useState(1); // 1 = date question, 2 = activity question, 3 = thank you
  const [hearts, setHearts] = useState([]);
  const [picked, setPicked] = useState(null);
  const zoneRef = useRef(null);
  const noBtnRef = useRef(null);
  const [noPos, setNoPos] = useState({ top: 20, left: 150 });

  function runAway() {
    const zone = zoneRef.current;
    const btn = noBtnRef.current;
    if (!zone || !btn) return;
    const zoneRect = zone.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const maxLeft = zoneRect.width - btnRect.width - 8;
    const maxTop = zoneRect.height - btnRect.height - 8;
    setNoPos({
      left: Math.max(8, Math.random() * maxLeft),
      top: Math.max(8, Math.random() * maxTop),
    });
  }

  function handleYes() {
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      left: 40 + Math.random() * 60,
      delay: Math.random() * 0.2,
      emoji: ["💖", "💛", "✨", "💌"][Math.floor(Math.random() * 4)],
    }));
    setHearts(newHearts);
    setTimeout(() => setStage(2), 450);
  }

  function handlePick(opt) {
    setPicked(opt.label);
    setTimeout(() => setStage(3), 500);
  }

  function reset() {
    setStage(1);
    setPicked(null);
    setHearts([]);
    setNoPos({ top: 20, left: 150 });
  }

  const pickedOption = OPTIONS.find((o) => o.label === picked);

  return (
    <div
      className="min-h-screen flex items-center justify-center font-[Quicksand,sans-serif] text-[#33294a] bg-[#FBF3E6] px-4 py-10
                    bg-[radial-gradient(circle_at_15%_20%,rgba(230,169,79,0.15),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(224,80,107,0.12),transparent_45%)]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Quicksand:wght@500;600;700&display=swap');
        @keyframes dqFloatUp { to { transform: translateY(-120px) scale(1.3) rotate(20deg); opacity: 0; } }
        @keyframes dqFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .dq-heart { animation: dqFloatUp 1.1s ease-out forwards; }
        .dq-fade-in { animation: dqFadeIn 0.5s ease; }
        .dq-no-btn { transition: top 0.28s cubic-bezier(.34,1.56,.64,1), left 0.28s cubic-bezier(.34,1.56,.64,1); }
        .dq-title-gradient {
          background: linear-gradient(90deg, #e0506b, #e6a94f);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      <div
        className="relative w-full max-w-[560px] min-h-[480px] sm:min-h-[520px] bg-[#FFFCF6] rounded-[22px]
                      p-6 sm:p-10 md:p-12
                      shadow-[0_30px_60px_-20px_rgba(51,41,74,0.15)] border border-[#33294a0d] overflow-hidden"
      >
        {/* top dashed stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 opacity-50
                        bg-[repeating-linear-gradient(90deg,#e0506b_0_18px,transparent_18px_30px)]"
        />

        {/* home button */}
        {stage !== 1 && (
          <button
            onClick={reset}
            className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10 w-10 h-10 flex items-center justify-center
                       rounded-full bg-[#8b6fd1]/10 text-[#8b6fd1] hover:bg-[#8b6fd1]/20 transition-colors text-lg"
          >
            🏠
          </button>
        )}

        {/* stamp */}
        <div
          className="absolute top-5 right-5 sm:top-6 sm:right-7 flex items-center justify-center
                        rounded-full border-2 border-dashed border-[#e6a94f] text-[#e6a94f] text-lg sm:text-xl rotate-[8deg]
                        w-11 h-11 sm:w-[52px] sm:h-[52px]"
        >
          ♡
        </div>

        {stage === 1 && (
          <div className="pt-10 sm:pt-2">
            <p className="uppercase tracking-[0.16em] text-xs font-bold text-[#8b6fd1] mb-1.5">
              a very important question
            </p>
            <h1 className="dq-title-gradient font-[Caveat,cursive] text-[clamp(38px,10vw,64px)] leading-none mb-3">
              Will you date me?
            </h1>
            <p className="text-sm text-[#6a6080] mb-8 sm:mb-10 max-w-[38ch]">
              No pressure. There's just... only one correct answer here. 👀
            </p>

            <div
              ref={zoneRef}
              className="relative h-[190px] sm:h-[180px] w-full"
            >
              <button
                onClick={handleYes}
                className="absolute left-4 sm:left-6 top-5 rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-[#e0506b]
                          shadow-[0_10px_24px_-8px_rgba(224,80,107,0.6)]
                          transition-transform hover:-translate-y-0.5 hover:scale-[1.04] active:scale-[0.97]"
              >
                Yes 💛
              </button>

              <button
                ref={noBtnRef}
                style={{ top: noPos.top, left: noPos.left }}
                onMouseEnter={runAway}
                onTouchStart={(e) => {
                  e.preventDefault();
                  runAway();
                }}
                onClick={(e) => {
                  e.preventDefault();
                  runAway();
                }}
                className="dq-no-btn absolute rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold border-2 border-[#d8d0e8] text-[#33294a] bg-transparent"
              >
                No
              </button>

              <span className="absolute bottom-0 text-xs italic text-[#a89dc0]">
                (the no button gets a little nervous)
              </span>

              {hearts.map((h) => (
                <span
                  key={h.id}
                  className="dq-heart absolute text-xl pointer-events-none"
                  style={{
                    left: `${h.left}%`,
                    bottom: "80px",
                    animationDelay: `${h.delay}s`,
                  }}
                >
                  {h.emoji}
                </span>
              ))}
            </div>
          </div>
        )}

        {stage === 2 && (
          <div className="dq-fade-in pt-10 sm:pt-2">
            <p className="uppercase tracking-[0.16em] text-xs font-bold text-[#8b6fd1] mb-1.5">
              since that's settled
            </p>
            <h1 className="dq-title-gradient font-[Caveat,cursive] text-[clamp(38px,10vw,64px)] leading-none mb-3">
              Will you do this with me?
            </h1>
            <p className="text-sm text-[#6a6080] mb-8 sm:mb-10 max-w-[38ch]">
              Pick the one that sounds like the best first date.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handlePick(opt)}
                  className="text-left border-2 rounded-2xl p-3 font-semibold text-sm transition-transform
                             hover:-translate-y-1 bg-[#f7d9df] text-[#33294a] border-transparent hover:border-[#e0506b]"
                >
                  {opt.posterSrc ? (
                    <img
                      src={opt.posterSrc}
                      alt={opt.label}
                      className="w-full aspect-[2/3] rounded-[10px] object-cover mb-2"
                    />
                  ) : (
                    <div className="w-full aspect-[2/3] rounded-[10px] border-2 border-dashed border-[#d8d0e8] bg-white/50 mb-2" />
                  )}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === 3 && (
          <div className="dq-fade-in pt-10 sm:pt-2">
            <p className="uppercase tracking-[0.16em] text-xs font-bold text-[#8b6fd1] mb-1.5">
              you picked
            </p>
            <h1 className="dq-title-gradient font-[Caveat,cursive] text-[clamp(40px,11vw,68px)] leading-none mb-3">
              I love you 💕
            </h1>
            <p className="text-sm sm:text-base text-[#6a6080] mb-2 max-w-[40ch]">
              {pickedOption?.msg}
            </p>
            <p className="font-[Caveat,cursive] text-xl sm:text-2xl text-[#e6a94f] mb-8">
              Thank you for choosing me.
            </p>
            <button
              onClick={reset}
              className="rounded-full px-6 py-3 text-sm font-bold text-white bg-[#8b6fd1]
                         hover:bg-[#8b6fd1]/90 transition-colors shadow-[0_10px_24px_-8px_rgba(139,111,209,0.5)]"
            >
              🏠 Back to the start
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
