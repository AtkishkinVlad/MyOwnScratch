import { KisikModel } from './kisik.model';

export type Command = 'налево();' | 'направо();' | 'вверх();' | 'вниз();'

export function moveKisik(input: Command[], kisikModel: KisikModel): void {
  for (const command of input) {
    switch (command) {
      case 'вверх();':
        kisikModel.changeY(-15)
        break;
      case 'вниз();':
        kisikModel.changeY(15)
        break;
      case 'направо();':
        kisikModel.changeX(15)
        break;
      case 'налево();':
        kisikModel.changeX(-15)
        break;
      default:
        break;
    }
  }
}