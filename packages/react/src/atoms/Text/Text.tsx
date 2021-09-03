import React from 'react'
import FontSize from '../../foundation/FontSize'

interface TextProps {
    size?: keyof typeof FontSize
}

const Text: React.FunctionComponent<TextProps> = ({ size = FontSize.base, children }) => {
    const className = `cui-text-${size}`

    return <p className={className}>{children}</p>
}

export default Text
