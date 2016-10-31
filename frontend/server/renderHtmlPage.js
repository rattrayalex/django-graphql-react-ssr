
// ran a benchmark, interpolation was faster than concat and waaay faster than react
export default (markup, head, initialState) => (`<!DOCTYPE html>
<html ${head.htmlAttributes.toString()}>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${head.meta.toString()}

    ${head.title.toString()}

    ${head.script.toString()}
    ${head.link.toString()}
    ${head.style.toString()}
  </head>
  <body>
    <div id="react-container">
      ${markup}
    </div>
    <script id="initial-state-script">
      window.__INITIAL_STATE__=${JSON.stringify(initialState)};
    </script>
  </body>
</html>
`)
