import React, { useState, useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { useTasks } from '../hooks';
import { collatedTasks } from '../constants';
import { getTitle, getCollatedTitle, collatedTasksExists } from '../helpers';
import { useSelectedProjectValue, useProjectValue } from '../context';

export const Tasks = () => {
    const { selectedProject } = useSelectedProjectValue();
    const { projects } = useProjectValue();
    const { tasks } = useTasks(selectedProject);

    let projectName = '';

    if(projects && selectedProject && !collatedTasksExists(selectedProject)) {
        projectName = getTitle(projects, selectedProject).name;
        console.log('Project name 1: ', projectName);
    }
    
    if(collatedTasksExists(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
        console.log('Project name 2: ', projectName);
    }

    useEffect(() => {
        document.title = `${projectName}: Todoist`;
    }, [projectName])

    return (
        <div className="tasks" data-testid="tasks">
            <h2 data-testid="project-name">{projectName}</h2>
            <ul className="tasks__list">
                {tasks.map(task => (
                    <li key={`${task.id}`}>
                        <Checkbox id={task.id} />
                        <span>{task.task}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}