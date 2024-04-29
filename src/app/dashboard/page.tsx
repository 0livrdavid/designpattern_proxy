"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-4">Dashboard</h1>
            <div className='flex justify-around'>
                <ul className="list-none my-4">
                    <li className="my-2"><Link href="/about" className="text-blue-500 hover:text-blue-800">About</Link></li>
                    <li className="my-2"><Link href="/contact" className="text-blue-500 hover:text-blue-800">Contact</Link></li>
                    <li className="my-2"><Link href="/profile" className="text-blue-500 hover:text-blue-800">Profile</Link></li>
                </ul>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 h-10 text-center rounded focus:outline-none focus:shadow-outline">
                    Logout
                </button>
            </div>
        </div>
    );
}
