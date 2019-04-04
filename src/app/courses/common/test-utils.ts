import {DebugElement} from '@angular/core';

export const ButtonClickEvents = {
  left:  { button: 0 },
  right: { button: 2 }
};


export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
