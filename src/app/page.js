"use client";

import React, { useState } from "react";
import {
  FaEllipsisV,
  FaPlayCircle,
  FaPauseCircle,
  FaClock,
  FaShareAlt,
  FaBroadcastTower,
  FaHeartbeat,
} from "react-icons/fa";
import { GiLotus } from "react-icons/gi";
import { MdSelfImprovement } from "react-icons/md";
import { BsFillSunFill, BsMoonStarsFill, BsPlay } from "react-icons/bs";

export default function MeditationDashboard() {
  const [isNightMode, setNightMode] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [isMonitoring, setMonitoring] = useState(false);
  const [isLivePlaying, setLivePlaying] = useState(false);

  const toggleNightMode = () => setNightMode(!isNightMode);

  const audioTracks = [
    {
      id: 1,
      title: "การฝึกสมาธิ: ผ่อนคลายลมหายใจ",
      speaker: "พระอาจารย์สมชาย",
      duration: "15 นาที",
      url: "https://example.com/audio1.mp3",
    },
    {
      id: 2,
      title: "ฟังธรรมจากพระอาจารย์: การปล่อยวาง",
      speaker: "พระอาจารย์ธงชัย",
      duration: "20 นาที",
      url: "https://example.com/audio2.mp3",
    },
    {
      id: 3,
      title: "การฝึกสมาธิ: แสงแห่งสติ",
      speaker: "พระอาจารย์ชัยวัฒน์",
      duration: "30 นาที",
      url: "https://example.com/audio3.mp3",
    },
  ];

  const togglePlayPause = (track) => {
    if (currentAudio && currentAudio.id === track.id && isPlaying) {
      setPlaying(false);
    } else {
      setCurrentAudio(track);
      setPlaying(true);
    }
  };

  const toggleLiveBroadcast = () => {
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

  const startMonitoring = () => {
    setMonitoring(true);
    const interval = setInterval(() => {
      setHeartRate(Math.floor(60 + Math.random() * 20)); // Simulated heart rate
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setMonitoring(false);
    }, 10 * 60 * 1000); // Stop after 10 minutes
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
          ฝึกสมาธิ
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
          <button className="p-2 rounded-full shadow-md transition-transform hover:scale-110">
            <FaEllipsisV className="text-xl text-white" />
          </button>
        </div>
      </header>

      {/* Quick Access Buttons */}
      <div className="flex flex-wrap justify-around mt-4 px-4 gap-4">
        <button
          className="flex items-center gap-2 text-[#1478D2] bg-white py-2 px-4 md:px-6 rounded-full shadow-md hover:bg-blue-100 transition w-full md:w-auto"
          onClick={startMonitoring}
        >
          <FaHeartbeat className="text-lg" />
          <span>{isMonitoring ? "จับชีพจร..." : "เริ่มจับชีพจร"}</span>
        </button>
        <button
          className="flex items-center gap-2 text-[#1478D2] bg-white py-2 px-4 md:px-6 rounded-full shadow-md hover:bg-blue-100 transition w-full md:w-auto"
          onClick={() => setPlaying(false)}
        >
          <BsPlay className="text-lg" />
          <span>เริ่มฝึกสมาธิ</span>
        </button>
        <button
          className="flex items-center gap-2 text-[#1478D2] bg-white py-2 px-4 md:px-6 rounded-full shadow-md hover:bg-blue-100 transition w-full md:w-auto"
          onClick={toggleLiveBroadcast}
        >
          <FaBroadcastTower className="text-lg" />
          <span>{isLivePlaying ? "หยุดถ่ายทอดสด" : "ฟังถ่ายทอดสด"}</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow px-4 py-8">
        <section className="bg-gradient-to-br from-[#1478D2] via-[#0D2745] to-[#0D2745] rounded-xl shadow-md p-6 mb-8 text-white">
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <MdSelfImprovement className="text-2xl md:text-3xl" /> คำแนะนำการฝึกสมาธิ
          </h2>
          <p className="mt-4 text-sm md:text-base">
            ผ่อนคลายหายใจเข้าลึกๆ และฟังเสียงบรรยายเพื่อเข้าสู่สมาธิ
          </p>
        </section>

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
                    onClick={() => handleShare(track)}
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
            <h3 className="text-sm md:text-base font-semibold">
              {currentAudio.title}
            </h3>
          </div>
        </footer>
      )}
    </div>
  );
}
