import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // get current user
  const { user, isLoading, isAuthed } = useUser();

  //  if user is not authenticated, return to login page
  useEffect(
    function () {
      if (!isAuthed && !isLoading) navigate("/login");
    },
    [isAuthed, navigate, isLoading]
  );

  // loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // if user is authenticated, return App
  if (isAuthed) return children;
}

export default ProtectedRoute;
