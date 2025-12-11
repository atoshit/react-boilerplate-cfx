fx_version 'cerulean'
game 'gta5'

name 'react-boilerplate-cfx'
description 'Vite+React NUI boilerplate with Tailwind and Framer Motion'
version '0.1.0'

ui_page 'interface/dist/index.html'

files {
  'interface/dist/index.html',
  'interface/dist/assets/*.*'
}

client_scripts {
  'client/message.lua',
  'client/focus.lua',
  'client/init.lua'
}

shared_scripts {
  'shared/config.lua'
}

