import React from "react";
import styled from "styled-components";
import KanbanBoard from "./components/KanbanBoard";

const App: React.FC = () => {
  return (
    <AppWrapper>
      <Header>
        <Title>Kanban Board</Title>
      </Header>
      <KanbanBoard />
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Header = styled.header`
  width: 100%;
  padding: 20px;
  color: black;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 40px;
  font-weight: bold;
`;
