(() => {
  const subtitle = document.getElementById('subtitle');
  const path = window.location.pathname.replace(/\/$/, '');
  if (!subtitle || (path !== '' && path !== '/index.html')) return;

  const quotes = [
    '千里之行，始于足下。——老子',
    '路漫漫其修远兮，吾将上下而求索。——屈原',
    '天行健，君子以自强不息。——《周易》',
    '知之为知之，不知为不知，是知也。——孔子',
    '学而不思则罔，思而不学则殆。——孔子',
    '不积跬步，无以至千里。——荀子',
    '会当凌绝顶，一览众山小。——杜甫',
    '长风破浪会有时，直挂云帆济沧海。——李白',
    '纸上得来终觉浅，绝知此事要躬行。——陆游',
    '愿你心有热望，脚下有路。'
  ];

  const date = new Date();
  const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let seed = 0;
  for (const char of day) seed = (seed * 31 + char.charCodeAt(0)) >>> 0;

  subtitle.textContent = quotes[seed % quotes.length];
})();
