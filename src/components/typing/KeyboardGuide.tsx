import React, { useEffect, useRef, useState } from 'react';

export type FingerMapping = 
  | 'l_pinky' | 'l_ring' | 'l_middle' | 'l_index' | 'l_thumb'
  | 'r_thumb' | 'r_index' | 'r_middle' | 'r_ring' | 'r_pinky' | null;

export interface KeyMapResult {
  char: string;
  finger: FingerMapping;
  baseKey: string;
  needsShift: boolean;
  shiftFinger?: FingerMapping;
}

export const getFingerMapping = (char: string): KeyMapResult | null => {
  if (!char) return null;
  const c = char;
  const lower = char.toLowerCase();
  const needsShift = c !== lower || ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '{', '}', '|', ':', '"', '<', '>', '?'].includes(c);
  
  const shiftMap: Record<string, string> = {
    '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0', '_': '-', '+': '=',
    '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/'
  };
  
  const baseKey = needsShift && shiftMap[c] ? shiftMap[c] : lower;
  
  let finger: FingerMapping = null;
  let isLeftHand = false;

  if (['q', 'a', 'z', '1', '`'].includes(baseKey)) { finger = 'l_pinky'; isLeftHand = true; }
  else if (['w', 's', 'x', '2'].includes(baseKey)) { finger = 'l_ring'; isLeftHand = true; }
  else if (['e', 'd', 'c', '3'].includes(baseKey)) { finger = 'l_middle'; isLeftHand = true; }
  else if (['r', 'f', 'v', 't', 'g', 'b', '4', '5'].includes(baseKey)) { finger = 'l_index'; isLeftHand = true; }
  else if (['y', 'h', 'n', 'u', 'j', 'm', '6', '7'].includes(baseKey)) { finger = 'r_index'; isLeftHand = false; }
  else if (['i', 'k', ',', '8'].includes(baseKey)) { finger = 'r_middle'; isLeftHand = false; }
  else if (['o', 'l', '.', '9'].includes(baseKey)) { finger = 'r_ring'; isLeftHand = false; }
  else if (['p', ';', '/', '0', '-', '=', '[', ']', '\\', '\''].includes(baseKey)) { finger = 'r_pinky'; isLeftHand = false; }
  else if (baseKey === ' ') { finger = 'r_thumb'; isLeftHand = false; }
  
  let shiftFinger: FingerMapping = null;
  if (needsShift) {
    shiftFinger = isLeftHand ? 'r_pinky' : 'l_pinky';
  }

  return { char: c, finger, baseKey, needsShift, shiftFinger };
};

const safeKeyId = (key: string) => {
  if (key === ' ') return 'space';
  const charCode = key.charCodeAt(0);
  if (charCode >= 97 && charCode <= 122) return key;
  if (charCode >= 48 && charCode <= 57) return key;
  const map: Record<string, string> = {
    '`': 'backtick', '-': 'minus', '=': 'equal', '[': 'lbracket', ']': 'rbracket',
    '\\': 'backslash', ';': 'semi', '\'': 'quote', ',': 'comma', '.': 'period', '/': 'slash'
  };
  return map[key] || key.toLowerCase();
};

interface KeyboardProps {
  activeChar: string;
  lastPressedKey?: string | null;
}

const ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['LShift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'RShift'],
  ['Space']
];

