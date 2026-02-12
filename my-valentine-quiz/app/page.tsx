"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore
import confetti from "canvas-confetti";

const config = {
  welcome: {
    title: "Hey Beautiful! ❤️",
    message: "I made a little something for you. Are you ready for a challenge?",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3R6eW50Zmw2c3R6emt6aXJ6eXJ6eXJ6eXJ6eXJ6eXJ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLdmIp6wJr91JAI/giphy.gif", 
    buttonText: "Let's Go!",
  },
  questions: [
    {
      question: "Where was our first date?",
      options: ["At Lake", "Beach", "Movie Theater", "Fancy Dinner"],
      correct: 1,
      mainGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXZxcTEwMmxxNGNwMHg0NzdvbXBmeGVlaW9iamViNnY2bmxlOGRqaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ozc0un4foEDV8jx5N4/giphy.gif",
      correctMsg: "Chal Chal It was easy huh 😏😏",
      correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnJhcXFrdGZrOGo2cGhqY3NjYjA0Y3VsZGVpeHVwODg5ZTY3b3FxMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/k6ifpeMmfCTx7tZj7Y/giphy.gif",
      wrongMsg: "Really?! I'm heartbroken you forgot... 😭",
      wrongGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHR0NjN2aGc3MGszeHBnaHV2a2dtanpkcDBkYm1hOWhtOG5uMXQ5ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vrW1WOuLpWB8s/giphy.gif",
    },
    {
      question: "What is my absolute favorite food?",
      options: ["Biryani", "You","Gavthi Komdi", "GulabJamun"],
      correct: 2,
      mainGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3d2V4aGdkNnM4NWZwb3N4d2I0aHd6aHVsOGN5bG9mZmlzb2lza29wNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XCm6aoloWyUkwUuqkf/giphy.gif",
      correctMsg: "Correct! Let's go get some tonight! 👅",
      correctGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eWpocnZzejlmODVzYTdqcW9uMXRhbTF3NXhjMnNraWFrbHF2ZnhzMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7IHaFYgTgCICI/giphy.gif",
      wrongMsg: "You're My favorite meal 🤤🤤 Choose wisely",
      wrongGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dDRmemp5MmE2MzZ0MG53ZzFlOHUzcDBtem85dGR5MGNvZ2N0cTJ5MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4Js22dmcqKkvPrqXJ0/giphy.gif",
    },
    {
      question: "What's my favorite thing about you ?",
      options: ["Your smile", "Your 🍒", "Your 👄", "Whole You👀"],
      correct: 3, 
      mainGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dDRmemp5MmE2MzZ0MG53ZzFlOHUzcDBtem85dGR5MGNvZ2N0cTJ5MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3lxoqLn8N5ETCWpU9u/giphy.gif",
      correctMsg: "I'm the luckiest guy in the world! ❤️ 2nd option is also correct but I can't say it here 😆",
      correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTY4MTBiNjBqYzRrcmMxaG1icTkybDI3MjV5NTlnMmhicm52eDBobCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vxzVCmsyJrDu7N87Tc/giphy.gif",
      wrongMsg: "Yeah this is also right but, Correct answer is not this babe 😆",
      wrongGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWxpYWpxNDYzNmN3ejVpbW5waHJ1ZXhsZW9nM2NwazN3a3NmMjlzNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rZckIoG1PtKne/giphy.gif",
    },
    {
      question: "Where do I love kissing you the most?",
      options: ["On Lips", "On 🍒", "On neck", "On cheeks"],
      correct: 2, 
      mainGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXd6NXl2d3ZoMGpuMDlxMjVvbzY5d3JxeTU3d215dDdwOHQzaHhxNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Y35E2rQlXUIQHmDof8/giphy.gif",
      correctMsg: "Yes that's your neck 😆",
      correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmxnNDM2aXoyMXdhOXR0MnpxMHg1bzdob29yNjZqN2tseml6eHhvdCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/N0TtscnTopHCY99WkL/giphy.gif",
      wrongMsg: "Opps! Try Again baby 🤪🤪",
      wrongGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXY1aHFxMG9oaWxjc3RkdzM3ZHI3NWZmcWh2NGozbGF3b2syaGVzayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xVIkfXYGTJeZKilg3p/giphy.gif",
    },
    {
      question: "For me, when did our relationship start ? think hard 😏",
      options: ["On first date", "On first day of conversation", "the day we kissed", "day when we switch to instagram DMs"],
      correct: 0, 
      mainGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExajA4bjFwMXY0MXlmeDlldzUzZTcya2o0N29weGd1MW95ZGVxcmR4YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PFo2HrqCjC0bm/giphy.gif",
      correctMsg: "Yes when I saw you sitting on platform and waiting for me, I knew you were the one 😍",
      correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmUyZHJjejI4NXYxeThiYWVtNnMzaWt0Nmwxam1qd2dnamJwZ3dneCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5nZGGZ9hks0W7uBv3O/giphy.gif",
      wrongMsg: "You're wrong babee Try Again! 😆",
      wrongGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGN1aXk4Zzd1NmZ6bGUyY2Nyajd5ZW0xdDViYnN1dmpxajBqY2JwciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lOadFSN6uNANXNRZDA/giphy.gif",
    },
    {
      question: "When I say “I miss you,” what do I actually mean? 🥺",
      options: ["I want a hug", "I want a kiss", "I want to see you immediately", "All of the above"],
      correct: 3, 
      mainGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTV0N2dtaXR1NTRhZnNpcGF1c2Z6cnp6czB2aGxqYmcycXBtZnIydCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tQiC5UaUhARVTvpXzB/giphy.gif",
      correctMsg: "I want you here with me right now 🫂",
      correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmUyZHJjejI4NXYxeThiYWVtNnMzaWt0Nmwxam1qd2dnamJwZ3dneCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5nZGGZ9hks0W7uBv3O/giphy.gif",
      wrongMsg: "Choose wisely 😏😏",
      wrongGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTV0N2dtaXR1NTRhZnNpcGF1c2Z6cnp6czB2aGxqYmcycXBtZnIydCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Ig8FDjXW70WHScdbwi/giphy.gif",
    },
    {
      question: "If we were alone on Valentine’s night, I would first? 🥺",
      options: ["Kiss you aggresively", "Throw you on bed", "Tease you playfully", "Stare into your eyes and tell you how much I love you"],
      correct: 3, 
      mainGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3M2U1NHIwbzR2N3VvMGU5MnNkbm9raXh2YWF5amx2dGxnbDBkZnU2OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Jh9nrMk6DPPAJGjHa9/giphy.gif",
      correctMsg: "Hugg you so tightly 🫂",
      correctGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c3U3azdqcm5qcGR1anh5ZGxxeXl4YTF2eXh3eTJxNmsyN3RueDM1cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YxKXWOhTSq8I14NKEn/giphy.gif",
      wrongMsg: "Wrong! But I would still do all of these things to you 😆",
      wrongGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aTJmeThydHp6NGp2cjA2NndvY3o2djBqeTh2NnNmeXZnczU0ajg5OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/muGZBielMqTChoxkC6/giphy.gif",
    },
    {
      question: "Will you be my Valentine?",
      options: ["YES!", "No"], 
      correct: 0, 
      mainGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzNnbThqOWp1MzIzbjVxcmN6aWViOXMwMTB2cmd2c2I5MmVsMmE2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vDhDcIEmShbUI/giphy.gif",
      correctMsg: "Yayyyyyyyyy ❤️",
      correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTBjNjdpdTd2azI2ZXBzOHh1Zjh0OTB0MWE2Zmtva3NpaTBnN3FvZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rjkJD1v80CjYs/giphy.gif",
      wrongMsg: "",
      wrongGif: "",
    }
  ],
  success: {
    title: "It's a Date! ❤️",
    message: "I love youu Babe!!! I can't wait to spend it with you.",
    image: "/selfie.jpeg", 
  }
};

