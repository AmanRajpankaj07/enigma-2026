// app/incidents/page.tsx (or wherever your page is)
"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { incidentService, Incident } from '@/services/incidentService';

const IncidentsPage = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Start true to show loaders immediately
    const [error, setError] = useState<string | null>(null);

    const fetchAllIncidents = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await incidentService.getIncidents();
            
            // Because our service already returns response.data, 'response' IS our payload
            if (response?.success && Array.isArray(response.data)) {
                setIncidents(response.data);
            } else {
                throw new Error("Unexpected data format received");
            }
        } catch (error) {
            console.error("Error fetching incidents:", error);
            setError("Failed to load incidents. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch data automatically when the page loads
    useEffect(() => {
        fetchAllIncidents();
    }, [fetchAllIncidents]);

    // Helpers
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric', 
            hour: '2-digit', minute: '2-digit'
        });
    };

    const getSeverityColor = (severity: string) => {
        switch(severity?.toUpperCase()) {
            case 'HIGH': return 'bg-red-100 text-red-800 border-red-200';
            case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'LOW': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 pb-5 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Incidents Dashboard</h1>
            <p className="text-gray-500 mt-1">Monitor and track reported issues.</p>
        </div>
        <button 
            onClick={fetchAllIncidents}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm active:scale-95 flex items-center gap-2"
        >
            {isLoading && (
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            )}
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200 shadow-sm flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span><span className="font-semibold">Error: </span>{error}</span>
        </div>
      )}

      {/* Skeleton Loading State */}
      {isLoading && incidents.length === 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-48 flex flex-col animate-pulse">
                    <div className="flex justify-between mb-4">
                        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-auto"></div>
                    <div className="pt-4 border-t border-gray-100 mt-4 flex gap-4">
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                </div>
            ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && incidents.length === 0 && !error && (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            </div>
            <p className="text-xl font-medium text-gray-600">No incidents found</p>
        </div>
      )}

      {/* Grid of Incident Cards */}
      {!isLoading && incidents.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {incidents.map((incident) => (
                <div key={incident._id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group">
                    <div className="flex justify-between items-start mb-3 gap-2">
                        <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">
                            {incident.title}
                        </h3>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                            incident.status === 'ACTIVE' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                            {incident.status}
                        </span>
                    </div>

                    <div className="mb-3">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${getSeverityColor(incident.severity)}`}>
                            {incident.severity} SEVERITY
                        </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                        {incident.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-2">
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span className="font-medium text-gray-700">{incident.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{formatDate(incident.createdAt)}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}

    </div>
  )
}

export default IncidentsPage