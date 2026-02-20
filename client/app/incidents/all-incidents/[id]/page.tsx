"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { incidentService, type Incident } from '@/services/incidentService';

// --- Interfaces ---
export interface Resource {
  _id: string;
  name: string;
  type: "FIRE_TRUCK" | "AMBULANCE" | "POLICE" | "BOAT" | "NDRF";
  status: "AVAILABLE" | "ASSIGNED" | "IN_TRANSIT" | "ARRIVED";
  location: string;
  currentIncident: string | null;
  createdAt: Date;
  updatedAt: Date;
}

type ResourceType = Resource['type'];

const RESOURCE_TYPES: ResourceType[] = ["FIRE_TRUCK", "AMBULANCE", "POLICE", "BOAT", "NDRF"];

// Configuration for card visuals
const RESOURCE_CONFIG: Record<ResourceType, { bg: string; border: string; text: string; icon: string }> = {
  FIRE_TRUCK: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: '🚒' },
  AMBULANCE: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: '🚑' },
  POLICE: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: '🚓' },
  BOAT: { bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', icon: '🚤' },
  NDRF: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', icon: '🚁' }
};

const IncidentPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  // --- State ---
  const [incident, setIncident] = useState<Incident | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Resource State
  const [resources, setResources] = useState<Resource[]>([]);
  const [orderQuantities, setOrderQuantities] = useState<Record<ResourceType, number>>({
    FIRE_TRUCK: 0,
    AMBULANCE: 0,
    POLICE: 0,
    BOAT: 0,
    NDRF: 0,
  });

  // --- Fetch Data ---
  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      setIsLoading(true);
      setError(null);

      try {
        // 1. Fetch Incident
        const response = await incidentService.getIncidentById(id);
        if (response && response.success && response.data) {
          setIncident(response.data);
        } else {
          setError("Incident not found.");
        }

        // 2. Fetch Resources (REPLACE THIS WITH YOUR ACTUAL API CALL)
        const resourcesResponse = await incidentService.getAllResources();
        if (resourcesResponse && resourcesResponse.success && Array.isArray(resourcesResponse.data)) {
          setResources(resourcesResponse.data);
        } else {
          throw new Error(resourcesResponse.error || "Failed to fetch resources.");
        }

      } catch (err: any) {
        console.error("Error fetching details:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [id]);

  // --- Helpers ---
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

  const handleQuantityChange = (type: ResourceType, value: string, maxAvailable: number) => {
    let parsedValue = parseInt(value, 10);
    
    // Handle empty input or NaN
    if (isNaN(parsedValue)) parsedValue = 0;
    
    // Enforce bounds (0 to maxAvailable)
    if (parsedValue < 0) parsedValue = 0;
    if (parsedValue > maxAvailable) parsedValue = maxAvailable;

    setOrderQuantities(prev => ({ ...prev, [type]: parsedValue }));
  };

  const handlePlaceOrder = async () => {
  if (!incident) {
    alert("Incident details are missing. Cannot assign resources.");
    return;
  }

  const resourcesToOrder: Resource[] = [];

  // 1. Gather the requested resources (same as before)
  RESOURCE_TYPES.forEach(type => {
    const quantityRequested = orderQuantities[type];
    
    if (quantityRequested > 0) {
      const availableResourcesOfType = resources.filter(r => r.type === type && r.status === "AVAILABLE");
      const selectedForOrder = availableResourcesOfType.slice(0, quantityRequested);
      resourcesToOrder.push(...selectedForOrder);
    }
  });

  if (resourcesToOrder.length === 0) return;

  try {
    // Optional: Set a loading state here if you have one, e.g., setIsAssigning(true)
    console.log(`🔥 Assigning ${resourcesToOrder.length} resources to incident \n${incident._id}...`);

    // 2. Map the selected resources into an array of API call Promises
    // Note: Make sure 'resourceService' (or whatever you named it) is imported in your file.
    const assignmentPromises = resourcesToOrder.map(resource => {
      console.log(`Initiating API call for resource ${resource._id} && incident ${incident._id}`);
      return incidentService.assignResourceToIncident(resource._id, incident._id);
    });

    // 3. Execute all API calls concurrently
    const results = await Promise.all(assignmentPromises);

    // 4. Verify the results
    const failedAssignments = results.filter(result => !result.success);
    
    if (failedAssignments.length > 0) {
      console.error(`${failedAssignments.length} resources failed to assign.`);
      alert(`Warning: ${failedAssignments.length} resources could not be assigned. Please check the logs.`);
    } else {
      console.log("✅ All resources assigned successfully!");
      alert(`Successfully assigned ${resourcesToOrder.length} resources!`);
      
      // Reset the order quantities back to 0 after success
      setOrderQuantities({
        FIRE_TRUCK: 0,
        AMBULANCE: 0,
        POLICE: 0,
        BOAT: 0,
        NDRF: 0,
      });

      // TODO: You might want to call your fetchResources() function here 
      // again to refresh the "Available" counts on the UI!
    }

  } catch (error) {
    console.error("Critical error during resource assignment:", error);
    alert("An error occurred while assigning resources. Please try again.");
  } finally {
    router.back(); // Refresh the page to show updated resource statuses
    setIsLoading(false);
    setIsSubmitting(false);
  }
};

  // --- Render States ---
  if (isLoading) { /* ... keep your existing loading state ... */ 
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-blue-500 rounded-full mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">Loading incident details...</p>
        </div>
      </div>
    );
  }

  if (error) { /* ... keep your existing error state ... */ 
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

  if (!incident) return null;

  // --- Main UI ---
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
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

        {/* Incident Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Details (Left) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{incident.description}</p>
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
                  <dd className="mt-1 text-sm text-gray-900">{new Date(incident.createdAt).toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">{new Date(incident.updatedAt).toLocaleString()}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Image (Right) */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-xl p-4 border border-gray-200 h-full max-h-[500px] flex flex-col">
              <h2 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Attached Image</h2>
              <div className="relative flex-1 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center min-h-[250px]">
                {incident.image ? (
                  <img src={incident.image} alt="Incident evidence" className="absolute inset-0 w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-6 text-gray-400 flex flex-col items-center">
                    <span className="text-sm font-medium">No image available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW SECTION: Dispatch Resources --- */}
        <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Allocate Resources</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {RESOURCE_TYPES.map(type => {
              // Calculate how many of this type are available
              const availableCount = resources.filter(r => r.type === type && r.status === "AVAILABLE").length;
              const config = RESOURCE_CONFIG[type];

              return (
                <div key={type} className={`border rounded-xl p-4 flex flex-col items-center justify-between text-center transition-all ${config.bg} ${config.border}`}>
                  <div className="mb-3">
                    <span className="text-4xl block mb-2">{config.icon}</span>
                    <h3 className={`font-bold text-sm tracking-wide ${config.text}`}>
                      {type.replace('_', ' ')}
                    </h3>
                  </div>
                  
                  <div className="w-full mt-auto">
                    <p className={`text-xs font-semibold mb-2 ${availableCount === 0 ? 'text-red-500' : 'text-gray-600'}`}>
                      {availableCount} Available
                    </p>
                    <input
                      type="number"
                      min="0"
                      max={availableCount}
                      disabled={availableCount === 0}
                      value={orderQuantities[type]}
                      onChange={(e) => handleQuantityChange(type, e.target.value, availableCount)}
                      className="w-full text-center border bg-white border-gray-300 rounded-md py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all font-bold text-black"
                      placeholder="0"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end border-t pt-4">
            <button
  onClick={handlePlaceOrder}
  disabled={Object.values(orderQuantities).every(qty => qty === 0) || isSubmitting}
  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
>
  {isSubmitting ? 'Placing Order...' : 'Place Resource Order'}
</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IncidentPage;