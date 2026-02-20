export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-6 text-center text-slate-500 text-sm bg-slate-950">
      © {new Date().getFullYear()} ResQNet — AI Disaster Coordination Platform
    </footer>
  );
}