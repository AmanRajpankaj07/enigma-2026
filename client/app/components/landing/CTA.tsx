import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 text-center bg-slate-950">
      <h3 className="text-4xl font-bold mb-6 text-white">
        Ready to Transform Disaster Response?
      </h3>

      <Link
        href="/login"
        className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl font-bold text-lg"
      >
        Launch ResQNet
      </Link>
    </section>
  );
}