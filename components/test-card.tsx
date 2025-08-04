
export default function TestCard({ test }: any) {
    return (
        <div className="p-4 border rounded shadow hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold">{test.name}</h2>
            <p className="text-gray-600">Date: {new Date(test.date).toLocaleDateString()}</p>
            <p className="text-yellow-500">Note: {test.rating} / 5</p>
            {/* Ajoute d'autres informations si nécessaire */}
        </div>
    );
}