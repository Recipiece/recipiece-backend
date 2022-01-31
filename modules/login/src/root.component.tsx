import { LoginComponent } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

console.log('hello from landing')

export default function Root(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing/login" element={<LoginComponent/>} />
      </Routes>
    </BrowserRouter>
  );
}
