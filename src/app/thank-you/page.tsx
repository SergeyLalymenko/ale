'use client';

import Link from 'next/link';
import { useSearchParams  } from 'next/navigation';
import { Routes } from '@/const/routes';
import Button from '@/UI/Button';

interface IParamsTranslations {
    [key: string]: string;
}

function ThankYou() {
    const searchParams: URLSearchParams = useSearchParams();
    const params: IParamsTranslations = Object.fromEntries(searchParams.entries());
    const paramsTranslations: IParamsTranslations = {
        name: 'Name',
        email: 'Email',
        assignment_description: 'Assignment Description',
        github_repo_url: 'GitHub Repository URL',
        candidate_level: 'Candidate Level'
    };

    return (
        <div className="flex flex-col items-center container mx-auto px-4 py-5">
            <p className="mt-8 mb-4 text-5xl">
                Thank you for submitting your assignment!
            </p>
            {
                Object.entries(params).map(([name, value]: string[], i) => (
                    <p key={i} className="mt-2">
                        {paramsTranslations[name]}: {value}
                    </p>
                ))
            }
            <Link href={Routes.HOME} className="mt-4">
                <Button type="button">
                    Back
                </Button>
            </Link>
        </div>
    )
}

export default ThankYou;
