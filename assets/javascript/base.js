const BASE_URL = location.origin + '/';
const goToTop = (e) => window.scrollTo(0,0);

document.querySelector('head base').href = BASE_URL;

export { BASE_URL, goToTop };