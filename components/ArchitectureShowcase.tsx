"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Play } from "lucide-react";
import { portfolioContent } from "@/data/content";
import { SectionBackground } from "./SectionBackground";

const layers = [
  "Gateway",
  "Core Microservices",
  "Event Bus & Storage",
  "Observability",
] as const;
const journey = [
  "gateway",
  "event-service",
  "kafka-bus",
  "notification-service",
  "otel-collector",
  "grafana-stack",
];
export function ArchitectureShowcase() {
  const { architectureShowcase: architecture } = portfolioContent;
  const [selectedId, setSelectedId] = useState(architecture.nodes[0].id);
  const [step, setStep] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (step === null) return;
    setSelectedId(journey[step]);
    timer.current = setTimeout(
      () => setStep(step + 1 < journey.length ? step + 1 : null),
      1500,
    );
    return () => clearTimeout(timer.current);
  }, [step]);
  const selected =
    architecture.nodes.find((node) => node.id === selectedId) ||
    architecture.nodes[0];
  const flows = architecture.flows.filter(
    (flow) => flow.from === selectedId || flow.to === selectedId,
  );
  return (
    <section id="architecture" className="section-space architecture-section">
      <SectionBackground effect="topology" />
      <div className="section-shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Under the hood</span>
            <h2>
              A system is more
              <br />
              than its services.
            </h2>
          </div>
          <p>
            Inside my Event Management Platform. Select a component to see its
            role, or follow a request through the system.
          </p>
        </div>
        <div className="architecture-toolbar">
          <span>
            Event Management Platform{" "}
            <span className="architecture-toolbar-note">
              / Architecture explorer
            </span>
          </span>
          <button
            className="text-link"
            onClick={() => setStep(step === null ? 0 : null)}
            aria-pressed={step !== null}
          >
            <Play size={14} />
            {step === null ? "Follow a request" : "Stop walkthrough"}
          </button>
        </div>
        <div className="architecture-layout">
          <div className="architecture-diagram" aria-label="System components">
            {layers.map((layer, index) => (
              <div className="architecture-layer" key={layer}>
                <span className="layer-label">{layer}</span>
                <div className="architecture-nodes">
                  {architecture.nodes
                    .filter((node) => node.layer === layer)
                    .map((node) => (
                      <button
                        key={node.id}
                        className="architecture-node"
                        aria-pressed={selectedId === node.id}
                        onClick={() => {
                          setStep(null);
                          setSelectedId(node.id);
                        }}
                      >
                        <span className="node-dot" />
                        <span>
                          {node.name}
                          <small>{node.tech}</small>
                        </span>
                        {selectedId === node.id && <ArrowUpRight size={15} />}
                      </button>
                    ))}
                </div>
                {index < layers.length - 1 && (
                  <ArrowDown
                    size={18}
                    className="layer-arrow"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
          <aside className="node-details" aria-live="polite">
            <span className="detail-category">{selected.layer}</span>
            <h3>{selected.name}</h3>
            <span className="node-tech">{selected.tech}</span>
            <p>{selected.description}</p>
            <ul>
              {selected.details.map((detail) => (
                <li key={detail}>
                  <Check size={14} />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
            {flows.length > 0 && (
              <div className="node-connections">
                <h4>Connections</h4>
                {flows.map((flow) => (
                  <div key={`${flow.from}-${flow.to}`}>
                    <span>
                      {
                        architecture.nodes.find(
                          (node) =>
                            node.id ===
                            (flow.from === selected.id ? flow.to : flow.from),
                        )?.name
                      }
                    </span>
                    <ArrowRight size={13} />
                    <small>{flow.label}</small>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
        <p className="architecture-note">
          An interactive view of the project architecture.{" "}
          <a
            href={portfolioContent.featuredProjects[0].githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the source <ArrowUpRight size={13} />
          </a>
        </p>
      </div>
    </section>
  );
}
