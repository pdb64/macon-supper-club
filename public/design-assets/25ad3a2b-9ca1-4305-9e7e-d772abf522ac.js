/* Macon Supper Club — shared SVG components and visual primitives */

const { useState, useEffect, useRef, useMemo } = React;

/* ===== Real logo wrappers ===== */
function FullLogo({ light = false, style = {}, width = 240 }) {
  const src = light ? window.__resources.logoMarkCream : window.__resources.logoMark;
  return <img src={src} alt="Macon Supper Club" style={{ width, height: "auto", display: "block", ...style }} />;
}
function Wordmark({ light = false, style = {}, width = 200 }) {
  const src = light ? window.__resources.logoWordCream : window.__resources.logoWord;
  return <img src={src} alt="Macon Supper Club" style={{ width, height: "auto", display: "block", ...style }} />;
}
function BlossomBranch({ light = false, style = {}, width = 180 }) {
  const src = light ? window.__resources.logoBranchCream : window.__resources.logoBranch;
  return <img src={src} alt="" style={{ width, height: "auto", display: "block", ...style }} />;
}

/* ===== Topbar uses just the wordmark (more horizontal) ===== */
function TopbarLogo() {
  return (
    <a href="#" className="topbar-logo">
      <img src={window.__resources.logoMark} alt="Macon Supper Club" style={{ height: 78, width: "auto", display: "block" }} />
    </a>
  );
}

/* ===== Cherry branch — kept for accent uses (the existing SVG one) ===== */
function CherryBranch({ width = 200, flip = false, style = {} }) {
  return (
    <svg
      viewBox="0 0 240 140"
      width={width}
      style={{ transform: flip ? "scaleX(-1)" : "none", ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 10 80 Q 60 65 110 60 Q 160 55 220 30"
        stroke="#5a3d2a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M 50 75 Q 60 60 78 56" stroke="#5a3d2a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 130 58 Q 140 42 156 38" stroke="#5a3d2a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 175 47 Q 190 60 192 75" stroke="#5a3d2a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <Blossom cx={32} cy={84} r={11} rot={20} />
      <Blossom cx={78} cy={52} r={13} rot={-10} />
      <Blossom cx={118} cy={62} r={10} rot={40} />
      <Blossom cx={156} cy={36} r={14} rot={-15} />
      <Blossom cx={195} cy={78} r={11} rot={70} />
      <Blossom cx={218} cy={28} r={12} rot={10} />
    </svg>
  );
}

function Blossom({ cx, cy, r, rot = 0, color = "#f3c8cf" }) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      {petals.map((a, i) => (
        <ellipse
          key={i}
          cx={0}
          cy={-r * 0.55}
          rx={r * 0.45}
          ry={r * 0.7}
          fill={color}
          stroke="#e09ba6"
          strokeWidth="0.6"
          transform={`rotate(${a})`}
        />
      ))}
      <circle r={r * 0.22} fill="#d97b6a" />
      <circle r={r * 0.1} fill="#fcecc6" />
    </g>
  );
}

