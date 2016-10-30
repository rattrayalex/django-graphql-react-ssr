'use strict'
const React = require('react')
const ReactDom = require('react-dom/server')

function concat(markup, initialState, scriptUrl) {
  return `<!DOCTYPE html>
<html>
  <head>
    <script src="`+scriptUrl+`" async></script>
  </head>
  <body>
    <div id="react-container">
      `+markup+`
    </div>
    <script>
      window.__INITIAL_STATE__=`+initialState+`;
    </script>
  </body>
</html>`
}


function template(markup, initialState, scriptUrl) {
  return `<!DOCTYPE html>
<html>
  <head>
    <script src="${scriptUrl}" async></script>
  </head>
  <body>
    <div id="react-container">
      ${markup}
    </div>
    <script>
      window.__INITIAL_STATE__=${initialState};
    </script>
  </body>
</html>`
}


function react(markup, initialState, scriptUrl) {
  const rendered = <html>
    <head>
      <script src={scriptUrl} async></script>
    </head>
    <body>
      <div id="react-container" dangerouslySetInnerHtml={{ __html: markup }} />
      <script>
        {`window.__INITIAL_STATE__=${initialState}`};
      </script>
    </body>
  </html>
  return `<!DOCTYPE html>`+ReactDom.renderToString(rendered)
}


function run(strategy) {
    let before = new Date().getTime()
    let len = 0
    for ( let i = 0; i < 10000000; i+=1 ) {
        len += strategy(String(i), String(i * 2)).length
    }
    console.log(len + ' - ' + ((new Date().getTime()) - before) + 'ms')
}

console.log('concat')
run(concat)

console.log('template')
run(template)

console.log('react')
run(react)
