import "./App.css";
import Curriculum from "./component/Curriculum/Curriculum";
import HeaderButtons from "./component/Header/HeaderButtons"
import ToolContextProvider from "./context/index";

function App() {
  return (
    <ToolContextProvider>
      <HeaderButtons/>
      <Curriculum />
    </ToolContextProvider>
  );
}

export default App;
