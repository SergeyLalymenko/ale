import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import './globals.css';

const poppinsSans = Poppins({
    weight: ['400', '600'],
    variable: "--font-poppins",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Ale",
    description: "Ale description",
};

function RootLayout({
   children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppinsSans.variable} bg-zinc-900 text-zinc-300`}>
                <Header />
                <main>{children}</main>
            </body>
        </html>
    );
}

export default RootLayout;
