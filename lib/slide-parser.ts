import { BaseSlide } from './slides';

export const addSlidesToDOM = (container: Element, slides: (BaseSlide | BaseSlide[])[]) => {
  for (let slide of slides) {
    if (slide != null) {
      let section: Element = document.createElement('section');
      if (Array.isArray(slide)) {
        addSlidesToDOM(section, slide);
      } else {
        slide.addContentToSection(section);
      }
      container.appendChild(section);
    }
  }
}