"use client";

import React, { useState } from "react";
import {
  FaEllipsisV,
  FaPlayCircle,
  FaPauseCircle,
  FaClock,
  FaShareAlt,
  FaBroadcastTower,
} from "react-icons/fa";
import { GiLotus } from "react-icons/gi";
import { MdSelfImprovement } from "react-icons/md";
import { BsFillSunFill, BsMoonStarsFill, BsPlay } from "react-icons/bs";

export default function MeditationDashboard() {
  const [isNightMode, setNightMode] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);

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
          : "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white"
      }`}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-md">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-extrabold tracking-wide">เเดชบอร์ดฝึกสมาธิ</h1>
        </div>
        <div className="flex gap-4">
          <button
            className="p-2 rounded-full shadow-lg transition-transform transform hover:scale-110"
            onClick={toggleNightMode}
          >
            {isNightMode ? (
              <BsFillSunFill className="text-yellow-400 text-2xl" />
            ) : (
              <BsMoonStarsFill className="text-indigo-400 text-2xl" />
            )}
          </button>
          <button className="p-2 rounded-full shadow-lg transition-transform transform hover:scale-110">
            <FaEllipsisV className="text-xl" />
          </button>
        </div>
      </header>

      {/* Quick Access Buttons */}
      <div className="flex justify-around mt-4 px-4">
        <button className="flex items-center gap-2 text-blue-600 bg-white py-2 px-6 rounded-full shadow-md hover:bg-blue-100 transition">
          <BsPlay className="text-lg" />
          <span>เริ่มฝึกสมาธิ</span>
        </button>
        <button className="flex items-center gap-2 text-blue-600 bg-white py-2 px-6 rounded-full shadow-md hover:bg-blue-100 transition">
          <FaBroadcastTower className="text-lg" />
          <span>ฟังถ่ายทอดสด</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow px-6 py-8">
        {/* Meditation Guidance */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MdSelfImprovement className="text-3xl" /> คำแนะนำการฝึกสมาธิ
          </h2>
          <p className="mt-4 text-white/90">
            ผ่อนคลายหายใจเข้าลึกๆ และฟังเสียงบรรยายเพื่อเข้าสู่สมาธิ
          </p>
        </section>

        {/* Audio Tracks */}
        <section>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <GiLotus className="text-3xl" /> รายการเสียงบรรยาย
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {audioTracks.map((track) => (
              <div
                key={track.id}
                className="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 rounded-lg shadow-lg p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{track.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-200">
                    <FaClock />
                    <span>{track.duration}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-200 italic mt-2">
                  โดย {track.speaker}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="bg-white text-blue-600 py-2 px-4 rounded-full shadow-md hover:bg-blue-100 transition"
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
                    className="bg-white text-blue-600 py-2 px-4 rounded-full shadow-md hover:bg-blue-100 transition"
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
        <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 shadow-lg py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">{currentAudio.title}</h3>
          </div>
        </footer>
      )}
    </div>
  );
}
