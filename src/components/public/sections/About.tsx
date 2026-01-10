import { Heart, Calendar, Bell, BookOpen, PawPrint } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <PawPrint className="w-8 h-8" />,
      title: "Profil zwierzaka",
      description: "Przechowuj wszystkie informacje o swoim pupilu w jednym miejscu - od daty urodzenia po ulubione smakołyki."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Wizyty",
      description: "Planuj i śledź wizyty u weterynarza, groomera czy trenera. Historia wizyt zawsze pod ręką."
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Przypomnienia",
      description: "Nie zapomnij o szczepieniach, odrobaczaniu czy regularnych wizytach kontrolnych."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Baza wiedzy",
      description: "Praktyczne porady, wskazówki i know-how dotyczące opieki nad Twoim czworonogiem."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">O PetCare</h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600">
            PetCare to kompleksowe narzędzie do zarządzania opieką nad Twoim pupilem. 
            Wszystko, czego potrzebujesz, w jednej aplikacji.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-secondary mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-secondary">
            <Heart className="w-5 h-5 fill-current" />
            <span className="text-sm font-medium">
              Stworzone z pasją dla pupili i ich opiekunów
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;