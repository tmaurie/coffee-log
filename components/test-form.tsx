'use client';
import { useState } from 'react';
import { useCafeLog } from '@/context/CoffeeLogContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

type TestFormFields = {
    date: string;
    cafe: string;
    machine: string;
    beverageType: string;
    quantity: number;
    temperature: number;
    pressure: number;
    grindSize: string;
    intensity: number;
    bitterness: number;
    acidity: number;
    rating: number;
    comment: string;
    favorite: boolean;
};

const defaultForm: TestFormFields = {
    date: new Date().toISOString().slice(0, 10),
    cafe: '',
    machine: '',
    beverageType: '',
    quantity: 30,
    temperature: 92,
    pressure: 9,
    grindSize: '',
    intensity: 3,
    bitterness: 3,
    acidity: 3,
    rating: 3,
    comment: '',
    favorite: false,
};

export default function TestForm() {
    const [form, setForm] = useState<TestFormFields>(defaultForm);
    const { addTest } = useCafeLog();
    const router = useRouter();

    // Helpers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleSlider = (name: keyof TestFormFields, value: number[]) => {
        setForm(prev => ({ ...prev, [name]: value[0] }));
    };

    const handleSwitch = (checked: boolean) => {
        setForm(prev => ({ ...prev, favorite: checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTest({ ...form, id: uuidv4() });
        setForm(defaultForm);
        router.push('/tests');
    };

    return (
        <form className="max-w-2xl mx-auto space-y-8" onSubmit={handleSubmit}>

            {/* 1. Conditions */}
            <Card>
                <CardHeader>
                    <CardTitle>Conditions du test</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="block mb-1 font-semibold">Date</label>
                        <Input type="date" name="date" value={form.date} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Café utilisé</label>
                        <Input name="cafe" value={form.cafe} onChange={handleChange} required placeholder="Ex: Ethiopie Moka" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Machine</label>
                        <Input name="machine" value={form.machine} onChange={handleChange} required placeholder="Ex: Gaggia Classic" />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Type de boisson</label>
                        <Input name="beverageType" value={form.beverageType} onChange={handleChange} required placeholder="Expresso, Lungo, ..." />
                    </div>
                </CardContent>
            </Card>

            {/* 2. Caractéristiques infusion */}
            <Card>
                <CardHeader>
                    <CardTitle>Caractéristiques de l’infusion</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="block mb-1 font-semibold">Quantité d’eau (ml)</label>
                        <Input type="number" name="quantity" value={form.quantity} min={10} max={500} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Température (°C)</label>
                        <Input type="number" name="temperature" value={form.temperature} min={60} max={100} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Pression (bar)</label>
                        <Input type="number" name="pressure" value={form.pressure} min={1} max={15} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Mouture</label>
                        <Input name="grindSize" value={form.grindSize} onChange={handleChange} placeholder="Fine, moyenne, grosse..." />
                    </div>
                </CardContent>
            </Card>

            {/* 3. Évaluation sensorielle */}
            <Card>
                <CardHeader>
                    <CardTitle>Évaluation sensorielle</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="block mb-1 font-semibold">Intensité</label>
                        <Slider min={1} max={5} step={1} value={[form.intensity]} onValueChange={v => handleSlider('intensity', v)} />
                        <span className="text-sm">Niveau : {form.intensity}</span>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Amertume</label>
                        <Slider min={1} max={5} step={1} value={[form.bitterness]} onValueChange={v => handleSlider('bitterness', v)} />
                        <span className="text-sm">Niveau : {form.bitterness}</span>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Acidité</label>
                        <Slider min={1} max={5} step={1} value={[form.acidity]} onValueChange={v => handleSlider('acidity', v)} />
                        <span className="text-sm">Niveau : {form.acidity}</span>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Note globale</label>
                        <Slider min={1} max={5} step={1} value={[form.rating]} onValueChange={v => handleSlider('rating', v)} />
                        <span className="text-sm">Note : {form.rating} / 5</span>
                    </div>
                </CardContent>
            </Card>

            {/* 4. Avis & favori */}
            <Card>
                <CardHeader>
                    <CardTitle>Avis & favori</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Commentaire (optionnel)</label>
                        <Textarea name="comment" value={form.comment} onChange={handleChange} placeholder="Donne ton avis, ton astuce, une anecdote…" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Switch checked={form.favorite} onCheckedChange={handleSwitch} id="fav-switch" />
                        <label htmlFor="fav-switch" className="font-semibold">Marquer comme favori</label>
                    </div>
                </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end">
                <Button type="submit" size="lg" className="bg-amber-700 hover:bg-amber-800 text-white">Ajouter le test</Button>
            </div>
        </form>
    );
}
