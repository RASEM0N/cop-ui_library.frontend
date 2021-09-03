import React from 'react'

interface ColorProps {
    hexCode: string
    width: string
    height: string
}

const Color: React.FunctionComponent<ColorProps> = ({ width, hexCode, height }) => {
    return (
        <div
            style={{
                backgroundColor: hexCode,
                width,
                height,
            }}
        ></div>
    )
}

export default Color
