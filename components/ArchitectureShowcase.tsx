'use client';

import React, { useState } from 'react';
import { portfolioContent } from '@/data/content';
import { 
  Layers, 
  Server, 
  Activity, 
  Database, 
  Radio, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  CheckCircle2,
  Cpu,
  Info,
  GitCommit,
  Network,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const layerStyles: Record<string, { badge: string; text: string; border: string; glow: string; activeBg: string }> = {
  Gateway: {
    badge: 'bg-[#F29559]/15 text-[#F29559] border-[#F29559]/30',
    text: 'text-[#F29559]',
    border: 'border-[#F29559]/40 hover:border-[#F29559]',
    glow: 'shadow-[#F29559]/20',
    activeBg: 'bg-[#F29559]/15',
  },
  'Core Microservices': {
    badge: 'bg-[#B8B08D]/20 text-[#F6F4EE] border-[#B8B08D]/40',
    text: 'text-[#B8B08D]',
    border: 'border-[#B8B08D]/40 hover:border-[#B8B08D]',
    glow: 'shadow-[#B8B08D]/20',
    activeBg: 'bg-[#B8B08D]/15',
  },
  'Event Bus & Storage': {
    badge: 'bg-[#F2D492]/15 text-[#F2D492] border-[#F2D492]/30',
    text: 'text-[#F2D492]',
    border: 'border-[#F2D492]/40 hover:border-[#F2D492]',
    glow: 'shadow-[#F2D492]/20',
    activeBg: 'bg-[#F2D492]/15',
  },
  Observability: {
    badge: 'bg-[#F29559]/15 text-[#F29559] border-[#F29559]/30',
    text: 'text-[#F29559]',
    border: 'border-[#F29559]/40 hover:border-[#F29559]',
    glow: 'shadow-[#F29559]/20',
    activeBg: 'bg-[#F29559]/15',
  },
};

export function ArchitectureShowcase() {
  const { architectureShowcase } = portfolioContent;
  const [selectedNodeId, setSelectedNodeId] = useState<string>(architectureShowcase.nodes[0].id);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const selectedNode = architectureShowcase.nodes.find((n) => n.id === selectedNodeId) || architectureShowcase.nodes[0];

  const relatedIncomingFlows = architectureShowcase.flows.filter((f) => f.to === selectedNode.id);
  const relatedOutgoingFlows = architectureShowcase.flows.filter((f) => f.from === selectedNode.id);

  const simSequence = ['gateway', 'event-service', 'kafka-bus', 'notification-service', 'otel-collector', 'grafana-stack'];

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(0);
    setSelectedNodeId(simSequence[0]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < simSequence.length) {
        setSimStep(step);
        setSelectedNodeId(simSequence[step]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setSimStep(0);
        }, 1200);
      }
    }, 1200);
  };

  return (
    <section id="architecture" className="py-28 relative bg-[#17202B] text-[#F6F4EE] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#F29559]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#F2D492]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F29559]/10 text-[#F29559] font-mono text-xs mb-3 border border-[#F29559]/30">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Distributed Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F6F4EE]">
            {architectureShowcase.title}
          </h2>
          <p className="mt-3 text-[#B8B08D] max-w-2xl text-sm sm:text-base">
            {architectureShowcase.subtitle}. Interactive topology showing real-time event routing, outbox transactions, and telemetry pipelines.
          </p>
        </motion.div>

        {/* Live Data-Flow Indicator Ribbon & Simulation Control */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-[#202C39] border border-[#B8B08D]/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#B8B08D] shadow-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Radio className="w-3.5 h-3.5 text-[#F29559] animate-pulse" />
            <span className="text-[#F6F4EE] font-semibold">Active Topology Flow:</span>
            <span className="px-2 py-0.5 rounded bg-[#F29559]/15 text-[#F29559] border border-[#F29559]/30">Edge Gateway</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-[#B8B08D]/20 text-[#F6F4EE] border border-[#B8B08D]/40">Microservices</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-[#F2D492]/15 text-[#F2D492] border border-[#F2D492]/30">Kafka Outbox</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-[#F29559]/15 text-[#F29559] border border-[#F29559]/30">OTel / Grafana</span>
          </div>

          {/* Interactive Simulation Trigger */}
          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all shadow-sm ${
              isSimulating
                ? 'bg-[#F2D492]/20 text-[#F2D492] border border-[#F2D492]/40 animate-pulse'
                : 'bg-[#F29559]/20 text-[#F29559] border border-[#F29559]/40 hover:bg-[#F29559]/30 hover:border-[#F29559]'
            }`}
            title="Simulate distributed event flow across layers"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? `Tracing Step #${simStep + 1}...` : 'Simulate Saga Flow'}</span>
          </button>
        </div>

        {/* Interactive Topology Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Architecture Topology (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#202C39]/95 border border-[#B8B08D]/25 shadow-2xl backdrop-blur-md relative">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#283845] text-xs font-mono text-[#B8B08D]">
                <span className="flex items-center gap-2 text-[#F29559]">
                  <Network className="w-3.5 h-3.5" />
                  <span>Interactive Node Selector</span>
                </span>
                <span>Click any node to inspect telemetry & contracts</span>
              </div>

              {/* Node Layers */}
              <div className="space-y-6">
                
                {/* 1. Gateway Layer (Coral) */}
                <div>
                  <div className="text-[11px] font-mono text-[#F29559] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F29559]" />
                    <span>Edge / Gateway Layer</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {architectureShowcase.nodes
                      .filter((n) => n.layer === 'Gateway')
                      .map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`w-full p-4 rounded-2xl text-left transition-all duration-200 border flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#F29559]/15 border-[#F29559] ring-2 ring-[#F29559]/50 shadow-xl shadow-[#F29559]/20'
                                : 'bg-[#283845]/90 border-[#B8B08D]/20 hover:border-[#F29559]/50 hover:bg-[#283845]'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-xl bg-[#F29559]/15 text-[#F29559]">
                                <ShieldCheck className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-[#F6F4EE] flex items-center gap-2">
                                  <span>{node.name}</span>
                                  {isSelected && (
                                    <span className="w-2 h-2 rounded-full bg-[#F29559] animate-ping inline-block" />
                                  )}
                                </div>
                                <div className="text-xs font-mono text-[#B8B08D]">{node.tech}</div>
                              </div>
                            </div>
                            <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#F29559] translate-x-1' : 'text-[#B8B08D]/50'}`} />
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Animated Connector Arrow */}
                <div className="flex items-center justify-center -my-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#283845] border border-[#B8B08D]/20 text-[10px] font-mono text-[#B8B08D]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F29559] animate-pulse" />
                    <span>JWT Validated Route Dispatch</span>
                    <span>↓</span>
                  </div>
                </div>

                {/* 2. Core Microservices Layer (Sand / Slate) */}
                <div>
                  <div className="text-[11px] font-mono text-[#B8B08D] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-[#B8B08D]" />
                    <span>Core Domain Microservices</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {architectureShowcase.nodes
                      .filter((n) => n.layer === 'Core Microservices')
                      .map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`w-full p-3.5 rounded-2xl text-left transition-all duration-200 border flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#B8B08D]/20 border-[#B8B08D] ring-2 ring-[#B8B08D]/50 shadow-xl shadow-black/30'
                                : 'bg-[#283845]/90 border-[#B8B08D]/20 hover:border-[#B8B08D]/50 hover:bg-[#283845]'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-xl bg-[#B8B08D]/20 text-[#F6F4EE]">
                                <Server className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-[#F6F4EE] flex items-center gap-1.5">
                                  <span>{node.name}</span>
                                  {isSelected && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#B8B08D] animate-ping inline-block" />
                                  )}
                                </div>
                                <div className="text-[10px] font-mono text-[#B8B08D] truncate max-w-[150px]">{node.tech}</div>
                              </div>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#B8B08D] translate-x-0.5' : 'text-[#B8B08D]/50'}`} />
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Animated Connector Arrow */}
                <div className="flex items-center justify-center -my-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#283845] border border-[#B8B08D]/20 text-[10px] font-mono text-[#B8B08D]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F2D492] animate-pulse" />
                    <span>Transactional Outbox Publishing</span>
                    <span>↓</span>
                  </div>
                </div>

                {/* 3. Event Bus & Storage Layer (Gold) */}
                <div>
                  <div className="text-[11px] font-mono text-[#F2D492] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#F2D492]" />
                    <span>Apache Kafka Event Bus & Persistence</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {architectureShowcase.nodes
                      .filter((n) => n.layer === 'Event Bus & Storage')
                      .map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`w-full p-4 rounded-2xl text-left transition-all duration-200 border flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#F2D492]/15 border-[#F2D492] ring-2 ring-[#F2D492]/50 shadow-xl shadow-[#F2D492]/20'
                                : 'bg-[#283845]/90 border-[#B8B08D]/20 hover:border-[#F2D492]/50 hover:bg-[#283845]'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-xl bg-[#F2D492]/15 text-[#F2D492]">
                                <Database className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-[#F6F4EE] flex items-center gap-2">
                                  <span>{node.name}</span>
                                  {isSelected && (
                                    <span className="w-2 h-2 rounded-full bg-[#F2D492] animate-ping inline-block" />
                                  )}
                                </div>
                                <div className="text-xs font-mono text-[#B8B08D]">{node.tech}</div>
                              </div>
                            </div>
                            <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#F2D492] translate-x-1' : 'text-[#B8B08D]/50'}`} />
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Animated Connector Arrow */}
                <div className="flex items-center justify-center -my-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#283845] border border-[#B8B08D]/20 text-[10px] font-mono text-[#B8B08D]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F29559] animate-pulse" />
                    <span>OpenTelemetry OTLP Spans & Metrics</span>
                    <span>↓</span>
                  </div>
                </div>

                {/* 4. Observability Layer */}
                <div>
                  <div className="text-[11px] font-mono text-[#F29559] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#F29559]" />
                    <span>Telemetry & Observability Stack</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {architectureShowcase.nodes
                      .filter((n) => n.layer === 'Observability')
                      .map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`w-full p-3.5 rounded-2xl text-left transition-all duration-200 border flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#F29559]/20 border-[#F29559] ring-2 ring-[#F29559]/50 shadow-xl shadow-[#F29559]/20'
                                : 'bg-[#283845]/90 border-[#B8B08D]/20 hover:border-[#F29559]/50 hover:bg-[#283845]'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-xl bg-[#F29559]/15 text-[#F29559]">
                                <Activity className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-[#F6F4EE] flex items-center gap-1.5">
                                  <span>{node.name}</span>
                                  {isSelected && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#F29559] animate-ping inline-block" />
                                  )}
                                </div>
                                <div className="text-[10px] font-mono text-[#B8B08D] truncate max-w-[150px]">{node.tech}</div>
                              </div>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-[#F29559] translate-x-0.5' : 'text-[#B8B08D]/50'}`} />
                          </button>
                        );
                      })}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Detailed Inspector Panel with AnimatePresence (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-3xl bg-[#202C39] border border-[#B8B08D]/30 shadow-2xl backdrop-blur-md"
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border ${layerStyles[selectedNode.layer].badge}`}>
                    {selectedNode.layer}
                  </span>
                  <span className="text-xs font-mono text-[#B8B08D]">
                    ID: #{selectedNode.id}
                  </span>
                </div>

                {/* Node Title */}
                <h3 className="text-2xl font-bold text-[#F6F4EE] mb-2">
                  {selectedNode.name}
                </h3>

                {/* Technology */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#283845] text-xs font-mono text-[#F29559] mb-5 border border-[#B8B08D]/25">
                  <Cpu className="w-3.5 h-3.5 text-[#F29559]" />
                  <span>{selectedNode.tech}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#F6F4EE]/90 leading-relaxed mb-6 font-sans">
                  {selectedNode.description}
                </p>

                {/* Architectural Highlights / Guarantees */}
                <div className="space-y-3 pt-5 border-t border-[#283845]">
                  <div className="text-xs font-mono text-[#F29559] uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#F29559]" />
                    <span>Resilience & Guarantees</span>
                  </div>
                  {selectedNode.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#B8B08D] leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#F2D492] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Connected Flow Links */}
                {(relatedIncomingFlows.length > 0 || relatedOutgoingFlows.length > 0) && (
                  <div className="mt-5 pt-4 border-t border-[#283845] space-y-2 text-xs font-mono">
                    <div className="text-[11px] text-[#B8B08D] uppercase tracking-wider flex items-center gap-1.5">
                      <GitCommit className="w-3.5 h-3.5 text-[#F2D492]" />
                      <span>Active Flow Connections</span>
                    </div>
                    {relatedIncomingFlows.map((flow, fIdx) => (
                      <div key={`in-${fIdx}`} className="text-[11px] text-[#B8B08D] flex items-center gap-1.5">
                        <span className="text-[#F29559] font-semibold">IN:</span>
                        <span>{flow.from}</span>
                        <span>→</span>
                        <span className="text-[#F6F4EE]">{flow.label}</span>
                      </div>
                    ))}
                    {relatedOutgoingFlows.map((flow, fIdx) => (
                      <div key={`out-${fIdx}`} className="text-[11px] text-[#B8B08D] flex items-center gap-1.5">
                        <span className="text-[#F2D492] font-semibold">OUT:</span>
                        <span>{flow.label}</span>
                        <span>→</span>
                        <span className="text-[#F6F4EE]">{flow.to}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Note */}
                <div className="mt-6 p-3.5 rounded-2xl bg-[#283845] border border-[#B8B08D]/25 flex items-start gap-2.5 text-xs text-[#B8B08D]">
                  <Info className="w-4 h-4 text-[#F29559] shrink-0 mt-0.5" />
                  <span>
                    Zero data-loss architecture configured with transactional outbox event guarantees and idempotent consumers.
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
