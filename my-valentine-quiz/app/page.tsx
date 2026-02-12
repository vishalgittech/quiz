"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// --------------------------------------------
// CONFIGURATION
// --------------------------------------------
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
      mainGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3R6eW50Zmw2c3R6emt6aXJ6eXJ6eXJ6eXJ6eXJ6eXJ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLdmIp6wJr91JAI/giphy.gif",
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
      wrongMsg: "Ofc You baby! You're My favorite meal 🤤🤤 Choose wisely",
      wrongGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dDRmemp5MmE2MzZ0MG53ZzFlOHUzcDBtem85dGR5MGNvZ2N0cTJ5MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4Js22dmcqKkvPrqXJ0/giphy.gif",
    },
    {
      question: "What's my favorite thing about you ?",
      options: ["Your smile", "Your 🍒", "Your 👄", "Whole You👀"],
      correct: 3, 
      mainGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dDRmemp5MmE2MzZ0MG53ZzFlOHUzcDBtem85dGR5MGNvZ2N0cTJ5MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3lxoqLn8N5ETCWpU9u/giphy.gif",
      correctMsg: "I'm the luckiest guy in the world! ❤️ 2nd option is also correct but I can't say it here 😆",
      correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTY4MTBiNjBqYzRrcmMxaG1icTkybDI3MjV5NTlnMmhicm52eDBobCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vxzVCmsyJrDu7N87Tc/giphy.gif",
      wrongMsg: "Yeah this is also right but Correct answer is not this baby 😆",
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
      correctMsg: "Huging you so tightly 🫂",
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

// --- RUNAWAY BUTTON COMPONENT ---
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
  const [finalQuestionUnlock, setFinalQuestionUnlock] = useState(false);

  const handleAnswer = (index: number) => {
    const isCorrect = index === config.questions[currentQuestion].correct;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);

    // If we just answered the 7th question (index 6), move to stats
    if (currentQuestion === config.questions.length - 2) {
      setStage('stats');
    } else if (stage === 'quiz' && currentQuestion === config.questions.length - 1) {
        // Special case for final question
        if (isCorrect) {
            triggerConfetti();
            setStage('result');
        }
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  };

  const resetQuiz = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setStage('quiz');
    setFinalQuestionUnlock(false);
  };

  const correctCount = answers.filter(a => a).length;
  const wrongCount = answers.length - correctCount;
  const isPerfect = correctCount === config.questions.length - 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-rose-300 to-red-300 p-4 font-sans relative overflow-hidden text-black text-center">
      
      <AnimatePresence mode="wait">
        {/* WELCOME */}
        {stage === 'welcome' && (
          <motion.div key="w" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full z-10">
            <h1 className="text-4xl font-black text-rose-600 mb-4">{config.welcome.title}</h1>
            <img src={config.welcome.image} className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg" />
            <p className="text-gray-700 text-lg mb-8">{config.welcome.message}</p>
            <button onClick={() => setStage('quiz')} className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold text-xl">Let's Go!</button>
          </motion.div>
        )}

        {/* QUIZ */}
        {stage === 'quiz' && (
          <motion.div key="q" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full z-10">
            <span className="text-rose-400 font-bold mb-2 block">Question {currentQuestion + 1}</span>
            <img src={config.questions[currentQuestion].mainGif} className="w-full h-48 object-cover rounded-2xl mb-6 shadow-md" />
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{config.questions[currentQuestion].question}</h2>
            <div className="grid gap-4">
              {currentQuestion === config.questions.length - 1 ? (
                <div className="flex flex-col gap-4">
                  <button onClick={() => handleAnswer(0)} className="p-4 rounded-2xl text-lg font-bold bg-white text-rose-500 border-2 border-rose-100 shadow-md">YES!</button>
                  <MovingButton label="No" />
                </div>
              ) : (
                config.questions[currentQuestion].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className="p-4 rounded-2xl text-lg font-bold bg-white text-rose-500 border-2 border-rose-100">
                    {opt}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* STATS SCREEN */}
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
                <button onClick={() => { setCurrentQuestion(config.questions.length - 1); setStage('quiz'); }} className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold text-xl">
                  Unlock Final Question ✨
                </button>
              </div>
            ) : (
              <div>
                <p className="text-lg text-gray-600 mb-6">Oops! You missed {wrongCount} {wrongCount === 1 ? 'detail' : 'details'} about us. You need to be perfect to see the surprise!</p>
                <button onClick={resetQuiz} className="w-full bg-gray-800 text-white py-4 rounded-2xl font-bold">Try Again From Start 🔄</button>
              </div>
            )}
          </motion.div>
        )}

        {/* FINAL RESULT */}
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


// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import confetti from "canvas-confetti";

// // --------------------------------------------
// // CONFIGURATION: CUSTOMIZE EVERYTHING HERE
// // --------------------------------------------
// const config = {
//   welcome: {
//     title: "Hey Beautiful! ❤️",
//     message: "I made a little something for you. Are you ready for a challenge?",
//     image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3R6eW50Zmw2c3R6emt6aXJ6eXJ6eXJ6eXJ6eXJ6eXJ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLdmIp6wJr91JAI/giphy.gif", 
//     buttonText: "Let's Go!",
//   },

//   questions: [
//     {
//       question: "Where was our first date?",
//       options: ["At Lake", "Beach", "Movie Theater", "Fancy Dinner"],
//       correct: 1,
//       mainGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3R6eW50Zmw2c3R6emt6aXJ6eXJ6eXJ6eXJ6eXJ6eXJ6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLdmIp6wJr91JAI/giphy.gif",
//       // --- CUSTOM FEEDBACK ---
//       correctMsg: "Chal Chal It was easy huh 😏😏",
//       correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnJhcXFrdGZrOGo2cGhqY3NjYjA0Y3VsZGVpeHVwODg5ZTY3b3FxMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/k6ifpeMmfCTx7tZj7Y/giphy.gif",
//       wrongMsg: "Really?! I'm heartbroken you forgot... 😭",
//       wrongGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHR0NjN2aGc3MGszeHBnaHV2a2dtanpkcDBkYm1hOWhtOG5uMXQ5ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vrW1WOuLpWB8s/giphy.gif",
//     },
//     {
//       question: "What is my absolute favorite food?",
//       options: ["Biryani", "You","Gavthi Komdi", "GulabJamun"],
//       correct: 2,
//       mainGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3d2V4aGdkNnM4NWZwb3N4d2I0aHd6aHVsOGN5bG9mZmlzb2lza29wNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XCm6aoloWyUkwUuqkf/giphy.gif",
//       // --- CUSTOM FEEDBACK ---
//       correctMsg: "Correct! Let's go get some tonight! 👅",
//       correctGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eWpocnZzejlmODVzYTdqcW9uMXRhbTF3NXhjMnNraWFrbHF2ZnhzMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7IHaFYgTgCICI/giphy.gif",
//       wrongMsg: "Ofc You baby! You're My favorite meal 🤤🤤 Choose wisely",
//       wrongGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dDRmemp5MmE2MzZ0MG53ZzFlOHUzcDBtem85dGR5MGNvZ2N0cTJ5MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4Js22dmcqKkvPrqXJ0/giphy.gif",
//     },
//         {
//         question: "What's my favorite thing about you ?",
//         options: ["Your smile", "Your 🍒", "Your 👄", "Whole You👀"],
//         correct: 3, 
//         mainGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dDRmemp5MmE2MzZ0MG53ZzFlOHUzcDBtem85dGR5MGNvZ2N0cTJ5MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3lxoqLn8N5ETCWpU9u/giphy.gif",
//         // No wrong feedback needed for the final question as it triggers the win!
//         correctMsg: "I'm the luckiest guy in the world! ❤️ 2nd option is also correct but I can't say it here 😆",
//         correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTY4MTBiNjBqYzRrcmMxaG1icTkybDI3MjV5NTlnMmhicm52eDBobCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vxzVCmsyJrDu7N87Tc/giphy.gif",
//         wrongMsg: "Yeah this is also right but Correct answer is not this baby 😆",
//         wrongGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWxpYWpxNDYzNmN3ejVpbW5waHJ1ZXhsZW9nM2NwazN3a3NmMjlzNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rZckIoG1PtKne/giphy.gif",
//       },
//        {
//         question: "Where do I love kissing you the most?",
//         options: ["On Lips", "On 🍒", "On neck", "On cheeks"],
//         correct: 2, 
//         mainGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXd6NXl2d3ZoMGpuMDlxMjVvbzY5d3JxeTU3d215dDdwOHQzaHhxNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Y35E2rQlXUIQHmDof8/giphy.gif",
//         // No wrong feedback needed for the final question as it triggers the win!
//         correctMsg: "Yes that's your neck 😆",
//         correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmxnNDM2aXoyMXdhOXR0MnpxMHg1bzdob29yNjZqN2tseml6eHhvdCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/N0TtscnTopHCY99WkL/giphy.gif",
//         wrongMsg: "Opps! Try Again baby 🤪🤪",
//         wrongGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXY1aHFxMG9oaWxjc3RkdzM3ZHI3NWZmcWh2NGozbGF3b2syaGVzayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xVIkfXYGTJeZKilg3p/giphy.gif",
//       },
//       {
//         question: "For me, when did our relationship start ? think hard 😏",
//         options: ["On first date", "On first day of conversation", "the day we kissed", "day when we switch to instagram DMs"],
//         correct: 0, 
//         mainGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExajA4bjFwMXY0MXlmeDlldzUzZTcya2o0N29weGd1MW95ZGVxcmR4YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PFo2HrqCjC0bm/giphy.gif",
//         // No wrong feedback needed for the final question as it triggers the win!
//         correctMsg: "Yes when I saw you sitting on platform and waiting for me, I knew you were the one 😍",
//         correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmUyZHJjejI4NXYxeThiYWVtNnMzaWt0Nmwxam1qd2dnamJwZ3dneCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5nZGGZ9hks0W7uBv3O/giphy.gif",
//         wrongMsg: "You're wrong babee Try Again! 😆",
//         wrongGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGN1aXk4Zzd1NmZ6bGUyY2Nyajd5ZW0xdDViYnN1dmpxajBqY2JwciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lOadFSN6uNANXNRZDA/giphy.gif",
//       },
//       {
//         question: "When I say “I miss you,” what do I actually mean? 🥺",
//         options: ["I want a hug", "I want a kiss", "I want to see you immediately", "All of the above"],
//         correct: 3, 
//         mainGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTV0N2dtaXR1NTRhZnNpcGF1c2Z6cnp6czB2aGxqYmcycXBtZnIydCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/tQiC5UaUhARVTvpXzB/giphy.gif",
//         // No wrong feedback needed for the final question as it triggers the win!
//         correctMsg: "I want you here with me right now 🫂",
//         correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmUyZHJjejI4NXYxeThiYWVtNnMzaWt0Nmwxam1qd2dnamJwZ3dneCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5nZGGZ9hks0W7uBv3O/giphy.gif",
//         wrongMsg: "Choose wisely 😏😏",
//         wrongGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTV0N2dtaXR1NTRhZnNpcGF1c2Z6cnp6czB2aGxqYmcycXBtZnIydCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Ig8FDjXW70WHScdbwi/giphy.gif",
//       },
//        {
//         question: "If we were alone on Valentine’s night, I would first? 🥺",
//         options: ["Kiss you aggresively", "Throw you on bed", "Tease you playfully", "Stare into your eyes and tell you how much I love you"],
//         correct: 3, 
//         mainGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3M2U1NHIwbzR2N3VvMGU5MnNkbm9raXh2YWF5amx2dGxnbDBkZnU2OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Jh9nrMk6DPPAJGjHa9/giphy.gif",
//         // No wrong feedback needed for the final question as it triggers the win!
//         correctMsg: "Huging you so tightly 🫂",
//         correctGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c3U3azdqcm5qcGR1anh5ZGxxeXl4YTF2eXh3eTJxNmsyN3RueDM1cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YxKXWOhTSq8I14NKEn/giphy.gif",
//         wrongMsg: "Wrong! But I would still do all of these things to you 😆",
//         wrongGif: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3aTJmeThydHp6NGp2cjA2NndvY3o2djBqeTh2NnNmeXZnczU0ajg5OCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/muGZBielMqTChoxkC6/giphy.gif",
//       },
//     {
//       question: "Will you be my Valentine?",
//       // WE WILL HANDLE THESE OPTIONS SPECIALLY IN THE CODE BELOW
//       options: ["YES!", "No"], 
//       correct: 0, 
//       mainGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzNnbThqOWp1MzIzbjVxcmN6aWViOXMwMTB2cmd2c2I5MmVsMmE2YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vDhDcIEmShbUI/giphy.gif",
//       correctMsg: "Yayyyyyyyyy ❤️",
//       correctGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTBjNjdpdTd2azI2ZXBzOHh1Zjh0OTB0MWE2Zmtva3NpaTBnN3FvZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/rjkJD1v80CjYs/giphy.gif",
//       wrongMsg: "",
//       wrongGif: "",
//     }
//   ],

