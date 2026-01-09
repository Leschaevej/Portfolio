'use client';
import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import './Contribution.scss';

type ContributionData = number[][];
const CELL_SIZE = 15;
const GAP_SIZE = 3;
export default function Contribution() {
    const [data, setData] = useState<ContributionData>([]);
    const [maxValue, setMaxValue] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    useLayoutEffect(() => {
        function updateSize() {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setContainerWidth(rect.width);
            setContainerHeight(rect.height);
        }
        }
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
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
    const colCount = Math.floor((containerWidth + GAP_SIZE) / (CELL_SIZE + GAP_SIZE)) || 1;
    const rowCount = Math.floor((containerHeight + GAP_SIZE) / (CELL_SIZE + GAP_SIZE)) || 1;
    const maxCells = colCount * rowCount;
    const flatData = data.flat();
    const reversedData = [...flatData].reverse();
    const cellsGrid = new Array(maxCells).fill(0);
    for (let i = 0; i < reversedData.length; i++) {
        const col = colCount - 1 - Math.floor(i / rowCount);
        if (col < 0) break;
        const row = rowCount - 1 - (i % rowCount);
        const indexGrid = row * colCount + col;
        cellsGrid[indexGrid] = reversedData[i];
    }
    return (
        <div
            ref={containerRef}
            className="grid"
            style={{
                gridTemplateColumns: `repeat(${colCount}, ${CELL_SIZE}px)`,
                gap: `${GAP_SIZE}px`,
            }}
            >
            {cellsGrid.length > 0 ? (
                cellsGrid.map((value, index) => (
                <div
                    key={index}
                    className="cell"
                    style={{ backgroundColor: getColorFromValue(value, maxValue) }}
                />
                ))
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
}