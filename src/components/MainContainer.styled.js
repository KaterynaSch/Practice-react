import styled from "styled-components";

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${p => p.theme.spacing(4)};
  margin: ${p => p.theme.spacing(4)};
  padding-bottom: ${p => p.theme.spacing(6)};   
`