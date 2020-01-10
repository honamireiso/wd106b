const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaLogger = require('koa-logger')
const koaBody = require('koa-body')
const session = require('koa-session')
const MarkdownIt = require('markdown-it')

const mdit = new MarkdownIt({ // 創建 markdown 的轉換物件！
  html: true,
  linkify: true,
  typographer: true
})

const app = new Koa()
const router = new KoaRouter()
 
app.keys = ['*@&))9kdjafda;983'] 
const CONFIG = { 
  key: 'd**@&(_034k3q3&@^(!$!',
  maxAge: 86400000
}
 
app.use(session(CONFIG, app));


 
/*app.use(ctx => {
  if (ctx.path === '/favicon.ico') return;
 
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
}); */

function layout (ctx, body) { // 套用 HTML 樣板 (有 css 與 header 區塊)
  let html = `
  <html>
  <head>
    <link rel="stylesheet" type="text/css" href="/blog/theme.css">
  </head>
  <body>
    <header>
      <a href="/">首頁</a> / 
      ${ctx.session.userId == null ? '<a href="/login">登入</a>' : '<a href="/logout">登出</a>'}
      ${ctx.path.startsWith('/blog') ? ' / <a href="' + ctx.path + '?op=view">檢視</a>' : ''}
      ${ctx.path.startsWith('/blog')&&ctx.session.userId != null ? ' / <a href="' + ctx.path + '?op=edit">編輯</a>' : ''}
      ${ctx.session.userId == null ? '' : '/ 您已登入，帳號為 ' + ctx.session.userId}
    </header>
    <div class="main">
      <div class="content">
        ${body}
      </div>
    </div>
  </body>
  </html>
  `
    return html
  }
 
app.listen(3000);
console.log('listening on port 3000')
console.log('server run at http://localhost:3000/Readme.md')

function pageLogin (ctx) { // 顯示登入畫面
  ctx.body = layout(ctx, `
    <form action="login" method="post">
      <p style="color:red">${ctx.session.msg}</p>
      <div id="div1"></div>
      <div id="usernameDiv">
        <span class="s">帳號</span>
        <input type="text" id="username" placeholder="帳號" />
        <span class="spanStyle" id="usernameSpan">*</span>
      </div>
      
      <div id="passwordDiv">
        <span class="s">密碼</span>
        <input type="password" id="password" placeholder="密碼" />
        <span class="spanStyle" id="passwordSpan">*</span>
      </div>
      <button>登入</button>
    </form>
  `)
  ctx.session.msg = ''
}