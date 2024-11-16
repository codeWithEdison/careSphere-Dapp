import React, { useState, useEffect } from 'react';
import { Lock, Unlock, UserX, User, Shield, AlertCircle, Loader } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';
import { ethers } from 'ethers';

interface Doctor {
  address: string;
  name: string;
  specialisation: string;
  isActive: boolean;
  hasAccess: boolean;
}

const AccessControl = () => {
  const { contract, account } = useWeb3();
  const [doctorAddress, setDoctorAddress] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load doctors and their access status
  const loadDoctors = async () => {
    if (!contract || !account) return;

    try {
      setLoading(true);
      const doctorsList: Doctor[] = [];
      
      // Get doctors from events (you might want to implement a better way to get all doctors)
      const filter = contract.filters.NewDoctor();
      const events = await contract.queryFilter(filter);
      
      for (const event of events) {
        const doctorAddr = event.args?.doctor;
        const doctor = await contract.doctors(doctorAddr);
        const hasAccess = await contract.hasAccess(account, doctorAddr);
        
        if (doctor.isActive) {
          doctorsList.push({
            address: doctorAddr,
            name: doctor.name,
            specialisation: doctor.specilisation,
            isActive: doctor.isActive,
            hasAccess
          });
        }
      }
      
      setDoctors(doctorsList);
    } catch (err) {
      console.error('Error loading doctors:', err);
      setError('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [contract, account]);

  const handleGrantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (!contract) throw new Error('Please connect your wallet');
      if (!ethers.utils.isAddress(doctorAddress)) {
        throw new Error('Invalid doctor address');
      }

      setLoading(true);
      const tx = await contract.giveAcess(doctorAddress);
      await tx.wait();
      
      setSuccess('Access granted successfully!');
      setDoctorAddress('');
      loadDoctors();
    } catch (err: any) {
      console.error('Error granting access:', err);
      setError(err.message || 'Failed to grant access');
    } finally {
      setLoading(false);
    }
  };

  const handleAccessToggle = async (doctorAddr: string, currentAccess: boolean) => {
    try {
      if (!contract) throw new Error('Please connect your wallet');
      setLoading(true);

      const tx = currentAccess
        ? await contract.removeAccess(doctorAddr)
        : await contract.giveAcess(doctorAddr);
      
      await tx.wait();
      
      setSuccess(currentAccess ? 'Access revoked successfully!' : 'Access granted successfully!');
      loadDoctors();
    } catch (err: any) {
      console.error('Error toggling access:', err);
      setError(err.message || 'Failed to update access');
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-50 p-4 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-2" />
            <p className="text-sm text-yellow-700">
              Please connect your wallet to manage access control.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Access Control</h1>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-green-400 mt-0.5 mr-2" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

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
                  disabled={loading}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-1" />
                      Grant Access
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Authorized Doctors</h2>
            {loading && doctors.length === 0 ? (
              <div className="text-center py-4">
                <Loader className="animate-spin h-8 w-8 mx-auto text-primary" />
                <p className="mt-2 text-gray-600">Loading doctors...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {doctors.map((doctor, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">{doctor.name}</p>
                        <p className="text-sm text-gray-500">{doctor.address}</p>
                        <p className="text-sm text-gray-500">{doctor.specialisation}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAccessToggle(doctor.address, doctor.hasAccess)}
                      disabled={loading}
                      className={`flex items-center px-3 py-1 rounded-md ${
                        doctor.hasAccess
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      } disabled:opacity-50`}
                    >
                      {doctor.hasAccess ? (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;