import { KisikModel } from './kisik.model';

export type Command = 'налево();' | 'направо();' | 'вверх();' | 'вниз();'

export function moveKisik(input: Command[], kisikModel: KisikModel): void {
  for (const command of input) {
    switch (command) {
      case 'вверх();':
        kisikModel.changeY(-10)
        break;
      case 'вниз();':
        kisikModel.changeY(10)
        break;
      case 'направо();':
        kisikModel.changeX(10)
        break;
      case 'налево();':
        kisikModel.changeX(-10)
        break;
      default:
        break;
    }
  }
}