import React from 'react';
import { AddTask } from '../components/AddTask';
import { useSelectedProjectValue } from '../context';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { firebase } from '../firebase';

beforeEach(cleanup);

jest.mock('../context', () => ({
    useSelectedProjectValue: jest.fn(() => ({selectedProject: "1"})),
    useProjectValue: jest.fn(() => ({ projects: [] })),
}));

jest.mock('../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({
            collection: jest.fn(() => ({
                add: jest.fn(() => (Promise.resolve('Never mock firebase')))
            }))
        }))
    },
}));

describe('<AddTask />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Success', () => {
        it('renders the <Add task />', () => {
            const { queryByTestId } = render(<AddTask />);
            expect(queryByTestId('add-task-comp')).toBeTruthy();
        });

        //Quick overlay
        it('renders the <Add task /> quick overlay', () => {
            const setShowQuickAddTask = jest.fn();
            const { queryByTestId } = render(
                    <AddTask 
                        shouldShowMain={false}
                        showQuickAddTask
                        setShowQuickAddTask={setShowQuickAddTask}
                    />  
                );
            expect(queryByTestId('quick-add-task')).toBeTruthy();
            // expect(setShowQuickAddTask).toHaveBeenCalled();
        });

        //Displays add task box
        it('renders the <AddTask /> main showable when using onClicked', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);

            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy();
        });


        it('renders the <AddTask /> main showable when using keyDown', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);

            fireEvent.keyDown(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy();
        });

        //
        it('renders the <AddTask /> project overlay when clicked', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);
            
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy();
            
            fireEvent.click(queryByTestId('show-project-overlay'))
            expect(queryByTestId('show-project-overlay')).toBeTruthy();
        });

        //
        it('renders the <AddTask /> task date  overlay when clicked', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);
            
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy();
            
            fireEvent.click(queryByTestId('show-task-date-overlay'))
            expect(queryByTestId('show-task-date-overlay')).toBeTruthy();
        });

        //when add task is canceled
        it('hides the <AddTask /> main when canceled is clicked', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);
            
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy();
            
            fireEvent.click(queryByTestId('add-task-main-cancel'))
            expect(queryByTestId('add-task-main')).toBeFalsy();
        });


        it('hides the <AddTask /> main when canceled is clicked using key down', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);
            
            fireEvent.click(queryByTestId('show-main-action'))
            expect(queryByTestId('add-task-main')).toBeTruthy();
            
            fireEvent.keyDown(queryByTestId('add-task-main-cancel'))
            expect(queryByTestId('add-task-main')).toBeFalsy();
        });
        //
        
        it('renders <AddTask /> for quick add task and then clicks cancel', () => {
            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
            const { queryByTestId } = render(
                <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
            );

            fireEvent.click(queryByTestId('add-task-quick-cancel'));
            expect(setShowQuickAddTask).toHaveBeenCalled();
        })


        it('renders <AddTask /> for quick add task and then cancels using keydown', () => {
            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
            const { queryByTestId } = render(
                <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
            );

            fireEvent.keyDown(queryByTestId('add-task-quick-cancel'));
            expect(setShowQuickAddTask).toHaveBeenCalled();
        })

            
        //
        it('renders <AddTask /> and adds a task to today and clears state', () => {
            useSelectedProjectValue.mockImplementation(() => ({
                selectedProject: 'TODAY'
            }));

            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
            const { queryByTestId } = render(
                <AddTask 
                    showQuickAddTask={showQuickAddTask}
                    setShowQuickAddTask={setShowQuickAddTask}
                />  
            );

            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-content')).toBeTruthy();

            fireEvent.change(queryByTestId('add-task-content'), {
                target: { 
                    value: 'I am a new task and I am amazing!' 
                } 
            });

            expect(queryByTestId('add-task-content').value).toBe('I am a new task and I am amazing!');

            fireEvent.click(queryByTestId('add-task'));
            expect(setShowQuickAddTask).toHaveBeenCalled();
        });
        // it('renders <AddTask /> and adds a task to Tomorrow and clears state', () => {
        //     useSelectedProjectValue.mockImplementation(() => ({
        //         selectedProject: 'NEXT_7'
        //     }));

        //     const showQuickAddTask = true;
        //     const setShowQuickAddTask = jest.fn(() => !showQuickAddTask)
        //     const { queryByTestId } = render(
        //         <AddTask 
        //             showQuickAddTask={showQuickAddTask}
        //             setShowQuickAddTask={setShowQuickAddTask}
        //         />  
        //     );
                
        //     fireEvent.click(queryByTestId('show-main-action'));
        //     expect(queryByTestId('add-task-content')).toBeTruthy();
            
        //     fireEvent.change(queryByTestId('add-task-content'), {
        //         target: { value: 'I am a new task and I am amazing!' } 
        //     });
            
        //     expect(queryByTestId('add-task-content').value).toBe(
        //         'I am a new task and I am amazing!'
        //     );
            
        //     fireEvent.click(queryByTestId('add-task'));
        //     expect(setShowQuickAddTask).toHaveBeenCalled();
        // });

        it('renders <AddTask /> and adds a task with a task date', () => {
            useSelectedProjectValue.mockImplementation(() => ({
                selectedProject: "1"
            }))
            
            const { queryByTestId } = render(
                <AddTask showMain />
                );
                
                fireEvent.click(queryByTestId('show-main-action'));
                expect(queryByTestId('add-task-content')).toBeTruthy();
                expect(queryByTestId('add-task-main')).toBeTruthy();
                
                fireEvent.change(queryByTestId('add-task-content'), {
                    target: {
                        value: 'I am the most amazing task ever!'
                    }
                });
                
                expect(queryByTestId('add-task-content').value).toBe('I am the most amazing task ever!');
                
                fireEvent.click(queryByTestId('show-task-date-overlay'));
                expect(queryByTestId('task-date-overlay')).toBeTruthy();
                
                fireEvent.click(queryByTestId('task-date-tomorrow'));
                expect(queryByTestId('task-date-overlay')).toBeFalsy();

                fireEvent.click(queryByTestId('add-task'));
            });
        });
});