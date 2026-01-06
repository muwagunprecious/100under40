'use client';

import { useState } from 'react';
import { nominations as initialNominations } from '@/lib/mockData';

export default function NominationsManagementPage() {
    const [nominations, setNominations] = useState(initialNominations);

    const handleStatusChange = (id: string, newStatus: string) => {
        setNominations(prev =>
            prev.map(nom => nom.id === id ? { ...nom, status: newStatus } : nom)
        );

        // Store in localStorage
        const updated = nominations.map(nom => nom.id === id ? { ...nom, status: newStatus } : nom);
        localStorage.setItem('nominations', JSON.stringify(updated));
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black mb-1">Nominations Management</h1>
                <p className="text-gray-500">Review and approve nominations</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nominee</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Nominator</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {nominations.map((nom) => (
                            <tr key={nom.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-bold text-black">{nom.nomineeName}</div>
                                    <div className="text-sm text-gray-500">{nom.nomineeEmail}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{nom.category?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{nom.nominatorName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(nom.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${nom.status === 'approved' ? 'bg-green-100 text-green-700' :
                                            nom.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {nom.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                    {nom.status !== 'approved' && (
                                        <button
                                            onClick={() => handleStatusChange(nom.id, 'approved')}
                                            className="text-green-600 hover:text-green-800 font-bold"
                                        >
                                            Approve
                                        </button>
                                    )}
                                    {nom.status !== 'rejected' && (
                                        <button
                                            onClick={() => handleStatusChange(nom.id, 'rejected')}
                                            className="text-red-600 hover:text-red-800 font-bold"
                                        >
                                            Reject
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
