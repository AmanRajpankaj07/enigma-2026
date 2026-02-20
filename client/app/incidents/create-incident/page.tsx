"use client";

import React, { useState, useRef } from "react";
import { Camera, AlertTriangle, Shield, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateIncident() {
  // FIX: Added <string | null> type
  const [image, setImage] = useState<string | null>(null);

  // FIX: Added <HTMLVideoElement | null> type
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Camera Access Function
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // FIX: Null check before assignment
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
      setShowCamera(false);
    }
  };

  const captureImage = () => {
    // FIX: Check if videoRef.current is not null
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setImage(canvas.toDataURL("image/png"));
        setShowCamera(false);

        // FIX: Typesafe stream stopping
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        {/* LEFT & CENTER: THE FORM */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-slate-900 rounded-full transition-colors"
            >
              <ArrowLeft className="text-slate-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Report New Incident
              </h1>
              <p className="text-slate-500 text-sm uppercase tracking-widest mt-1">
                Incident Logging Protocol v4.0
              </p>
            </div>
          </div>

          <form className="space-y-6 bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-cyan-500">
                  Incident Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flash Flood - Sector 7"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-cyan-500">
                  Severity Level
                </label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-cyan-500">
                  <option value="low">Low - Minor Assistance</option>
                  <option value="moderate">Moderate - Response Required</option>
                  <option value="high">High - Immediate Critical Rescue</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-cyan-500">
                Situation Description
              </label>
              <textarea
                rows={4} // FIX: Changed "4" (string) to 4 (number)
                placeholder="Describe victims, location details, and immediate needs..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Reporter Contact (Optional)
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-3 text-slate-600"
                      size={18}
                    />
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 pl-10 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Camera Section */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Compulsory Live Evidence
                </label>
                {!image && !showCamera ? (
                  <button
                    type="button"
                    onClick={startCamera}
                    className="w-full aspect-video border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-cyan-500 hover:bg-slate-900/50 transition-all text-slate-500"
                  >
                    <Camera size={32} />
                    <span className="text-sm">Open Mission Camera</span>
                  </button>
                ) : showCamera ? (
                  <div className="relative rounded-xl overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      className="w-full aspect-video object-cover"
                    />
                    <button
                      type="button"
                      onClick={captureImage}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-600 p-4 rounded-full shadow-lg hover:bg-red-500"
                    >
                      <div className="w-4 h-4 bg-white rounded-full" />
                    </button>
                  </div>
                ) : (
                  <div className="relative group">
                    <img
                      src={image || ""} // FIX: Added fallback to empty string
                      className="w-full aspect-video object-cover rounded-xl border border-cyan-500/50"
                      alt="Evidence"
                    />
                    <button
                      type="button" // Always specify button type in forms
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 bg-slate-950/80 p-2 rounded-md text-xs hover:text-red-500"
                    >
                      Retake
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-xl transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            >
              Transmit Incident Data
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: Sidebar Widgets */}
        <div className="hidden lg:block space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 text-cyan-400 pb-4 border-b border-slate-800">
              <Shield size={20} />
              <h3 className="font-bold uppercase tracking-tighter">
                Reporting Protocol
              </h3>
            </div>

            <div className="space-y-4">
              {[
                { id: "01", text: "Identify type and severity." },
                { id: "02", text: "Upload visual confirmation." },
                { id: "03", text: "Note population density." },
              ].map((step) => (
                <div key={step.id} className="flex gap-4">
                  <div className="h-6 w-6 rounded bg-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {step.id}
                  </div>
                  <p className="text-sm text-slate-400 leading-tight">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3">
              <AlertTriangle className="text-red-500 shrink-0" size={20} />
              <p className="text-[11px] text-red-200 leading-relaxed italic">
                False reporting is punishable. All logs are recorded.
              </p>
            </div>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-6">
            <h4 className="text-xs font-black text-cyan-500 uppercase tracking-[0.2em] mb-4">
              System Status
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase">
                <span className="text-slate-500">Agency Sync</span>
                <span className="text-cyan-400">Online</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-cyan-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
