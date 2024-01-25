import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${p => p.theme.spacing(4)};
  margin: ${p => p.theme.spacing(4)};
  padding-bottom: ${p => p.theme.spacing(6)};   
`;

const Link = styled(NavLink)`
&.active {
    color: orange;
}
`;

export const Layout = () => {
  return(
    <Container>
        <header>
          <nav>
              <Link to="/">Home</Link>
              <Link to="/create">Create quiz</Link>
              <Link to="/quizzes">Quiz list</Link>
          </nav>
          </header>
          <Suspense fallback={`LOADING PAGE...`}> 
            <Outlet/>
          </Suspense>
         
          <Toaster position="top-right"/>
    </Container>
  )
};
