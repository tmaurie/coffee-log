"use client";

import React, {createContext, useContext, useState, ReactNode} from "react";
import {Test} from "@/types/test";
import {Coffee} from "@/types/coffee";
import {Machine} from "@/types/machine";
import {SessionProvider} from "next-auth/react";

type CoffeeLogContext = {
    tests: Test[];
    coffees: Coffee[];
    machines: Machine[];
    addTest: (test: Test) => void;
};

const CoffeeLogContext = createContext<CoffeeLogContext | undefined>(undefined);

export const CafeLogProvider = ({children}: { children: ReactNode }) => {
    const [tests, setTests] = useState<Test[]>([]);
    const [coffees, setCoffees] = useState<Coffee[]>([
        // Quelques exemples pour démarrer
        {
            id: "1",
            name: "Ethiopie Moka",
            origin: "Éthiopie",
            description: "lorem ipsum dolor sit amet.",
            tags: ["floral", "fruité"],
        },
        {
            id: "2",
            name: "Colombia Supremo",
            origin: "Colombie",
            description: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            tags: ["fruité", "acidulé"],
        },
    ]);
    const [machines, setMachines] = useState<Machine[]>([
        // Quelques exemples pour démarrer
        {
            id: "1",
            name: "Gaggia Classic",
            brand: "Gaggia",
            description: "Lorem ipsum dolor sit amet.",
        },
        {
            id: "2",
            name: "Delonghi Magnifica",
            brand: "Delonghi",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    ]);

    const addTest = (test: Test) => setTests((tests) => [...tests, test]);

    return (
        <SessionProvider>
            <CoffeeLogContext.Provider value={{tests, coffees, machines, addTest}}>
                {children}
            </CoffeeLogContext.Provider>
        </SessionProvider>
    );
};

export const useCafeLog = () => {
    const context = useContext(CoffeeLogContext);
    if (!context)
        throw new Error("useCafeLog must be used within a CafeLogProvider");
    return context;
};
