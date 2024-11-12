'use client';
import {useState} from 'react';
import { usePathname } from 'next/navigation';
export function Form({
  onSubmit,
  children,
}: {
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  children: React.ReactNode;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const pathname = usePathname();
  return (
    <form
      action={() => onSubmit({email,password, name})}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      {pathname === '/register' && <div>
        <label
          htmlFor="name"
          className="block text-xs text-gray-600 uppercase"
        >
          Username
        </label>
        <input value={name} onChange={(e) => setName(e.target.value)}
          id="name"
          name="name"
          type="text"
          placeholder="Username"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>}
      <div>
        <label
          htmlFor="email"
          className="block text-xs text-gray-600 uppercase"
        >
          Email Address
        </label>
        <input value={email} onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          type="email"
          placeholder="user@acme.com"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs text-gray-600 uppercase"
        >
          Password
        </label>
        <input value= {password} onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      {children}
    </form>
  );
}
