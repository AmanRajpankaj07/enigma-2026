"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { incidentService, type Incident } from '@/services/incidentService';

const IncidentPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIncidentDetails = async (incidentId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await incidentService.getIncidentById(incidentId);
      if (response && response.success && response.data) {
        setIncident(response.data);
      } else {
        setError("Incident not found.");
      }
    } catch (error: any) {
      console.error("Error fetching incident details:", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchIncidentDetails(id);
    }
  }, [id]);

  // --- Helpers for dynamic badge colors ---
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-red-100 text-red-800 border-red-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'in progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // --- Render States ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-blue-500 rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">Loading incident details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-red-500">
        <div className="bg-red-50 p-6 rounded-lg border border-red-100 text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Incident</h2>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => router.back()}
            className="mt-6 px-6 py-2 bg-white text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors shadow-sm font-medium"
          >
            &larr; Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg">No incident found for ID: {id}</p>
      </div>
    );
  }

  // --- Main UI ---
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-flex items-center">
              &larr; Back to Incidents
            </button>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{incident.title}</h1>
            <p className="text-sm text-gray-500 mt-2 font-mono">ID: {incident._id}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(incident.status)}`}>
              Status: {incident.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(incident.severity)}`}>
              Severity: {incident.severity}
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {incident.description}
              </p>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Details</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{incident.location}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Reported On</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(incident.createdAt).toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(incident.updatedAt).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-xl p-4 border border-gray-200 h-full max-h-[500px] flex flex-col">
              <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Attached Image</h2>
              
              <div className="relative flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center min-h-[250px]">
                {incident.image ? (
                  // Using standard img tag to avoid Next.js domain configuration errors for external images
                  <img 
                    src={incident.image} 
                    alt="Incident evidence" 
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-6 text-gray-400 flex flex-col items-center">
                    <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span className="text-sm font-medium">No image available</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IncidentPage;