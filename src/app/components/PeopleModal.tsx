import { useState } from "react";
import { IContact } from "../page";
import TextareaAutosize from "react-textarea-autosize";

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
  const [newPersonDescription, setNewPersonDescription] = useState<string>("");

  const handleAdd = () => {
    if (newPersonName.trim() === "") return;
    const newPerson: IContact = {
      id: Date.now(),
      name: newPersonName.trim(),
      description: newPersonDescription.trim(),
    };
    setPeople([...people, newPerson]);
    setNewPersonName("");
    setNewPersonDescription("");
  };

  const handleRemove = (id: number) => {
    const updatedPeople = people.filter((person) => person.id !== id);
    setPeople(updatedPeople);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: "500px" }}>
        <div
          className="modal-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Manage Contacts</h2>
          <button
            className="modal-close"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>

        <div
          className="people-list-container"
          style={{ margin: "20px 0", maxHeight: "400px", overflowY: "auto" }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {people.map((person) => (
              <li
                key={person.id}
                style={{
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <strong style={{ fontSize: "1.1rem" }}>{person.name}</strong>
                  <button
                    onClick={() => handleRemove(person.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ff4444",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      transition: "color 0.2s ease",
                    }}
                    title="Remove contact"
                  >
                    &times;
                  </button>
                </div>
                {person.description && (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#666",
                      margin: 0,
                      lineHeight: "1.4",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {person.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="modal-input-group"
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            type="text"
            placeholder="Contact name"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            className="text-input"
          />
          <TextareaAutosize
            minRows={2}
            maxRows={6}
            value={newPersonDescription}
            onChange={(e) => setNewPersonDescription(e.target.value)}
            placeholder=" Contact description"
            className="text-input"
            style={{ resize: "none" }}
          />
          <button
            onClick={handleAdd}
            className="send-button"
            style={{ alignSelf: "flex-end" }}
          >
            Add Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default PeopleModal;
