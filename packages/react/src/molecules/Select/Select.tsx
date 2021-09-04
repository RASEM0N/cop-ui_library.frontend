import React, {
    createRef,
    HTMLProps,
    KeyboardEventHandler,
    useEffect,
    useRef,
    useState,
} from 'react'
import Text from '../../atoms/Text'
import cn from 'classnames'

interface RenderOptionProps {
    isSelected: boolean
    option: SelectOption
    getOptionRecommendedProps: <T extends HTMLElement>(override?: HTMLProps<T>) => HTMLProps<T>
}

interface SelectOption {
    label: string
    value: string
}

interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void
    options?: SelectOption[]
    label?: string
    renderOptions?: (prop: RenderOptionProps) => React.ReactNode
}

const getNextOptionIndex = (
    currentIndex: number | null,
    options: SelectOption[],
    to: 'up' | 'down',
): number => {
    if (currentIndex === null) {
        return 0
    }

    if (currentIndex === options.length - 1 && to === 'down') {
        return 0
    }

    if (currentIndex === 0 && to === 'up') {
        return options.length - 1
    }

    return to === 'up' ? currentIndex - 1 : currentIndex + 1
}

const Select: React.FunctionComponent<SelectProps> = ({
    onOptionSelected: handler,
    options = [],
    label = 'Please select an option ...',
    renderOptions,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null)
    const [highlightedIndex, setHighlightedIndex] = useState<null | number>(null)
    const labelRef = useRef<HTMLButtonElement>(null)
    const [optionsRef, setOptionsRef] = useState<React.RefObject<HTMLLIElement>[]>([])
    let selectedOptions = selectedIndex === null ? null : options[selectedIndex]

    useEffect(() => {
        setOptionsRef(options?.map((_) => createRef<HTMLLIElement>()))
    }, [options?.length])

    useEffect(() => {
        if (highlightedIndex !== null && isOpen) {
            const ref = optionsRef[highlightedIndex]

            if (ref && ref.current) {
                ref.current.focus()
            }
        }
    }, [isOpen, highlightedIndex])

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

    const highLightItem = (optionIndex: number | null) => {
        setHighlightedIndex(optionIndex)
    }

    const onButtonKeyDown: KeyboardEventHandler = (event) => {
        event.preventDefault()

        if (['Enter', 'Space', 'ArrowDown'].includes(event.code)) {
            setIsOpen(true)

            highLightItem(0)
        }

        if (['Escape'].includes(event.code)) {
            setIsOpen(false)
        }
    }

    const onOptionKeyDown: KeyboardEventHandler = (event) => {
        const code = event.code

        console.log(code)

        if (code === 'Escape') {
            setIsOpen(false)
            return
        }

        if (code === 'ArrowDown') {
            const nextIndex = getNextOptionIndex(highlightedIndex, options, 'down')
            highLightItem(nextIndex)
            return
        }

        if (code === 'ArrowUp') {
            const nextIndex = getNextOptionIndex(highlightedIndex, options, 'up')
            highLightItem(nextIndex)
            return
        }

        if (code === 'Enter') {
            onOptionSelected(options[highlightedIndex!], highlightedIndex!)
            return
        }
    }

    return (
        <div className="cui-select">
            <button
                onKeyDown={onButtonKeyDown}
                aria-controls="cui-select-list"
                aria-haspopup={true}
                aria-expanded={isOpen ? true : undefined}
                ref={labelRef}
                className="cui-select__label"
                onClick={() => onLabelClick()}
            >
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
                <ul role="menu" id="cui-select-list" className="cui-select__overlay">
                    {options?.map((op, idx) => {
                        const isSelected = selectedIndex === idx
                        const isHighlighted = highlightedIndex === idx
                        const ref = optionsRef[idx]

                        const renderOptionProps = {
                            option: op,
                            isSelected,
                            getOptionRecommendedProps: (override?) => {
                                return {
                                    ref,
                                    tabIndex: isHighlighted ? -1 : 0,
                                    className: cn('cui-select__option', {
                                        ['cui-select__option--selected']: isSelected,
                                        ['cui-select__option--highlighted']: isHighlighted,
                                    }),
                                    onKeyDown: onOptionKeyDown,
                                    onMouseEnter: () => highLightItem(idx),
                                    onMouseLeave: () => highLightItem(null),
                                    onClick: () => onOptionSelected(op, idx),
                                    key: op.value,
                                    ...override,
                                }
                            },
                        } as RenderOptionProps

                        if (renderOptions) {
                            return renderOptions(renderOptionProps)
                        }

                        return (
                            <li {...renderOptionProps.getOptionRecommendedProps<HTMLLIElement>()}>
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
