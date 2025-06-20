'use client';

import { useEffect, useState } from 'react';
import '../components/Contribution.scss';

type ContributionData = number[][];

export default function Contribution() {
  const [data, setData] = useState<ContributionData>([]);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/contributions');
        if (!res.ok) throw new Error('Erreur réseau');
        const jsonData: ContributionData = await res.json();
        setData(jsonData);

        const flat = jsonData.flat();
        const max = Math.max(...flat);
        setMaxValue(max);
      } catch (error) {
        console.error('Erreur fetch contributions:', error);
      }
    }
    fetchData();
  }, []);

  function getColorFromValue(value: number, max: number) {
    if (value === 0) return '#141b26';
    const step = max / 4;

    if (value <= step) return '#003e13';
    if (value <= 2 * step) return '#1b6726';
    if (value <= 3 * step) return '#2ca148';
    if (value <= 4 * step) return '#53d166';
    return '#53d166';
  }

  function transpose(matrix: number[][]): number[][] {
    if (matrix.length === 0) return [];
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  }

  const transposed = transpose(data.slice(-29));

  return (
    <div className="contributionGrid">
      {transposed.length > 0 ? (
        transposed.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((value, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                style={{ backgroundColor: getColorFromValue(value, maxValue) }}
              />
            ))}
          </div>
        ))
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
