"use client";

import { useState } from "react";
import style from "./testCaseCard.module.css";
import FloatingActionButton from "../atoms/IconButton";
import ProgressBar from "../atoms/Progress";
import AddButton from "../atoms/AddButton";

export default function TestCaseCard({}) {
  const [isEditMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [groups, setGroups] = useState([]);

  //프로그레스 계산
  const totalCheckboxes = groups.reduce(
    (total, group) => total + group.testCases.length,
    0
  );
  const checkedCheckboxes = groups.reduce(
    (total, group) => total + group.testCases.filter((tc) => tc.checked).length,
    0
  );
  const progress =
    totalCheckboxes > 0
      ? Math.round((checkedCheckboxes / totalCheckboxes) * 100)
      : 0;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const titleStyle = {
    color: title ? "black" : "gray", // Changes color based on whether title has text
    border: "none",
    outline: "none",
    width: "100%", // Full width within its container
    padding: "10px",
    fontSize: "1.2rem",
  };

  const handleAddGroup = (apiJson) => {
    setGroups([...groups, { id: apiJson.id, ...apiJson }]);
  };

  const handleAddTestCase = (groupId, testCase) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            testCases: [...group.testCases, testCase],
          };
        }
        return group;
      })
    );
  };

  const handleDeleteTestCase = (groupId, testCaseId) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            testCases: group.testCases.filter(
              (testCase) => testCase.id !== testCaseId
            ),
          };
        }
        return group;
      })
    );
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <div>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                style={titleStyle}
                readOnly={!isEditMode}
                placeholder="Enter title here..."
              />
              <ProgressBar progress={progress} />
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.293 3.96a4.771 4.771 0 1 1 6.747 6.747l-3.03 3.03l-1.415-1.413l3.03-3.031a2.771 2.771 0 1 0-3.918-3.92l-3.031 3.031l-1.414-1.414zm2.12 6.04l-5.415 5.414L8.584 14l5.414-5.414zm-7.01 1.676l-3.03 3.031a2.771 2.771 0 1 0 3.92 3.92l3.03-3.031l1.414 1.414l-3.03 3.03a4.771 4.771 0 1 1-6.748-6.747l3.03-3.03z"
                ></path>
              </svg>
            </div>
          </div>
          <div className={style.modalBody}>
            {groups.map((group) => (
              <div key={group.id}>
                <input
                  type="text"
                  value={group.title}
                  onChange={(e) => handleTitleChange(e, group.id)}
                  disabled={!isEditMode}
                />
                {group.testCases.map((testCase) => (
                  <div key={testCase.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={testCase.checked}
                        onChange={(e) =>
                          handleCheckboxChange(e, group.id, testCase.id)
                        }
                      />
                      {testCase.description}
                    </label>
                    {isEditMode && (
                      <button
                        onClick={() =>
                          handleDeleteTestCase(group.id, testCase.id)
                        }
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
                {isEditMode && (
                  <button onClick={() => handleAddTestCase(group.id)}>
                    + Add new case
                  </button>
                )}
              </div>
            ))}
            {isEditMode && <AddButton />}
          </div>
        </div>
      </div>
      <FloatingActionButton
        isEditMode={isEditMode}
        toggleEditMode={() => setEditMode(!isEditMode)}
      />
    </>
  );
}
