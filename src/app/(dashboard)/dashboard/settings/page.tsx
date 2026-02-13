import { currentUser } from "@clerk/nextjs/server";
import AnimatedSection from "~/components/public/ui/AnimatedSection";

export default async function UstawieniaPage() {
  const user = await currentUser();

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
        ⚙️ Ustawienia Konta
      </h1>

      <AnimatedSection>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dane profilu</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Imię</label>
                <p className="text-gray-900 text-lg rounded">{user?.firstName || "Brak danych"}</p>
              </div>

              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nazwisko</label>
                <p className="text-gray-900 text-lg rounded">{user?.lastName || "Brak danych"}</p>
              </div>

              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <p className="text-gray-900 text-lg rounded">{user?.emailAddresses?.[0]?.emailAddress || "Brak danych"}</p>
              </div>

              <div className="pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Użytkownika</label>
                <p className="text-gray-600 text-sm rounded break-all">{user?.id || "Brak danych"}</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Inne ustawienia
          </h2>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Powiadomienia</h3>
              <p className="text-sm text-gray-600">Zmień preferencje powiadomień</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Bezpieczeństwo</h3>
              <p className="text-sm text-gray-600">Zmień hasło i ustawienia bezpieczeństwa</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Prywatność</h3>
              <p className="text-sm text-gray-600">Zarządzaj ustawieniami prywatności</p>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
