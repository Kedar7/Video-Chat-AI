"use client";

import MeetingCard from "@/components/MeetingCard";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useReducer } from "react";
import { askQuestionAboutRecording, summarizeRecording } from "@/actions/gemini.actions";
import useCallList from "@/hooks/useCallList";
import { CallRecording } from "@stream-io/video-react-sdk";

type RecordingFetchStateType = {
  isFetching: boolean;
  errered: any;
  recordings: CallRecording[];
};

const RecordingsPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { calls, isLoading, error } = useCallList();
  const [{ recordings, isFetching, errered }, dispatchRecordingFetchState] =
    useReducer(
      (
        state: RecordingFetchStateType,
        newState: Partial<RecordingFetchStateType>
      ) => {
        return { ...state, ...newState };
      },
      {
        isFetching: false,
        errered: null,
        recordings: [],
      }
    );

  // State to store summaries and loading status, keyed by recording URL
  const [summaries, setSummaries] = useState<{[key: string]: string | 'loading' | 'error'}>({});

  // State to store questions and answers, keyed by recording URL
  const [questions, setQuestions] = useState<{[key: string]: string}>({});
  const [answers, setAnswers] = useState<{[key: string]: string | 'loading' | 'error'}>({});

  const [globalQuestion, setGlobalQuestion] = useState('');
  const [globalAnswer, setGlobalAnswer] = useState<string | 'loading' | 'error'>('');
  const [selectedRecording, setSelectedRecording] = useState<string>('');

  useEffect(() => {
    if (!calls) return;

    dispatchRecordingFetchState({ isFetching: true });

    const query = calls.map((call) => call.queryRecordings());

    Promise.all(query)
      .then((meetingRecordings) => {
        const recordings = meetingRecordings.flatMap(
          (meeting) => meeting.recordings
        );

        dispatchRecordingFetchState({ recordings });
      })
      .catch((e) => {
        dispatchRecordingFetchState({ errered: e });
      })
      .finally(() => {
        dispatchRecordingFetchState({ isFetching: false });
      });
  }, [calls]);

  // Function to handle global questions about all recordings
  const handleGlobalQuestion = async () => {
    if (!globalQuestion || globalAnswer === 'loading') return;

    setGlobalAnswer('loading');

    try {
      // Process each recording sequentially and combine answers
      const answers = await Promise.all(
        recordings.map(async (recording) => {
          try {
            const answer = await askQuestionAboutRecording(recording.url, globalQuestion);
            console.log(`Recording ${recording.filename} answer:`, answer); // Debug log
            
            // Check if the answer is meaningful (not empty and not "does not say")
            if (answer && 
                answer.trim() !== "" && 
                !answer.toLowerCase().includes("the transcript does not say") &&
                !answer.toLowerCase().includes("no information") &&
                !answer.toLowerCase().includes("cannot find")) {
              return {
                title: recording.filename || "Untitled Recording",
                date: recording.start_time?.toLocaleString(),
                answer: answer.trim()
              };
            }
            console.log(`Skipping recording ${recording.filename} - no meaningful answer`); // Debug log
            return null;
          } catch (error) {
            console.error(`Error processing recording ${recording.url}:`, error);
            return null;
          }
        })
      );

      // Filter out failed attempts and recordings without meaningful answers
      const validAnswers = answers.filter(answer => answer !== null);
      console.log('Valid answers found:', validAnswers.length); // Debug log
      
      if (validAnswers.length === 0) {
        setGlobalAnswer("No recordings contain relevant information for your question. Try rephrasing your question or asking about a different topic.");
        return;
      }

      // Format the combined answer
      const combinedAnswer = validAnswers
        .map(({ title, date, answer }) => 
          `Recording: ${title} (${date})\n${answer}\n\n`
        )
        .join('---\n\n');

      setGlobalAnswer(combinedAnswer);
    } catch (error) {
      console.error("Error processing recordings:", error);
      setGlobalAnswer('error');
      alert("Failed to get answers from recordings. Please try again.");
    }
  };

  if (isLoading || isFetching) {
    return "Loading...";
  }

  if (error || errered) {
    return (error || errered).toString?.();
  }

  if (!recordings?.length) {
    return "No recording found";
  }

  // Floating animation variants
  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full p-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden min-h-[400px] flex items-center"
        >
          {/* Background with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center mix-blend-overlay opacity-20" />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating circles */}
            <motion.div
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm"
            />
            <motion.div
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              transition={{ delay: 1 }}
              className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-white/5 backdrop-blur-sm"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 w-full">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-8"
              >
                <motion.p 
                  className="text-xl text-gray-200 max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Access and manage your meeting recordings, get AI-powered summaries, and ask questions about your meetings.
                </motion.p>

                {/* Global Q&A Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-white/20"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Ask a question about all recordings</h3>
                  <div className="flex flex-col gap-4">
                    <input
                      type="text"
                      placeholder="Type your question about any recording..."
                      value={globalQuestion}
                      onChange={(e) => setGlobalQuestion(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                    />
                    <Button
                      onClick={handleGlobalQuestion}
                      disabled={!globalQuestion || globalAnswer === 'loading'}
                      className="relative bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 text-sm flex items-center justify-center gap-2 group transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden font-medium"
                    >
                      {globalAnswer === 'loading' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing all recordings...</span>
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send text-sm"></i>
                          <span>Ask Question</span>
                        </>
                      )}
                    </Button>

                    {/* Display answer or error message */}
                    {globalAnswer && globalAnswer !== 'loading' && globalAnswer !== 'error' && (
                      <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white relative">
                        <button
                          onClick={() => setGlobalAnswer('')}
                          className="absolute top-2 right-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                          aria-label="Close answers"
                        >
                          <i className="bi bi-x-lg text-lg text-white/80 hover:text-white"></i>
                        </button>
                        <h3 className="text-lg font-semibold mb-2 pr-8">Answers from Recordings</h3>
                        <div className="space-y-4">
                          {globalAnswer.split('---\n\n').map((answer, index) => (
                            <div key={index} className="p-3 bg-white/5 rounded-lg">
                              <p className="text-sm whitespace-pre-wrap">{answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {globalAnswer === 'error' && (
                      <div className="mt-4 p-4 bg-red-500/20 backdrop-blur-sm rounded-xl border border-red-200/20 text-red-200 relative">
                        <button
                          onClick={() => setGlobalAnswer('')}
                          className="absolute top-2 right-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
                          aria-label="Close error message"
                        >
                          <i className="bi bi-x-lg text-lg text-red-200/80 hover:text-red-200"></i>
                        </button>
                        <h3 className="text-lg font-semibold mb-2 pr-8">Error</h3>
                        <p className="text-sm">Could not get answers from the recordings.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Recordings Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl p-6 shadow-sm"
        >
          {recordings.map((callRecording) => (
            <motion.div
              key={callRecording.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <MeetingCard
                icon="bi-record-circle"
                title={callRecording.filename?.substring(0, 20) || "No Description"}
                subTitle={<MeetingCard.dateStr date={callRecording.start_time?.toLocaleString()} />}
                bottomSlot={
                  <div className="flex flex-wrap gap-2 w-full justify-center mt-6">
                    <MeetingCard.ActionBtns
                      buttonIcon="bi-play-fill"
                      buttonText="Play"
                      handleClick={(e) => {
                        e.stopPropagation();
                        router.push(callRecording.url);
                      }}
                    />
                    <MeetingCard.ActionBtns
                      buttonIcon={summaries[callRecording.url] === 'loading' ? 'bi-arrow-clockwise' : 'bi-magic'}
                      buttonText={summaries[callRecording.url] === 'loading' ? 'Summarizing...' : 'Summarize'}
                      handleClick={async (e) => {
                        e.stopPropagation();
                        if (summaries[callRecording.url] === 'loading') return;

                        setSummaries(prev => ({ ...prev, [callRecording.url]: 'loading' }));

                        try {
                          const summary = await summarizeRecording(callRecording.url);
                          setSummaries(prev => ({ ...prev, [callRecording.url]: summary }));
                        } catch (error) {
                          console.error("Error summarizing recording:", error);
                          setSummaries(prev => ({ ...prev, [callRecording.url]: 'error' }));
                          alert("Failed to generate summary.");
                        }
                      }}
                    />
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(callRecording.url);
                        alert("Link copied to clipboard!");
                      }}
                      className="relative bg-gray-100 text-gray-800 hover:bg-gray-200 px-3 py-1.5 text-sm flex items-center gap-1.5 group transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden border border-gray-200"
                    >
                      <div className="w-5 h-5 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                        <i className="bi bi-link-45deg text-xs text-blue-600"></i>
                      </div>
                      <span className="font-medium text-gray-700">Copy Link</span>
                    </Button>
                  </div>
                }
              >
                {/* Display summary below the card */}
                {summaries[callRecording.url] && summaries[callRecording.url] !== 'loading' && summaries[callRecording.url] !== 'error' && (
                  <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 text-gray-800">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Summary</h3>
                    <p className="text-sm leading-relaxed">{summaries[callRecording.url]}</p>
                  </div>
                )}
                {summaries[callRecording.url] === 'loading' && (
                  <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 text-gray-800">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Summary</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>Summarizing recording...</span>
                    </div>
                  </div>
                )}
                {summaries[callRecording.url] === 'error' && (
                  <div className="mt-4 p-4 bg-white rounded-xl border border-red-200 text-red-800">
                    <h3 className="text-lg font-semibold mb-2">Summary Error</h3>
                    <p className="text-sm">Could not generate summary for this recording.</p>
                  </div>
                )}

                {/* Q&A Section */}
                <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Ask a question about this recording</h3>
                  <input
                    type="text"
                    placeholder="Type your question here..."
                    value={questions[callRecording.url] || ''}
                    onChange={(e) => setQuestions(prev => ({ ...prev, [callRecording.url]: e.target.value }))}
                    className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                  />
                  <Button
                    onClick={async (e) => {
                      e.stopPropagation();
                      const question = questions[callRecording.url];
                      if (!question || answers[callRecording.url] === 'loading') return;

                      setAnswers(prev => ({ ...prev, [callRecording.url]: 'loading' }));

                      try {
                        const aiAnswer = await askQuestionAboutRecording(callRecording.url, question);
                        setAnswers(prev => ({ ...prev, [callRecording.url]: aiAnswer }));
                      } catch (error) {
                        console.error("Error asking question:", error);
                        setAnswers(prev => ({ ...prev, [callRecording.url]: 'error' }));
                        alert("Failed to get answer.");
                      }
                    }}
                    disabled={!questions[callRecording.url] || answers[callRecording.url] === 'loading'}
                    className="mt-3 relative bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm flex items-center gap-2 group transition-all duration-300 hover:shadow-lg rounded-lg overflow-hidden"
                  >
                    <div className="w-5 h-5 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                      <i className="bi bi-send text-xs text-white"></i>
                    </div>
                    <span className="font-medium text-white">
                      {answers[callRecording.url] === 'loading' ? 'Getting Answer...' : 'Ask'}
                    </span>
                  </Button>

                  {/* Display answer or loading/error message */}
                  {answers[callRecording.url] && answers[callRecording.url] !== 'loading' && answers[callRecording.url] !== 'error' && (
                    <div className="mt-4 p-4 bg-white rounded-xl border border-green-200 text-gray-800">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Answer</h3>
                      <p className="text-sm leading-relaxed">{answers[callRecording.url]}</p>
                    </div>
                  )}
                  {answers[callRecording.url] === 'loading' && (
                    <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 text-gray-800">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Answer</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Getting answer...</span>
                      </div>
                    </div>
                  )}
                  {answers[callRecording.url] === 'error' && (
                    <div className="mt-4 p-4 bg-white rounded-xl border border-red-200 text-red-800">
                      <h3 className="text-lg font-semibold mb-2">Answer Error</h3>
                      <p className="text-sm">Could not get answer for this question.</p>
                    </div>
                  )}
                </div>
              </MeetingCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RecordingsPage;
