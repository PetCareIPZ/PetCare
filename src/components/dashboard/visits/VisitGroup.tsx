"use client";

import React, { useState } from 'react';
import Icon from '~/components/Icon';
import type { Props } from '~/types/visits';

export default function VisitGroup({ petName, visits }: Props) {
  const [expanded, setExpanded] = useState(false);
  // show toggle if more than one visit
  const showToggle = visits.length > 1;
  const displayed = expanded ? visits : visits.slice(0, 1);

  return (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
        <Icon name="paw" /> {petName}
      </h4>

      {visits.length === 0 ? (
        <p className="text-gray-400 italic">Brak wizyt dla tego zwierzaka.</p>
      ) : (
        <>
          <div className="space-y-4">
            {displayed.map((w) => (
              <div
                key={w.visitID}
                className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-blue-300 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-blue-600 uppercase text-xs tracking-wider">
                    {w.visitType}
                  </span>
                  <span className="text-sm font-medium text-gray-400">
                    {w.visitDate}
                  </span>
                </div>

                <div className="text-gray-700 space-y-2">
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold text-gray-800">Notatka:</span>{" "}
                    {w.visitNote ?? "Brak"}
                  </p>

                  {w.visitAttachment && (
                    <div className="flex items-center gap-2 text-xs text-blue-500 font-medium pt-2 border-t border-gray-200">
                      <Icon name="paperclip" /> Pobierz
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {showToggle && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-blue-500 text-sm font-medium"
            >
              {expanded ? 'Pokaż mniej' : `Pokaż więcej (${visits.length - 1})`}
            </button>
          )}
        </>
      )}
    </div>
  );
}