/* ===== Macon, GA Cityscape — downtown landmarks ===== */
function MaconSkyline({ light = false, height = 320 }) {
  const ink = light ? "#f6f1e6" : "#1c3527";
  const paper = light ? "#1c3527" : "#f6f1e6";
  const accent = light ? "#c9a85f" : "#9c7831";
  const petal = light ? "#f3c8cf" : "#e3a3ad";
  const petalCore = light ? "#d97b6a" : "#b85544";

  return (
    <svg
      viewBox="0 0 1600 340"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYEnd meet"
      style={{ width: "100%", height, display: "block" }}
    >
      <line x1="0" y1="320" x2="1600" y2="320" stroke={ink} strokeWidth="1.5" />

      {/* ===== St. Joseph's Catholic Church — twin Gothic spires ===== */}
      <g transform="translate(60 30)">
        <text x="68" y="-30" textAnchor="middle" fontFamily="Marcellus" fontSize="9" fill={accent} letterSpacing="2.4">ST. JOSEPH'S</text>
        {/* Left spire */}
        <path d="M 20 100 L 20 50 L 28 30 L 38 18 L 48 30 L 56 50 L 56 100 Z" fill={ink} />
        <path d="M 38 18 L 38 6 L 41 0 L 38 -10" stroke={ink} strokeWidth="2" fill="none" />
        <path d="M 35 -10 L 41 -10 M 38 -16 L 38 -4" stroke={ink} strokeWidth="1.5" />
        {/* Right spire */}
        <path d="M 90 100 L 90 50 L 98 30 L 108 18 L 118 30 L 126 50 L 126 100 Z" fill={ink} />
        <path d="M 108 18 L 108 6 L 111 0 L 108 -10" stroke={ink} strokeWidth="2" fill="none" />
        <path d="M 105 -10 L 111 -10 M 108 -16 L 108 -4" stroke={ink} strokeWidth="1.5" />
        {/* Central rose window section */}
        <path d="M 56 100 L 56 70 L 73 50 L 90 70 L 90 100 Z" fill={ink} />
        <circle cx="73" cy="76" r="10" fill={paper} />
        <circle cx="73" cy="76" r="5" fill={ink} />
        <line x1="73" y1="68" x2="73" y2="84" stroke={ink} strokeWidth="1" />
        <line x1="65" y1="76" x2="81" y2="76" stroke={ink} strokeWidth="1" />
        {/* Main church body */}
        <path d="M 10 100 L 10 290 L 136 290 L 136 100 Z" fill={ink} />
        {/* Tall Gothic windows along body */}
        <g fill={paper}>
          {[26, 50, 74, 98].map((x, i) => (
            <path key={i} d={`M ${x} 200 L ${x} 140 Q ${x + 5} 130 ${x + 10} 140 L ${x + 10} 200 Z`} />
          ))}
        </g>
        {/* Central main door */}
        <path d="M 58 290 L 58 240 Q 73 220 88 240 L 88 290 Z" fill={paper} />
        <line x1="73" y1="240" x2="73" y2="290" stroke={ink} strokeWidth="1" />
        {/* Steps */}
        <path d="M 0 290 L 146 290 L 142 300 L 4 300 Z" fill={ink} />
      </g>

      <CherryTreeSilhouette x={235} groundY={320} ink={ink} petal={petal} petalCore={petalCore} scale={0.9} />

      {/* ===== Hay House ===== */}
      <g transform="translate(270 130)">
        <text x="65" y="-60" textAnchor="middle" fontFamily="Marcellus" fontSize="9" fill={accent} letterSpacing="2.4">HAY HOUSE</text>
        {/* Cupola "lantern" */}
        <rect x="55" y="-2" width="20" height="22" fill={ink} />
        <path d="M 50 -2 L 80 -2 L 80 2 L 50 2 Z" fill={ink} />
        <path d="M 47 -2 Q 65 -22 83 -2 Z" fill={ink} />
        <rect x="60" y="6" width="3" height="10" fill={paper} />
        <rect x="67" y="6" width="3" height="10" fill={paper} />
        <line x1="65" y1="-28" x2="65" y2="-22" stroke={ink} strokeWidth="1.2" />
        <circle cx="65" cy="-30" r="2" fill={ink} />
        {/* Roof line — hipped pyramidal */}
        <path d="M 15 50 L 35 30 L 95 30 L 115 50 Z" fill={ink} />
        {/* Body */}
        <rect x="15" y="50" width="100" height="140" fill={ink} />
        {/* Windows — 3 rows */}
        <g fill={paper}>
          {[64, 92, 120, 148].map((y, row) =>
            [24, 42, 60, 78, 96].map((x, col) => (
              <path key={`${row}-${col}`} d={`M ${x} ${y + 14} L ${x} ${y + 2} Q ${x + 3} ${y - 2} ${x + 6} ${y + 2} L ${x + 6} ${y + 14} Z`} />
            ))
          )}
        </g>
        {/* Front porch + door */}
        <rect x="55" y="170" width="20" height="20" fill={paper} />
        <line x1="65" y1="172" x2="65" y2="190" stroke={ink} strokeWidth="0.8" />
        <rect x="50" y="166" width="30" height="4" fill={ink} />
        {/* Steps */}
        <path d="M 45 190 L 85 190 L 89 200 L 41 200 Z" fill={ink} />
      </g>

      <CherryTreeSilhouette x={420} groundY={320} ink={ink} petal={petal} petalCore={petalCore} scale={0.85} />

      {/* ===== Macon City Auditorium — domed Beaux-Arts colossus ===== */}
      <g transform="translate(450 60)">
        <text x="90" y="-44" textAnchor="middle" fontFamily="Marcellus" fontSize="9" fill={accent} letterSpacing="2.4">CITY AUDITORIUM</text>
        {/* Central dome */}
        <ellipse cx="90" cy="55" rx="46" ry="50" fill={ink} />
        <rect x="44" y="55" width="92" height="20" fill={ink} />
        {/* Dome lantern */}
        <rect x="82" y="-10" width="16" height="16" fill={ink} />
        <path d="M 78 -10 L 102 -10 L 102 -8 L 78 -8 Z" fill={ink} />
        <path d="M 82 -10 Q 90 -22 98 -10 Z" fill={ink} />
        <line x1="90" y1="-26" x2="90" y2="-22" stroke={ink} strokeWidth="1" />
        <circle cx="90" cy="-28" r="1.8" fill={ink} />
        {/* Cornice / entablature */}
        <rect x="0" y="75" width="180" height="14" fill={ink} />
        {/* Corinthian column row across front */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <g key={i}>
            <rect x={20 + i * 18} y="89" width="10" height="130" fill={ink} />
            <rect x={18 + i * 18} y="89" width="14" height="4" fill={ink} />
            <rect x={18 + i * 18} y="215" width="14" height="4" fill={ink} />
            <line x1={23 + i * 18} y1="93" x2={23 + i * 18} y2="215" stroke={paper} strokeWidth="0.5" />
            <line x1={27 + i * 18} y1="93" x2={27 + i * 18} y2="215" stroke={paper} strokeWidth="0.5" />
          </g>
        ))}
        {/* Lower base */}
        <rect x="0" y="219" width="180" height="8" fill={ink} />
        {/* Steps */}
        <path d="M -10 227 L 190 227 L 185 240 L -5 240 Z" fill={ink} />
        <path d="M -16 240 L 196 240 L 192 252 L -12 252 Z" fill={ink} />
        <path d="M -22 252 L 202 252 L 198 260 L -18 260 Z" fill={ink} />
      </g>

      <CherryTreeSilhouette x={680} groundY={320} ink={ink} petal={petal} petalCore={petalCore} scale={1.0} />

      {/* ===== The Armory Ballroom — Romanesque Revival ===== */}
      <g transform="translate(720 110)">
        <text x="75" y="-26" textAnchor="middle" fontFamily="Marcellus" fontSize="9" fill={accent} letterSpacing="2.4">THE ARMORY</text>
        {/* Corner towers with crenellations */}
        <rect x="0" y="0" width="32" height="210" fill={ink} />
        <path d="M 0 0 L 0 -10 L 6 -10 L 6 -4 L 12 -4 L 12 -10 L 20 -10 L 20 -4 L 26 -4 L 26 -10 L 32 -10 L 32 0 Z" fill={ink} />
        <rect x="118" y="0" width="32" height="210" fill={ink} />
        <path d="M 118 0 L 118 -10 L 124 -10 L 124 -4 L 130 -4 L 130 -10 L 138 -10 L 138 -4 L 144 -4 L 144 -10 L 150 -10 L 150 0 Z" fill={ink} />
        {/* Central body, slightly shorter */}
        <rect x="32" y="20" width="86" height="190" fill={ink} />
        <path d="M 32 20 L 32 12 L 38 12 L 38 18 L 44 18 L 44 12 L 52 12 L 52 18 L 58 18 L 58 12 L 92 12 L 92 18 L 98 18 L 98 12 L 106 12 L 106 18 L 112 18 L 112 12 L 118 12 L 118 20 Z" fill={ink} />
        {/* Arched windows on towers */}
        <path d="M 8 50 L 8 30 Q 16 22 24 30 L 24 50 Z" fill={paper} />
        <path d="M 8 90 L 8 70 Q 16 62 24 70 L 24 90 Z" fill={paper} />
        <path d="M 8 140 L 8 120 Q 16 112 24 120 L 24 140 Z" fill={paper} />
        <path d="M 126 50 L 126 30 Q 134 22 142 30 L 142 50 Z" fill={paper} />
        <path d="M 126 90 L 126 70 Q 134 62 142 70 L 142 90 Z" fill={paper} />
        <path d="M 126 140 L 126 120 Q 134 112 142 120 L 142 140 Z" fill={paper} />
        {/* Central grand arched window */}
        <path d="M 50 110 L 50 60 Q 75 30 100 60 L 100 110 Z" fill={paper} />
        <line x1="75" y1="40" x2="75" y2="110" stroke={ink} strokeWidth="1" />
        <line x1="50" y1="80" x2="100" y2="80" stroke={ink} strokeWidth="1" />
        {/* Central door */}
        <path d="M 60 210 L 60 170 Q 75 160 90 170 L 90 210 Z" fill={paper} />
        <line x1="75" y1="166" x2="75" y2="210" stroke={ink} strokeWidth="0.8" />
      </g>

      <CherryTreeSilhouette x={900} groundY={320} ink={ink} petal={petal} petalCore={petalCore} scale={0.9} />

      {/* ===== Mercer University clocktower ===== */}
      <g transform="translate(940 80)">
        <text x="60" y="-50" textAnchor="middle" fontFamily="Marcellus" fontSize="9" fill={accent} letterSpacing="2.4">MERCER</text>
        {/* Spire */}
        <path d="M 60 0 L 64 -10 L 60 -30 L 56 -10 Z" fill={ink} />
        <circle cx="60" cy="-32" r="2" fill={ink} />
        {/* Tower top cap */}
        <path d="M 36 24 L 36 0 L 84 0 L 84 24 Z" fill={ink} />
        {/* Clock face */}
        <circle cx="60" cy="14" r="10" fill={paper} />
        <line x1="60" y1="14" x2="60" y2="7" stroke={ink} strokeWidth="1.2" />
        <line x1="60" y1="14" x2="66" y2="16" stroke={ink} strokeWidth="1.2" />
        <circle cx="60" cy="14" r="1.4" fill={ink} />
        {/* Bell arch section */}
        <rect x="26" y="24" width="68" height="40" fill={ink} />
        <path d="M 36 64 L 36 36 Q 44 30 52 36 L 52 64 Z" fill={paper} />
        <path d="M 56 64 L 56 36 Q 60 30 64 36 L 64 64 Z" fill={paper} />
        <path d="M 68 64 L 68 36 Q 76 30 84 36 L 84 64 Z" fill={paper} />
        {/* Body */}
        <rect x="20" y="64" width="80" height="176" fill={ink} />
        {/* Window pattern */}
        <g fill={paper}>
          {[78, 108, 138, 168, 198].map((y, row) =>
            [28, 50, 72, 90].map((x, col) => (
              <rect key={`${row}-${col}`} x={x} y={y} width="6" height="14" />
            ))
          )}
        </g>
      </g>

      <CherryTreeSilhouette x={1090} groundY={320} ink={ink} petal={petal} petalCore={petalCore} scale={0.95} />

      {/* ===== Cherry Street brick storefront row ===== */}
      <g transform="translate(1130 170)">
        <text x="130" y="-22" textAnchor="middle" fontFamily="Marcellus" fontSize="9" fill={accent} letterSpacing="2.4">CHERRY STREET</text>
        <rect x="0" y="0" width="260" height="150" fill={ink} />
        {/* Top cornice — variation per shopfront */}
        <path d="M 0 -10 L 0 0 L 60 0 L 64 -8 L 68 0 L 130 0 L 132 -10 L 134 0 L 196 0 L 200 -8 L 204 0 L 260 0 L 260 -10 Z" fill={ink} />
        <line x1="65" y1="0" x2="65" y2="150" stroke={paper} strokeWidth="0.6" />
        <line x1="131" y1="0" x2="131" y2="150" stroke={paper} strokeWidth="0.6" />
        <line x1="197" y1="0" x2="197" y2="150" stroke={paper} strokeWidth="0.6" />
        {/* Upper-floor double-hung windows */}
        <g fill={paper}>
          {[16, 82, 148, 214].map((bx, i) => (
            <g key={i}>
              <rect x={bx} y="20" width="14" height="22" />
              <rect x={bx + 24} y="20" width="14" height="22" />
              <line x1={bx + 7} y1="20" x2={bx + 7} y2="42" stroke={ink} strokeWidth="0.6" />
              <line x1={bx + 31} y1="20" x2={bx + 31} y2="42" stroke={ink} strokeWidth="0.6" />
            </g>
          ))}
        </g>
        {/* Belt course */}
        <rect x="0" y="60" width="260" height="3" fill={paper} />
        {/* Awnings */}
        <path d="M 4 65 L 62 65 L 56 80 L 10 80 Z" fill={accent} opacity="0.9" />
        <path d="M 70 65 L 128 65 L 122 80 L 76 80 Z" fill={ink} />
        <path d="M 136 65 L 194 65 L 188 80 L 142 80 Z" fill={accent} opacity="0.9" />
        <path d="M 202 65 L 258 65 L 252 80 L 208 80 Z" fill={ink} />
        {/* Storefront windows */}
        {[10, 76, 142, 208].map((x, i) => (
          <rect key={i} x={x} y="84" width="52" height="48" fill={paper} />
        ))}
        {/* Door panels — dark on cream */}
        <rect x="34" y="104" width="8" height="28" fill={ink} />
        <rect x="100" y="104" width="8" height="28" fill={ink} />
        <rect x="166" y="104" width="8" height="28" fill={ink} />
        <rect x="232" y="104" width="8" height="28" fill={ink} />
        {/* Sidewalk */}
        <rect x="-4" y="148" width="268" height="2" fill={ink} />
      </g>

      <CherryTreeSilhouette x={1430} groundY={320} ink={ink} petal={petal} petalCore={petalCore} scale={0.85} />

      {/* ===== The Big House — Tudor manor ===== */}
      <g transform="translate(1470 150)">
        <text x="65" y="-8" textAnchor="middle" fontFamily="Marcellus" fontSize="9" fill={accent} letterSpacing="2.4">THE BIG HOUSE</text>
        {/* Steeply gabled left wing */}
        <path d="M 0 70 L 36 18 L 72 70 Z" fill={ink} />
        {/* Right wing — slightly lower */}
        <path d="M 60 70 L 96 30 L 130 70 Z" fill={ink} />
        {/* Chimney */}
        <rect x="20" y="6" width="8" height="22" fill={ink} />
        <rect x="18" y="6" width="12" height="4" fill={ink} />
        {/* Main body */}
        <rect x="0" y="70" width="130" height="100" fill={ink} />
        {/* Tudor half-timbering accent — narrow gold cross beams */}
        <line x1="0" y1="98" x2="130" y2="98" stroke={accent} strokeWidth="0.8" opacity="0.7" />
        <line x1="0" y1="132" x2="130" y2="132" stroke={accent} strokeWidth="0.8" opacity="0.7" />
        {/* Upper windows — under each gable */}
        <g fill={paper}>
          <rect x="8" y="78" width="10" height="14" />
          <rect x="22" y="78" width="10" height="14" />
          <rect x="40" y="82" width="10" height="14" />
          <rect x="60" y="82" width="10" height="14" />
          <rect x="82" y="84" width="10" height="14" />
          <rect x="100" y="84" width="10" height="14" />
        </g>
        {/* Lower windows + door */}
        <g fill={paper}>
          <rect x="10" y="108" width="16" height="22" />
          <rect x="32" y="108" width="16" height="22" />
        </g>
        {/* Front door — central */}
        <path d="M 58 140 L 58 108 Q 65 102 72 108 L 72 140 Z" fill={paper} />
        <line x1="65" y1="106" x2="65" y2="140" stroke={ink} strokeWidth="0.8" />
        <g fill={paper}>
          <rect x="82" y="108" width="16" height="22" />
          <rect x="104" y="108" width="16" height="22" />
        </g>
        {/* Music note flourish in front yard — quiet local nod */}
        <g transform="translate(85 180)" fill={accent} opacity="0.85">
          <ellipse cx="0" cy="-2" rx="3" ry="2.5" transform="rotate(-15)" />
          <path d="M 2 -3 L 2 -16" stroke={accent} strokeWidth="1.4" />
          <path d="M 2 -16 Q 8 -16 10 -12" stroke={accent} strokeWidth="1.4" fill="none" />
        </g>
      </g>

      {/* Falling petals scattered across the sky */}
      <g>
        {[
          [120, 30], [380, 20], [560, 45], [820, 32], [1080, 18], [1280, 38], [1480, 22],
          [240, 60], [680, 70], [950, 50], [1180, 65], [1390, 55],
          [60, 100], [340, 90], [620, 95], [880, 110], [1140, 85], [1420, 100], [1540, 75],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${(i * 47) % 360})`}>
            <ellipse cx="0" cy="0" rx="3" ry="5" fill={petal} opacity="0.7" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function CherryTreeSilhouette({ x, groundY, ink, petal, petalCore, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${groundY}) scale(${scale})`}>
      <path d="M 0 0 L 0 -60 Q -2 -75 4 -82" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 0 -50 Q -20 -68 -30 -76" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 0 -56 Q 15 -72 25 -80" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 0 -62 Q -12 -82 -8 -95" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 4 -68 Q 18 -85 14 -100" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />
      <g>
        {[
          [-22, -76, 11], [-8, -85, 13], [10, -86, 12], [24, -78, 10], [-14, -94, 11],
          [4, -100, 12], [18, -94, 10], [-26, -84, 9], [28, -84, 9], [0, -78, 14],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={petal} opacity="0.85" />
        ))}
      </g>
      {[
        [-18, -82], [10, -88], [22, -78], [-6, -96], [12, -100],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.6" fill={petalCore} />
      ))}
    </g>
  );
}

