'use client';
import { useState } from 'react';
import { useCafeLog } from '@/context/CoffeeLogContext';
import { Test } from '@/types/test';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function TestForm() {
    const { addTest } = useCafeLog();
    const router = useRouter();
    const [form, setForm] = useState<Partial<Test>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTest({ ...(form as Test), id: uuidv4() });
        router.push('/tests');
    };

    return (
        <form className="grid gap-4" onSubmit={handleSubmit}>
            <input name="cafe" placeholder="Nom du café" onChange={handleChange} className="input" />
            <input name="machine" placeholder="Machine" onChange={handleChange} className="input" />
            <input name="beverageType" placeholder="Type de boisson" onChange={handleChange} className="input" />
            <input name="rating" placeholder="Note sur 5" type="number" min={1} max={5} onChange={handleChange} className="input" />
            {/* Ajoute les autres champs */}
            <button type="submit" className="btn btn-primary">Ajouter</button>
        </form>
    );
}
