import { BaseSlide, HTMLSlide } from './slides';

const getSlide = (content: string | any): BaseSlide => {
  if(content.default instanceof BaseSlide) {
    return content.default;
  }
  return new HTMLSlide(content);
}

const getSlideTopSub = (slideName): { top: number, sub: number } => {
  let slideIndices = slideName.replace('./', '').split('-')[0].split('_');
  let top = parseInt(slideIndices[0], 10);
  let sub;

  if (slideIndices.length === 2) {
    sub = parseInt(slideIndices[1], 10);
  }
  return { top: top, sub: sub };
};

export const allSlides: (BaseSlide | BaseSlide[])[] = (ctx => {
  let slideNames = ctx.keys();
  let slideContent = slideNames.map(ctx);

  let result = [];

  for (let i = 0; i < slideNames.length; ++i) {
    let { top, sub } = getSlideTopSub(slideNames[i]);
    let slide: BaseSlide = getSlide(slideContent[i]);


    if (sub != null) {
      let slideGroup = result[top];
      if (slideGroup == null) {
        slideGroup = [];
      }
      slideGroup.push(slide);
      result[top] = slideGroup;
    } else {
      result[top] = slide;
    }


  }

  return result;
})(require.context(SLIDE_FOLDER, true, /.*(md|ts)$/));