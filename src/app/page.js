"use client";

import React, { useState, useEffect,useRef  } from "react";
import {
  FaPlayCircle,
  FaPauseCircle,
  FaClock,
  FaShareAlt,
  FaBroadcastTower,
  FaHeartbeat,
  FaEllipsisV 
} from "react-icons/fa";
import { GiLotus } from "react-icons/gi";
import { MdSelfImprovement } from "react-icons/md";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

export default function MeditationDashboard() {
  const [isNightMode, setNightMode] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [isMonitoring, setMonitoring] = useState(false);
  const [isLivePlaying, setLivePlaying] = useState(false);
  const [isMeditating, setIsMeditating] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const liveAudioRef = useRef(null);
  // Timer functionality for meditation
  useEffect(() => {
    let timer;
    if (isMeditating) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isMeditating]);

  const toggleMeditation = () => {
    if (isMeditating) {
      setIsMeditating(false);
    } else {
      setElapsedTime(0);
      setIsMeditating(true);
    }
  };

  const toggleNightMode = () => setNightMode(!isNightMode);

  // Simulated heart rate monitoring
  useEffect(() => {
    let interval;
    if (isMonitoring) {
      interval = setInterval(() => {
        setHeartRate(60 + Math.floor(Math.random() * 40)); // Random heart rate between 60-100 bpm
      }, 1000);
    } else {
      clearInterval(interval);
      setHeartRate(null); // Reset heart rate when monitoring stops
    }
    return () => clearInterval(interval);
  }, [isMonitoring]);

  const toggleMonitoring = () => {
    if (isMonitoring) {
      setMonitoring(false);
    } else {
      setMonitoring(true);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const audioTracks = [
    {
      id: 1,
      title: "การฝึกสมาธิ: เสียงธรรมชาติในป่า",
      speaker: "ธรรมชาติ",
      duration: "15 นาที",
      url: "/sounds/birds39-forest-20772.mp3", // Path to your local file
    },
    {
      id: 2,
      title: "การฝึกสมาธิ: เสียงธรรมชาติเบาสบาย",
      speaker: "ธรรมชาติ",
      duration: "20 นาที",
      url: "/sounds/gentle-nature-ambience-248950.mp3",
    },
    {
      id: 3,
      title: "การฝึกสมาธิ: สมาธิสีฟ้า",
      speaker: "ธรรมชาติ",
      duration: "30 นาที",
      url: "/sounds/meditation-blue-138131.mp3",
    },
  ];

  const togglePlayPause = (track) => {
    if (currentAudio && currentAudio.id === track.id && isPlaying) {
      // Pause the current track
      audioRef.current.pause();
      setPlaying(false);
    } else {
      // Play a new track
      if (audioRef.current) {
        audioRef.current.pause(); // Stop any currently playing audio
        audioRef.current.currentTime = 0; // Reset the previous audio
      }
      setCurrentAudio(track); // Set the new audio track
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (currentAudio && isPlaying) {
      audioRef.current.src = currentAudio.url; // Update the audio source
      audioRef.current.play(); // Play the audio

      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration); // Set the duration of the audio
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime); // Update the current playback time
      };

      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [currentAudio, isPlaying]);

 


  // Toggle live audio streaming
  const toggleLiveBroadcast = () => {
    if (isLivePlaying) {
      liveAudioRef.current.pause();
    } else {
      liveAudioRef.current.play();
    }
    setLivePlaying(!isLivePlaying);
  };


  const handleShare = (track) => {
    const shareText = `ร่วมฝึกสมาธิกับ "${track.title}" โดย ${track.speaker} ได้ที่: ${track.url}`;
    if (navigator.share) {
      navigator.share({
        title: track.title,
        text: shareText,
        url: track.url,
      });
    } else {
      alert("การแบ่งปันยังไม่รองรับบนเบราว์เซอร์นี้");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isNightMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-white via-[#1478D2] to-[#0D2745] text-[#0D2745]"
      }`}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#1478D2] via-[#0D2745] to-[#1478D2] shadow-md">
        <h1 className="text-lg md:text-xl font-extrabold tracking-wide text-white">
          เเดชบอร์ดฝึกสมาธิ
        </h1>
        <div className="flex gap-2">
          <button
            className="p-2 rounded-full shadow-md transition-transform hover:scale-110"
            onClick={toggleNightMode}
          >
            {isNightMode ? (
              <BsFillSunFill className="text-yellow-400 text-xl" />
            ) : (
              <BsMoonStarsFill className="text-indigo-400 text-xl" />
            )}
          </button>
    <button className="p-2 rounded-full shadow-lg transition-transform transform hover:scale-110">
            <FaEllipsisV className="text-xl" />
          </button>
        </div>
      </header>

      {/* Quick Access Buttons */}
      <div className="flex flex-wrap justify-around mt-4 px-4 gap-4">
        {/* Heart Rate Monitoring Button */}
        <button
          onClick={toggleMonitoring}
          className="flex items-center gap-2 text-[#1478D2] bg-white py-2 px-4 md:px-6 rounded-full shadow-md hover:bg-blue-100 transition w-full md:w-auto"
        >
          <FaHeartbeat className="text-lg" />
          <span>
            {isMonitoring
              ? `ชีพจร: ${heartRate || "..."}`
              : "เริ่มจับชีพจร"}
          </span>
        </button>

        {/* Meditation Timer Button */}
        <button
          onClick={toggleMeditation}
          className="flex items-center gap-2 text-[#1478D2] bg-white py-2 px-4 md:px-6 rounded-full shadow-md hover:bg-blue-100 transition w-full md:w-auto"
        >
          {isMeditating ? (
            <>
              <FaPauseCircle className="text-lg" />
              <span>{formatTime(elapsedTime)}</span>
            </>
          ) : (
            <>
              <FaPlayCircle className="text-lg" />
              <span>เริ่มฝึกสมาธิ</span>
            </>
          )}
        </button>

  {/* Live Broadcast Button */}
  <button
          onClick={toggleLiveBroadcast}
          className="flex items-center gap-2 text-[#1478D2] bg-white py-2 px-4 md:px-6 rounded-full shadow-md hover:bg-blue-100 transition w-full md:w-auto"
        >
          {isLivePlaying ? (
            <>
              <FaPauseCircle className="text-lg" />
              <span>หยุดถ่ายทอดสด</span>
            </>
          ) : (
            <>
              <FaBroadcastTower className="text-lg" />
              <span>ฟังถ่ายทอดสด</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow px-4 py-8">
        {/* Meditation Guide */}
        <section className="bg-gradient-to-br from-[#1478D2] via-[#0D2745] to-[#0D2745] rounded-xl shadow-md p-6 mb-8 text-white">
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <MdSelfImprovement className="text-2xl md:text-3xl" /> คำแนะนำการฝึกสมาธิ
          </h2>
          <p className="mt-4 text-sm md:text-base">
            ผ่อนคลายหายใจเข้าลึกๆ และฟังเสียงบรรยายเพื่อเข้าสู่สมาธิ
          </p>
        </section>

        {/* Audio Tracks Section */}
        <section>
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <GiLotus className="text-2xl md:text-3xl" /> รายการเสียงบรรยาย
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {audioTracks.map((track) => (
              <div
                key={track.id}
                className="bg-gradient-to-r from-white via-[#1478D2] to-[#0D2745] rounded-lg shadow-lg p-4 flex flex-col justify-between text-white"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base md:text-lg font-semibold">
                    {track.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm">
                    <FaClock />
                    <span>{track.duration}</span>
                  </div>
                </div>
                <p className="text-xs md:text-sm italic mt-2">
                  โดย {track.speaker}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="bg-white text-[#1478D2] py-2 px-4 rounded-full shadow-md hover:bg-blue-100 transition"
                    onClick={() => togglePlayPause(track)}
                  >
                    {currentAudio && currentAudio.id === track.id && isPlaying ? (
                      <FaPauseCircle className="inline-block text-xl mr-2" />
                    ) : (
                      <FaPlayCircle className="inline-block text-xl mr-2" />
                    )}
                    {currentAudio && currentAudio.id === track.id && isPlaying
                      ? "หยุด"
                      : "เล่น"}
                  </button>
                  <button
                    className="bg-white text-[#1478D2] py-2 px-4 rounded-full shadow-md hover:bg-blue-100 transition"
                    onClick={() => alert("แบ่งปันยังไม่พร้อมใช้งาน")}
                  >
                    <FaShareAlt className="inline-block text-xl mr-2" /> แบ่งปัน
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Playback Controls */}
      {currentAudio && (
        <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#0D2745] via-[#1478D2] to-[#0D2745] text-white shadow-lg py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-xl">
              {isPlaying ? <FaPauseCircle /> : <FaPlayCircle />}
            </div>
            <h3 className="text-sm md:text-base font-semibold">
              {currentAudio.title}
            </h3>
            <span className="text-sm text-gray-300">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </footer>
      )}
       {/* Hidden Audio Element for Live Broadcast */}
       <audio
        ref={liveAudioRef}
        src="https://cdn-th2.login.in.th/shoutcast/8615"
      ></audio>
        <audio ref={audioRef} />
    </div>
  );
}
