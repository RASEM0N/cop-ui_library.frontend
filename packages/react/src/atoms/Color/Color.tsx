import React from 'react'
import Spacing from '../../foundation/Spacing'

interface ColorProps {
    hexCode: string
    width?: keyof typeof Spacing
    height?: keyof typeof Spacing
}

const Color: React.FunctionComponent<ColorProps> = ({
    hexCode = Spacing.md,
    width,
    height = Spacing.md,
}) => {
    const className: string = `cui-width-${width} cui-height-${height}`

    return (
        <div
            className={className}
            style={{
                backgroundColor: hexCode,
            }}
        ></div>
    )
}

export default Color
