import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathFormulaProps {
  formula: string;
  block?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({ formula, block = false, className = '' }) => {
  const html = React.useMemo(() => {
    try {
      return katex.renderToString(formula, {
        displayMode: block,
        throwOnError: false,
      });
    } catch (err) {
      console.error('KaTeX rendering error:', err);
      return `<code class="font-mono text-xs">${formula}</code>`;
    }
  }, [formula, block]);

  if (block) {
    return (
      <div 
        className={`py-3 px-4 my-2 overflow-x-auto text-neutral-900 dark:text-neutral-100 bg-neutral-100/70 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-md shadow-2xs ${className}`}
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  }

  return (
    <span 
      className={`inline-block px-1 text-neutral-900 dark:text-neutral-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};

export const RenderTextWithMath: React.FC<{ text: string }> = ({ text }) => {
  // Parses text with inline $...$ or block $$...$$
  const parts = React.useMemo(() => {
    const segments: { type: 'text' | 'inline-math' | 'block-math'; content: string }[] = [];
    const blockRegex = /\$\$([\s\S]*?)\$\$/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // First handle block math $$
    const blockMatches: { start: number; end: number; content: string }[] = [];
    while ((match = blockRegex.exec(text)) !== null) {
      blockMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
      });
    }

    let cursor = 0;
    for (const bm of blockMatches) {
      if (bm.start > cursor) {
        parseInline(text.substring(cursor, bm.start), segments);
      }
      segments.push({ type: 'block-math', content: bm.content });
      cursor = bm.end;
    }
    if (cursor < text.length) {
      parseInline(text.substring(cursor), segments);
    }

    return segments;
  }, [text]);

  return (
    <span>
      {parts.map((part, index) => {
        if (part.type === 'block-math') {
          return <MathFormula key={index} formula={part.content} block />;
        }
        if (part.type === 'inline-math') {
          return <MathFormula key={index} formula={part.content} block={false} />;
        }
        return <span key={index}>{part.content}</span>;
      })}
    </span>
  );
};

function parseInline(str: string, segments: { type: 'text' | 'inline-math' | 'block-math'; content: string }[]) {
  const inlineRegex = /\$([^\$]+?)\$/g;
  let lastIdx = 0;
  let m: RegExpExecArray | null;
  while ((m = inlineRegex.exec(str)) !== null) {
    if (m.index > lastIdx) {
      segments.push({ type: 'text', content: str.substring(lastIdx, m.index) });
    }
    segments.push({ type: 'inline-math', content: m[1] });
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < str.length) {
    segments.push({ type: 'text', content: str.substring(lastIdx) });
  }
}
