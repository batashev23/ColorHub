import styled from "styled-components";
import Palettes from './Components/Palettes'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PPalette from "./Components/pPalette";
import Palette from "./Components/Palette";

function App() {
  return (
    <BrowserRouter>
      <AppStyled>
        <div className="grid"></div>
        <Routes>
          <Route path="/" element={<Palettes />} />
          <Route path="/poppalettes/:id" element={<PPalette />} />
          <Route path="/mypalettes/:id" element={<Palette />} />
        </Routes>

      </AppStyled>
    </BrowserRouter>
  );
}


const AppStyled = styled.div`
    min-height: 100vh;
    background-color: #151B1F;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    }
`;

export default App;
