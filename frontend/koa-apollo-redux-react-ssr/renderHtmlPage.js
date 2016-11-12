
const emptyHead = {
  htmlAttributes: '',
  meta: '',
  title: '',
  script: '',
  link: '',
  style: '',
}

// ran a benchmark, interpolation was faster than concat and waaay faster than react
export default (markup, head, initialState) => {
  const safeHead = head || emptyHead;

  return `<!DOCTYPE html>
<html ${safeHead.htmlAttributes.toString()}>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${safeHead.meta.toString()}

    ${safeHead.title.toString()}

    ${safeHead.script.toString()}
    ${safeHead.style.toString()}
    ${safeHead.link.toString()}
  </head>
  <body>
    <div id="react-container">${markup}</div>
    <script id="initial-state-script">
      window.__INITIAL_STATE__=${JSON.stringify(initialState)};
    </script>
  </body>
</html>
`
}
