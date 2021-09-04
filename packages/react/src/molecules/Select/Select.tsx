import React, { useState } from 'react'

interface SelectOption {
    label: string
    value: string
}

interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void
    options?: SelectOption[]
    label?: string
}

const Select: React.FunctionComponent<SelectProps> = ({
    onOptionSelected: handler,
    options = [],
    label = 'Please select an option ...',
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onOptionSelected = (option: SelectOption, optionIndex: number) => {
        if (handler) {
            handler(option, optionIndex)
        }
    }

    const onLabelClick = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <div>
            <button onClick={() => onLabelClick()}>{label}</button>

            {isOpen ? (
                <ul>
                    {options?.map((op, idx) => {
                        return (
                            <li onClick={() => onOptionSelected(op, idx)} key={op.value}>
                                {op.label}
                            </li>
                        )
                    })}
                </ul>
            ) : null}
        </div>
    )
}

export default Select
