import React, { useState } from 'react';
import { useApp } from '../../context/AppContext.tsx';
import { FileText, Download, Check } from 'lucide-react';
import { ReportItem } from '../../types/index.ts';

export const ReportsPage: React.FC = () => {
  const { reports, downloadReportCSV } = useApp();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (report: ReportItem) => {
    setDownloadingId(report.id);
    setTimeout(() => {
      downloadReportCSV(report);
      setDownloadingId(null);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Main Reports Container matching Reference 4 */}
      <div className="bg-white rounded-2xl border border-[#E3EAE1] p-6 lg:p-7 shadow-2xs space-y-6">
        {/* Header row with Title and Count badge */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[18px] sm:text-[20px] font-semibold text-[#172B24] tracking-tight">
              Your reports
            </h2>
            <span className="text-[11px] font-medium text-[#7C8E82] bg-[#F1F4F0] px-2 py-0.5 rounded border border-[#DFE7DD]">
              {reports.length} reports
            </span>
          </div>
          <p className="text-[13px] text-[#7C8E82]">
            Download sample CSV reports to explore the reporting experience.
          </p>
        </div>

        {/* 3-column report card grid matching Reference 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reports.map((report) => {
            const isDownloading = downloadingId === report.id;

            return (
              <div
                key={report.id}
                className="bg-white rounded-2xl border border-[#E3EAE1] p-5.5 hover:border-[#CADAC5] transition-all shadow-2xs flex flex-col justify-between group"
              >
                <div>
                  {/* File Document Icon Container */}
                  <div className="w-10 h-10 rounded-xl bg-[#EEF3F8] text-[#4A7296] border border-[#DEE7F0] flex items-center justify-center mb-4">
                    <FileText size={18} />
                  </div>

                  {/* Report Title */}
                  <h3 className="text-[15px] font-semibold text-[#172B24]">
                    {report.title}
                  </h3>

                  {/* Period & File Type */}
                  <p className="text-[12px] text-[#829187] mt-1">
                    {report.period} · {report.fileType}
                  </p>
                </div>

                {/* Download Link */}
                <div className="pt-4 mt-4">
                  <button
                    onClick={() => handleDownload(report)}
                    disabled={isDownloading}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#165A36] hover:text-[#11492B] group-hover:underline transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <span>
                      {isDownloading ? 'Generating CSV...' : 'Download report'}
                    </span>
                    <Download
                      size={15}
                      className={`text-[#165A36] ${
                        isDownloading ? 'animate-bounce' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
