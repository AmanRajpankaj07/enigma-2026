"use client"; // Required because we are using a React hook

import React from 'react';
import { PlusCircle, ViewIcon } from 'lucide-react'; 
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the hook

const Page = () => {
    const pathname = usePathname(); // Gets the current URL (e.g., "/admin")

    const cards = [
        {
            id: "create-incident",
            title: "Create Incident",
            icon: PlusCircle,
            color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
            iconColor: "text-blue-600",
            route: "/create-incident" 
        },
        {
            id: "all-incidents",
            title: "View All Incidents",
            icon: ViewIcon,
            color: "bg-green-50 hover:bg-green-100 border-green-200",
            iconColor: "text-green-600",
            route: "/all-incident" 
        },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Incident Management</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map((card) => {
                    const Icon = card.icon;
                    // Dynamically build the URL: /current-path + /new-route
                    const targetUrl = `${pathname}${card.route}`;
                    
                    return (
                        <Link href={targetUrl} key={card.id}>
                            <div className={`flex items-center p-6 border rounded-xl shadow-sm transition-all cursor-pointer ${card.color}`}>
                                <div className={`p-4 rounded-full bg-white mr-4 shadow-sm ${card.iconColor}`}>
                                    <Icon size={32} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {card.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Click to proceed
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Page;