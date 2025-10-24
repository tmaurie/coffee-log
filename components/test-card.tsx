export default function TestCard({ test }: any) {
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold">{test.name}</h2>
      <p className="text-muted-foreground">
        Date: {new Date(test.date).toLocaleDateString()}
      </p>
      <p className="text-primary">Note: {test.rating} / 5</p>
      {/* Ajoute d'autres informations si nécessaire */}
    </div>
  );
}
