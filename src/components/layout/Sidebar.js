import React, {useState} from 'react';
import { Projects } from '../Projects';
import { AddProject } from '../../components/AddProject';
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar} from 'react-icons/fa';
import { useSelectedProjectValue } from '../../context';

export const Sidebar = () => {

    const { setSelectedProject } = useSelectedProjectValue();
    const [active, setActive] = useState('inbox');
    const [showProjects, setShowProjects] = useState(true);

    return (
            <div className="sidebar" data-testid="sidebar">
                <ul className="sidebar__generic">
                    <li 
                        data-testid="inbox" 
                        className={ active === 'inbox' ? 'active' : undefined } 
                    >
                        <div
                            aria-label="Show inbox tasks"
                            onClick={() => {
                                setActive('inbox');
                                setSelectedProject('INBOX');
                            }}
                            onKeyDown={() => {
                                setActive('inbox');
                                setSelectedProject('INBOX');
                            }}
                            tabIndex={0}
                            role="button"
                            >
                            <span>
                                <FaInbox />
                            </span>
                            <span>Inbox!</span>
                        </div>
                    </li>
                    <li 
                        data-testid="today" 
                        className={ active === 'today' ? 'active' : undefined}
                        >
                        <div
                            aria-label="Show todays tasks"
                            onClick={() => {
                                setActive('today');
                                setSelectedProject('TODAY');
                            }}
                            onKeyDown={() => {
                                setActive('today');
                                setSelectedProject('TODAY');
                            }}
                            tabIndex={0}
                            role="button"
                            >
                            <span>
                                <FaRegCalendar />
                            </span>
                            <span>Today!</span>
                        </div>
                    </li>
                    <li 
                        data-testid="next_7" 
                        className={active === 'next_7' ? 'active' : undefined}
                        >
                        <div
                            aria-label="Show tasks for next 7 days"
                            onClick={() => {
                                setActive('next_7');
                                setSelectedProject('NEXT_7');
                            }}
                            onKeyDown={() => {
                                setActive('next_7');
                                setSelectedProject('NEXT_7');
                            }}
                            tabIndex={0}
                            role="button"
                        >
                            <span>
                                <FaRegCalendarAlt />
                            </span>
                            <span>Next 7 days</span>
                        </div>
                    </li>
                </ul>
                <div
                    aria-label="Show/Hide projects" 
                    className="sidebar__middle"
                    onClick={() => setShowProjects(!showProjects)}
                    onKeyDown={() => setShowProjects(!showProjects)}
                    role="button"
                    tabIndex={0}
                >
                    <span>
                        <FaChevronDown className={!showProjects ? 'hidden-projects' : undefined} />
                        <h2>Projects</h2>
                    </span>
                </div>

    

                <ul className="sidebar__projects">
                    {showProjects && <Projects />}
                </ul>
                <AddProject />
        </div>
    )
}