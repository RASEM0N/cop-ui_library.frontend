import React, { useRef, useState } from 'react'
import Text from '../../atoms/Text'
import cn from 'classnames'

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
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null)
    const labelRef = useRef<HTMLButtonElement>(null)
    let selectedOptions = selectedIndex === null ? null : options[selectedIndex]

    const onOptionSelected = (option: SelectOption, optionIndex: number) => {
        if (handler) {
            handler(option, optionIndex)
        }

        setSelectedIndex(optionIndex)
        setIsOpen(false)
    }

    const onLabelClick = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <div className="cui-select">
            <button ref={labelRef} className="cui-select__label" onClick={() => onLabelClick()}>
                <Text>{selectedOptions === null ? label : selectedOptions.label}</Text>
                <svg
                    className={cn('cui-select__caret', {
                        ['cui-select__caret--open']: isOpen,
                        ['cui-select__caret--closed']: !isOpen,
                    })}
                    width="1rem"
                    height="1rem"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen ? (
                <ul className="cui-select__overlay">
                    {options?.map((op, idx) => {
                        const isSelected = selectedIndex === idx
                        return (
                            <li
                                className={cn('cui-select__option', {
                                    ['cui-select__option--selected']: isSelected,
                                })}
                                onClick={() => onOptionSelected(op, idx)}
                                key={op.value}
                            >
                                <Text size="base">{op.label}</Text>{' '}
                                {isSelected ? (
                                    <svg
                                        width="1rem"
                                        height="1rem"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : null}
                            </li>
                        )
                    })}
                </ul>
            ) : null}
        </div>
    )
}

export default Select
