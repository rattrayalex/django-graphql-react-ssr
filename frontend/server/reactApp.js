import renderHtmlPage from './renderHtmlPage';

export default async function reactApp(ctx, next) {
  const markup = ''
  const head = '<title>Hello World</head>'
  const initialState = { hello: 'world' }
  const scriptUrl = '/public/app.bundle.js'

  ctx.body = renderHtmlPage(markup, head, initialState, scriptUrl)
}
