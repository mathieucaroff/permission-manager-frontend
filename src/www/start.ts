import 'regenerator-runtime/runtime'

import { render } from 'react-dom'

import { app } from './app'

import * as packageInfo from '../../package.json'
import { githubCornerHTML } from './lib/githubCorner'

function main() {
   try {
      let div = document.createElement('div')
      div.innerHTML = githubCornerHTML(packageInfo.repository)

      let title = document.getElementById('title')!
      title.textContent = document.title
   } catch (e) {
      console.error(e)
   }

   render(app({}), document.getElementById('appRoot'))
}

main()
