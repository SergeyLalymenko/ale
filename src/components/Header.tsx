'use client'

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Routes } from '@/const/routes';

function Header() {
    const pathname = usePathname();

    return (
        <header className="w-full border-solid border-b border-zinc-700 bg-zinc-950">
            <div className="container mx-auto px-4 py-5">
                <ul className="flex items-center justify-center flex-wrap gap-5">
                    <Link
                        href={Routes.HOME}
                        className={`hover:text-emerald-600 transition-colors duration-200 ${clsx(pathname === '/' && "text-emerald-600")}`}
                    >
                        Home
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header;
