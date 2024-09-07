import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, Pencil } from 'lucide-react';
import { EditForm } from './EditForm';
import { DeleteConfirmation } from './DeleteConfirmation';

interface Celebrity {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

interface CelebrityListProps {
  celebrities: Celebrity[];
  openAccordion: number | null;
  editMode: number | null;
  onToggleAccordion: (id: number) => void;
  onEdit: (id: number) => void;
  onSave: (celebrity: Celebrity) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
}

export const CelebrityList: React.FC<CelebrityListProps> = ({
  celebrities,
  openAccordion,
  editMode,
  onToggleAccordion,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      {celebrities.map((celebrity) => (
        <CelebrityItem
          key={celebrity.id}
          celebrity={celebrity}
          isOpen={openAccordion === celebrity.id}
          isEditing={editMode === celebrity.id}
          onToggle={() => onToggleAccordion(celebrity.id)}
          onEdit={() => onEdit(celebrity.id)}
          onSave={onSave}
          onCancel={onCancel}
          onDelete={() => onDelete(celebrity.id)}
        />
      ))}
    </div>
  );
};

interface CelebrityItemProps {
  celebrity: Celebrity;
  isOpen: boolean;
  isEditing: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onSave: (celebrity: Celebrity) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
}

export const CelebrityItem: React.FC<CelebrityItemProps> = ({
  celebrity,
  isOpen,
  isEditing,
  onToggle,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const calculateAge = (dob: string): number => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleEdit = () => {
    const age = calculateAge(celebrity.dob);
    if (age >= 18) {
      onEdit();
    } else {
      alert('Only adults can be edited.');
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(celebrity.id);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-white"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <img
            src={celebrity.picture}
            alt={`${celebrity.first} ${celebrity.last}`}
            className="w-10 h-10 rounded-full mr-4"
          />
          <span className="font-semibold">{`${celebrity.first} ${celebrity.last}`}</span>
        </div>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </div>
      {isOpen && (
        <div className="p-4 bg-gray-50">
          {isEditing ? (
            <EditForm
              celebrity={celebrity}
              onSave={onSave}
              onCancel={onCancel}
            />
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">
                    {calculateAge(celebrity.dob)} Years
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{celebrity.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium">{celebrity.country}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Description</p>
                <p className="font-medium">{celebrity.description}</p>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleDeleteClick}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={handleEdit}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                >
                  <Pencil size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
};
