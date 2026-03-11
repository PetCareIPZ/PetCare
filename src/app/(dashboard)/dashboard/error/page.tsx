import Link from "next/link";

export default async function page({ searchParams }: { searchParams: Promise<{ message: string }> }) {
    const { message } = await searchParams;

    return (
        <div className="flex items-center justify-center py-8 bg-gray-50 min-h-screen">
            <div className="w-full max-w-3xl px-4">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8">
                    Coś poszło nie tak
                </h1>
                <p className="text-center text-gray-700 mb-4">{message}</p>
                <div className="text-center">
                    <Link
                        href="/dashboard"
                        className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-dark transition"
                    >
                        Powrót do dashboardu
                    </Link>
                </div>
            </div>
        </div>
    );
}