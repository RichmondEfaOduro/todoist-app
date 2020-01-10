import React from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectProvider, SelectedProjectProvider } from './context';


export const App = () => {

return (
    <SelectedProjectProvider>
      <ProjectProvider>
          <div className="App">
          <Header />
          <Content />
          </div>
      </ProjectProvider>
    </SelectedProjectProvider>
  );
};


