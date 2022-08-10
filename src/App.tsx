import { MantineProvider, Switch } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowChat from "./components/chat/ShowChat";
import Home from "./components/Home/Home";
import LoginScreen from "./components/login/LoginScreen";
import Register from "./components/register/Register";

function App() {


  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ShowChat />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
