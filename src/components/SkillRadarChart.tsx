import React from 'react';

interface RadarPoint {
  axis: string;
  candidate_score: number;
  target_benchmark: number;
}

interface SkillRadarChartProps {
  data: RadarPoint[];
}

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data }) => {
  const items = data && data.length >= 3 ? data.slice(0, 6) : [
    { axis: 'SQL & Databases', candidate_score: 78, target_benchmark: 90 },
    { axis: 'Python & Data', candidate_score: 84, target_benchmark: 85 },
    { axis: 'BI & Visualization', candidate_score: 68, target_benchmark: 88 },
    { axis: 'Statistics', candidate_score: 64, target_benchmark: 82 },
    { axis: 'Business Strategy', candidate_score: 55, target_benchmark: 85 },
    { axis: 'Portfolio Depth', candidate_score: 66, target_benchmark: 88 },
  ];

  const size = 320;
  const center = size / 2;
  const radius = 104;
  const count = items.length;

  const getCoordinates = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
    const normalizedRadius = (Math.max(0, Math.min(100, value)) / 100) * radius;
    return {
      x: center + normalizedRadius * Math.cos(angle),
      y: center + normalizedRadius * Math.sin(angle),
    };
  };

  const buildPolygonPoints = (key: 'candidate_score' | 'target_benchmark') => {
    return items
      .map((item, idx) => {
        const { x, y } = getCoordinates(idx, item[key]);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  const gridLevels = [25, 50, 75, 100];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6">
      <div className="relative shrink-0">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
          role="img"
          aria-label="Competency radar chart comparing candidate profile against target role benchmark"
        >
          {/* Concentric polygon grid */}
          {gridLevels.map((level) => {
            const points = items
              .map((_, idx) => {
                const { x, y } = getCoordinates(idx, level);
                return `${x.toFixed(1)},${y.toFixed(1)}`;
              })
              .join(' ');
            return (
              <polygon
                key={level}
                points={points}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray={level < 100 ? '2 2' : undefined}
              />
            );
          })}

          {/* Axis spokes */}
          {items.map((_, idx) => {
            const end = getCoordinates(idx, 100);
            return (
              <line
                key={idx}
                x1={center}
                y1={center}
                x2={end.x}
                y2={end.y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            );
          })}

          {/* Target Benchmark Polygon */}
          <polygon
            points={buildPolygonPoints('target_benchmark')}
            fill="rgba(100, 116, 139, 0.08)"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* Candidate Score Polygon */}
          <polygon
            points={buildPolygonPoints('candidate_score')}
            fill="rgba(37, 99, 235, 0.16)"
            stroke="#2563eb"
            strokeWidth="2.25"
          />

          {/* Data vertices */}
          {items.map((item, idx) => {
            const pt = getCoordinates(idx, item.candidate_score);
            return (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                fill="#2563eb"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Axis Labels */}
          {items.map((item, idx) => {
            const labelPos = getCoordinates(idx, 124);
            const isLeft = labelPos.x < center - 15;
            const isRight = labelPos.x > center + 15;
            const textAnchor = isLeft ? 'end' : isRight ? 'start' : 'middle';

            return (
              <text
                key={idx}
                x={labelPos.x}
                y={labelPos.y}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                className="fill-slate-700 text-[11px] font-medium"
              >
                {item.axis.length > 20 ? `${item.axis.slice(0, 18)}…` : item.axis}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Tabular Breakdown Legend */}
      <div className="flex-1 w-full">
        <div className="flex items-center gap-6 mb-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-blue-600 inline-block" />
            <span className="font-medium text-slate-900">Your Profile</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 border-b border-dashed border-slate-500 inline-block" />
            <span>Target Role Benchmark</span>
          </div>
        </div>

        <div className="border border-slate-200 rounded-lg divide-y divide-slate-200 bg-slate-50/50">
          <div className="grid grid-cols-12 px-3 py-2 text-[11px] font-semibold text-slate-500">
            <div className="col-span-6">Competency Axis</div>
            <div className="col-span-2 text-right">Current</div>
            <div className="col-span-2 text-right">Target</div>
            <div className="col-span-2 text-right">Delta</div>
          </div>
          {items.map((item, idx) => {
            const delta = item.candidate_score - item.target_benchmark;
            return (
              <div
                key={idx}
                className="grid grid-cols-12 items-center px-3 py-2 text-xs hover:bg-white transition-colors"
              >
                <div className="col-span-6 font-medium text-slate-800 truncate pr-2">
                  {item.axis}
                </div>
                <div className="col-span-2 text-right font-mono tabular-nums text-blue-700 font-semibold">
                  {item.candidate_score}
                </div>
                <div className="col-span-2 text-right font-mono tabular-nums text-slate-500">
                  {item.target_benchmark}
                </div>
                <div
                  className={`col-span-2 text-right font-mono tabular-nums font-medium ${
                    delta >= 0 ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {delta >= 0 ? `+${delta}` : delta}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
