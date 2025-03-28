import Link from 'next/link';
import { Routes } from '@/const/routes';
import Button from '@/UI/Button';

function NotFound() {
    return (
        <div className="flex flex-col items-center container mx-auto px-4 py-5">
            <p className="mt-8 text-5xl">
                Page not found!
            </p>
            <Link href={Routes.HOME} className="mt-4">
                <Button type="button">
                    Home
                </Button>
            </Link>
        </div>
    )
}

export default NotFound;
