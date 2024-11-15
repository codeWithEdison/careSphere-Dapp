import React, { useState } from 'react';
import { Lock, Unlock, UserX, User, Shield } from 'lucide-react';

const AccessControl = () => {
  const [doctorAddress, setDoctorAddress] = useState('');
  
  // Mock data - replace with actual data from smart contract
  const [authorizedDoctors] = useState([
    { address: '0x123...456', name: 'Dr. Smith', status: true },
    { address: '0x789...012', name: 'Dr. Johnson', status: false }
  ]);

  const handleGrantAccess = (e: React.FormEvent) => {
    e.preventDefault();
    // Grant access logic will be added later
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Access Control</h1>
          </div>

          <div className="mb-8">
            <form onSubmit={handleGrantAccess} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Doctor's Wallet Address
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={doctorAddress}
                  onChange={(e) => setDoctorAddress(e.target.value)}
                  placeholder="0x..."
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                >
                  <Lock className="h-5 w-5 mr-1" />
                  Grant Access
                </button>
              </div>
            </form>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Authorized Doctors</h2>
            <div className="space-y-4">
              {authorizedDoctors.map((doctor, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-gray-500 mr-2" />
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-gray-500">{doctor.address}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {/* Remove access logic */}}
                    className={`flex items-center px-3 py-1 rounded-md ${
                      doctor.status 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                  >
                    {doctor.status ? (
                      <>
                        <UserX className="h-4 w-4 mr-1" />
                        Revoke Access
                      </>
                    ) : (
                      <>
                        <Unlock className="h-4 w-4 mr-1" />
                        Grant Access
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;