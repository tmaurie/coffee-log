"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Test } from "@/types/test";
import { Coffee } from "@/types/coffee";
import { Machine } from "@/types/machine";
import { SessionProvider, useSession } from "next-auth/react";

type CoffeeLogContext = {
  tests: Test[];
  coffees: Coffee[];
  machines: Machine[];
  addTest: (test: Test) => void;
  addCoffee: (coffee: Omit<Coffee, "id">) => Promise<void>;
  addMachine: (machine: Omit<Machine, "id">) => Promise<void>;
};

const CoffeeLogContext = createContext<CoffeeLogContext | undefined>(undefined);

const CafeLogProviderInner = ({ children }: { children: ReactNode }) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const { data: session } = useSession();
  const userId = (session?.user as any)?.id as string | undefined;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setCoffees([]);
        setMachines([]);
        return;
      }
      const [cRes, mRes] = await Promise.all([
        fetch("/api/coffees"),
        fetch("/api/machines"),
      ]);
      if (cRes.ok) {
        const cData = await cRes.json();
        setCoffees(cData);
      }
      if (mRes.ok) {
        const mData = await mRes.json();
        setMachines(mData);
      }
    };
    fetchData();
  }, [userId]);

  const addCoffee = async (coffee: Omit<Coffee, "id">) => {
    const res = await fetch("/api/coffees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coffee),
    });
    if (res.ok) {
      const newCoffee = await res.json();
      setCoffees((prev) => [...prev, newCoffee]);
    }
  };

  const addMachine = async (machine: Omit<Machine, "id">) => {
    const res = await fetch("/api/machines", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(machine),
    });
    if (res.ok) {
      const newMachine = await res.json();
      setMachines((prev) => [...prev, newMachine]);
    }
  };

  const addTest = (test: Test) => setTests((tests) => [...tests, test]);

  return (
    <CoffeeLogContext.Provider
      value={{ tests, coffees, machines, addTest, addCoffee, addMachine }}
    >
      {children}
    </CoffeeLogContext.Provider>
  );
};

export const CafeLogProvider = ({ children }: { children: ReactNode }) => (
  <SessionProvider>
    <CafeLogProviderInner>{children}</CafeLogProviderInner>
  </SessionProvider>
);

export const useCafeLog = () => {
  const context = useContext(CoffeeLogContext);
  if (!context)
    throw new Error("useCafeLog must be used within a CafeLogProvider");
  return context;
};
