"use client";

import {
  useCallStateHooks,
  createSoundDetector,
} from "@stream-io/video-react-sdk";
import { useState, useEffect } from "react";

const SpeechIndicator = () => {
  const { useMicrophoneState } = useCallStateHooks();
  const { isEnabled, mediaStream } = useMicrophoneState();
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!isEnabled || !mediaStream) return;

    const disposeSoundDetector = createSoundDetector(
      mediaStream,
      ({ audioLevel }) => setPercentage(audioLevel),
      { detectionFrequencyInMs: 80, destroyStreamOnStop: false }
    );

    return () => {
      disposeSoundDetector().catch(console.error);
    };
  }, [isEnabled, mediaStream]);

  return (
    <div className="w-8 h-8 bg-white rounded-full flex justify-center items-center shadow-sm">
      <div
        className="rounded-full bg-[#0D6EFD] w-full h-full transition-transform duration-200"
        style={{ transform: `scale(${percentage / 100})` }}
      />
    </div>
  );
};

export default SpeechIndicator;
