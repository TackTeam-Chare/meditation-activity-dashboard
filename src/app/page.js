"use client";
import React, { useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaBars,
  FaCloud,
  FaTimes,
} from "react-icons/fa";
import { BsDropletHalf } from "react-icons/bs";
import { GiLotus } from "react-icons/gi";
import { AiOutlineShareAlt } from "react-icons/ai";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import Image from "next/image";

export default function MeditationDashboard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isNightMode, setIsNightMode] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  const meditationTracks = [
    {
      id: 1,
      title: "สงบใจ",
      duration: "15:00",
      guide: "พระอาจารย์สมหมาย",
      points: 50,
      image:
        "https://www.dent.chula.ac.th/wp-content/uploads/2024/09/S__94994472.jpg",
      icon: <BsDropletHalf className="text-blue-400 text-4xl" />,
    },
    {
      id: 2,
      title: "ผ่อนคลายจิตใจ",
      duration: "20:00",
      guide: "พระอาจารย์บุญชัย",
      points: 30,
      image:
        "https://www.royaloffice.th/wp-content/uploads/2024/10/693457-1110x1089.jpg",
      icon: <GiLotus className="text-pink-500 text-4xl" />,
    },
    {
      id: 3,
      title: "สุขสบายใจ",
      duration: "10:00",
      guide: "พระอาจารย์ประเสริฐ",
      points: 70,
      image: "https://www.yingyuad.ac.th/wp-content/uploads/2-1.jpg",
      icon: <FaCloud className="text-gray-400 text-4xl" />,
    },
  ];

  const handleTrackClick = (track) => {
    setSelectedTrack(track);
  };

  const closeModal = () => {
    setSelectedTrack(null);
    setIsPlaying(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${
        isNightMode ? "bg-[#0D2745] text-white" : "bg-white text-gray-800"
      }`}
      style={{
        backgroundImage: isNightMode ? "none" : 'url("/path-to-calm-background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: isNightMode ? "brightness(0.6)" : "none",
      }}
    >
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 bg-[#0D2745] text-white shadow-md">
        <Image
          src="/logo/temulet-logo.png"
          alt="Temulet Logo"
          width={80}
          height={80}
          className="rounded-lg"
        />
        <h1 className="text-3xl font-bold">ฝึกสมาธิ</h1>
        <button aria-label="เมนูเพิ่มเติม" className="text-3xl">
          <FaBars />
        </button>
      </header>

      {/* Introduction */}
      <section className="text-center my-6">
        <h2 className="text-xl font-semibold mb-3">คำแนะนำในการฝึกสมาธิ</h2>
        <p className="text-base text-gray-600">
          ผ่อนคลาย หายใจเข้าลึกๆ และฟังเสียงบรรยายอย่างตั้งใจ
        </p>
      </section>

      {/* Meditation Tracks */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8 w-full px-6">
        {meditationTracks.map((track) => (
          <div
            key={track.id}
            onClick={() => handleTrackClick(track)}
            className="p-4 bg-white rounded-lg shadow-lg text-center flex flex-col items-center cursor-pointer transform transition-transform hover:scale-105"
          >
            <img
              src={track.image}
              alt={track.title}
              className="w-full h-52 object-cover rounded-lg mb-3"
            />
            {track.icon}
            <h3 className="text-lg font-semibold mt-2">{track.title}</h3>
            <p className="text-xs text-gray-500 mb-1">ระยะเวลา: {track.duration}</p>
            <p className="text-green-600 font-bold">+{track.points} MERIT</p>
          </div>
        ))}
      </section>

      {/* Modal for Detailed Track View */}
      {selectedTrack && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-lg relative shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-700 text-2xl"
              aria-label="Close"
            >
              <FaTimes />
            </button>
            <img
              src={selectedTrack.image}
              alt={selectedTrack.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{selectedTrack.title}</h2>
            <p className="text-sm text-gray-700 mb-2">โดย {selectedTrack.guide}</p>
            <p className="text-sm text-gray-500 mb-4">ระยะเวลา: {selectedTrack.duration}</p>
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={togglePlay}
                className="bg-[#1478D2] text-white p-3 rounded-full text-xl"
                aria-label="Play/Pause"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full"
              />
              <FaVolumeUp className="text-gray-700" />
              <span className="text-sm">{Math.round(volume * 100)}%</span>
            </div>
            <button
              onClick={() => alert("แชร์ประสบการณ์การฝึกสมาธิ")}
              className="flex items-center gap-2 px-4 py-2 bg-[#1478D2] text-white rounded-md"
            >
              <AiOutlineShareAlt /> แชร์ประสบการณ์
            </button>
          </div>
        </div>
      )}

      {/* Quick Access Buttons */}
      <section className="mt-8 flex gap-4">
        <button className="px-4 py-2 bg-[#1478D2] text-white rounded-lg shadow-md">
          เริ่มฝึกสมาธิ
        </button>
        <button className="px-4 py-2 bg-[#1478D2] text-white rounded-lg shadow-md">
          ฟังถ่ายทอดสด
        </button>
      </section>

      {/* Share and Night Mode */}
      <section className="flex mt-6 gap-4">
        <button onClick={toggleNightMode} className="text-3xl" aria-label="โหมดกลางคืน">
          {isNightMode ? <BsFillSunFill className="text-yellow-500" /> : <BsFillMoonFill className="text-gray-500" />}
        </button>
        <button aria-label="แชร์ประสบการณ์" className="text-3xl ">
          <AiOutlineShareAlt />
        </button>
      </section>
    </div>
  );
}
