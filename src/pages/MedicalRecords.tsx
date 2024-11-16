import React, { useState, useEffect } from 'react';
import { 
  FileText, Plus, User, Calendar, Stethoscope, AlertCircle, 
  Loader, X, Search, RefreshCw 
} from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';

interface MedicalRecord {
  nid: string;
  patientName: string;
  condition: string;
  medicine: string;
  doctor: string;
  date: number;
}

const MedicalRecords = () => {
  const { contract, account } = useWeb3();
  const [showAddModal, setShowAddModal] = useState(false);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [newRecord, setNewRecord] = useState({
    nid: '',
    patientName: '',
    condition: '',
    medicine: ''
  });

  // Enhanced error handler
  const handleError = (err: any) => {
    console.error('Error:', err);
    
    if (typeof err === 'string') {
      setError(err);
      return;
    }

    const message = err.message || 'An unknown error occurred';

    if (message.includes('user rejected transaction')) {
      setError('Transaction was rejected. Please try again.');
    } else if (message.includes('insufficient funds')) {
      setError('Insufficient funds to complete this transaction.');
    } else if (message.includes('gasLimit')) {
      setError('Insufficient gas limit. Please increase the gas limit.');
    } else if (message.includes('nonce')) {
      setError('Transaction nonce error. Please try again.');
    } else if (message.includes('Already processing')) {
      setError('Another transaction is in progress. Please wait.');
    } else if (message.includes('network')) {
      setError('Network error. Please check your connection.');
    } else if (message.includes('Only active doctor')) {
      setError('Only registered and active doctors can add records.');
    } else {
      setError(message);
    }
  };

  // Load medical records with refresh functionality
  const loadRecords = async (showRefreshAnimation = false) => {
    if (!contract || !account) return;

    try {
      if (showRefreshAnimation) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const records = await contract.viewRecord(account);
      setRecords(records);
      if (showRefreshAnimation) {
        setSuccess('Records refreshed successfully!');
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, [contract, account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (!contract || !account) {
        throw new Error('Please connect your wallet');
      }

      setLoading(true);
      const tx = await contract.addRecords(
        account,
        newRecord.nid,
        newRecord.patientName,
        newRecord.condition,
        newRecord.medicine,
        { gasLimit: 500000 } // Added explicit gas limit
      );

      await tx.wait();
      setSuccess('Record added successfully!');
      setShowAddModal(false);
      setNewRecord({ nid: '', patientName: '', condition: '', medicine: '' });
      loadRecords();
    } catch (err: any) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter records based on search term
  const filteredRecords = records.filter(record => 
    record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.nid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatusMessage = ({ error, success }: { error: string | null, success: string | null }) => {
    if (!error && !success) return null;
    
    const isError = !!error;
    return (
      `<div className={mb-4 ${isError ? 'bg-red-50' : 'bg-green-50'} p-4 rounded-md flex items-start animate-fadeIn}>
        <AlertCircle className={h-5 w-5 ${isError ? 'text-red-400' : 'text-green-400'} mt-0.5 mr-2} />
        <p className={text-sm ${isError ? 'text-red-700' : 'text-green-700'}}>
          {error || success}
        </p>
      </div>`
    );
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <AlertCircle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Wallet Connection Required</h2>
            <p className="text-gray-600">
              Please connect your wallet to view and manage medical records.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search records..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                onClick={() => loadRecords(true)}
                className={`flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 ${isRefreshing ? 'opacity-50' : ''}`}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-5 w-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
              >
                <Plus className="h-5 w-5 mr-1" />
                Add Record
              </button>
            </div>
          </div>
          
          <StatusMessage error={error} success={success} />
        </div>

        {/* Records Grid */}
        {loading && records.length === 0 ? (
          <div className="text-center py-12">
            <Loader className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="mt-2 text-gray-600">Loading records...</p>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'No records match your search criteria.' : 'Start by adding a new medical record.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRecords.map((record, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-medium">{record.patientName}</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><span className="font-medium">NID:</span> {record.nid}</p>
                  <p><span className="font-medium">Condition:</span> {record.condition}</p>
                  <p><span className="font-medium">Medicine:</span> {record.medicine}</p>
                  <div className="flex items-center">
                    <Stethoscope className="h-4 w-4 mr-1 text-gray-400" />
                    <p className="text-xs">{record.doctor}</p>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <p className="text-xs">
                      {new Date(record.date * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Record Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative animate-fadeIn">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <h2 className="text-xl font-bold mb-4">Add New Medical Record</h2>
              
              <StatusMessage error={error} success={success} />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient NID</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-primary focus:border-primary"
                    value={newRecord.nid}
                    onChange={(e) => setNewRecord({...newRecord, nid: e.target.value})}
                    required
                    disabled={loading}
                  />
                </div>
                {/* Other form fields... */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader className="animate-spin h-5 w-5 mr-2" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5 mr-1" />
                        Add Record
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;