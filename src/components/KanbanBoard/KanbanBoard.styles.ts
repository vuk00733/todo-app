import styled from "styled-components";

export const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px;
`;

export const SearchBarWrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 992px) {
    justify-content: center;
  }
`;

export const SearchInput = styled.input`
  width: 300px;
  padding: 8px;
  font-size: 1em;
`;

export const ColumnsWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 16px;

  @media (max-width: 992px) {
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;
