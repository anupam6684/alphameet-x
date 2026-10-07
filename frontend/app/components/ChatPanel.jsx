"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Users, X, Send, Mic, Video } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function ChatPanel({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  participants = [
    { name: "You (Host)", isMuted: false, isVideoOff: false },
    { name: "Sarah Miller", isMuted: false, isVideoOff: false },
    { name: "Alex Johnson", isMuted: true, isVideoOff: false },
  ],
}) {
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' | 'participants'
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);
  //current user user
  const { user } = useApp();

  // Auto-scroll to the latest message
  useEffect(() => {
    if (activeTab === "chat") {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage.trim());
    setNewMessage("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 320, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full sm:w-80 bg-slate-900 border border-white/10 rounded-3xl flex flex-col shrink-0 shadow-2xl relative z-30 overflow-hidden h-full"
        >
          {/* =========================================================================
              1. PANEL HEADER WITH TABS
             ========================================================================= */}
          <div className="p-3 border-b border-white/10 flex items-center justify-between bg-slate-950/40">
            {/* Tab Switching Pill */}
            <div className="flex gap-1 p-1 bg-white/5 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "chat"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("participants")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "participants"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>People ({participants.length})</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* =========================================================================
              2. TAB CONTENT
             ========================================================================= */}
          {activeTab === "chat" ? (
            /* --- TAB A: CHAT MESSAGES VIEW --- */
            <>
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
                {messages.map((m) => {
                  const isMe = String(m.senderId) === String(user?._id);

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${
                        isMe ? "items-end" : "items-start"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1 px-1 text-[10px] text-slate-400">
                        <span className="font-bold text-slate-300">
                          {m.sender}
                        </span>
                        <span>{m.time}</span>
                      </div>
                      <div
                        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                          isMe
                            ? "bg-blue-600 text-white rounded-tr-xs"
                            : "bg-slate-800 text-slate-200 border border-white/10 rounded-tl-xs"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input Form */}
              <form
                onSubmit={handleSubmit}
                className="p-3 border-t border-white/10 flex gap-2 bg-slate-950/40"
              >
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            /* --- TAB B: PARTICIPANTS LIST VIEW --- */
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {participants.map((person, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs"
                >
                  <span className="font-semibold text-slate-200">
                    {person.name}
                  </span>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mic
                      className={`w-3.5 h-3.5 ${
                        person.isMuted ? "text-red-400" : "text-emerald-400"
                      }`}
                    />
                    <Video
                      className={`w-3.5 h-3.5 ${
                        person.isVideoOff ? "text-red-400" : "text-emerald-400"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
