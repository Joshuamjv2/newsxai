import '@/styles/globals.css'
import '@/styles/spinner.css'
import UserContext, { UserContexProvider } from '@/contextapi/AuthAndUsers'


import "@fortawesome/fontawesome-svg-core/styles.css"
const {library} = require('@fortawesome/fontawesome-svg-core') // this instead of import prevents hydration error
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { config } from "@fortawesome/fontawesome-svg-core";

import { useEffect, useState, useContext } from 'react'

config.autoAddCss = false;

library.add(fab, far, fas)


export default function App({ Component, pageProps }) {
  return <UserContexProvider>
      <Component {...pageProps} />
    </UserContexProvider>
}
