import styled from "styled-components";

export const SearchWrapper = styled.div`
  padding: ${p => p.theme.spacing(2)};  
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing(2)};
  border-radius: ${p => p.theme.radius.m};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`
export const ButtonReset = styled.button`
    border: 1px solid ${p => p.theme.colors.borderColor};
    border-radius: ${p => p.theme.radius.l};
    color: ${p => p.theme.colors.secondaryColor};
`;