/* ===== Branded photo carousel ===== */
const BRANDED_PHOTOS = [
  { src: window.__resources.b09, caption: "Downtown · golden hour", pos: "50% 35%" },
  { src: window.__resources.b06, caption: "Sunday supper · plated", pos: "50% 50%" },
  { src: window.__resources.b01, caption: "St. Joseph's, lit from below", pos: "50% 38%" },
  { src: window.__resources.b04, caption: "Cherry Street rooftops", pos: "50% 40%" },
  { src: window.__resources.b07, caption: "Macon · soft evening", pos: "50% 62%" },
  { src: window.__resources.b02, caption: "January, in the garden", pos: "50% 35%" },
  { src: window.__resources.b05, caption: "Augusta · April tradition", pos: "50% 50%" },
  { src: window.__resources.b03, caption: "Game day · the helmet", pos: "50% 50%" },
  { src: window.__resources.b08, caption: "Saturdays in the South", pos: "50% 50%" },
];

function BrandedCarousel({ interval = 5500 }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = BRANDED_PHOTOS.length;

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % total), interval);
    return () => clearTimeout(t);
  }, [idx, paused, interval, total]);

  const go = (dir) => setIdx((i) => (i + dir + total) % total);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-stage">
        {BRANDED_PHOTOS.map((p, i) => (
          <div
            key={i}
            className={`carousel-slide ${i === idx ? "on" : ""}`}
            aria-hidden={i !== idx}
          >
            <img src={p.src} alt={p.caption} style={{ objectPosition: p.pos }} />
          </div>
        ))}
        <div className="carousel-shade"></div>
        <div className="carousel-caption">
          <div className="cc-number">{String(idx + 1).padStart(2, "0")} <span className="of">/ {String(total).padStart(2, "0")}</span></div>
          <div className="cc-text">{BRANDED_PHOTOS[idx].caption}</div>
        </div>
        <button className="carousel-arrow prev" aria-label="Previous" onClick={() => go(-1)}>‹</button>
        <button className="carousel-arrow next" aria-label="Next" onClick={() => go(1)}>›</button>
      </div>
      <div className="carousel-dots">
        {BRANDED_PHOTOS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={`carousel-dot ${i === idx ? "on" : ""}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </div>
  );
}

function PickupMap() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#efe7d4" />

      {/* Idle Hour Country Club — golf area to the south */}
      <g>
        <path d="M 0 285 Q 80 268 160 278 Q 240 286 320 270 Q 360 266 400 278 L 400 400 L 0 400 Z" fill="#b9c79f" opacity="0.7" />
        <path d="M 50 335 Q 130 320 220 335 Q 290 348 360 333" stroke="#9fb286" strokeWidth="1.5" fill="none" />
        <path d="M 30 372 Q 120 360 230 370 Q 320 378 390 365" stroke="#9fb286" strokeWidth="1.5" fill="none" />
        <ellipse cx="110" cy="358" rx="14" ry="6" fill="#e8dec5" />
        <ellipse cx="280" cy="350" rx="16" ry="7" fill="#e8dec5" />
        <text x="200" y="395" textAnchor="middle" fontFamily="Marcellus" fontSize="9" fill="#2e553f" letterSpacing="3" opacity="0.7">IDLE HOUR COUNTRY CLUB</text>
      </g>

      {/* Forsyth Rd — main artery */}
      <path d="M -20 110 Q 200 170 420 240" stroke="#d4c89e" strokeWidth="28" fill="none" strokeLinecap="round" />
      <path d="M -20 110 Q 200 170 420 240" stroke="#fbf7ee" strokeWidth="1.5" strokeDasharray="6 8" fill="none" />
      <g transform="translate(80 115) rotate(13)">
        <text fontFamily="Marcellus" fontSize="10" fill="#8a7a4a" letterSpacing="3.5">FORSYTH ROAD</text>
      </g>

      {/* Cross street */}
      <path d="M 100 -10 Q 130 100 90 230" stroke="#e0d5ad" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M 100 -10 Q 130 100 90 230" stroke="#fbf7ee" strokeWidth="1" strokeDasharray="4 6" fill="none" />
      <g transform="translate(38 60) rotate(78)">
        <text fontFamily="Marcellus" fontSize="9" fill="#8a7a4a" letterSpacing="3">NORTHSIDE</text>
      </g>

      {/* Forsyth Landing shopping center */}
      <g>
        <rect x="190" y="200" width="120" height="44" fill="#e6d9b3" stroke="#c1b487" strokeWidth="1" />
        <line x1="190" y1="222" x2="310" y2="222" stroke="#c1b487" strokeWidth="0.5" />
        <line x1="230" y1="200" x2="230" y2="244" stroke="#c1b487" strokeWidth="0.5" />
        <line x1="270" y1="200" x2="270" y2="244" stroke="#c1b487" strokeWidth="0.5" />
      </g>

      {/* Connecting tether from pin up to label */}
      <line x1="250" y1="158" x2="250" y2="78" stroke="#1c3527" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.45" />

      {/* Pin */}
      <g transform="translate(250 175)">
        <ellipse cx="0" cy="14" rx="20" ry="4" fill="#1f3a2b" opacity="0.18" />
        <path d="M 0 -36 C 18 -36 26 -22 26 -8 C 26 12 0 36 0 36 C 0 36 -26 12 -26 -8 C -26 -22 -18 -36 0 -36 Z"
              fill="#1c3527" stroke="#fbf7ee" strokeWidth="2" />
        <circle cx="0" cy="-12" r="9" fill="#fbf7ee" />
        <text x="0" y="-9" textAnchor="middle" fontFamily="Marcellus" fontSize="13" fill="#9c7831">✻</text>
      </g>

      {/* Label card — top center, breathing room */}
      <g transform="translate(250 28)">
        <rect x="-90" y="0" width="180" height="42" fill="#fbf7ee" stroke="#1c3527" strokeWidth="1" />
        <text x="0" y="18" textAnchor="middle" fontFamily="Marcellus" fontSize="11" fill="#1c3527" letterSpacing="2.6">GREY GOOSE</text>
        <text x="0" y="33" textAnchor="middle" fontFamily="Marcellus" fontSize="9" fill="#3d5944" letterSpacing="3">PLAYERS CLUB</text>
      </g>

      {/* Compass — top right corner */}
      <g transform="translate(370 50)">
        <circle r="16" fill="#fbf7ee" stroke="#1c3527" strokeWidth="1" />
        <path d="M 0 -10 L 3 0 L 0 10 L -3 0 Z" fill="#1c3527" />
        <text x="0" y="-20" textAnchor="middle" fontFamily="Marcellus" fontSize="8" fill="#1c3527">N</text>
      </g>

      {/* "From I-75" marker — bottom left */}
      <g transform="translate(40 265)">
        <circle r="4" fill="#9c7831" />
        <circle r="9" fill="none" stroke="#9c7831" strokeWidth="0.8" opacity="0.55" />
        <text x="14" y="3" fontFamily="Marcellus" fontSize="8" fill="#5a3d2a" letterSpacing="2.5">FROM I-75 · 2 MIN</text>
      </g>
    </svg>
  );
}

window.CherryBranch = CherryBranch;
window.Blossom = Blossom;
window.Wordmark = Wordmark;
window.TopbarLogo = TopbarLogo;
window.FullLogo = FullLogo;
window.BlossomBranch = BlossomBranch;
window.PickupMap = PickupMap;
window.MaconSkyline = MaconSkyline;
window.BrandedCarousel = BrandedCarousel;
