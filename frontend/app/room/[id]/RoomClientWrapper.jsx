"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MessageSquare,
  Users,
  MoreHorizontal,
  Clock,
  LayoutGrid,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

import ChatPanel from "@/app/components/ChatPanel"; // Adjust path if needed

// // socket
import socket from "@/services/socket.service";
import { getallMessage } from "@/services/chat.services";
import { toast } from "react-toastify";
import { getmeetingParticipant } from "@/services/meeting.services";

export default function RoomClientWrapper({ roomId }) {
  const { user } = useApp();
  const router = useRouter();

  // Media & Panel States
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [initialPanelTab, setInitialPanelTab] = useState("chat"); // 'chat' | 'participants'

  // Timer State
  const [seconds, setSeconds] = useState(765); // 00:12:45

  useEffect(() => {
    const timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs > 0 ? `${hrs.toString().padStart(2, "0")}:` : ""}${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // // Sample Participants List
  // const participants = [
  //   { name: "You (Host)", isMuted: !isMicOn, isVideoOff: !isCameraOn },
  //   { name: "Sarah Miller", isMuted: false, isVideoOff: false },
  //   { name: "Alex Johnson", isMuted: true, isVideoOff: false },
  // ];

  // Messages State
  const [messages, setMessages] = useState([]);

  // participant State
  const [participants, setParticipants] = useState([]);

  const handleSendMessage = (text) => {
    if (!user) {
      toast.error("Please login to send a message");
      return;
    }

    socket.emit("chat-message", {
      roomId,
      message: text,
      senderId: user._id,
      senderName: user.fullName,
    });
  };
  const handleOpenPanel = (tab) => {
    if (isPanelOpen && initialPanelTab === tab) {
      setIsPanelOpen(false);
    } else {
      setInitialPanelTab(tab);
      setIsPanelOpen(true);
    }
  };

  useEffect(() => {
    if (!roomId || !user) return;

    console.log("Joining room:", roomId);

    socket.emit("join-room", {
      roomId,
      userId: user._id,
      userName: user.fullName,
    });

    return () => {
      socket.emit("leave-room", {
        roomId,
      });
    };
  }, [roomId, user]);

  useEffect(() => {
    const handleUserJoined = ({ participant }) => {
      console.log("🟢 User joined:", participant);

      setParticipants((prev) => {
        // Check using userId
        console.log("BEFORE ADD:", prev);
        console.log("NEW PARTICIPANT:", participant);

        const exists = prev.some(
          (p) => String(p.userId) === String(participant.userId),
        );

        if (exists) {
          console.log("⚠️ Participant already exists:", participant.userName);
          return prev;
        }

        return [
          ...prev,
          {
            ...participant,
            name: participant.userName,
            isMuted: false,
            isVideoOff: false,
          },
        ];
      });
    };

    socket.on("user-joined", handleUserJoined);

    return () => {
      socket.off("user-joined", handleUserJoined);
    };
  }, []);
  useEffect(() => {
    const handleUserLeft = ({ participant }) => {
      setParticipants((prev) =>
        prev.filter((p) => p.socketId !== participant.socketId),
      );
      toast.error(`🔴 ${participant.name} left`);
    };

    socket.on("user-left", handleUserLeft);

    return () => {
      socket.off("user-left", handleUserLeft);
    };
  }, []);

  useEffect(() => {
    const handleReceiveMessage = ({
      id,
      senderId,
      senderName,
      message,
      createdAt,
    }) => {
      setMessages((prev) => [
        ...prev,
        {
          id,
          sender: senderName,
          senderId,
          time: new Date(createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          text: message,
        },
      ]);
    };

    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;
    // fatch Message
    const fetchMessages = async () => {
      try {
        const data = await getallMessage(roomId);

        if (data.success) {
          const formattedMessages = data.messages.map((message) => ({
            id: message._id,
            sender: message.senderName,
            senderId: message.senderId,
            time: new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            text: message.message,
          }));

          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("❌ Failed to fetch messages:", error);
      }
    };

    // fatch user// participant
    const fetchParticipants = async () => {
      try {
        const data = await getmeetingParticipant(roomId);

        if (data.success) {
          setParticipants(
            data.participants.map((participant) => ({
              ...participant,
              isMuted: false,
              isVideoOff: false,
              isMicOn: true,
              name: participant.userName,
            })),
          );
        }
      } catch (error) {
        console.error("❌ Failed to fetch participants/Users:", error);
      }
    };

    // call facthMessage
    fetchMessages();

    // call fatch Users
    fetchParticipants();
  }, [roomId]);

  return (
    <div className="h-screen w-screen bg-[#0b0f17] text-white flex flex-col overflow-hidden relative selection:bg-blue-600 font-sans">
      {/* =========================================================================
          1. TOP HEADER BAR
         ========================================================================= */}
      <header className="h-16 px-6 flex items-center justify-between shrink-0 bg-[#0b0f17]/90 z-20">
        {/* Left: Room ID */}
        <div className="flex items-center gap-3">
          <h1 className="font-semibold text-sm tracking-wide text-slate-200">
            Room ID:{" "}
            <span className="font-mono text-white font-bold">
              {roomId || "ABCD1234"}
            </span>
          </h1>
        </div>

        {/* Right Header Status Indicators & End Call */}
        <div className="flex items-center gap-3">
          {/* Active Participants Badge Button */}
          <button
            onClick={() => handleOpenPanel("participants")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-medium transition-colors cursor-pointer"
          >
            <Users className="w-4 h-4 text-slate-300" />
            <span>{participants.length}</span>
          </button>

          {/* Quick Chat Toggle */}
          <button
            onClick={() => handleOpenPanel("chat")}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Layout Toggle */}
          <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors cursor-pointer">
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Elapsed Time Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatTime(seconds)}</span>
          </div>

          {/* End Call Button */}
          <button
            onClick={() => router.push("/home")}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-white text-xs shadow-lg shadow-red-600/30 transition-all cursor-pointer"
          >
            End Call
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. MAIN STAGE CANVAS + STANDALONE CHAT PANEL
         ========================================================================= */}
      <div className="flex-1 flex overflow-hidden relative p-4 gap-4">
        {/* Main Video Stage Container */}
        <div className="flex-1 relative rounded-3xl bg-slate-900/60 border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
          {/* Remote Speaker Video */}
          <Image
            src="/images/person3.png"
            alt="Sarah Miller"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Main Speaker Label */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-white">
            Sarah Miller
          </div>

          {/* Floating Picture-in-Picture Self Preview */}
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            className="absolute bottom-5 right-5 w-44 sm:w-56 h-28 sm:h-36 rounded-2xl border-2 border-white/20 bg-slate-950 overflow-hidden shadow-2xl z-10 cursor-grab active:cursor-grabbing"
          >
            {isCameraOn ? (
              <Image
                src="/person1.png"
                alt="Your Preview"
                fill
                className="object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-slate-400 bg-slate-900">
                <VideoOff className="w-6 h-6 text-red-400" />
                <span className="text-[10px] font-medium">Camera Off</span>
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-semibold text-white">
              You
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            3. STANDALONE REUSABLE CHAT PANEL COMPONENT
           ========================================================================= */}
        <ChatPanel
          isOpen={isPanelOpen}
          onClose={() => setIsPanelOpen(false)}
          messages={messages}
          onSendMessage={handleSendMessage}
          participants={participants}
          defaultTab={initialPanelTab}
        />
      </div>

      {/* =========================================================================
          4. BOTTOM CONTROL BAR
         ========================================================================= */}
      <footer className="h-20 bg-[#0b0f17] px-6 flex items-center justify-center shrink-0 z-20 border-t border-white/5">
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Mic Toggle */}
          <button
            onClick={() => setIsMicOn((prev) => !prev)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all ${
                isMicOn
                  ? "bg-white/5 border-white/10 group-hover:bg-white/15 text-white"
                  : "bg-red-500/20 border-red-500/40 text-red-400"
              }`}
            >
              {isMicOn ? (
                <Mic className="w-5 h-5" />
              ) : (
                <MicOff className="w-5 h-5" />
              )}
            </div>
            <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200">
              {isMicOn ? "Mute" : "Unmute"}
            </span>
          </button>

          {/* Camera Toggle */}
          <button
            onClick={() => setIsCameraOn((prev) => !prev)}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all ${
                isCameraOn
                  ? "bg-white/5 border-white/10 group-hover:bg-white/15 text-white"
                  : "bg-red-500/20 border-red-500/40 text-red-400"
              }`}
            >
              {isCameraOn ? (
                <Video className="w-5 h-5" />
              ) : (
                <VideoOff className="w-5 h-5" />
              )}
            </div>
            <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200">
              {isCameraOn ? "Stop Video" : "Start Video"}
            </span>
          </button>

          {/* Share Screen */}
          <button className="flex flex-col items-center gap-1 group cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/15 flex items-center justify-center text-white transition-all">
              <Monitor className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200">
              Share Screen
            </span>
          </button>

          {/* Chat Button */}
          <button
            onClick={() => handleOpenPanel("chat")}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all ${
                isPanelOpen && initialPanelTab === "chat"
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-white/5 border-white/10 group-hover:bg-white/15 text-white"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200">
              Chat
            </span>
          </button>

          {/* Participants Button */}
          <button
            onClick={() => handleOpenPanel("participants")}
            className="flex flex-col items-center gap-1 group cursor-pointer"
          >
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all ${
                isPanelOpen && initialPanelTab === "participants"
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-white/5 border-white/10 group-hover:bg-white/15 text-white"
              }`}
            >
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200">
              Participants
            </span>
          </button>

          {/* More Options */}
          <button className="flex flex-col items-center gap-1 group cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/15 flex items-center justify-center text-white transition-all">
              <MoreHorizontal className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200">
              More
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
}
