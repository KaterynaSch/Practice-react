import styled from "styled-components";

export const CardWrapper = styled.div`
  position: relative;
  padding: ${p => p.theme.spacing(2)};
  border: 1px solid ${p => p.theme.colors.accentColor};
  border-radius: ${p => p.theme.radius.m};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`
export const Title = styled.h2`
  color: ${p => p.theme.colors.accentColor};
`
export const ButtonDel = styled.button`
  position: absolute;
  top: ${p => p.theme.spacing(2)};
  right: ${p => p.theme.spacing(2)};   
  border: 1px solid ${p => p.theme.colors.borderColor};
  border-radius : ${p => p.theme.radius.l};
  color: ${p => p.theme.colors.secondaryColor};
`;

export const ButtonModal = styled.button`
  position: absolute;
  bottom: ${p => p.theme.spacing(2)};
  right: ${p => p.theme.spacing(2)};   
  border: 1px solid ${p => p.theme.colors.borderColor};
  border-radius : ${p => p.theme.radius.m};
  color: ${p => p.theme.colors.secondaryColor};
`;