import React from 'react'
import ReactDOM from 'react-dom'

import { Margin, Select } from '@cop.ui/react'

import '@cop.ui/scss/lib/Margin.css'
import '@cop.ui/scss/lib/Text.css'
import '@cop.ui/scss/lib/global.css'

const options = [
    {
        label: 'Strict Black',
        value: 'strict-black',
    },
    {
        label: 'Heavenly Green',
        value: 'heavenly-green',
    },
    {
        label: 'Sweet Pink',
        value: 'pink',
    },
]

ReactDOM.render(
    <Margin space="md" top left>
        <Select options={options} label="Select" />
    </Margin>,
    document.querySelector('#root'),
)
