export default function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-slate-800 p-8 rounded-2xl hover:scale-105 transition duration-300 shadow-lg">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2 text-white">{title}</h4>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}