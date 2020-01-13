import React, { useState } from 'react'
import { useSelectedProjectValue, useProjectValue } from '../context';
import { IndividualProject } from './IndividualProject';


export const Projects = ({ activeValue = null }) => {
    const [active, setActive] = useState(activeValue);
    const { setSelectedProject } = useSelectedProjectValue();
    const { projects } = useProjectValue();


    return (
        projects &&
        projects.map(project => (
            <li key={project.projectId} 
                data-testid="project-action" 
                role="button"
                className={ 
                    active === project.projectId ? 'active sidebar__project' : 'sidebar__project' 
                }
            >
            <div
                role="button"
                tabIndex={0}
                aria-label="set active project button"
                className="sidebar__project-container"
                onClick={() => {
                    setActive(project.projectid)
                    setSelectedProject(project.projectId)
                }}
                onKeyDown={() => {
                    setActive(project.projectid)
                    setSelectedProject(project.projectId)
                }}
            >
                <IndividualProject project={project} />
            </div>
                {/* {'Project', JSON.stringify(project)} */}
            </li>
        ))
    );
}