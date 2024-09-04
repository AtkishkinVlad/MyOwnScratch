import { Button, SidePage, Toast } from "@skbkontur/react-ui"
import './App.css';
import { Editor } from "@monaco-editor/react";
import { useState } from "react";

const INITIAL_VALUE = "// Опиши действия котика тут";
const DEFAULT_LANGUAGE = "javascript";

export const App = () => {
  const [editorContent, setEditorContent] = useState('');

  const editorDidMount = (editor: { getValue: () => string; }) => {
    console.log('editor did mount!', editor);
    const content = editor.getValue();
    setEditorContent(content);
  };

  return (
    <main>
      <SidePage width={700}>
        <SidePage.Header>
          Правила игры
        </SidePage.Header>
        <SidePage.Body className="body">
          <p className="rules">
            Тебе нужно помочь котику с помощью команд поймать все баги.
          </p>
          <p className="rules">
            Баги будут гулять по коду и временами пропадать сами собой 😅
          </p>
          <ul>
            <li>
              <code>
                налево()
              </code>
            </li>
            <li>
              <code>
                направо()
              </code>
            </li>
            <li>
              <code>
                вверх()
              </code>
            </li>
            <li>
              <code>
                вниз()
              </code>
            </li>
          </ul>
          <div className="editor">
      <Editor
        height="450px"
        defaultLanguage={DEFAULT_LANGUAGE}
        defaultValue={INITIAL_VALUE}
        onMount={editorDidMount}
        onChange={(value) => setEditorContent(String(value))}
      />
    </div>
        </SidePage.Body>
        <SidePage.Footer>
          <Button onClick={() => Toast.push(editorContent)} size="large" use="primary">
            Запустить ход
          </Button>
        </SidePage.Footer>
      </SidePage>
    </main>
  )
}
