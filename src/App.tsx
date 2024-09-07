import React, { useState } from 'react';
import celebrityData from './celebrities.json';
import { SearchBar } from './components/SearchBar';
import { CelebrityList } from './components/CelebrityList';

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

const App: React.FC = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>(celebrityData);
  const [filteredCelebrities, setFilteredCelebrities] =
    useState<Celebrity[]>(celebrityData);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [editMode, setEditMode] = useState<number | null>(null);

  const handleSearch = (query: string) => {
    const filtered = celebrities.filter((celebrity) =>
      `${celebrity.first} ${celebrity.last}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredCelebrities(filtered);
  };

  const toggleAccordion = (id: number) => {
    if (editMode !== null) return; // Prevent opening another accordion in edit mode
    setOpenAccordion((prevId) => (prevId === id ? null : id));
  };

  const handleEdit = (id: number) => {
    setEditMode(id);
  };

  const handleSave = (updatedCelebrity: Celebrity) => {
    setCelebrities((prevCelebrities) =>
      prevCelebrities.map((celeb) =>
        celeb.id === updatedCelebrity.id ? updatedCelebrity : celeb
      )
    );
    setFilteredCelebrities((prevCelebrities) =>
      prevCelebrities.map((celeb) =>
        celeb.id === updatedCelebrity.id ? updatedCelebrity : celeb
      )
    );
    setEditMode(null);
  };

  const handleCancel = () => {
    setEditMode(null);
  };

  const handleDelete = (id: number) => {
    setCelebrities((prevCelebrities) =>
      prevCelebrities.filter((celeb) => celeb.id !== id)
    );
    setFilteredCelebrities((prevCelebrities) =>
      prevCelebrities.filter((celeb) => celeb.id !== id)
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Celebrity Hacker System</h1>
      <SearchBar onSearch={handleSearch} />
      <CelebrityList
        celebrities={filteredCelebrities}
        openAccordion={openAccordion}
        editMode={editMode}
        onToggleAccordion={toggleAccordion}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
