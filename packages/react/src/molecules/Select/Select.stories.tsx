import Select from './Select'
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

export default {
    title: 'Select',
}

export const common = () => <Select options={options} />
