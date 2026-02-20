"use client";

import React, { useState, useRef } from "react";
import { Camera, AlertTriangle, Shield, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateIncident() {
  // --- FORM STATES ---
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("HIGH"); // Matches your DB enum default
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- CAMERA STATES ---
  const [image, setImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  // Camera Access Function
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
      setShowCamera(false);
      alert("Please allow camera access to report an incident.");
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setImage(canvas.toDataURL("image/png"));
        setShowCamera(false);

        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        }
      }
    }
  };

  // Helper: Converts the camera's Base64 string into a File for Multer
  const dataURLtoFile = (dataurl: string, filename: string) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please capture live evidence (image) before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Pack the data exactly how Postman does it (FormData)
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("severity", severity);
      
      // Convert our image state into a file and append it for Multer
      const imageFile = dataURLtoFile(image, "incident-evidence.png");
      formData.append("image", imageFile);

      // 2. Send to your working backend (Update this URL if your backend runs on a different port)
      const response = await fetch("http://localhost:5001/api/incidents/create", {
        method: "POST",
        body: formData, // Notice we don't set Content-Type, the browser does it automatically for FormData
      });

      const data = await response.json();

      // 3. Handle Errors (Including our new AI logic)
      if (!response.ok) {
        if (data.errorType === "IMAGE_MISMATCH") {
          alert("AI SYSTEM WARNING: " + data.message);
          setImage(null); // Clear the bad image
          startCamera();  // Immediately re-open the camera
          setIsSubmitting(false);
          return;
        }
        throw new Error(data.message || "Something went wrong saving the incident.");
      }

      // 4. Success!
      alert("Incident reported successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setImage(null);
      setPhone("");

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
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

          <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-cyan-500">
                  Incident Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Flash Flood - Sector 7"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-cyan-500">
                  Severity Level
                </label>
                <select 
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-cyan-500"
                >
                  {/* Matches your Mongoose Enums perfectly */}
                  <option value="LOW">Low - Minor Assistance</option>
                  <option value="MEDIUM">Medium - Response Required</option>
                  <option value="HIGH">High - Immediate Rescue</option>
                  <option value="CRITICAL">Critical - Life Threatening</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-cyan-500">
                Exact Location
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Main Street Bridge, Downtown"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-cyan-500">
                Situation Description
              </label>
              <textarea
                rows={4} 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      src={image || ""} 
                      className="w-full aspect-video object-cover rounded-xl border border-cyan-500/50"
                      alt="Evidence"
                    />
                    <button
                      type="button" 
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
              disabled={isSubmitting}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold py-4 rounded-xl transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            >
              {isSubmitting ? "Transmitting..." : "Transmit Incident Data"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: Sidebar Widgets */}
        <div className="hidden lg:block space-y-6">
          {/* ... (Your existing sidebar code remains untouched here) ... */}
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