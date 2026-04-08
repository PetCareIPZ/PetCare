"use client";
import AnimatedSection from "~/components/public/ui/AnimatedSection";
import Icon from "~/components/Icon";
import type settingsUserData from "~/types/settingsUserData";
import { useEffect, useState } from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";

interface Device {
  type?: string;
  vendor?: string;
  os?: string;
  engine?: string;
}

interface notificationSettingsType{
  mailEnabled: boolean,
  pushEnabled: boolean
}

const getDeviceIcon = (type: string) => {
  switch (type) {
    case "mobile":
      return <Smartphone className="w-6 h-6 text-blue-500" />;
    case "tablet":
      return <Tablet className="w-6 h-6 text-green-500" />;
    default:
      return <Monitor className="w-6 h-6 text-gray-700" />;
  }
};


export default function SettingsPageComponent({ id, firstName, lastName, emailAddress } : settingsUserData){
  
  const updatePush = async (val : boolean) =>{
      setPush(val); 
      await fetch("/api/notifications/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pushEnabled: val,
      }),
    });
  }

  const updateMail = async (val : boolean) =>{
      setMail(val); 
      await fetch("/api/notifications/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mailEnabled: val,
      }),
    });
  }


  const [pushEnabled, setPush] = useState(false);
  const [mailEnabled, setMail] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  useEffect(() => {
    const fetchData = async () : Promise<void> => {
      const res = await fetch("/api/notifications/settings");
      const json : notificationSettingsType = await res.json();
      setPush(json.pushEnabled)
      setMail(json.mailEnabled)
    } ;
    const fetchDevices = async (): Promise<void> => {
    const res = await fetch("/api/push/devices");
    const json: Device[] = await res.json();
    setDevices(json);
  };
    void fetchDevices();
    void fetchData() ;
  }, []);



  return(
        <>
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
        <Icon name="cog" /> Ustawienia Konta
      </h1>
      
      <AnimatedSection>
      <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dane profilu</h2>
          <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Imię</label>
                <p className="text-gray-900 text-lg rounded">{firstName?? "Brak danych"}</p>
              </div>

              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Nazwisko</label>
                <p className="text-gray-900 text-lg rounded">{lastName ?? "Brak danych"}</p>
              </div>

              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <p className="text-gray-900 text-lg rounded">{emailAddress?? "Brak danych"}</p>
              </div>

              <div className="pb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">ID Użytkownika</label>
                <p className="text-gray-600 text-sm rounded break-all">{id ?? "Brak danych"}</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Powiadomienia
          </h2>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Ustawienia ogólne</h3>
                <div className="flex flex-row justify-evenly">
                  
                  <div className="inline-flex items-center gap-2">
                    <label htmlFor="push-switch-component" className="text-slate-600 text-sm cursor-pointer">Powiadomienia Push </label>
                    <div className="relative inline-block w-11 h-5">
                      <input checked={pushEnabled} onChange={(e) => updatePush(e.target.checked)} id="push-switch-component" type="checkbox" className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" />
                      <label htmlFor="push-switch-component" className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
                      </label>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <label htmlFor="mail-switch-component" className="text-slate-600 text-sm cursor-pointer">Powiadomienia Mail </label>
                    <div className="relative inline-block w-11 h-5">
                      <input checked={mailEnabled} onChange={(e) => updateMail(e.target.checked)} id="mail-switch-component" type="checkbox" className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300" />
                      <label htmlFor="mail-switch-component" className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
                      </label>
                    </div>
                  </div>
                </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Twoje Urządzenia z powiadomieniami push</h3> 
              <div className="space-y-3">
                {devices.map((device, index) => {
                  const type = device.type ?? "desktop";
                  console.log(device)
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition"
                    >
                      {/* Ikonka */}
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                        {getDeviceIcon(type)}
                      </div>
              
                      {/* Informacje */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">
                          Urządzenie: {device.vendor == "" ? "komputer" : device.vendor}
                        </span>
                        <span className="text-sm text-gray-500">
                          System operacyjny: {device.os ?? "Nieznany System Operacyjny"}
                        </span>
                        <span className="text-xs text-gray-400">
                          Przeglądraka: {device.engine ?? "Nieznana przeglądarka"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </>
    )
}