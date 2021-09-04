import React from 'react'
import { Spacing } from '@cop.ui/foundation'

interface MarginProps {
    space?: keyof typeof Spacing
    top?: boolean
    right?: boolean
    bottom?: boolean
    left?: boolean
}

const Margin: React.FunctionComponent<MarginProps> = ({
    left,
    bottom,
    top,
    right,
    space = 'xxxs',
    children,
}) => {
    let className = ``

    if (!left && !right && !top && !bottom) {
        className = `cui-margin-${space}`
    }

    if (top) {
        className = `${className} cui-margin-top-${space}`
    }
    if (right) {
        className = `${className} cui-margin-right-${space}`
    }
    if (bottom) {
        className = `${className} cui-margin-bottom-${space}`
    }
    if (left) {
        className = `${className} cui-margin-left-${space}`
    }

    return <div className={className}>{children}</div>
}

export default Margin
