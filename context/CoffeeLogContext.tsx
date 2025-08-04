'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Test } from '@/types/test';

type CoffeeLogContext = {
    tests: Test[];
    addTest: (test: Test) => void;
};

const CoffeeLogContext = createContext<CoffeeLogContext | undefined>(undefined);

export const CafeLogProvider = ({ children }: { children: ReactNode }) => {
    const [tests, setTests] = useState<Test[]>([]);

    const addTest = (test: Test) => setTests(tests => [...tests, test]);

    return (
        <CoffeeLogContext.Provider value={{ tests, addTest }}>
            {children}
        </CoffeeLogContext.Provider>
    );
};

export const useCafeLog = () => {
    const context = useContext(CoffeeLogContext);
    if (!context) throw new Error('useCafeLog must be used within a CafeLogProvider');
    return context;
};
