'use client'

import { useField } from 'formik';

interface IProps {
    name: string;
    type: string;
    label: string;
}

function Textarea({ label, ...props }: IProps) {
    const [field, { touched, error }] = useField(props.name);

    return (
        <div className="w-full">
            <label className="flex mb-1 text-xs">
                {label}
            </label>
            <textarea
                className="w-full border-solid border border-zinc-500 rounded p-2"
                {...field}
                {...props}
            />
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

export default Textarea;
