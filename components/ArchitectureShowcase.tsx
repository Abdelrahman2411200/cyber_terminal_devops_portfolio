'use client';

import React, { useState, useEffect } from 'react';
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
    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    text: 'text-cyan-400',
    border: 'border-cyan-500/40 hover:border-cyan-400',
    glow: 'shadow-cyan-500/25',
    activeBg: 'bg-cyan-500/15',
  },
  'Core Microservices': {
    badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    text: 'text-indigo-400',
    border: 'border-indigo-500/40 hover:border-indigo-400',
    glow: 'shadow-indigo-500/25',
    activeBg: 'bg-indigo-500/15',
  },
  'Event Bus & Storage': {
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    text: 'text-emerald-400',
    border: 'border-emerald-500/40 hover:border-emerald-400',
    glow: 'shadow-emerald-500/25',
    activeBg: 'bg-emerald-500/15',
  },
  Observability: {
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    text: 'text-amber-400',
    border: 'border-amber-500/40 hover:border-amber-400',
    glow: 'shadow-amber-500/25',
    activeBg: 'bg-amber-500/15',
  },
};

export function ArchitectureShowcase() {
  const { architectureShowcase } = portfolioContent;
  const [selectedNodeId, setSelectedNodeId] = useState<string>(architectureShowcase.nodes[0].id);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const selectedNode = architectureShowcase.nodes.find((n) => n.id === selectedNodeId) || architectureShowcase.nodes[0];

  // Connected incoming & outgoing flows for the selected node
  const relatedIncomingFlows = architectureShowcase.flows.filter((f) => f.to === selectedNode.id);
  const relatedOutgoingFlows = architectureShowcase.flows.filter((f) => f.from === selectedNode.id);

  // Simulation steps sequence
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
    <section id="architecture" className="py-28 relative bg-[#05080E] text-white overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs mb-3 border border-cyan-500/30">
            <Layers className="w-3.5 h-3.5" />
            <span>04 // SYSTEM ARCHITECTURE DEEP DIVE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {architectureShowcase.title}
          </h2>
          <p className="mt-3 text-slate-300 max-w-2xl text-sm sm:text-base">
            {architectureShowcase.subtitle}. Interactive topology showing real-time event routing, outbox transactions, and telemetry pipelines.
          </p>
        </motion.div>

        {/* Live Data-Flow Indicator Ribbon & Simulation Control */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-[#090D16] border border-cyan-500/20 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400 shadow-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">Active Topology Flow:</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">Edge Gateway</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">Microservices</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Kafka Outbox</span>
            <span>→</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">OTel / Grafana</span>
          </div>

          {/* Interactive Simulation Trigger */}
          <button
            onClick={triggerSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all shadow-sm ${
              isSimulating
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse'
                : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/25 hover:border-cyan-400'
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
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0D1527]/90 border border-slate-800 shadow-2xl backdrop-blur-md relative">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2 text-cyan-400">
                  <Network className="w-3.5 h-3.5" />
                  <span>Interactive Node Selector</span>
                </span>
                <span>Click any node to inspect telemetry & contracts</span>
              </div>

              {/* Node Layers with Flow Connectors */}
              <div className="space-y-6">
                
                {/* 1. Gateway Layer (Cyan) */}
                <div>
                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Layer 1: Edge / Gateway</span>
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
                                ? 'bg-cyan-500/15 border-cyan-400 ring-2 ring-cyan-400/50 shadow-xl shadow-cyan-500/20'
                                : 'bg-[#090D16]/95 border-slate-800 hover:border-cyan-500/50 hover:bg-[#131F37]'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400">
                                <ShieldCheck className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white flex items-center gap-2">
                                  <span>{node.name}</span>
                                  {isSelected && (
                                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                                  )}
                                </div>
                                <div className="text-xs font-mono text-slate-400">{node.tech}</div>
                              </div>
                            </div>
                            <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Animated Flow Connector Arrow */}
                <div className="flex items-center justify-center -my-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#090D16] border border-slate-800 text-[10px] font-mono text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>JWT Validated Route Dispatch</span>
                    <span>↓</span>
                  </div>
                </div>

                {/* 2. Core Microservices Layer (Indigo) */}
                <div>
                  <div className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Layer 2: Core Domain Microservices</span>
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
                                ? 'bg-indigo-500/20 border-indigo-400 ring-2 ring-indigo-400/50 shadow-xl shadow-indigo-500/20'
                                : 'bg-[#090D16]/95 border-slate-800 hover:border-indigo-500/50 hover:bg-[#131F37]'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400">
                                <Server className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                                  <span>{node.name}</span>
                                  {isSelected && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping inline-block" />
                                  )}
                                </div>
                                <div className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">{node.tech}</div>
                              </div>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600'}`} />
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Animated Flow Connector Arrow */}
                <div className="flex items-center justify-center -my-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#090D16] border border-slate-800 text-[10px] font-mono text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Transactional Outbox Publishing</span>
                    <span>↓</span>
                  </div>
                </div>

                {/* 3. Event Bus & Storage Layer (Emerald) */}
                <div>
                  <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Layer 3: Apache Kafka Event Bus & Persistence</span>
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
                                ? 'bg-emerald-500/15 border-emerald-400 ring-2 ring-emerald-400/50 shadow-xl shadow-emerald-500/20'
                                : 'bg-[#090D16]/95 border-slate-800 hover:border-emerald-500/50 hover:bg-[#131F37]'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
                                <Database className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white flex items-center gap-2">
                                  <span>{node.name}</span>
                                  {isSelected && (
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                                  )}
                                </div>
                                <div className="text-xs font-mono text-slate-400">{node.tech}</div>
                              </div>
                            </div>
                            <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'}`} />
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Animated Flow Connector Arrow */}
                <div className="flex items-center justify-center -my-2">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#090D16] border border-slate-800 text-[10px] font-mono text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>OpenTelemetry OTLP Spans & Metrics</span>
                    <span>↓</span>
                  </div>
                </div>

                {/* 4. Observability Layer (Amber) */}
                <div>
                  <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span>Layer 4: Telemetry & Observability Stack</span>
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
                                ? 'bg-amber-500/20 border-amber-400 ring-2 ring-amber-400/50 shadow-xl shadow-amber-500/20'
                                : 'bg-[#090D16]/95 border-slate-800 hover:border-amber-500/50 hover:bg-[#131F37]'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400">
                                <Activity className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                                  <span>{node.name}</span>
                                  {isSelected && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                                  )}
                                </div>
                                <div className="text-[10px] font-mono text-slate-400 truncate max-w-[150px]">{node.tech}</div>
                              </div>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-amber-400 translate-x-0.5' : 'text-slate-600'}`} />
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
                className="p-6 sm:p-8 rounded-3xl bg-[#0D1527] border border-cyan-500/30 shadow-2xl backdrop-blur-md"
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border ${layerStyles[selectedNode.layer].badge}`}>
                    {selectedNode.layer}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ID: #{selectedNode.id}
                  </span>
                </div>

                {/* Node Title */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedNode.name}
                </h3>

                {/* Technology */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090D16] text-xs font-mono text-cyan-400 mb-5 border border-cyan-500/20">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{selectedNode.tech}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                  {selectedNode.description}
                </p>

                {/* Architectural Highlights / Guarantees */}
                <div className="space-y-3 pt-5 border-t border-slate-800">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Resilience & Guarantees</span>
                  </div>
                  {selectedNode.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Connected Flow Links */}
                {(relatedIncomingFlows.length > 0 || relatedOutgoingFlows.length > 0) && (
                  <div className="mt-5 pt-4 border-t border-slate-800 space-y-2 text-xs font-mono">
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <GitCommit className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Active Flow Connections</span>
                    </div>
                    {relatedIncomingFlows.map((flow, fIdx) => (
                      <div key={`in-${fIdx}`} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <span className="text-cyan-400 font-semibold">IN:</span>
                        <span>{flow.from}</span>
                        <span>→</span>
                        <span className="text-slate-300">{flow.label}</span>
                      </div>
                    ))}
                    {relatedOutgoingFlows.map((flow, fIdx) => (
                      <div key={`out-${fIdx}`} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <span className="text-emerald-400 font-semibold">OUT:</span>
                        <span>{flow.label}</span>
                        <span>→</span>
                        <span className="text-slate-300">{flow.to}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Note */}
                <div className="mt-6 p-3.5 rounded-2xl bg-[#090D16] border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
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
