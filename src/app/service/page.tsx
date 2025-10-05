import { Button } from '@/components/ui/button'
import { Wrench, Shield, Clock, Phone, CheckCircle, Car, Users, Award, Settings, Package, ShieldCheck, Truck } from 'lucide-react'
import Layout from '@/components/layout'

export default function ServicePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Nasze usługi</h1>
            <p className="text-xl text-blue-100">
              Oferujemy kompleksowe usługi serwisowe dla wszystkich marek
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nasze usługi</h2>
            <p className="text-lg text-gray-600">
              Oferujemy kompleksowe usługi serwisowe dla wszystkich marek samochodów
            </p>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Serwis */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Serwis</h3>
              <p className="text-gray-600 mb-6">
                Kompleksowy serwis samochodowy wszystkich marek. 
                Naprawy mechaniczne, elektryczne i diagnostyka komputerowa.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Naprawy silników
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Układ hamulcowy
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Diagnostyka komputerowa
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Przeglądy techniczne
                </li>
              </ul>
            </div>

            {/* Części i akcesoria */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Części i akcesoria</h3>
              <p className="text-gray-600 mb-6">
                Oryginalne części zamienne i akcesoria samochodowe. 
                Szeroki asortyment dla wszystkich marek pojazdów.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Oryginalne części
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Akcesoria samochodowe
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Filtry i oleje
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Części eksploatacyjne
                </li>
              </ul>
            </div>

            {/* Ubezpieczenia */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ubezpieczenia</h3>
              <p className="text-gray-600 mb-6">
                Kompleksowa oferta ubezpieczeń samochodowych. 
                OC, AC, NNW i inne polisy w atrakcyjnych cenach.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Ubezpieczenie OC
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Ubezpieczenie AC
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  NNW kierowcy
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Assistance
                </li>
              </ul>
            </div>

            {/* Pomoc drogowa */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Pomoc drogowa</h3>
              <p className="text-gray-600 mb-6">
                24/7 pomoc drogowa w całej Polsce. 
                Holowanie, awaryjne otwieranie, rozruch i inne usługi.
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Holowanie pojazdów
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Awaryjne otwieranie
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Rozruch samochodu
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Wymiana koła
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dlaczego WĄTARSKI?</h2>
            <p className="text-lg text-gray-600">
              Wybierz nasz serwis dla profesjonalnej obsługi i gwarancji jakości
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">30+ lat doświadczenia</h3>
              <p className="text-sm text-gray-600">Wieloletnie doświadczenie w branży motoryzacyjnej</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Certyfikowani mechanicy</h3>
              <p className="text-sm text-gray-600">Wykwalifikowany zespół z uprawnieniami marki</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Gwarancja jakości</h3>
              <p className="text-sm text-gray-600">Pełna gwarancja na wszystkie usługi</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Wszystkie marki</h3>
              <p className="text-sm text-gray-600">Serwisujemy samochody wszystkich marek</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Godziny otwarcia serwisu</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium">Poniedziałek - Piątek</span>
                    <span className="text-gray-600">8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium">Sobota</span>
                    <span className="text-gray-600">9:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium">Niedziela</span>
                    <span className="text-gray-600">Zamknięte</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Kontakt serwisowy</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600">54 230 60 66</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600">Pilne naprawy - 24/7</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600">Gwarancja na wszystkie usługi</span>
                  </div>
                </div>

                <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                  <Phone className="h-4 w-4 mr-2" />
                  Umów wizytę w serwisie
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
} 