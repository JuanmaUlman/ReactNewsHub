import "./App.css";
import NewsEditor from "./Components/NewsEditor/NewsEditor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { EditorProvider } from "./Components/Context/Context";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <EditorProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NewsEditor />}></Route>
            </Routes>
          </BrowserRouter>
        </EditorProvider>
      </header>
    </div>
  );
}

export default App;
