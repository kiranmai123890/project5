import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("javascript");

  const [code, setCode] = useState(
`console.log("Hello World");`
  );

  const [input, setInput] = useState("");

  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/run",
        {
          language,
          code,
          input,
        }
      );

      setOutput(res.data.output);
    } catch {
      setOutput("Server Error");
    }
  };

  return (
    <div className="container">

      <h1>Online Code Editor</h1>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="javascript">
          JavaScript
        </option>
      </select>

      <textarea
        className="editor"
        value={code}
        onChange={(e) =>
          setCode(e.target.value)
        }
      />

      <textarea
        className="input"
        placeholder="Input"
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
      />

      <button onClick={runCode}>
        Run Code
      </button>

      <h2>Output</h2>

      <pre>{output}</pre>

    </div>
  );
}

export default App;