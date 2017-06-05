import { BaseSlide } from './base-slide';

export class HTMLSlide extends BaseSlide {

  constructor(private content: string) { super(); }

  addContentToSection(section: Element) {
    section.innerHTML = this.content;
  }

}