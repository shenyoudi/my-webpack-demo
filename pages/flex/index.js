import '@assets/css/common.scss'
import './index.scss'
import Router from '@/routers/index'

let nav = document.getElementsByTagName('nav')[0]
nav.appendChild(Router)
