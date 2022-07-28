import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import "./App.css";

// COMPONENTS IMPORTS
import Home from "./Pages/home";
import Navigation from "./components/navigation";

import Signin from "./components/signin";
import Login from "./components/login";

// CONTEXT IMPORTS
import { ContextProvider } from "./AppState/appstate";
import HeaderComponent from "./components/Header";
import Errorpage from "./components/errorpage";
import ProtectedRoutes from "./components/protectedRoutes";
import MobileNav from "./components/mobileNav";
import { useToggle } from "@mantine/hooks";

// USESTATE HOOK TYPE
export type openedTYPE = [
  opened: boolean,
  setopened: Dispatch<SetStateAction<boolean>>
];

const App: FC = () => {
  // MAIN APP STATE
  // open mobile navbar
  // colorscheme
  // guest user
  const [opened, setopened]: openedTYPE = useState<boolean>(false);
  const [colorscheme, setcolorscheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) => {
    setcolorscheme(value || (colorscheme == "dark" ? "light" : "dark"));
  };
  const [guestlogin, setguestlogin] = useState<boolean>(false);

  return (
    <ContextProvider>
      <Router>
        <ColorSchemeProvider
          colorScheme={colorscheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              fontFamily: "Sora",
              colorScheme: colorscheme,
            }}
          >
            <NotificationsProvider position="top-center">
              <AppShell
                navbar={
                  <Navigation
                    guestlogin={guestlogin}
                    setguestlogin={setguestlogin}
                    opened={opened}
                    setopened={setopened}
                  />
                }
                header={
                  <HeaderComponent opened={opened} setopened={setopened} />
                }
              >
                <div className="App">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="login"
                      element={<Login setguestlogin={setguestlogin} />}
                    />
                    <Route path="signin" element={<Signin />} />
                    <Route
                      path="/user/*"
                      element={<ProtectedRoutes guestlogin={guestlogin} />}
                    />

                    <Route path="*" element={<Errorpage />} />
                  </Routes>
                </div>
              </AppShell>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </Router>
    </ContextProvider>
  );
};

export default App;
