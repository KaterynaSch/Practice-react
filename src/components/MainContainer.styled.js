import styled from "styled-components";

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  margin: ${p => p.theme.spacing(4)};
  padding-bottom: 24px;    
`