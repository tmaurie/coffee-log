'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Test } from '@/types/test';
import {Coffee} from "@/types/coffee";

type CoffeeLogContext = {
    tests: Test[];
    coffees: Coffee[];
    addTest: (test: Test) => void;
};

const CoffeeLogContext = createContext<CoffeeLogContext | undefined>(undefined);

export const CafeLogProvider = ({ children }: { children: ReactNode }) => {
    const [tests, setTests] = useState<Test[]>([]);
    const [coffees, setCoffees] = useState<Coffee[]>([
        // Quelques exemples pour démarrer
        { id: '1', name: 'Ethiopie Moka', origin: 'Éthiopie', description: 'Fruité, floral, très aromatique.' },
        { id: '2', name: 'Colombia Supremo', origin: 'Colombie', description: 'Rond, doux, équilibré.' },
    ]);
    const addTest = (test: Test) => setTests(tests => [...tests, test]);

    return (
        <CoffeeLogContext.Provider value={{ tests, coffees, addTest }}>
            {children}
        </CoffeeLogContext.Provider>
    );
};

export const useCafeLog = () => {
    const context = useContext(CoffeeLogContext);
    if (!context) throw new Error('useCafeLog must be used within a CafeLogProvider');
    return context;
};
