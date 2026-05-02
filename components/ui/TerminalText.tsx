'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TerminalTextProps {
  lines: string[];
  typingSpeed?: number;
  className?: string;
}

export default function TerminalText({
  lines,
  typingSpeed = 30,
  className = '',
}: TerminalTextProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    const type = () => {
      setCurrentLine((prevLine) => {
        if (prevLine >= lines.length) return prevLine;
        return prevLine;
      });
    };

    type();
  }, [isInView, lines]);

  useEffect(() => {
    if (!hasStarted.current || currentLine >= lines.length) return;

    const timer = setTimeout(() => {
      const line = lines[currentLine];
      if (currentChar < line.length) {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.substring(0, currentChar + 1);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      } else {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setDisplayedLines((prev) => [...prev, '']);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, lines, typingSpeed]);

  return (
    <div ref={ref} className={`terminal ${className}`}>
      <div className="terminal-header">
        <span className="terminal-dot bg-red-500" />
        <span className="terminal-dot bg-yellow-500" />
        <span className="terminal-dot bg-green-500" />
        <span className="ml-3 text-xs text-gray-500 font-mono">prophet@collective:~</span>
      </div>
      <div className="p-4 md:p-6 font-mono text-xs md:text-sm leading-relaxed space-y-1">
        {displayedLines.map((line, i) => (
          <div key={i} className="flex">
            <span className="text-matrix-green mr-2 select-none">{'>'}</span>
            <span className="text-gray-300">{line}</span>
            {i === currentLine && currentLine < lines.length && (
              <span className="animate-blink text-matrix-green ml-0.5">▊</span>
            )}
          </div>
        ))}
        {currentLine < lines.length && displayedLines.length === 0 && (
          <div className="flex">
            <span className="text-matrix-green mr-2 select-none">{'>'}</span>
            <span className="animate-blink text-matrix-green">▊</span>
          </div>
        )}
      </div>
    </div>
  );
}
