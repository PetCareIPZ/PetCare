import AnimatedSection from "~/components/public/ui/AnimatedSection";
import Icon from "~/components/Icon";

export default function SzczepieniaPage() {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        <Icon name="syringe" /> Szczepienia
      </h1>

      <AnimatedSection>
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Historia szczepień
          </h2>
          <p className="text-gray-600">
            Tutaj będziesz śledzić historię szczepień swoich zwierząt. Będziesz mógł dodawać nowe szczepienia i przeglądać wcześniejsze.
          </p>
        </section>
      </AnimatedSection>
    </>
  );
}
