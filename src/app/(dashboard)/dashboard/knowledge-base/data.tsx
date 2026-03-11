
export const categoryData = {
  zdrowie: {
    title: "Zdrowie i profilaktyka",
    color: "text-red-600",
    bg: "bg-red-50",
    articles: [
      {
        id: "szczepienia",
        title: "Harmonogram szczepień 2026",
        content: "Szczepienia chronią Twojego pupila przed śmiertelnymi chorobami zakaźnymi. Każdy pies i kot powinien mieć indywidualny kalendarz dostosowany do trybu życia.",
        readTime: "5 min",
        points: ["Wścieklizna (obowiązkowa)", "Choroby zakaźne (podstawowe)", "Kaszel kenelowy", "Leptospiroza"]
      },
      {
        id: "kleszcze",
        title: "Jak prawidłowo usunąć kleszcza?",
        content: "Czas reakcji ma kluczowe znaczenie. Im szybciej usuniesz pasożyta, tym mniejsze ryzyko zarażenia groźnymi chorobami.",
        readTime: "3 min",
        points: ["Użyj pęsety lub lassa", "Chwyć kleszcza przy samej skórze", "Wyciągnij zdecydowanym ruchem", "Zdezynfekuj miejsce wkłucia"]
      },
      {
        id: "zeby",
        title: "Higiena jamy ustnej",
        content: "Kamień nazębny prowadzi do stanów zapalnych dziąseł i chorób narządów wewnętrznych.",
        readTime: "4 min",
        points: ["Codzienne szczotkowanie", "Gryzaki dentystyczne", "Regularna kontrola u lekarza", "Specjalne dodatki do wody"]
      },
      {
        id: "kastracja",
        title: "Kastracja i sterylizacja - fakty",
        content: "Zabieg ten zapobiega wielu chorobom nowotworowym oraz ogranicza bezdomność zwierząt.",
        readTime: "6 min",
        points: ["Zmniejszenie ryzyka nowotworów", "Stabilizacja gospodarki hormonalnej", "Eliminacja urojonych ciąż", "Dłuższe życie pupila"]
      },
      {
        id: "badania-krwi",
        title: "Dlaczego warto badać krew?",
        content: "Regularne badania pozwalają wykryć choroby nerek czy wątroby, zanim pojawią się objawy kliniczne.",
        readTime: "5 min",
        points: ["Morfologia", "Profil biochemiczny", "Poziom glukozy", "Oznaczenie hormonów tarczycy"]
      },
      {
        id: "nadwaga",
        title: "Otyłość to choroba",
        content: "Nadmiar kilogramów obciąża stawy, serce i zwiększa ryzyko cukrzycy u psów i kotów.",
        readTime: "5 min",
        points: ["Kontrola porcji posiłków", "Zwiększenie aktywności", "Wyeliminowanie podjadania", "Regularne ważenie"]
      },
      {
        id: "pasozyty-wew",
        title: "Odrobaczanie krok po kroku",
        content: "Pasożyty wewnętrzne są groźne nie tylko dla zwierząt, ale również dla ich właścicieli.",
        readTime: "4 min",
        points: ["Badanie kału", "Dobór preparatu przez lekarza", "Regularność co 3-6 miesięcy", "Ochrona przed pchłami (nosiciele tasiemca)"]
      },
      {
        id: "senior",
        title: "Opieka nad seniorem",
        content: "Starsze zwierzęta wymagają częstszych kontroli i modyfikacji diety oraz suplementacji stawów.",
        readTime: "7 min",
        points: ["Badania kontrolne co pół roku", "Suplementacja kwasami Omega-3", "Wsparcie dla stawów", "Kontrola wagi"]
      },
      {
        id: "oczy-uszy",
        title: "Pielęgnacja oczu i uszu",
        content: "Częste infekcje uszu mogą świadczyć o alergii. Oczy wymagają codziennej uwagi u ras brachycefalicznych.",
        readTime: "3 min",
        points: ["Przemywanie specjalnym płynem", "Obserwacja wydzieliny", "Brak ingerencji patyczkami", "Przycinanie włosów w okolicy"]
      },
      {
        id: "pierwsza-pomoc",
        title: "Apteczka pierwszej pomocy",
        content: "W każdym domu powinien znajdować się zestaw ratunkowy dla psa i kota na nagłe wypadki.",
        readTime: "5 min",
        points: ["Bandaże i gazy", "Środek odkażający", "Sól fizjologiczna", "Numer do kliniki całodobowej"]
      }
    ]
  },
  zywienie: {
    title: "Żywienie",
    color: "text-orange-600",
    bg: "bg-orange-50",
    articles: [
      {
        id: "zakazane",
        title: "Toksyczne produkty w kuchni",
        content: "Wiele produktów bezpiecznych dla ludzi jest śmiertelnie groźnych dla zwierząt.",
        readTime: "6 min",
        points: ["Czekolada i kakao", "Cebula, czosnek i szczypiorek", "Winogrona i rodzynki", "Ksylitol (słodzik)"]
      },
      {
        id: "karma-sklad",
        title: "Jak czytać skład karmy?",
        content: "Naucz się odróżniać wysokiej jakości mięso od produktów pochodzenia zwierzęcego.",
        readTime: "8 min",
        points: ["Mięso na pierwszym miejscu", "Brak zbędnych zbóż", "Jasne nazewnictwo składników", "Brak sztucznych konserwantów"]
      },
      {
        id: "barf",
        title: "Podstawy diety BARF",
        content: "Dieta oparta na surowym mięsie, podrobach i kościach wymaga dużej wiedzy właściciela.",
        readTime: "10 min",
        points: ["Zbilansowane proporcje", "Suplementacja naturalna", "Badania krwi co pół roku", "Dbałość o świeżość produktów"]
      },
      {
        id: "woda",
        title: "Znaczenie nawodnienia",
        content: "Koty mają niski próg pragnienia, co często prowadzi do problemów z nerkami.",
        readTime: "4 min",
        points: ["Dostęp do świeżej wody", "Fontanny dla kotów", "Dolewanie wody do karmy", "Podawanie karmy mokrej"]
      },
      {
        id: "alergia",
        title: "Alergie pokarmowe",
        content: "Częste drapanie się i luźne stolce mogą być wynikiem nietolerancji na konkretne białko.",
        readTime: "6 min",
        points: ["Dieta eliminacyjna", "Testy alergiczne", "Wybór monobiałkowej karmy", "Wyeliminowanie drobiu i zbóż"]
      },
      {
        id: "szczeniak-dieta",
        title: "Karmienie rosnącego psa",
        content: "Szczenięta ras dużych wymagają precyzyjnego balansu wapnia i fosforu dla zdrowych stawów.",
        readTime: "5 min",
        points: ["Energia na odpowiednim poziomie", "Wysoka jakość białka", "Suplementy na stawy", "Regularne pory posiłków"]
      },
      {
        id: "smaczki",
        title: "Zdrowe przysmaki",
        content: "Trening wymaga nagród, ale pamiętaj, że smakołyki to dodatkowe kalorie.",
        readTime: "3 min",
        points: ["Suszone mięso", "Warzywa (np. marchew)", "Owoce (np. jabłko)", "Ograniczenie produktów zbożowych"]
      },
      {
        id: "gotowanie",
        title: "Domowe jedzenie - czy warto?",
        content: "Gotowanie w domu pozwala kontrolować skład, ale musi być poparte suplementacją witaminową.",
        readTime: "7 min",
        points: ["Udział mięsa, warzyw i wypełniacza", "Dodatek wapnia", "Unikanie przypraw i soli", "Konsultacja z dietetykiem"]
      },
      {
        id: "warzywa",
        title: "Bezpieczne warzywa i owoce",
        content: "Niektóre owoce i warzywa to świetne źródło błonnika i witamin.",
        readTime: "4 min",
        points: ["Dynia (dobra na trawienie)", "Jagody (antyoksydanty)", "Ogórek (niskokaloryczny)", "Banan (źródło potasu)"]
      },
      {
        id: "pory-karmienia",
        title: "Harmonogram posiłków",
        content: "Stałe pory karmienia regulują metabolizm i pomagają w utrzymaniu czystości.",
        readTime: "4 min",
        points: ["Dorosły pies: 2-3 posiłki", "Szczenię: 4-5 posiłków", "Brak wysiłku po jedzeniu (skręt żołądka)", "Czyszczenie misek"]
      }
    ]
  },
  trening: {
    title: "Wychowanie i trening",
    color: "text-blue-600",
    bg: "bg-blue-50",
    articles: [
      {
        id: "siad",
        title: "Nauka komendy 'Siad' w 5 minut",
        content: "To podstawowa komenda, która pomaga opanować emocje psa. Wykorzystujemy tutaj metodę naprowadzania.",
        readTime: "4 min",
        points: ["Użyj smakołyka jako magnesu", "Naprowadzaj nad głowę psa", "Zaznacz moment siadania", "Nagródź w ciągu 2 sekund"]
      },
      {
        id: "czystosc",
        title: "Nauka czystości szczeniaka",
        content: "Kluczem do sukcesu jest cierpliwość, regularne spacery i brak karania za wpadki.",
        readTime: "7 min",
        points: ["Spacer po każdym spaniu i jedzeniu", "Nagradzanie za załatwienie się na zewnątrz", "Zmywanie zapachów środkami enzymatycznymi", "Obserwacja sygnałów psa"]
      },
      {
        id: "smycz",
        title: "Chodzenie na luźnej smyczy",
        content: "Smycz ma być połączeniem, a nie narzędziem do sterowania psem przez siłę.",
        readTime: "6 min",
        points: ["Zatrzymywanie się, gdy smycz jest napięta", "Nagradzanie za patrzenie na przewodnika", "Trening krótkimi sesjami", "Używanie odpowiedniego sprzętu"]
      },
      {
        id: "przywolanie",
        title: "Przywołanie idealne",
        content: "Pies musi wiedzieć, że powrót do Ciebie to najlepsza rzecz na świecie.",
        readTime: "8 min",
        points: ["Budowanie silnej motywacji", "Brak karania po przyjściu", "Używanie gwizdka (opcjonalnie)", "Nagradzanie ekstra smakołykami"]
      },
      {
        id: "lek-separacyjny",
        title: "Samotność w domu",
        content: "Lęk separacyjny to poważny problem, który wymaga powolnego odczulania zostawania samemu.",
        readTime: "10 min",
        points: ["Używanie zabawek na jedzenie", "Krótkie sesje wychodzenia", "Brak wylewnych powitań", "Konsultacja z behawiorystą"]
      },
      {
        id: "socjalizacja",
        title: "Złoty okres socjalizacji",
        content: "To co szczeniak pozna do 14 tygodnia życia, zaprocentuje w dorosłości.",
        readTime: "6 min",
        points: ["Poznawanie różnych powierzchni", "Kontakt z łagodnymi psami", "Dźwięki miasta i urządzeń", "Wizyty w nowych miejscach"]
      },
      {
        id: "klatka",
        title: "Klatka kennelowa - azyl",
        content: "Klatka powinna być dla psa sypialnią i bezpiecznym schronieniem, nigdy karą.",
        readTime: "7 min",
        points: ["Prawidłowy dobór rozmiaru", "Wprowadzanie przez karmienie w klatce", "Stopniowe zamykanie drzwiczek", "Ciche miejsce w domu"]
      },
      {
        id: "aport",
        title: "Jak nauczyć aportowania?",
        content: "Zabawa w przynoszenie przedmiotów to świetny sposób na budowanie więzi i zmęczenie psa.",
        readTime: "5 min",
        points: ["Wybór ulubionej zabawki", "Wymiana na smakołyk", "Nagroda za puszczenie przedmiotu", "Krótkie sesje, by pies czuł niedosyt"]
      },
      {
        id: "kot-trening",
        title: "Czy kota można trenować?",
        content: "Koty świetnie uczą się przez kliker, jeśli tylko znajdziesz odpowiednią motywację.",
        readTime: "6 min",
        points: ["Trening z klikerem", "Ulubione pasty mięsne", "Krótkie sesje (2-3 minuty)", "Nauka targetowania"]
      },
      {
        id: "agresja",
        title: "Reaktywność na spacerach",
        content: "Szczekanie na inne psy często wynika ze strachu, a nie z agresji.",
        readTime: "9 min",
        points: ["Zwiększanie dystansu", "Wyłapywanie spokojnego patrzenia", "Brak szarpania smyczą", "Praca nad pewnością siebie psa"]
      }
    ]
  },
  opieka: {
    title: "Opieka ogólna",
    color: "text-green-600",
    bg: "bg-green-50",
    articles: [
      {
        id: "pazury",
        title: "Pielęgnacja pazurów i łap",
        content: "Zbyt długie pazury zmieniają mechanikę ruchu i powodują ból stawów.",
        readTime: "5 min",
        points: ["Używaj ostrych gilotyntek", "Uważaj na macierz (rdzeń)", "Skracaj po milimetrze", "Nagradzaj po każdym palcu"]
      },
      {
        id: "siersc",
        title: "Czesanie i kąpiele",
        content: "Dobór odpowiednich narzędzi do typu okrywy włosowej to podstawa pielęgnacji.",
        readTime: "6 min",
        points: ["Wybór szczotki/pudlówki", "Kąpiel tylko w psich szamponach", "Dokładne suszenie po myciu", "Usuwanie kołtunów"]
      },
      {
        id: "wyprawka",
        title: "Wyprawka dla psa/kota",
        content: "Co warto kupić, zanim nowy członek rodziny pojawi się w domu.",
        readTime: "5 min",
        points: ["Legowisko dopasowane do wielkości", "Ceramiczne lub metalowe miski", "Bezpieczne szelki i smycz", "Zabawki edukacyjne"]
      },
      {
        id: "podroz",
        title: "Bezpieczna podróż autem",
        content: "Zwierzę w aucie musi być zabezpieczone tak samo jak pasażer.",
        readTime: "4 min",
        points: ["Szelki z atestem do pasów", "Transporter w bagażniku lub na siedzeniu", "Brak karmienia tuż przed drogą", "Częste postoje na wodę"]
      },
      {
        id: "dom",
        title: "Przygotowanie bezpiecznego domu",
        content: "Sprawdź, czy Twój dom nie kryje pułapek na ciekawskiego szczeniaka lub kociaka.",
        readTime: "6 min",
        points: ["Zabezpieczenie kabli", "Usunięcie trujących roślin", "Blokada szafek z chemią", "Siatki na oknach (dla kotów)"]
      },
      {
        id: "upały",
        title: "Opieka podczas upałów",
        content: "Udar cieplny u psa może nastąpić bardzo szybko, szczególnie u ras krótkopyskych.",
        readTime: "5 min",
        points: ["Spacery wcześnie rano i późno wieczorem", "Dostęp do maty chłodzącej", "Nigdy nie zostawiaj psa w aucie!", "Chłodna woda zawsze pod ręką"]
      },
      {
        id: "zima",
        title: "Zimowa pielęgnacja",
        content: "Sól na chodnikach i mróz to wyzwanie dla delikatnych opuszek łap.",
        readTime: "4 min",
        points: ["Smarowanie łap wazeliną/woskiem", "Mycie łap po każdym spacerze", "Ubranka dla psów bez podszerstka", "Krótsze spacery w mrozy"]
      },
      {
        id: "zabawa",
        title: "Stymulacja umysłowa",
        content: "Zmęczenie umysłowe jest równie ważne co wysiłek fizyczny.",
        readTime: "5 min",
        points: ["Maty węchowe", "Zabawki typu Kong", "Nauka nowych sztuczek", "Zabawa w chowanego (szukanie smaczków)"]
      },
      {
        id: "kuweta",
        title: "Idealna kuweta dla kota",
        content: "Problemy z załatwianiem się poza kuwetą często wynikają z jej złego ustawienia.",
        readTime: "6 min",
        points: ["Liczba kuwet: n+1 (liczba kotów + 1)", "Ciche i spokojne miejsce", "Dobór odpowiedniego żwirku", "Regularne czyszczenie"]
      },
      {
        id: "identyfikacja",
        title: "Czipowanie i adresówki",
        content: "Zgubienie zwierzaka to ogromny stres. Zadbaj o to, by szybko do Ciebie wrócił.",
        readTime: "3 min",
        points: ["Rejestracja czipa w bazie (np. Safe Animal)", "Czytelna adresówka przy obroży", "Aktualny numer telefonu", "Zdjęcie pupila w telefonie"]
      }
    ]
  }
};