import Select from './Select'
import { withA11y } from '@storybook/addon-a11y'
import '@cop.ui/scss/lib/Select.css'
import '@cop.ui/scss/lib/Text.css'

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
    title: 'Molecules/Select',
    decorators: [withA11y],
}

export const common = () => <Select options={options} />
export const CustomLabel = () => <Select label="Select a color" options={options} />
export const RenderOption = () => (
    <Select
        options={options}
        renderOptions={({ getOptionRecommendedProps, option: { label }, isSelected }) => {
            return (
                <p
                    style={{
                        backgroundColor: isSelected ? 'blue' : 'yellow',
                    }}
                    {...getOptionRecommendedProps<HTMLParagraphElement>()}
                >
                    ** {label}
                </p>
            )
        }}
    />
)
