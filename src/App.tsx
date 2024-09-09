import { Button, Hint, Link, MiniModal, SidePage, Textarea } from "@skbkontur/react-ui"
import './App.css';
import { FC, useEffect, useState } from "react";
import { Stage, Sprite, Container, Text } from '@pixi/react';
import { KonturColors } from "@skbkontur/colors";
import kisikIcon from './pinpng.com-cat-png-607501.png';
import bagIcon from './pinpng.com-bug-png-1058896.png';
import { Command, moveKisik } from "./extractCommandsAndCount";
import { KisikModel } from './kisik.model';
import { observer } from "mobx-react";
import { BugModel } from './bug.model';
import { runInAction } from "mobx";
import { TransportAirRocketIcon24Regular } from '@skbkontur/icons/icons/TransportAirRocketIcon/TransportAirRocketIcon24Regular'
import { QuestionCircleIcon16Regular } from '@skbkontur/icons/icons/QuestionCircleIcon/QuestionCircleIcon16Regular'
import { HeartIcon64Regular } from '@skbkontur/icons/icons/HeartIcon/HeartIcon64Regular'
import { gameModel } from "./game.model";
import { CopyIcon16Regular } from "@skbkontur/icons/icons/CopyIcon/CopyIcon16Regular";
import { TextStyle } from "pixi.js";
import { BlockIcon32Regular } from "@skbkontur/icons/icons/BlockIcon/BlockIcon32Regular";
import { useMediaQuery } from "@uidotdev/usehooks";

const INITIAL_VALUE = `// Закодируй действия котика тут
// Пример команд на первый спринт (ход)
направо();
вниз();
направо();
`;

type Props = {
  kisikModel: KisikModel;
  bugModelFirst: BugModel;
  bugModelSecond: BugModel;
  bugModelThird: BugModel;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderWinModal() {
  return (
    <MiniModal width={500}>
      <MiniModal.Header icon={<HeartIcon64Regular />}>
        Мы отловили все баги
      </MiniModal.Header>
      <MiniModal.Body>
        <p>
          Кот был рад искать баги под твоим руководством!
        </p>
        <p>
          В знак благодарности он раскрыл тебе число — 99.
        </p>
        <p>
          Не забудь записать его себе.
        </p>
        <p>
          Виртуальный помощник говорит, что число поможет спасти День программиста и получить мерч Контура 😎
        </p>
      </MiniModal.Body>
    </MiniModal>
  )
}

export const App: FC<Props> = observer(({ kisikModel, bugModelFirst, bugModelSecond, bugModelThird }) => {
  const [editorContent, setEditorContent] = useState(INITIAL_VALUE);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );

  useEffect(() => {
    bugModelFirst.checkKisikCatchMe();
    bugModelSecond.checkKisikCatchMe();
    bugModelThird.checkKisikCatchMe();
  }, [bugModelFirst, bugModelSecond, bugModelThird, kisikModel, bugModelFirst.currentPosition, bugModelSecond.currentPosition, bugModelThird.currentPosition])

  useEffect(() => {
    const interval = setInterval(() => {
      runInAction(() => {
        bugModelFirst.changeX(getRandomInt(-15, 15))
        bugModelFirst.changeY(getRandomInt(-15, 15))

        bugModelSecond.changeX(getRandomInt(-15, 15))
        bugModelSecond.changeY(getRandomInt(-15, 15))

        bugModelThird.changeX(getRandomInt(-15, 15))
        bugModelThird.changeY(getRandomInt(-15, 15))
      })
    }, 500)

    return () => clearInterval(interval)
  }, [bugModelFirst, bugModelSecond, bugModelThird])

  return (isSmallDevice || isMediumDevice) ? (
      <main className="mobile">
        <BlockIcon32Regular />
        <h3>
          На данный момент игра не работает на мобильных устройствах :(
        </h3>
      </main>
    )
  : (
    <>
      <main>
      <Stage width={2000} height={2000} options={{ background: '#D2F3C8' }}>
      <Container position={[500, 500]}>
        <Sprite width={40} height={40} image={kisikIcon} x={kisikModel.currentX} y={kisikModel.currentY} />
        <Sprite width={40} height={40} image={bagIcon} x={bugModelFirst.currentX} y={bugModelFirst.currentY} />
        <Sprite width={40} height={40} image={bagIcon} x={bugModelSecond.currentX} y={bugModelSecond.currentY} />
        <Sprite width={40} height={40} image={bagIcon} x={bugModelThird.currentX} y={bugModelThird.currentY} />
        <Text x={-50} y={-280} text={`Текущий счёт ${gameModel.currentScore}`} style={
          new TextStyle({
            align: 'center',
            fontFamily: "Lab Grotesque, -apple-system, BlinkMacSystemFont, Arial, Liberation Sans, Nimbus Sans L, sans-serif",
            fontSize: 24,
            fill: KonturColors.grayscaleText
          })
        } />
      </Container>
    </Stage>
      </main>
      <aside>
      <SidePage width={560}>
        <SidePage.Header>
          Правила игры
        </SidePage.Header>
        <SidePage.Body className="body">
          <p className="rules">
            Тебе нужно помочь коту с помощью команд поймать все баги 😸
          </p>
          <p className="rules">
            Баги будут гулять по разным частям системы, но ты точно сможешь остановить их 😎
          </p>
          <ul className="commands">
            <li className="commands__title">
              Доступные команды
            </li>
            <li className="commands__command">
              <code>
                налево();
              </code>
              <Hint text="Скопировать команду в буфер обмена" pos="right">
                <Button icon={<CopyIcon16Regular color={KonturColors.grayscaleText} />} use="text" onClick={() => window.navigator.clipboard.writeText('налево();')} />
              </Hint>
            </li>
            <li className="commands__command">
              <code>
                направо();
              </code>
              <Hint text="Скопировать команду в буфер обмена" pos="right">
                <Button icon={<CopyIcon16Regular color={KonturColors.grayscaleText}  />} use="text" onClick={() => window.navigator.clipboard.writeText('направо();')} />
              </Hint>
            </li>
            <li className="commands__command">
              <code>
                вверх();
              </code>
              <Hint text="Скопировать команду в буфер обмена" pos="right">
                <Button icon={<CopyIcon16Regular color={KonturColors.grayscaleText}  />} use="text" onClick={() => window.navigator.clipboard.writeText('вверх();')} />
              </Hint>
            </li>
            <li className="commands__command">
              <code>
                вниз();
              </code>
              <Hint text="Скопировать команду в буфер обмена" pos="right">
                <Button icon={<CopyIcon16Regular color={KonturColors.grayscaleText}  />} use="text" onClick={() => window.navigator.clipboard.writeText('вниз();')} />
              </Hint>
            </li>
          </ul>
      <Textarea
        autoResize
        value={editorContent}
        width={520}
        onChange={(event) => setEditorContent(event.target.value)}
      />
        </SidePage.Body>
        <SidePage.Footer gap={64}>
          <Button rightIcon={<TransportAirRocketIcon24Regular />} onClick={() => moveKisik(editorContent.split('\n') as Command[], kisikModel)} size="large" use="primary">
            Запустить ход
          </Button>
          <Link rightIcon={<QuestionCircleIcon16Regular />} target="_blank" href="https://kontur.ru/bugbounty" >
            Узнать про Bug Bounty в Контуре
          </Link>
        </SidePage.Footer>
      </SidePage>
    </aside>
    {gameModel.isWinScore && renderWinModal()}
    </>
  )
})
