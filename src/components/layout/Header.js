import React, { useState } from 'react';
import { AddTask } from '../../components/AddTask';
import { FaPizzaSlice } from 'react-icons/fa';

export const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return(
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="todoist logo"/>
        </div>
        <div className="settings">
          <ul>
            <li data-testid="quick-add-task-action" className="settings__add">
              <button 
                type="button"
                onClick={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                  }
                }
                onKeyDown={() => {
                  setShowQuickAddTask(true);
                  setShouldShowMain(true);
                  }
                }
                aria-label="Quick Add Task"
              >
                +
              </button>
            </li>
            <li data-testid="dark-mode-action" className="settings__darkmode">
              <button 
                aria-label="Darkmode on/off"
                type="button" 
                onClick={() => setDarkMode(!darkMode)}
                onKeyDown={() => setDarkMode(!darkMode)}
              >
                <FaPizzaSlice />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <AddTask 
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  )  
} 