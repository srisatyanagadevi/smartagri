import React from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { CloudSun, Sun, CloudRain, Droplets, Wind, Umbrella, MapPin, Compass } from 'lucide-react';

export const WeatherInformationPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Current Weather Card */}
      <div className="bg-white rounded-2xl border border-[#E3EAE1] p-6 lg:p-7 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[12px] text-[#7C8E82] mb-1">
              <MapPin size={14} className="text-[#165A36]" />
              <span className="font-medium text-[#172B24]">East Godavari Agri-Cluster, Andhra Pradesh</span>
            </div>
            <h2 className="text-[20px] sm:text-[22px] font-semibold text-[#172B24] tracking-tight">
              Micro-Climate &amp; Agro-Meteorology
            </h2>
          </div>

          <div className="text-[11px] text-[#7C8E82] bg-[#F1F6F0] px-3 py-1.5 rounded-lg border border-[#DEE7DC] self-start sm:self-auto">
            Station ID: AP-EG-04 · Live Telemetry
          </div>
        </div>

        {/* Big Forecast Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-[#F6FAF4] border border-[#DEEADE]">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 text-[#E2B743] flex items-center justify-center">
              <CloudSun size={52} strokeWidth={1.8} />
            </div>
            <div>
              <div className="text-[38px] font-bold text-[#172B24] leading-none tracking-tight">
                28°C
              </div>
              <p className="text-[13px] font-medium text-[#4A5D52] mt-1">
                Partly cloudy · Mild breeze
              </p>
              <p className="text-[11px] text-[#829187]">Feels like 31°C</p>
            </div>
          </div>

          <div className="space-y-2 text-[12px] text-[#55695E] justify-center flex flex-col border-t md:border-t-0 md:border-l border-[#DEEADE] pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Droplets size={14} className="text-[#3E7EB3]" /> Relative Humidity:</span>
              <span className="font-semibold text-[#172B24]">74%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Wind size={14} className="text-[#55695E]" /> Wind Speed:</span>
              <span className="font-semibold text-[#172B24]">12 km/h (East)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Umbrella size={14} className="text-[#2C6291]" /> Precipitation Probability:</span>
              <span className="font-semibold text-[#172B24]">35%</span>
            </div>
          </div>

          <div className="space-y-2 text-[12px] text-[#55695E] justify-center flex flex-col border-t md:border-t-0 md:border-l border-[#DEEADE] pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center justify-between">
              <span>UV Index:</span>
              <span className="font-semibold text-[#172B24]">6 (Moderate)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Barometric Pressure:</span>
              <span className="font-semibold text-[#172B24]">1011 hPa</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Soil Temperature (10cm):</span>
              <span className="font-semibold text-[#172B24]">24.8°C</span>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast Cards */}
        <div>
          <h3 className="text-[15px] font-semibold text-[#172B24] mb-3">
            7-Day Farm Outlook
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { day: 'Today', icon: '☁️', temp: '28° / 23°', cond: 'Partly Cloudy', rain: '35%' },
              { day: 'Sat 19', icon: '☀️', temp: '30° / 24°', cond: 'Sunny', rain: '10%' },
              { day: 'Sun 20', icon: '🌧️', temp: '27° / 22°', cond: 'Light Showers', rain: '65%' },
              { day: 'Mon 21', icon: '🌦️', temp: '28° / 23°', cond: 'Scattered Rain', rain: '45%' },
              { day: 'Tue 22', icon: '⛅', temp: '29° / 24°', cond: 'Mostly Sunny', rain: '15%' },
              { day: 'Wed 23', icon: '☀️', temp: '31° / 25°', cond: 'Clear Sky', rain: '5%' },
              { day: 'Thu 24', icon: '⛅', temp: '30° / 24°', cond: 'Partly Cloudy', rain: '20%' },
            ].map((f, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-[#E3EAE1] bg-[#FAFDF9] text-center space-y-1.5"
              >
                <p className="text-[12px] font-semibold text-[#172B24]">{f.day}</p>
                <div className="text-[22px] py-1">{f.icon}</div>
                <p className="text-[12px] font-bold text-[#172B24]">{f.temp}</p>
                <p className="text-[10px] text-[#7C8E82] leading-tight">{f.cond}</p>
                <p className="text-[10px] font-medium text-[#2C6291]">Rain: {f.rain}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agricultural Advisory */}
        <div className="p-4 rounded-xl border border-[#DCEAD7] bg-[#F2F8F0]">
          <h4 className="text-[13px] font-semibold text-[#1E5E36] mb-1">
            🌱 Agronomist Advisory for Sunday's Rain
          </h4>
          <p className="text-[12px] text-[#4A5D52] leading-relaxed">
            Sunday evening showers predicted (approx 12-18mm). Complete scheduled foliar sprays and fertilizer broadcast on Sunrise Fields by Saturday noon. Ensure field drainage channels at Green Valley Farm are cleared.
          </p>
        </div>
      </div>
    </div>
  );
};
