import React from 'react'
import ReactDOM from 'react-dom'

import { Margin, Text } from '@cop.ui/react'

import '@cop.ui/scss/lib/Margin.css'
import '@cop.ui/scss/lib/Text.css'
import '@cop.ui/scss/lib/global.css'

ReactDOM.render(
    <div>
        <Margin space={"md"} left={true} top={true}>
            <Text size="xl">Some Text 123467</Text>
        </Margin>
    </div>,
    document.querySelector('#id'),
)
