'use client'

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Routes } from '@/const/routes';
import {
    getLevels,
    ILevelResponse,
    submitAssignments,
    IAssignmentsResponse,
    IAssignmentsValues
} from '@/services/candidatesService';
import Input from '@/UI/Input';
import Textarea from '@/UI/Textarea';
import Select from '@/UI/Select';
import Button from '@/UI/Button';
import { ISelectOption } from '@/UI/types';

interface IFormValues extends IAssignmentsValues {
    apiErrors?: string[];
}

const initialValues: IFormValues = {
    name: '',
    email: '',
    assignment_description: '',
    github_repo_url: '',
    candidate_level: ''
};

function createSchema(levels: string[] = []) {
    const levelsString = `${levels.slice(0, -1).join(', ')}  or ${levels[levels.length - 1]}`;
    const shape: Record<string, Yup.AnySchema> = {
        name: Yup.string()
            .required('Name is required.'),
        email: Yup.string()
            .required('Email is required.')
            .email('Email must be a valid email address.'),
        assignment_description: Yup.string()
            .required('Assignment description is required.')
            .min(10, 'Assignment description must be at least 10 characters.'),
        github_repo_url: Yup.string()
            .required('GitHub Repository URL is required.')
            .url('GitHub Repository URL must be a valid URL.'),
        candidate_level: Yup.string()
            .required(`Candidate level must be one of ${levelsString}.`)
            .oneOf(levels, `Candidate level must be one of ${levelsString}.`)
    };

    return Yup.object().shape(shape);
}

function CandidateForm() {
    const router = useRouter();

    const [schema, setSchema] = useState<Yup.ObjectSchema<any> | null>(null);
    const [levels, setLevels] = useState<string[]>([]);
    const [fetchError, setFetchError] = useState<string>('');

    useEffect(() => {
        fetchLevels();
    }, []);

    const candidateLevelsOptions: ISelectOption[] = useMemo(() => {
        const activeOptions: ISelectOption[] = levels.map((level: string): ISelectOption => ({
            key: crypto.randomUUID(),
            text: level,
            value: level,
            disabled: false
        }));

        return [
            {
                key: crypto.randomUUID(),
                text: 'Select a level',
                value: '',
                disabled: true
            },
            ...activeOptions
        ];
    }, [levels]);

    async function fetchLevels() {
        try {
            const { levels }: ILevelResponse = await getLevels();
            setSchema(createSchema(levels));
            setLevels(levels);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setFetchError(err.message);
            } else {
                setFetchError('Unable to fetch levels!');
            }
        }
    }

    async function onFormSubmit(values: IFormValues, { setErrors }: FormikHelpers<IFormValues>) {
        try {
            const { status, errors }: IAssignmentsResponse = await submitAssignments(values);
            if (status === 'success') {
                const record: Record<string, string> = values as unknown as Record<string, string>;
                const queryString: string = new URLSearchParams(record).toString();
                router.push(`${Routes.THANK_YOU}?${queryString}`);
                return;
            }
            setErrors({
                // @ts-ignore
                apiErrors: errors
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                setFetchError(err.message);
            } else {
                setFetchError('Unable to fetch levels!');
            }
        }
    }

    if (fetchError) {
        return <p>{fetchError}</p>;
    }

    if (!schema) {
        return <p>Loading...</p>;
    }

    return (
        <Formik<IFormValues>
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onFormSubmit}
        >
            {({ errors, isSubmitting }: FormikProps<IFormValues>) => (
                <Form className="flex flex-col items-center">
                    <div className="flex flex-col gap-2 w-full">
                        <Input name="name" type="text" label="Name *" />
                        <Input name="email" type="text" label="Email *" />
                        <Textarea name="assignment_description" type="text" label="Assignment Description *" />
                        <Input name="github_repo_url" type="text" label="GitHub Repository URL *" />
                        <Select name="candidate_level" label="Candidate Level *" options={candidateLevelsOptions} />
                    </div>
                    {
                        errors.apiErrors?.length ? (
                            // @ts-ignore
                            errors.apiErrors.map((error: string, i: number) => {
                                return (
                                    <p
                                        key={i}
                                        className="mt-1 text-xs text-red-700 font-semibold w-full"
                                    >
                                        {error}
                                    </p>
                                );
                            })
                        ) : ''
                    }
                    <Button type="submit" disabled={isSubmitting}>Submit Assignment</Button>
                </Form>
            )}
        </Formik>
    )
}

export default CandidateForm;
