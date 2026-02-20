export default function StepCard({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-cyan-400 mb-4">{number}</div>
      <h4 className="text-xl font-semibold mb-2 text-white">{title}</h4>
      <p className="text-slate-400">{desc}</p>
    </div>
  );
}