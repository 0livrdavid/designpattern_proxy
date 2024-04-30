"use client"; 

import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from './server_config';


export default function Home() {
    const [email, setEmail] = useState<string>('');
    const [password_hash, setPassword_hash] = useState<string>(''); 
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

     const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();  
          setLoading(true);
          setError('');

          try {
               const response = await fetch(`${API_BASE_URL}session`, { 
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json', 
                    },
                    body: JSON.stringify({ email: email, password_hash: password_hash }), 
               }); 
               const data = await response.json();
               if (response.ok) {
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("session", JSON.stringify(data.session))
                    router.push('/dashboard');
               } else { 
                    throw new Error(data?.message);
               }
          } catch (err) {
               if (err instanceof Error) {
                    setError(err.message);
               } else {
                    setError('An unexpected error occurred');
               }
          } finally {
               setLoading(false);
          }
     };

     return (
          <>
               <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                         <img
                         className="mx-auto h-12 w-auto"
                         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                         alt="Your Company"
                         />
                         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                         Entre com sua conta
                         </h2>
                         {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                         <form className="space-y-6" onSubmit={handleSubmit}>
                         <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                   Usuário
                              </label>
                              <div className="mt-1">
                                   <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   />
                              </div>
                         </div>

                         <div>
                              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                   Senha
                              </label>
                              <div className="mt-1">
                                   <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password_hash}
                                        onChange={(e) => setPassword_hash(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                   />
                              </div>
                         </div>

                         <div>
                              <button
                                   type="submit"
                                   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                   disabled={loading}
                              >
                                   {loading ? 'Carregando...' : 'Entrar'}
                              </button>
                         </div>
                         </form>

                         <p className="mt-2 text-center text-sm text-gray-600">
                         Não é um membro?{' '}
                         <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                              Crie sua conta
                         </a>
                         </p>
                    </div> 
               </div>
          </>
     );
}