//   success: {
//     title: "It's a Date! ❤️",
//     message: "Happy Valentine's Day! I can't wait to spend it with you.",
//     image: "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif", 
//   }
// };

// // --- RUNAWAY BUTTON COMPONENT ---
// const MovingButton = ({ label, onClick }: { label: string; onClick: () => void }) => {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   const moveButton = () => {
//     const randomX = Math.random() * (window.innerWidth - 150);
//     const randomY = Math.random() * (window.innerHeight - 100);
//     setPosition({ x: randomX, y: randomY });
//   };

//   return (
//     <motion.button
//       onMouseEnter={moveButton} // Moves on desktop
//       onTouchStart={moveButton} // Moves on mobile
//       animate={{ x: position.x ? position.x - (window.innerWidth/2 - 100) : 0, y: position.y ? position.y - (window.innerHeight/2) : 0 }}
//       transition={{ type: "spring", stiffness: 300, damping: 20 }}
//       className="p-4 rounded-2xl text-lg font-bold bg-gray-200 text-gray-500 border-2 border-gray-300"
//     >
//       {label}
//     </motion.button>
//   );
// };

// // --------------------------------------------
// // MAIN ENGINE
// // --------------------------------------------
// export default function ValentineQuiz() {
//   const [stage, setStage] = useState<'welcome' | 'quiz' | 'result'>('welcome');
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

