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
    title: 'Molecules/Select',
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

