import React, { useState } from 'react';
import { UserPlus, AlertCircle, Loader } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';
import { ethers } from 'ethers';

const AddDoctor = () => {
  const {contract, account} = useWeb3();
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    specialization: ''
  });
  const [isSubmitting, setIsSubmitting] =useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sucsess, setSuccess]=  useState<string | null>(null);

  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setSuccess(null);
    try{
      // validate address
      if(!ethers.utils.isAddress(formData.address)){
        throw new Error(`Invalid Ethereum address: ${formData.address}`);
      }
        if(!contract){
          throw new Error('please connect your wallet first');

        }
        // cal smart contact 
        const tx = await contract.addDoctor(
          formData.address,
          formData.name,
          formData.specialization
        );
        // wait for transaction to be mined 
        await tx.wait();
        setSuccess('Doctor added successfully');
        setFormData({...formData, address: '', name: '', specialization: ''});
       
    }catch(err : any){
      if(err.message.includes('Only owner')){
        setError('Only the contract owner can add new doctors to the system.');
      } else if(err.message.includes('Invalid address')){
        setError('Invalid Ethereum address: ');
      }else if(err.message.includes('gasLimit')){
        setError('Insufficient gas limit. Please increase the gas limit.');

      }
      
      else {

        setError(err.message || 'fail to add doctor');
      }
      
    }finally{
      setIsSubmitting(false);
    }
  };

  if(!account){
    return (
      <div className="flex justify-center items-center h-screen">
        <AlertCircle className="h-8 w-8 text-primary" />
        <p className="text-center text-sm text-gray-600">
          Please connect your wallet first.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <UserPlus className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Add New Doctor</h1>
          </div>
          {
            error && (
              <div className="mt-4">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )
          }
          {
            sucsess && (
              <div className="mt-4">
                <AlertCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-600">{sucsess}</p>
              </div>
            )
          } 

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Wallet Address
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Doctor Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Specialization
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 mr-2" />
                <p className="text-sm text-blue-700">
                  Only the contract owner can add new doctors to the system.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary flex disabled:cursor-not-allowed items-center justify-center"
              >
                {
                  isSubmitting ?
                   (
                    <>
                    <Loader  className=' animate-spin h-5 w-5 mr-2'/>
                    adding doctor ....
                    
                    </>
                   ) :('add doctor')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;