export const KeyboardGuide: React.FC<KeyboardProps> = ({ activeChar, lastPressedKey }) => {
  const mapping = getFingerMapping(activeChar);
  const stageRef = useRef<HTMLDivElement>(null);

  const isKeyActive = (keyDef: string) => {
    if (!mapping) return false;
    if (keyDef === 'LShift') return mapping.needsShift && mapping.shiftFinger === 'l_pinky';
    if (keyDef === 'RShift') return mapping.needsShift && mapping.shiftFinger === 'r_pinky';
    if (keyDef === 'Space' && mapping.baseKey === ' ') return true;
    return keyDef.toLowerCase() === mapping.baseKey;
  };
  
  const getFingerClass = (keyDef: string) => {
    if (!mapping || !isKeyActive(keyDef)) return 'bg-zinc-800/80 border-white/10';
    return 'bg-purple-500/80 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]';
  };

  useEffect(() => {
    if (lastPressedKey) {
      const map = getFingerMapping(lastPressedKey);
      if (map) {
        const id = map.baseKey === ' ' ? 'space' : safeKeyId(map.baseKey);
        const bgEl = document.getElementById(`vkb-key-bg-${id}`);
        const fgEl = document.getElementById(`vkb-key-fg-${id}`);
        if (bgEl && fgEl) {
          bgEl.style.transform = 'translateY(3px)';
          fgEl.style.transform = 'translateY(3px)';
          setTimeout(() => {
            if (bgEl) bgEl.style.transform = 'translateY(0px)';
            if (fgEl) fgEl.style.transform = 'translateY(0px)';
          }, 70);
        }
      }
    }
  }, [lastPressedKey]);

  const renderKey = (key: string, index: number, isLabelLayer: boolean) => {
    let widthClass = 'w-10';
    let label = key;
    let logicalKey = key.toLowerCase();
    
    if (key === 'Backspace') { widthClass = 'w-20'; label = 'delete'; }
    if (key === 'Tab') { widthClass = 'w-16'; label = 'tab'; }
    if (key === 'Caps') { widthClass = 'w-20'; label = 'caps'; }
    if (key === 'Enter') { widthClass = 'w-20'; label = 'enter'; }
    if (key === 'LShift') { widthClass = 'w-24'; label = 'shift'; logicalKey = 'lshift'; }
    if (key === 'RShift') { widthClass = 'w-24'; label = 'shift'; logicalKey = 'rshift'; }
    if (key === 'Space') { widthClass = 'w-64'; label = ''; logicalKey = ' '; }

    if (!isLabelLayer) {
      // Background Layer (no text, handles coloring)
      return (
        <div 
          key={`bg-${key}-${index}`}
          id={`vkb-key-bg-${safeKeyId(logicalKey)}`}
          className={`h-12 rounded-lg border transition-colors duration-150 ${widthClass} ${getFingerClass(key)}`}
          style={{ transitionProperty: 'background-color, border-color, box-shadow, transform' }}
        />
      );
    } else {
      // Foreground Layer (transparent background, text only, renders above hand)
      const isActive = isKeyActive(key);
      const textClass = isActive ? 'text-white' : 'text-zinc-400';
      return (
        <div 
          key={`fg-${key}-${index}`}
          id={`vkb-key-fg-${safeKeyId(logicalKey)}`}
          className={`h-12 flex items-center justify-center rounded-lg border border-transparent uppercase text-[10px] font-bold font-mono ${widthClass} ${textClass}`}
          style={{ transitionProperty: 'color, transform' }}
        >
          {label}
        </div>
      );
    }
  };

  return (
    <div ref={stageRef} className="relative w-full max-w-3xl mx-auto p-4 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md overflow-hidden select-none">
      
      {/* Background Keys Layer (Z-10) */}
      <div className="flex flex-col gap-2 relative z-10 mb-8 pointer-events-none">
        {ROWS.map((row, i) => (
          <div key={`bg-row-${i}`} className={`flex justify-center gap-2 ${i === 1 ? 'pl-4' : i === 2 ? 'pl-8' : i === 3 ? 'pl-12' : ''}`}>
            {row.map((key, j) => renderKey(key, j, false))}
          </div>
        ))}
      </div>
      
      {/* Hand SVG Layer (Z-20) */}
      <HandOverlay mapping={mapping} stageRef={stageRef} />
      
      {/* Text Labels Layer (Z-30) */}
      <div className="absolute inset-0 p-4 flex flex-col gap-2 z-30 pointer-events-none mb-8">
        {ROWS.map((row, i) => (
          <div key={`fg-row-${i}`} className={`flex justify-center gap-2 ${i === 1 ? 'pl-4' : i === 2 ? 'pl-8' : i === 3 ? 'pl-12' : ''}`}>
            {row.map((key, j) => renderKey(key, j, true))}
          </div>
        ))}
      </div>

    </div>
  );
};

