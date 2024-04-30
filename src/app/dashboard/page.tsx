"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../server_config';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";

export default function Dashboard() {
    const router = useRouter();
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}users`, { 
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    },
                }); 
                const data = await response.json();
                if (response.ok) {
                    setUsersData(data.content.map(user => ({
                        ...user,
                        created_at: new Date(user.created_at).toLocaleString('pt-BR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })
                    })));
                } else { 
                    throw new Error(data?.message);
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
                router.push('/');
            }
        };
        fetchUsers();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('session');
        router.push('/');
    };

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'email', label: 'Email' },
        { key: 'created_at', label: 'Criado em' }
    ];

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-4">Dashboard</h1>
            <div className='flex justify-around'>
                <Table aria-label="Example table with dynamic content">
                    <TableHeader>
                        {columns.map((column) =>
                            <TableColumn key={column.key}>{column.label}</TableColumn>
                        )}
                    </TableHeader>
                    <TableBody>
                        {usersData.map((user) =>
                            <TableRow key={user.id}>
                                {columns.map((column) =>
                                    <TableCell key={column.key}>{user[column.key]}</TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 h-10 text-center rounded focus:outline-none focus:shadow-outline">
                    Logout
                </button>
            </div>
        </div>
    );
}
