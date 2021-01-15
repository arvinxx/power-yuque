import $ from 'jquery';

export const replaceImageUrl = ([prevUrl, nextUrl]: string[]) => {
  // 找到所有包含 语雀 logo 的 img
  const imgList = $('img').filter(
    (_, element) => element.getAttribute('src') === prevUrl,
  );
  // 进行替换
  if (imgList.length > 0) {
    imgList.each((_, element) => {
      (element as HTMLImageElement).src = nextUrl;
    });
  }
};