const HandOverlay: React.FC<{ mapping: KeyMapResult | null, stageRef: React.RefObject<HTMLDivElement | null> }> = ({ mapping, stageRef }) => {
  const pathsRef = useRef<Record<string, SVGPathElement | null>>({});
  const palmsRef = useRef<Record<string, SVGPathElement | null>>({});
  const rafRef = useRef<number>(0);
  
  const stateRef = useRef<Record<string, { x: number, y: number, rootX: number, rootY: number, isActive: boolean }>>({});

  const FINGERS = ['l_pinky', 'l_ring', 'l_middle', 'l_index', 'l_thumb', 'r_thumb', 'r_index', 'r_middle', 'r_ring', 'r_pinky'];
  
  const HOME_KEYS: Record<string, string> = {
    'l_pinky': 'a', 'l_ring': 's', 'l_middle': 'd', 'l_index': 'f', 'l_thumb': 'space',
    'r_thumb': 'space', 'r_index': 'j', 'r_middle': 'k', 'r_ring': 'l', 'r_pinky': 'semi'
  };

  const getTargetRect = (logicalKey: string) => {
    // Read from background key element for accurate positioning
    const el = document.getElementById(`vkb-key-bg-${safeKeyId(logicalKey)}`);
    if (!el || !stageRef.current) return null;
    const stageRect = stageRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left - stageRect.left + rect.width / 2,
      y: rect.top - stageRect.top + rect.height / 2
    };
  };

  useEffect(() => {
    FINGERS.forEach(f => {
      if (!stateRef.current[f]) {
        stateRef.current[f] = { x: 0, y: 0, rootX: 0, rootY: 0, isActive: false };
      }
    });

    const updateLoop = () => {
      if (!stageRef.current) return;
      
      const fPos = getTargetRect('f') || { x: 200, y: 150 };
      const jPos = getTargetRect('j') || { x: 400, y: 150 };
      
      const leftBase = { x: fPos.x - 20, y: fPos.y + 120 };
      const rightBase = { x: jPos.x + 20, y: jPos.y + 120 };

      const roots: Record<string, {x: number, y: number}> = {
        'l_pinky': { x: leftBase.x - 70, y: leftBase.y - 10 },
        'l_ring': { x: leftBase.x - 40, y: leftBase.y - 30 },
        'l_middle': { x: leftBase.x - 10, y: leftBase.y - 40 },
        'l_index': { x: leftBase.x + 20, y: leftBase.y - 25 },
        'l_thumb': { x: leftBase.x + 50, y: leftBase.y + 10 },
        
        'r_thumb': { x: rightBase.x - 50, y: rightBase.y + 10 },
        'r_index': { x: rightBase.x - 20, y: rightBase.y - 25 },
        'r_middle': { x: rightBase.x + 10, y: rightBase.y - 40 },
        'r_ring': { x: rightBase.x + 40, y: rightBase.y - 30 },
        'r_pinky': { x: rightBase.x + 70, y: rightBase.y - 10 },
      };
      
      if (palmsRef.current['left']) {
        palmsRef.current['left'].setAttribute('d', 
          `M ${roots['l_pinky'].x - 15} ${roots['l_pinky'].y + 20} 
           Q ${roots['l_middle'].x} ${roots['l_middle'].y - 10} ${roots['l_index'].x + 20} ${roots['l_index'].y}
           Q ${roots['l_thumb'].x + 30} ${roots['l_thumb'].y + 30} ${roots['l_thumb'].x - 10} ${roots['l_thumb'].y + 70}
           Q ${leftBase.x - 60} ${leftBase.y + 80} ${roots['l_pinky'].x - 15} ${roots['l_pinky'].y + 20} Z`
        );
      }
      if (palmsRef.current['right']) {
        palmsRef.current['right'].setAttribute('d', 
          `M ${roots['r_index'].x - 20} ${roots['r_index'].y} 
           Q ${roots['r_middle'].x} ${roots['r_middle'].y - 10} ${roots['r_pinky'].x + 15} ${roots['r_pinky'].y + 20}
           Q ${rightBase.x + 60} ${rightBase.y + 80} ${roots['r_thumb'].x + 10} ${roots['r_thumb'].y + 70}
           Q ${roots['r_thumb'].x - 30} ${roots['r_thumb'].y + 30} ${roots['r_index'].x - 20} ${roots['r_index'].y} Z`
        );
      }

      FINGERS.forEach(f => {
        let logicalTargetKey = HOME_KEYS[f];
        let isActive = false;

        if (mapping) {
          if (mapping.finger === f) {
            logicalTargetKey = mapping.baseKey;
            isActive = true;
          }
          if (mapping.shiftFinger === f) {
            logicalTargetKey = f.startsWith('l') ? 'lshift' : 'rshift';
            isActive = true;
          }
        }
        
        let targetPos = getTargetRect(logicalTargetKey);
        
        if (targetPos && logicalTargetKey === ' ') {
          targetPos.x += f === 'l_thumb' ? -40 : 40;
        }

        if (!targetPos) targetPos = { x: roots[f].x, y: roots[f].y - 50 };

        const st = stateRef.current[f];
        st.isActive = isActive;
        st.rootX = roots[f].x;
        st.rootY = roots[f].y;
        
        st.x += (targetPos.x - st.x) * 0.35;
        st.y += (targetPos.y - st.y) * 0.35;

        const dx = st.x - st.rootX;
        const dy = st.y - st.rootY;
        const length = Math.sqrt(dx*dx + dy*dy);
        
        const bendDir = (f === 'l_pinky' || f === 'l_ring' || f === 'r_index' || f === 'l_thumb') ? -1 : 1;
        const bendAmt = Math.max(0, 30 - (length / 4));
        
        const nx = length > 0.1 ? -dy / length : 0;
        const ny = length > 0.1 ? dx / length : 0;
        
        const cpX = (st.rootX + st.x)/2 + nx * bendAmt * bendDir;
        const cpY = (st.rootY + st.y)/2 + ny * bendAmt * bendDir;

        const pathEl = pathsRef.current[f];
        if (pathEl) {
          pathEl.setAttribute('d', `M ${st.rootX},${st.rootY} Q ${cpX},${cpY} ${st.x},${st.y}`);
          
          // User requested hand color: #FAF1DC (Pale Cream)
          if (isActive) {
            pathEl.style.stroke = '#FAF1DC'; 
            pathEl.style.opacity = '0.55'; // Reduced from 0.95
            pathEl.style.strokeWidth = f.includes('thumb') ? '22' : '18';
          } else {
            pathEl.style.stroke = '#FAF1DC'; 
            pathEl.style.opacity = '0.40'; // Reduced from 0.55
            pathEl.style.strokeWidth = f.includes('thumb') ? '20' : '16';
          }
        }
      });
      
      rafRef.current = requestAnimationFrame(updateLoop);
    };
    
    rafRef.current = requestAnimationFrame(updateLoop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mapping]);

  const assignPath = (name: string) => (el: SVGPathElement | null) => {
    if (el) pathsRef.current[name] = el;
  };
  const assignPalm = (name: string) => (el: SVGPathElement | null) => {
    if (el) palmsRef.current[name] = el;
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>
      <path ref={assignPalm('left')} fill="#FAF1DC" opacity="0.40" className="transition-opacity duration-200" />
      <path ref={assignPalm('right')} fill="#FAF1DC" opacity="0.40" className="transition-opacity duration-200" />
      
      {FINGERS.map(f => (
        <path 
          key={f}
          ref={assignPath(f)} 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="transition-colors duration-150"
        />
      ))}
    </svg>
  );
};
