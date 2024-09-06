import { Button, Link, SidePage } from "@skbkontur/react-ui"
import './App.css';
import { Editor, useMonaco } from "@monaco-editor/react";
import { FC, useEffect, useState } from "react";
import { Stage, Sprite, Container } from '@pixi/react';
import { KonturColors } from "@skbkontur/colors";
import kisikIcon from './pinpng.com-cat-png-607501.png';
import bagIcon from './pinpng.com-bug-png-1058896.png';
import { Command, moveKisik } from "./extractCommandsAndCount";
import { KisikModel } from './kisik.model';
import { observer } from "mobx-react";
import { BugModel } from './bug.model';

const INITIAL_VALUE = `// Опиши действия котика тут
// Пример команд на первый спринт (ход)
направо();
вниз();
направо();
`;
const DEFAULT_LANGUAGE = "myLang";

type Props = {
  kisikModel: KisikModel;
  bugModel: BugModel;
}

export const App: FC<Props> = observer(({ kisikModel, bugModel }) => {
  const [editorContent, setEditorContent] = useState('');
  const monaco = useMonaco();

  useEffect(() => {
    bugModel.checkKisikCatchMe();
  }, [bugModel, kisikModel, bugModel.currentPosition, kisikModel.currentPosition])

  useEffect(() => {
    if (!monaco) {
      return;
    }

    const myLanguage = {
      id: 'myLang',
      extensions: ['.mylang'],
      aliases: ['My Lang', 'mylang'],
      mimetypes: ['text/x-mylang']
    };
    monaco.languages.register(myLanguage);

    // Snippets for your functions
    const functionSnippets = [
      {
        label: "налево",
        detail: "Call the 'налево();' function.",
        body: ["налево();"]
      },
      {
        label: "направо",
        detail: "Call the 'направо();' function.",
        body: ["направо();"]
      },
      {
        label: "вверх",
        detail: "Call the 'вверх();' function.",
        body: ["вверх();"]
      },
      {
        label: "вниз",
        detail: "Call the 'вниз();' function.",
        body: ["вниз();"]
      }
    ];

    monaco.languages.registerCompletionItemProvider('myLang', {
      // TODO: доразобраться с автокомплитом для своего языка
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      provideCompletionItems: () => {
          return { suggestions: functionSnippets };
      }
    });
  }, [monaco])

  const editorDidMount = (editor: { getValue: () => string; }) => {
    const content = editor.getValue();
    setEditorContent(content);
  };

  return (
    <>
      <main>
      <Stage width={2000} height={2000} options={{ background: KonturColors.greenMint70 }}>
      <Container position={[300, 300]}>
        <Sprite width={40} height={40} image={kisikIcon} x={kisikModel.currentX} y={kisikModel.currentY} />
        <Sprite width={40} height={40} image={bagIcon} x={bugModel.currentX} y={bugModel.currentY} />
      </Container>
    </Stage>
      </main>
      <aside>
      <SidePage width={600}>
        <SidePage.Header>
          Правила игры
        </SidePage.Header>
        <SidePage.Body className="body">
          <p className="rules">
            Тебе нужно помочь котику с помощью команд поймать все баги 😸
          </p>
          <p className="rules">
            Баги будут гулять по разным частям системы и временами пропадать сами собой 😅
          </p>
          <ul>
            <li>
              <code>
                налево();
              </code>
            </li>
            <li>
              <code>
                направо();
              </code>
            </li>
            <li>
              <code>
                вверх();
              </code>
            </li>
            <li>
              <code>
                вниз();
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
        <SidePage.Footer gap={96}>
          <Button onClick={() => moveKisik(editorContent.split('\n') as Command[], kisikModel)} size="large" use="primary">
            Запустить ход
          </Button>
          <Link target="_blank" href="https://kontur.ru/bugbounty" >
            Узнать про Bug Bounty в Контуре
          </Link>
        </SidePage.Footer>
      </SidePage>
    </aside>
    </>
  )
})
