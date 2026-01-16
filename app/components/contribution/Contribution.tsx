'use client';
import { useMemo, useRef, useLayoutEffect, useState } from 'react';
import useSWR from 'swr';
import './Contribution.scss';

type ContributionData = number[][];
const ROW_COUNT = 4;

const fetcher = (url: string) => fetch(url).then(res => {
    if (!res.ok) throw new Error('Erreur réseau');
    return res.json();
});
export default function Contribution() {
    const { data, error } = useSWR<ContributionData>('/api/contributions', fetcher, {
        revalidateOnFocus: false,
        refreshInterval: 3600000,
        keepPreviousData: true,
    });
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
        const resizeObserver = new ResizeObserver(() => {
            updateSize();
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateSize);
        };
    }, []);
    const maxValue = useMemo(() => {
        if (!data) return 0;
        const flat = data.flat();
        return Math.max(...flat);
    }, [data]);
    function getColorFromValue(value: number, max: number) {
        if (value === 0) return '#141b26';
        const step = max / 4;
        if (value <= step) return '#003e13';
        if (value <= 2 * step) return '#1b6726';
        if (value <= 3 * step) return '#2ca148';
        if (value <= 4 * step) return '#53d166';
        return '#53d166';
    }
    const gapSize = containerHeight > 0 ? Math.max(2, Math.min(containerHeight, containerWidth) * 0.015) : 3;
    const cellSizeFromHeight = containerHeight > 0 ? (containerHeight - gapSize * (ROW_COUNT - 1)) / ROW_COUNT : 15;
    const colCountEstimate = containerWidth > 0 && cellSizeFromHeight > 0
        ? Math.floor((containerWidth + gapSize) / (cellSizeFromHeight + gapSize))
        : 1;
    const cellWidth = containerWidth > 0 && colCountEstimate > 0
        ? (containerWidth - gapSize * (colCountEstimate - 1)) / colCountEstimate
        : cellSizeFromHeight;
    const cellHeight = cellSizeFromHeight;
    const colCount = colCountEstimate;
    const maxCells = colCount * ROW_COUNT;
    const flatData = data ? data.flat() : [];
    const reversedData = [...flatData].reverse();
    const cellsGrid = new Array(maxCells).fill(0);
    for (let i = 0; i < reversedData.length; i++) {
        const col = colCount - 1 - Math.floor(i / ROW_COUNT);
        if (col < 0) break;
        const row = ROW_COUNT - 1 - (i % ROW_COUNT);
        const indexGrid = row * colCount + col;
        cellsGrid[indexGrid] = reversedData[i];
    }
    return (
        <div
            ref={containerRef}
            className="grid"
            style={{
                gridTemplateColumns: `repeat(${colCount}, ${cellWidth}px)`,
                gridTemplateRows: `repeat(${ROW_COUNT}, ${cellHeight}px)`,
                gap: `${gapSize}px`,
            }}
            >
            {error ? (
                <p className="status">Erreur</p>
            ) : !data ? (
                Array.from({ length: maxCells }).map((_, index) => (
                    <div key={index} className="cell skeleton" />
                ))
            ) : (
                cellsGrid.map((value, index) => (
                <div
                    key={index}
                    className="cell"
                    style={{ backgroundColor: getColorFromValue(value, maxValue) }}
                />
                ))
            )}
        </div>
    );
}