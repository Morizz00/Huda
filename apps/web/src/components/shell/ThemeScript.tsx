export function ThemeScript() {
  const js = `(function(){try{var t=localStorage.getItem("huda.theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
