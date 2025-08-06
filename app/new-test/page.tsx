import TestForm from "@/components/test-form";

export default function NewTestPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Ajouter un test café</h1>
      <TestForm />
    </main>
  );
}
