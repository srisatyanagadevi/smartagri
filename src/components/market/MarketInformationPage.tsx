import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { CropIcon } from '../common/CropIcon.tsx';
import { TrendingUp, TrendingDown, Search, Filter, ArrowRight } from 'lucide-react';

export const MarketInformationPage: React.FC = () => {
  const { marketItems, setActivePage } = useApp();
  const [filterMandi, setFilterMandi] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = marketItems.filter((item) => {
    const matchesMandi = filterMandi === 'All' || item.market.includes(filterMandi);
    const matchesSearch =
      item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.market.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMandi && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Main Market Card */}
      <div className="bg-white rounded-2xl border border-[#E3EAE1] p-6 lg:p-7 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#172B24] tracking-tight">
              Market Information &amp; Mandi Rates
            </h2>
            <p className="text-[13px] text-[#7C8E82] mt-0.5">
              Live wholesale agricultural commodity rates across Andhra Pradesh mandis.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#7C8E82] bg-[#F1F6F0] px-3 py-1 rounded-lg border border-[#DEE7DC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E5E36]" />
            <span>Updated 18 Sep 2026, 10:30 AM</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-[280px]">
            <Search size={15} className="absolute inset-y-0 left-3 my-auto text-[#8E9F94]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search commodity or mandi..."
              className="w-full pl-9 pr-3 py-2 bg-[#FAFDF9] border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[12px] text-[#7C8E82]">Market:</span>
            <select
              value={filterMandi}
              onChange={(e) => setFilterMandi(e.target.value)}
              className="px-3 py-1.5 bg-white border border-[#E1E9DF] rounded-lg text-[13px] text-[#172B24] focus:outline-none focus:border-[#165A36]"
            >
              <option value="All">All Mandis</option>
              <option value="Kakinada">Kakinada</option>
              <option value="Rajahmundry">Rajahmundry</option>
              <option value="Guntur">Guntur</option>
              <option value="Madanapalle">Madanapalle</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border-t border-[#F0F5EE] -mx-6 lg:-mx-7 px-6 lg:px-7 pt-2">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#EAEFE8] text-[11px] font-semibold text-[#829187] uppercase tracking-wider">
                <th className="py-3 px-3">Commodity</th>
                <th className="py-3 px-3">Market Center</th>
                <th className="py-3 px-3">Price / Quintal</th>
                <th className="py-3 px-3">24h Change</th>
                <th className="py-3 px-3">Quality Grade</th>
                <th className="py-3 px-3">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2F7F1]">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAFDF9] transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <CropIcon name={item.crop} size="sm" />
                      <span className="font-semibold text-[#172B24]">{item.crop}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-[#55695E]">{item.market}</td>
                  <td className="py-3.5 px-3 font-semibold text-[#172B24] tabular-nums">
                    ₹{item.pricePerQuintal.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-3 tabular-nums">
                    {item.changeType === 'up' ? (
                      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#247A46]">
                        <TrendingUp size={14} />
                        +{item.change}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#C4463A]">
                        <TrendingDown size={14} />
                        {item.change}%
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-[#6A7E73]">{item.variety || 'FAQ Grade'}</td>
                  <td className="py-3.5 px-3 text-[12px] text-[#829187]">{item.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
