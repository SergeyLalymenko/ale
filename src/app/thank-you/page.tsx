'use client'

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams  } from 'next/navigation';
import { Routes } from '@/const/routes';
import Button from '@/UI/Button';

interface IParamsTranslations {
    [key: string]: string;
}

const paramsTranslations: IParamsTranslations = {
    name: 'Name',
    email: 'Email',
    assignment_description: 'Assignment Description',
    github_repo_url: 'GitHub Repository URL',
    candidate_level: 'Candidate Level'
};

function ThankYouInner() {
    const searchParams = useSearchParams();

    function renderParams() {
        return Array.from(searchParams.entries()).map(([name, value]: string[], i) => (
            <p key={i} className="mt-2">
                {paramsTranslations[name]}: {value}
            </p>
        ));
    }

    return (
        <div className="flex flex-col items-center container mx-auto px-4 py-5">
            <p className="mt-8 mb-4 text-5xl">
                Thank you for submitting your assignment!
            </p>
            <Suspense fallback={<div>Loading...</div>}>
                {renderParams()}
            </Suspense>
            <Link href={Routes.HOME} className="mt-4">
                <Button type="button">
                    Back
                </Button>
            </Link>
        </div>
    )
}

function ThankYou() {

    return (
        <Suspense>
            <ThankYouInner />
        </Suspense>
    )
}

export default ThankYou;