const MovingButton = ({ label }: { label: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const moveButton = () => {
    setPosition({ 
      x: Math.random() * (window.innerWidth - 150), 
      y: Math.random() * (window.innerHeight - 100) 
    });
  };
  return (
    <motion.button
      onMouseEnter={moveButton}
      onTouchStart={moveButton}
      animate={{ x: position.x ? position.x - (window.innerWidth/2 - 100) : 0, y: position.y ? position.y - (window.innerHeight/2) : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="p-4 rounded-2xl text-lg font-bold bg-gray-200 text-gray-500 border-2 border-gray-300"
    >
      {label}
    </motion.button>
  );
};

export default function ValentineQuiz() {
  const [stage, setStage] = useState<'welcome' | 'quiz' | 'stats' | 'result'>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  
  // NEW: State to handle feedback (gifs and color flashes)
  const [feedback, setFeedback] = useState<{
    active: boolean;
    isCorrect: boolean;
    clickedIndex: number | null;
  }>({ active: false, isCorrect: false, clickedIndex: null });

  useEffect(() => {
    document.title = "A Special Surprise for You! ❤️";
  }, []);

  const prefetchImages = [
    config.welcome.image,
    config.success.image,
    ...config.questions.map(q => q.mainGif),
    ...config.questions.map(q => q.correctGif),
    ...config.questions.map(q => q.wrongGif)
  ].filter(Boolean);

  const handleAnswer = (index: number) => {
    if (feedback.active) return; // Prevent double clicks while showing result

    const isCorrect = index === config.questions[currentQuestion].correct;
    
    // 1. Show Feedback immediately
    setFeedback({
      active: true,
      isCorrect: isCorrect,
      clickedIndex: index
    });

    // 2. Wait 2 seconds so she can see the GIF and the Button Color
    setTimeout(() => {
        setFeedback({ active: false, isCorrect: false, clickedIndex: null });
        
        const newAnswers = [...answers, isCorrect];
        setAnswers(newAnswers);

        if (currentQuestion === config.questions.length - 2) {
            setStage('stats');
        } else if (stage === 'quiz' && currentQuestion === config.questions.length - 1) {
            if (isCorrect) {
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                setStage('result');
            }
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    }, 5000); // 2 Second delay
  };

  const resetQuiz = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setStage('quiz');
  };

  const correctCount = answers.filter(a => a).length;
  const wrongCount = answers.length - correctCount;
  const isPerfect = correctCount === config.questions.length - 1;

  // Logic to determine which GIF to show
  const currentQ = config.questions[currentQuestion];
  let displayGif = currentQ.mainGif;
  let displayMsg = null;

  if (feedback.active) {
    if (feedback.isCorrect) {
        displayGif = currentQ.correctGif;
        displayMsg = currentQ.correctMsg;
    } else {
        displayGif = currentQ.wrongGif;
        displayMsg = currentQ.wrongMsg;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-rose-300 to-red-300 p-4 font-sans relative overflow-hidden text-black text-center">
      
      {/* Hidden Preloader */}
      <div className="hidden">
        {prefetchImages.map((src, idx) => (
            <img key={idx} src={src} alt="preload" />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <motion.div key="w" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full z-10">
            <h1 className="text-4xl font-black text-rose-600 mb-4">{config.welcome.title}</h1>
            <img src={config.welcome.image} className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg" />
            <p className="text-gray-700 text-lg mb-8">{config.welcome.message}</p>
            <button onClick={() => setStage('quiz')} className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold text-xl">Let's Go!</button>
          </motion.div>
        )}

        {stage === 'quiz' && (
          <motion.div key="q" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full z-10">
            <span className="text-rose-400 font-bold mb-2 block">Question {currentQuestion + 1}</span>
            
            {/* Dynamic GIF Display */}
            <motion.img 
                key={displayGif} // Key change triggers animation
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={displayGif} 
                className="w-full h-48 object-cover rounded-2xl mb-6 shadow-md" 
            />
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{config.questions[currentQuestion].question}</h2>
            
            {/* Show feedback message if active */}
            {feedback.active && displayMsg && (
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`font-bold mb-4 ${feedback.isCorrect ? "text-green-600" : "text-rose-600"}`}>
                    {displayMsg}
                </motion.p>
            )}

            <div className="grid gap-4 mt-4">
              {currentQuestion === config.questions.length - 1 ? (
                <div className="flex flex-col gap-4">
                  {/* Heartbeat YES Button */}
                  <motion.button 
                    onClick={() => handleAnswer(0)} 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    disabled={feedback.active}
                    className={`p-4 rounded-2xl text-lg font-bold shadow-lg shadow-rose-200 transition-colors
                        ${feedback.active && feedback.clickedIndex === 0 
                            ? "bg-green-500 text-white" 
                            : "bg-rose-500 text-white"}`}
                  >
                    YES! ❤️
                  </motion.button>
                  <MovingButton label="No" />
                </div>
              ) : (
                config.questions[currentQuestion].options.map((opt, i) => {
                   const isSelected = feedback.clickedIndex === i;
                   const isCorrect = i === config.questions[currentQuestion].correct;
                   
                   let btnClass = "bg-white text-rose-500 border-rose-100";
                   if (feedback.active && isSelected) {
                       btnClass = isCorrect 
                        ? "bg-green-500 text-white border-green-600" // Green Flash on Option
                        : "bg-red-500 text-white border-red-600";     // Red Flash on Option
                   }

                   return (
                      <button 
                        key={i} 
                        onClick={() => handleAnswer(i)} 
                        disabled={feedback.active}
                        className={`p-4 rounded-2xl text-lg font-bold border-2 transition-colors duration-200 ${btnClass}`}
                      >
                        {opt}
                      </button>
                   );
                })
              )}
            </div>
          </motion.div>
        )}

        {stage === 'stats' && (
          <motion.div key="s" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/90 p-8 rounded-3xl shadow-2xl max-w-md w-full z-10 border-4 border-white">
            <h2 className="text-3xl font-black text-gray-800 mb-6">Quiz Results 📝</h2>
            <div className="flex justify-around mb-8">
                <div className="bg-green-100 p-4 rounded-2xl">
                    <p className="text-sm text-green-600 font-bold uppercase">Correct</p>
                    <p className="text-4xl font-black text-green-500">{correctCount}</p>
                </div>
                <div className="bg-rose-100 p-4 rounded-2xl">
                    <p className="text-sm text-rose-600 font-bold uppercase">Wrong</p>
                    <p className="text-4xl font-black text-rose-500">{wrongCount}</p>
                </div>
            </div>
            {isPerfect ? (
              <div className="animate-bounce">
                <p className="text-xl font-bold text-green-600 mb-6">PERFECT SCORE! 😍<br/>I have one last thing to ask...</p>
                <button onClick={() => { setCurrentQuestion(config.questions.length - 1); setStage('quiz'); }} className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold text-xl shadow-lg">Unlock Final Question ✨</button>
              </div>
            ) : (
              <div>
                <p className="text-lg text-gray-600 mb-6">Oops! You missed {wrongCount} {wrongCount === 1 ? 'detail' : 'details'}. You need a perfect score to see the surprise!</p>
                <button onClick={resetQuiz} className="w-full bg-gray-800 text-white py-4 rounded-2xl font-bold">Try Again From Start 🔄</button>
              </div>
            )}
          </motion.div>
        )}

        {stage === 'result' && (
          <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-md w-full z-10">
            <h1 className="text-5xl font-black text-rose-600 mb-4">{config.success.title}</h1>
            <p className="text-xl text-gray-700 mb-8">{config.success.message}</p>
            <img src={config.success.image} className="rounded-2xl w-full mb-8 shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}