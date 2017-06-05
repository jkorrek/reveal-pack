import './vendors';
import * as Reveal from 'reveal.js';

import { BaseSlide } from './slides/base-slide';

import { allSlides } from './slide-loader';

import { addSlidesToDOM } from './slide-parser';

const libPath = 'node_modules/reveal-pack/node_modules/reveal.js/';

window['Reveal'] = Reveal;

console.log(SLIDE_FOLDER);

document.addEventListener('DOMContentLoaded', () => {

  const revealContainer = document.getElementById('reveal-container');

  addSlidesToDOM(revealContainer, allSlides);

  Reveal.initialize({
    history: true,
    width: '100%',
    height: '100%',
    progress: true,
    dependencies: [

      // Zoom in and out with Alt+click
      { src: libPath + 'plugin/zoom-js/zoom.js', async: true },

      // Speaker notes
      { src: libPath + 'plugin/notes/notes.js', async: true }
    ]
  });

});