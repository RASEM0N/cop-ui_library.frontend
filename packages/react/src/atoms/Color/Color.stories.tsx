import Color from './Color'
import '@cop.ui/scss/lib/Utilities.css'
import { text, select } from '@storybook/addon-knobs'
import { Spacing } from '@cop.ui/foundation'

export default {
    title: 'Atoms/Color',
}
export const common = () => <Color hexCode={text('hexCode', 'pink')} />

export const CustomDimensions = () => (
    <Color
        hexCode={text('hexCode', 'pink')}
        height={select('height', Object.values(Spacing), 'xxl')}
        width={select('width', Object.values(Spacing), 'xxl')}
    />
)
