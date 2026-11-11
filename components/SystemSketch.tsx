export function SystemSketch({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={compact ? "system-sketch compact" : "system-sketch"}
      viewBox="0 0 500 330"
      fill="none"
      role="img"
      aria-label="System architecture: client requests pass through an API gateway to services, Kafka messaging, databases, and observability."
    >
      <defs>
        <pattern
          id={compact ? "sketch-grid-small" : "sketch-grid"}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r=".8" fill="currentColor" opacity=".17" />
        </pattern>
      </defs>
      <rect
        width="500"
        height="330"
        fill={`url(#${compact ? "sketch-grid-small" : "sketch-grid"})`}
      />
      <g stroke="currentColor" strokeOpacity=".4" strokeWidth="1.3">
        <path d="M250 64V92M250 136V162M250 136H111V162M250 136H389V162M111 206V237H389V206M250 206V259M111 237V259M389 237V259" />
        <path d="m246 87 4 5 4-5M107 157l4 5 4-5M246 157l4 5 4-5M385 157l4 5 4-5" />
      </g>
      <g className="sketch-box">
        <rect x="185" y="24" width="130" height="40" rx="7" />
        <rect x="164" y="92" width="172" height="44" rx="7" />
        <rect x="55" y="162" width="112" height="44" rx="7" />
        <rect x="194" y="162" width="112" height="44" rx="7" />
        <rect x="333" y="162" width="112" height="44" rx="7" />
        <rect x="55" y="259" width="112" height="44" rx="7" />
        <rect x="194" y="259" width="112" height="44" rx="7" />
        <rect x="333" y="259" width="112" height="44" rx="7" />
      </g>
      <g
        fill="currentColor"
        textAnchor="middle"
        fontFamily="inherit"
        fontSize="12"
      >
        <text x="250" y="49">
          Web application
        </text>
        <text x="250" y="119">
          API gateway
        </text>
        <text x="111" y="189">
          Events
        </text>
        <text x="250" y="189">
          Payments
        </text>
        <text x="389" y="189">
          Notifications
        </text>
        <text x="111" y="286">
          PostgreSQL
        </text>
        <text x="250" y="286">
          Kafka
        </text>
        <text x="389" y="286">
          Telemetry
        </text>
      </g>
      <g fill="currentColor">
        <circle cx="250" cy="78" r="3" />
        <circle cx="111" cy="223" r="3" />
        <circle cx="320" cy="237" r="3" />
      </g>
    </svg>
  );
}
