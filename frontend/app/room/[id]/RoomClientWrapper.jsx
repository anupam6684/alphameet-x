"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Monitor,
  MessageSquare,
  Users,
  PhoneOff,
  Send,
  X,
} from "lucide-react";

export default function RoomClientWrapper({ roomId }) {
  const router = useRouter();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Sarah Miller",
      time: "10:42 AM",
      text: "Hey everyone! Can you see my screen?",
    },
    {
      id: 2,
      sender: "Anupam Jana",
      time: "10:43 AM",
      text: "Yes, crystal clear!",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        time: "Just now",
        text: newMessage.trim(),
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-white flex flex-col overflow-hidden relative selection:bg-blue-600">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between shrink-0 bg-slate-900/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h1 className="font-bold text-sm tracking-wide">
            Meeting Room:{" "}
            <span className="font-mono text-blue-400">{roomId}</span>
          </h1>
        </div>
        <div className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-slate-300">
          🔒 End-to-End Encrypted
        </div>
      </header>

      {/* Main Grid View */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
          {/* Local Feed */}
          <div className="relative rounded-2xl bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center min-h-[240px]">
            {isCameraOn ? (
              <div className="text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-blue-600/30 border border-blue-400/40 text-3xl flex items-center justify-center mx-auto">
                  👤
                </div>
                <p className="text-xs font-semibold text-slate-300">
                  You (Host)
                </p>
              </div>
            ) : (
              <div className="text-slate-500 text-xs flex flex-col items-center gap-2">
                <CameraOff className="w-8 h-8" />
                <span>Camera Off</span>
              </div>
            )}
            <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-md text-xs font-medium">
              You
            </div>
          </div>

          {/* Participant 2 */}
          <div className="relative rounded-2xl bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center min-h-[240px]">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 rounded-full bg-purple-600/30 border border-purple-400/40 text-3xl flex items-center justify-center mx-auto">
                👥
              </div>
              <p className="text-xs font-semibold text-slate-300">
                Sarah Miller
              </p>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-md text-xs font-medium">
              Sarah Miller
            </div>
          </div>
        </div>

        {/* Chat Panel Sidebar */}
        {isChatOpen && (
          <div className="w-full md:w-80 bg-slate-900 border-l border-white/10 flex flex-col absolute md:relative inset-y-0 right-0 z-30 transition-all shadow-2xl">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>In-Call Messages</span>
              </h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-bold text-blue-400">{m.sender}</span>
                    <span>{m.time}</span>
                  </div>
                  <p className="text-xs text-slate-200">{m.text}</p>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-white/10 flex gap-2"
            >
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Control Bar */}
      <div className="h-20 border-t border-white/10 bg-slate-900/90 px-6 flex items-center justify-center gap-4 shrink-0 z-20">
        <button
          onClick={() => setIsMicOn(!isMicOn)}
          className={`p-3.5 rounded-2xl border transition-all ${isMicOn ? "bg-white/10 border-white/10 hover:bg-white/20" : "bg-red-500/20 border-red-500/40 text-red-400"}`}
        >
          {isMicOn ? (
            <Mic className="w-5 h-5" />
          ) : (
            <MicOff className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={() => setIsCameraOn(!isCameraOn)}
          className={`p-3.5 rounded-2xl border transition-all ${isCameraOn ? "bg-white/10 border-white/10 hover:bg-white/20" : "bg-red-500/20 border-red-500/40 text-red-400"}`}
        >
          {isCameraOn ? (
            <Camera className="w-5 h-5" />
          ) : (
            <CameraOff className="w-5 h-5" />
          )}
        </button>

        <button className="p-3.5 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 hidden sm:block">
          <Monitor className="w-5 h-5 text-blue-400" />
        </button>

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-3.5 rounded-2xl border transition-all ${isChatOpen ? "bg-blue-600 border-blue-500" : "bg-white/10 border-white/10 hover:bg-white/20"}`}
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        <button
          onClick={() => router.push("/home")}
          className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 font-bold text-white shadow-lg shadow-red-600/30 flex items-center gap-2"
        >
          <PhoneOff className="w-5 h-5" />
          <span className="hidden sm:inline">End Call</span>
        </button>
      </div>
    </div>
  );
}
