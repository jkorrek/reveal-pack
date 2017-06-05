import { BaseSlide } from './base-slide';

export interface IFrameSlideOptions {
  url: string;
}

export class IFrameSlide extends BaseSlide {

  constructor(private options: IFrameSlideOptions) {
    super();
  }

  addContentToSection(section: Element) {
    section.setAttribute('data-background-iframe', this.options.url);
    section.setAttribute('data-background-interactive', 'true');
  }


}