"use client"; 
import React, { useState } from 'react';
import { FaTasks, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaShareAlt, FaForward, FaBackward } from 'react-icons/fa';
import { BsFillSunFill, BsFillMoonFill, BsDropletHalf,BsSoundwave } from 'react-icons/bs';

export default function MeditationDashboard() {
  const [activityHistory, setActivityHistory] = useState([
    { id: 1, description: "สะสมบุญใกล้บ้าน", points: 50, image: "https://static.thairath.co.th/media/dFQROr7oWzulq5FZYjXiaKmVO3vcxON9xLf2HYojmsfQAfq5rjDmmiJhYZiOmWuToDF.jpg" },
    { id: 2, description: "ฟังธรรมประจำวัน", points: 30, image: "https://images.unsplash.com/photo-1530847887473-36dbaf586122?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ" },
    { id: 3, description: "งานวัดที่ใกล้มาถึง", points: 70, image: "https://cdn.chiangmainews.co.th/wp-content/uploads/2019/01/06133012/2109052.jpg" },
  ]);
  const [isNightMode, setIsNightMode] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Manage mute

  const toggleNightMode = () => setIsNightMode(!isNightMode);
  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const handleTrackClick = (track) => setSelectedTrack(track);
  const closeModal = () => {
    setSelectedTrack(null);
    setIsPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 0.5 : 0); // Mute or restore volume
  };

  return (
    <div
      className={`min-h-screen font-['Anuphan'] flex flex-col items-center ${isNightMode ? 'bg-[#0D2745] text-white' : 'bg-white text-gray-800'}`}
      style={{
        backgroundImage: isNightMode ? 'none' : 'url("https://example.com/calm-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: isNightMode ? 'brightness(0.7)' : 'none',
      }}
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <header className="w-full p-3 bg-[#1478D2] text-white flex justify-between items-center">
        <img src="/logo/temulet-logo.png" alt="Temulet Logo" width={60} height={60} className="rounded-full" />
        <h1 className="text-xl">ฝึกสมาธิ</h1>
        <button aria-label="เมนูเพิ่มเติม" className="text-xl">⋮</button>
      </header>

      <section className="text-center my-3">
        <h2 className="text-md font-semibold mb-2">คำแนะนำในการฝึกสมาธิ</h2>
        <p className="text-xs text-gray-600">ผ่อนคลาย หายใจเข้าลึกๆ และฟังเสียงบรรยายอย่างตั้งใจ</p>
      </section>

      <section id="activities" className="w-full mt-3 mb-3">
        <h2 className="text-md font-bold text-gray-700 mb-2 flex items-center gap-2">
        <BsSoundwave className="text-blue-500" />รายการเสียงบรรยาย
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {activityHistory.map((activity) => (
            <div
              key={activity.id}
              onClick={() => handleTrackClick(activity)}
              className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            >
              <img src={activity.image} alt={activity.description} className="w-full h-28 object-cover rounded-t-lg" />
              <div className="p-3 flex flex-col items-center">
                <BsDropletHalf className="text-blue-400 text-2xl mb-1" />
                <p className="text-center text-sm font-medium">{activity.description}</p>
                <button className="mt-1 bg-[#1478D2] text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                  <FaPlay /> เล่นเสียง
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedTrack && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-4 rounded-lg relative">
            <button onClick={closeModal} className="absolute top-0 right-1 text-gray-700 text-xl" aria-label="Close">✕</button>
            <img src={selectedTrack.image} alt={selectedTrack.description} className="w-full h-36 object-cover rounded-lg mb-2" />
            <h2 className="text-lg font-semibold mb-1">{selectedTrack.description}</h2>
            <p className="text-xs text-gray-500 mb-2">ระยะเวลา: {selectedTrack.points} นาที</p>

            {/* Audio Player Controls */}
            <div className="flex items-center justify-between mb-2">
              <button onClick={() => alert("Rewind")} className="text-xl text-gray-500" aria-label="Rewind">
                <FaBackward />
              </button>
              <button onClick={togglePlay} className="bg-[#1478D2] text-white p-2 rounded-full text-lg" aria-label="Play/Pause">
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={() => alert("Forward")} className="text-xl text-gray-500" aria-label="Forward">
                <FaForward />
              </button>
            </div>

            {/* Seek Bar */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-700">0:00</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="flex-grow"
              />
              <span className="text-xs text-gray-700">10:00</span>
            </div>

            {/* Volume Control */}
            <div className="flex items-center mb-2">
              <button onClick={toggleMute} className="text-xl text-gray-700" aria-label="Volume">
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(e.target.value);
                  if (e.target.value > 0) {
                    setIsMuted(false);
                  }
                }}
                className="ml-2 w-20"
              />
            </div>

            {/* Share Button */}
            <button
              onClick={() => alert("แชร์ประสบการณ์การฝึกสมาธิ")}
              className="flex items-center gap-2 px-4 py-1 bg-[#FF965A] text-white rounded-md mt-2"
            >
              <FaShareAlt /> แชร์ประสบการณ์
            </button>
          </div>
        </div>
      )}

      {/* Quick Access Buttons with Night Mode Toggle */}
      <section className="mt-3 flex gap-2 justify-center">
        <button className="px-3 py-1 bg-[#1478D2] text-white rounded-lg shadow-md text-sm">เริ่มฝึกสมาธิ</button>
        <button className="px-3 py-1 bg-[#FF965A] text-white rounded-lg shadow-md text-sm">ฟังถ่ายทอดสด</button>
        <button onClick={toggleNightMode} className="px-3 py-1 bg-gray-700 text-white rounded-lg shadow-md flex items-center gap-1 text-sm">
          {isNightMode ? <BsFillSunFill /> : <BsFillMoonFill />} โหมดกลางคืน
        </button>
      </section>
    </div>
  );
}
