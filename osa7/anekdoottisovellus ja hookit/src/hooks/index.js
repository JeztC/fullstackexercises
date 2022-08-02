import {useState} from "react";

export const useField = type => {
    const [value, setValue] = useState('')

    const onChange = event => {
        setValue(event.target.value)
    }

    const resetInput = e => {
        e.preventDefault()
        setValue('')
    }

    return {
        type,
        value,
        setValue,
        resetInput,
        onChange
    }
}