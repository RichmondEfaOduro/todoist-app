import React, { useState }from 'react';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectValue } from '../context';


export const AddProject = ({shouldShow = false}) =>  {
    const [show, setShow] = useState(shouldShow);
    const [projectName, setProjectName] = useState('');

    
    const projectId = generatePushId();
    const { projects, setProjects } = useProjectValue(); 
    const addProject = () =>
        projectName &&
        firebase
        .firestore()
        .collection('projects')
        .add({
            projectId,
            name: projectName,
            userId: 'jfi312j19fjdk1209jfoaij'
        })
        .then(() => {
            setProjects([...projects]);
            setProjectName('');
            setShow(false);
        })
        
        return (
            <div className="add-project" data-testid="add-project">
                { show && (
                    <>
                        <div className="add-project__input">
                            <input 
                                value={projectName}
                                onChange={e => setProjectName(e.target.value)}
                                data-testid="project-name"
                                placeholder="Name your project"
                                type="text"
                                />
                            <button 
                                className="add-project__submit"
                                type="button"
                                onClick={() => addProject()}
                                data-testid="add-project-submit"
                                >
                                    Add project
                                </button>
                            <span
                                data-testid="cancel-project-overlay"
                                className="add-project__cancel"
                                onClick={()=> setShow(false)}
                                >
                                Cancel
                            </span>
                        </div>
                    </>
                )}
                <span className="add-project_plus">+</span>
                <span
                    data-testid="add-project-action"
                    className="add-project__text"
                    onClick={() => setShow(!show)}
                    >
                    Add Project
                </span>
            </div>
        )
};
    