//   const handleAnswer = (index: number) => {
//     const isLastQuestion = currentQuestion === config.questions.length - 1;
//     const isCorrect = index === config.questions[currentQuestion].correct;

//     if (isCorrect || isLastQuestion) {
//       setFeedback('correct');
//       triggerConfetti();
//       setTimeout(() => {
//         setFeedback(null);
//         if (isLastQuestion) {
//           setStage('result');
//         } else {
//           setCurrentQuestion(currentQuestion + 1);
//         }
//       }, 2500); 
//     } else {
//       setFeedback('wrong');
//       setTimeout(() => {
//         setFeedback(null);
//       }, 2500);
//     }
//   };

//   const triggerConfetti = () => {
//     confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-rose-300 to-red-300 p-4 font-sans relative overflow-hidden">
      
//       {/* Background Hearts */}
//       <div className="absolute inset-0 pointer-events-none">
//          {[...Array(8)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute text-3xl"
//               initial={{ y: "110vh", x: (i * 12) + "vw", opacity: 0 }}
//               animate={{ y: "-10vh", opacity: [0, 1, 0] }}
//               transition={{ duration: 8, repeat: Infinity, delay: i * 1.5 }}
//             >
//               ❤️
//             </motion.div>
//          ))}
//       </div>

//       <AnimatePresence mode="wait">
        
