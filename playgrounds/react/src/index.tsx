import React from 'react'
import ReactDOM from 'react-dom'

import { Margin, Select } from '@cop.ui/react'

import '@cop.ui/scss/lib/Margin.css'
import '@cop.ui/scss/lib/Text.css'
import '@cop.ui/scss/lib/global.css'
import '@cop.ui/scss/lib/Select.css'

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
    <Margin space="md">
        {/*<Select options={options} label="Select" />*/}
        <Select
            options={options}
            label="Select"
            renderOptions={({ option, getOptionRecommendedProps }) => {
                return <p {...getOptionRecommendedProps<HTMLParagraphElement>()}>{option.label}</p>
            }}
        />
    </Margin>,
    document.querySelector('#root'),
)
