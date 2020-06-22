import {Injectable} from '@angular/core';
import * as introJs from 'intro.js/intro';

@Injectable({
  providedIn: 'root'
})
export class IntroService {

  static INTRO_VIEWED_KEY = 'intro-viewed';
  static INTRO_VIEWED_VALUE = 'dane';

  introJs = introJs();

  constructor() {
  }

  public startIntroJS(checkViewed: boolean) {
    if (checkViewed === true &&
      localStorage.getItem(IntroService.INTRO_VIEWED_KEY) === IntroService.INTRO_VIEWED_VALUE) {
      return;
    }

    this.introJs.setOptions(
      {
        nextLabel: 'след. >',
        prevLabel: '< пред.',
        skipLabel: 'Выход',
        doneLabel: 'Выход',
        exitOnEsc: true,
        exitOnOverlayClick: false
      }
    );

    this.introJs.start();

    this.introJs.onexit(_ => localStorage
      .setItem(IntroService.INTRO_VIEWED_KEY, IntroService.INTRO_VIEWED_VALUE));
  }
}
