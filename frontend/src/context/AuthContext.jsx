import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

/*
Context Creation: The createContext() function is used to create a new context object named AuthContext. Context allows you to share data between components without explicitly passing props through every level of the component tree.

State Management: The useState() hook is utilized to manage the state of the authenticated user (authUser). This state represents whether a user is currently authenticated or not. It's initialized with data from local storage, allowing the application to remember the authentication state across page reloads.

Context Provider: The AuthContextProvider component serves as a provider for the authentication context. It wraps its children components with the AuthContext.Provider, making the authentication state (authUser) available to all nested components within it.

Value Prop: The value prop of AuthContext.Provider is set to an object containing the authUser state and the setAuthUser function. This allows child components to access and modify the authentication state using the useContext() hook.

Children Rendering: The children of AuthContextProvider are rendered within the provider component. This ensures that all components nested within AuthContextProvider have access to the authentication context.*/
