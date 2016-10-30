
// ran a benchmark, interpolation was faster than concat and waaay faster than react
export default function renderHtmlPage(markup, head, initialState, scriptUrl) {
  return `<!DOCTYPE html>
<html>
  <head>
    <script src="${scriptUrl}" async></script>
  </head>
  <body>
    <div id="react-container">
      ${markup}
    </div>
    <script id="initial-state-script">
      window.__INITIAL_STATE__=${JSON.stringify(initialState)};
    </script>
  </body>
</html>`
}
