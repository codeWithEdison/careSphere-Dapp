import  { useState } from 'react';
import { FileText, Plus, User, Calendar, Stethoscope } from 'lucide-react';

const MedicalRecords = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    nid: '',
    patientName: '',
    condition: '',
    medicine: ''
  });

  // Mock data - replace with actual data from smart contract
  const records = [
    {
      nid: "123456",
      patientName: "John Doe",
      condition: "Hypertension",
      medicine: "Amlodipine",
      doctor: "0x123...789",
      date: new Date().toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
          >
            <Plus className="h-5 w-5 mr-1" />
            Add Record
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {records.map((record, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-medium">{record.patientName}</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">NID:</span> {record.nid}</p>
                <p><span className="font-medium">Condition:</span> {record.condition}</p>
                <p><span className="font-medium">Medicine:</span> {record.medicine}</p>
                <div className="flex items-center">
                  <Stethoscope className="h-4 w-4 mr-1" />
                  <p className="text-xs">{record.doctor}</p>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <p className="text-xs">
                    {new Date(record.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Medical Record</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient NID</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={newRecord.nid}
                    onChange={(e) => setNewRecord({...newRecord, nid: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={newRecord.patientName}
                    onChange={(e) => setNewRecord({...newRecord, patientName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Condition</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={newRecord.condition}
                    onChange={(e) => setNewRecord({...newRecord, condition: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Medicine</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    value={newRecord.medicine}
                    onChange={(e) => setNewRecord({...newRecord, medicine: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                  >
                    Add Record
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