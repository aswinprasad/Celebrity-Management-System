import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

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

interface EditFormProps {
  celebrity: Celebrity;
  onSave: (celebrity: Celebrity) => void;
  onCancel: () => void;
}

export const EditForm: React.FC<EditFormProps> = ({
  celebrity,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Celebrity>(celebrity);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    setIsFormChanged(JSON.stringify(celebrity) !== JSON.stringify(formData));
  }, [formData, celebrity]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'first':
      case 'last':
        if (!value.trim()) error = 'This field is required';
        break;
      case 'country':
        if (!value.trim()) error = 'This field is required';
        if (/\d/.test(value)) error = 'Country name should not contain numbers';
        break;
      case 'description':
        if (!value.trim()) error = 'This field is required';
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).every((error) => !error) && isFormChanged) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="first"
            value={formData.first}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.first && (
            <p className="text-red-500 text-xs mt-1">{errors.first}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="last"
            value={formData.last}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.last && (
            <p className="text-red-500 text-xs mt-1">{errors.last}</p>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Transgender">Transgender</option>
          <option value="Rather not say">Rather not say</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.country && (
          <p className="text-red-500 text-xs mt-1">{errors.country}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
        >
          <X size={16} />
        </button>
        <button
          type="submit"
          disabled={
            !isFormChanged || Object.values(errors).some((error) => error)
          }
          className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Check size={16} />
        </button>
      </div>
    </form>
  );
};