//         {/* DYNAMIC FEEDBACK POPUP */}
//         {feedback && (
//           <motion.div
//             key="feedback"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-rose-900/40 backdrop-blur-md p-4"
//           >
//             <motion.div 
//               initial={{ scale: 0.5 }}
//               animate={{ scale: 1 }}
//               className="bg-white p-6 rounded-3xl shadow-2xl max-w-sm w-full text-center border-4 border-white"
//             >
//               <h2 className={`text-3xl font-bold mb-4 ${feedback === 'correct' ? 'text-green-500' : 'text-rose-500'}`}>
//                 {feedback === 'correct' ? "Yay!" : "Oh no!"}
//               </h2>
//               <img 
//                 src={feedback === 'correct' ? config.questions[currentQuestion].correctGif : config.questions[currentQuestion].wrongGif} 
//                 className="w-full h-56 object-cover rounded-2xl mb-4"
//                 alt="Feedback"
//               />
//               <p className="text-xl font-bold text-gray-800 italic">
//                 "{feedback === 'correct' ? config.questions[currentQuestion].correctMsg : config.questions[currentQuestion].wrongMsg}"
//               </p>
//             </motion.div>
//           </motion.div>
//         )}

//         {/* WELCOME */}
//         {stage === 'welcome' && (
//           <motion.div key="w" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full text-center z-10 border-2 border-white/50">
//             <h1 className="text-4xl font-black text-rose-600 mb-4">{config.welcome.title}</h1>
//             <img src={config.welcome.image} className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg" />
//             <p className="text-gray-700 text-lg font-medium mb-8 leading-relaxed">{config.welcome.message}</p>
//             <button onClick={() => setStage('quiz')} className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl font-bold text-xl transition-transform hover:scale-105 active:scale-95 shadow-xl">
//               {config.welcome.buttonText}
//             </button>
//           </motion.div>
//         )}

//         {/* QUIZ */}
//         {stage === 'quiz' && (
//           <motion.div key="q" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-md w-full text-center z-10 border-2 border-white/50">
//             <div className="flex justify-between items-center mb-4">
//                 <span className="text-rose-400 font-bold">Question {currentQuestion + 1}/{config.questions.length}</span>
//             </div>
//             <img src={config.questions[currentQuestion].mainGif} className="w-full h-48 object-cover rounded-2xl mb-6 shadow-md" />
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">{config.questions[currentQuestion].question}</h2>
//             <div className="grid gap-4">
//               {config.questions[currentQuestion].options.map((opt, i) => (
//                 <button key={i} onClick={() => handleAnswer(i)} className="p-4 rounded-2xl text-lg font-bold bg-white text-rose-500 hover:bg-rose-50 border-2 border-rose-100 transition-all hover:shadow-md active:translate-y-1">
//                   {opt}
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* RESULT */}
//         {stage === 'result' && (
//           <motion.div key="r" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-md w-full text-center z-10 border-2 border-white/50">
//             <h1 className="text-5xl font-black text-rose-600 mb-4">{config.success.title}</h1>
//             <p className="text-xl text-gray-700 font-medium mb-8 leading-relaxed">{config.success.message}</p>
//             <img src={config.success.image} className="rounded-2xl w-full mb-8 shadow-2xl" />
//             <button onClick={() => { setStage('welcome'); setCurrentQuestion(0); }} className="text-rose-400 font-bold underline">Watch our story again</button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }