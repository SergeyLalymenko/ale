'use client'

import { useField } from 'formik';
import { ISelectOption } from '@/UI/types';

interface IProps {
    name: string;
    label: string;
    options: ISelectOption[];
}

function Select({ label, options, ...props }: IProps) {
    const [field, { touched, error }] = useField(props.name);

    return (
        <div className="w-full">
            <label className="flex mb-1 text-xs">
                {label}
            </label>
            <select
                className="w-full border-solid border border-zinc-500 rounded p-2 cursor-pointer
                appearance-none bg-[url('/images/chevron-down.svg')] bg-no-repeat bg-[top_50%_right_16px]"
                {...field}
                {...props}
            >
                {
                    options.map((option: ISelectOption) => (
                        <option
                            key={option.key}
                            value={option.value}
                            disabled={option.disabled}
                            className="text-gray-700"
                        >
                            {option.text}
                        </option>
                    ))
                }
            </select>
            {
                touched && error ? (
                    <p className="mt-1 text-xs text-red-700">
                        {error}
                    </p>
                ) : ''
            }
        </div>
    )
}

export default Select;
