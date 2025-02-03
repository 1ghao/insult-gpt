import { useState } from "react";
import { IContact } from "../page";

const PeopleModal = ({
  people,
  setPeople,
  onClose,
}: {
  people: IContact[];
  setPeople: (people: IContact[]) => void;
  onClose: () => void;
}) => {
  const [newPersonName, setNewPersonName] = useState<string>("");

  const handleAdd = () => {
    if (newPersonName.trim() === "") return;
    const newPerson: IContact = { id: Date.now(), name: newPersonName.trim() };
    setPeople([...people, newPerson]);
    setNewPersonName("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Manage People</h2>
        <ul>
          {people.map((person) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
        <div className="modal-input-group">
          <input
            type="text"
            placeholder="New person name"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
          />
          <button onClick={handleAdd}>Add Person</button>
        </div>
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PeopleModal;
