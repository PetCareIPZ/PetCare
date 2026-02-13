import AnimatedSection from "~/components/public/ui/AnimatedSection";

export default function PrzypomnieniePage() {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        🔔 Przypomnienia
      </h1>

      <AnimatedSection>
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Zarządzaj przypomnieniami
          </h2>
          <p className="text-gray-600">
            Tutaj będziesz mógł ustawiać przypomnienia o wizytach, lekach i innych ważnych zdarzeniach dla swoich zwierząt.
          </p>
        </section>
      </AnimatedSection>
    </>
  );
}
