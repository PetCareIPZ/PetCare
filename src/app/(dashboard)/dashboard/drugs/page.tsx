import AnimatedSection from "~/components/public/ui/AnimatedSection";
import Icon from "~/components/Icon";

export default function LekiPage() {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        <Icon name="pills" /> Leki
      </h1>

      <AnimatedSection>
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Historia leków
          </h2>
          <p className="text-gray-600">
            Tutaj będziesz śledzić historię leków swoich zwierząt. Będziesz mógł dodawać nowe leki i przeglądać wcześniejsze.
          </p>
        </section>
      </AnimatedSection>
    </>
  );
}
