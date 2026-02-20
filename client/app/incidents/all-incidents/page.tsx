"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { incidentService, Incident } from '@/services/incidentService';

const IncidentsPage = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllIncidents = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await incidentService.getIncidents();
            if (response?.success && Array.isArray(response.data)) {
                setIncidents(response.data);
            } else {
                throw new Error("Unexpected data format");
            }
        } catch (error) {
            setError("Connection to Command Center failed.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchAllIncidents(); }, [fetchAllIncidents]);

    const getSeverityStyles = (severity: string) => {
        switch(severity?.toUpperCase()) {
            case 'HIGH': return 'border-red-500/50 bg-red-500/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]';
            case 'MEDIUM': return 'border-amber-500/50 bg-amber-500/10 text-amber-400';
            default: return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400';
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-200 p-4 md:p-8 font-sans">
            
            {/* TACTICAL HEADER */}
            <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-8">
                <div className="space-y-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">
                            Incident <span className="text-blue-500">Command</span>
                        </h1>
                    </div>
                    <p className="text-slate-500 font-mono text-sm tracking-widest">REAL-TIME DATA ACQUISITION // SECTOR-01</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right mr-4 border-r border-slate-800 pr-6">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Active Threats</p>
                        <p className="text-2xl font-mono font-bold text-white">{incidents.length}</p>
                    </div>
                    <button 
                        onClick={fetchAllIncidents}
                        className="group relative px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-sm transition-all overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2 uppercase tracking-tighter">
                            {isLoading ? 'Syncing...' : 'Refresh System'}
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
                    </button>
                </div>
            </header>

            {/* INCIDENT GRID */}
            <main className="max-w-7xl mx-auto">
                {isLoading && incidents.length === 0 ? (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50">
                       {[1,2,3].map(i => <div key={i} className="h-64 bg-slate-900 animate-pulse rounded-lg border border-slate-800" />)}
                   </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {incidents.map((incident) => (
                            <div 
                                key={incident._id} 
                                className={`relative group bg-[#111114] border-l-4 p-6 transition-all hover:-translate-y-1 ${getSeverityStyles(incident.severity)}`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">ID: {incident._id.slice(-6)}</span>
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 uppercase tracking-widest">
                                        {incident.status}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
                                    {incident.title}
                                </h3>
                                
                                <p className="text-slate-400 text-sm line-clamp-3 mb-6 font-medium leading-relaxed">
                                    {incident.description}
                                </p>

                                <div className="mt-auto space-y-3">
                                    <div className="flex items-center gap-3 text-xs text-slate-300 bg-black/30 p-2 rounded">
                                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                        <span className="font-bold uppercase tracking-tight">{incident.location}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase pt-2">
                                        <span>Reported: {new Date(incident.createdAt).toLocaleDateString()}</span>
                                        <span className="text-blue-500 font-bold tracking-tighter cursor-pointer hover:underline">Full Dossier →</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default IncidentsPage;