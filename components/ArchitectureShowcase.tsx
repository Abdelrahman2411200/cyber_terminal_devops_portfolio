'use client';

import React, { useState } from 'react';
import { portfolioContent } from '@/data/content';
import { 
  Terminal, 
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
  Info
} from 'lucide-react';

const layerColors: Record<string, { badge: string; border: string; glow: string }> = {
  Gateway: {
    badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    border: 'border-sky-500/40 hover:border-sky-400',
    glow: 'rgba(56, 189, 248, 0.15)',
  },
  'Core Microservices': {
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    border: 'border-cyan-500/40 hover:border-cyan-400',
    glow: 'rgba(6, 182, 212, 0.15)',
  },
  'Event Bus & Storage': {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    border: 'border-emerald-500/40 hover:border-emerald-400',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
  Observability: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    border: 'border-amber-500/40 hover:border-amber-400',
    glow: 'rgba(245, 158, 11, 0.15)',
  },
};

const layerIcons: Record<string, React.ReactNode> = {
  Gateway: <ShieldCheck className="w-4 h-4 text-sky-400" />,
  'Core Microservices': <Server className="w-4 h-4 text-cyan-400" />,
  'Event Bus & Storage': <Database className="w-4 h-4 text-emerald-400" />,
  Observability: <Activity className="w-4 h-4 text-amber-400" />,
};

export function ArchitectureShowcase() {
  const { architectureShowcase } = portfolioContent;
  const [selectedNodeId, setSelectedNodeId] = useState<string>(architectureShowcase.nodes[0].id);

  const selectedNode = architectureShowcase.nodes.find((n) => n.id === selectedNodeId) || architectureShowcase.nodes[0];

  return (
    <section id="architecture" className="py-20 relative bg-slate-950 text-slate-100 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-14 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs mb-3 border border-cyan-500/30">
            <Layers className="w-3.5 h-3.5" />
            <span>04 // SYSTEM ARCHITECTURE DEEP DIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {architectureShowcase.title}
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            {architectureShowcase.subtitle}. Click any system node below to inspect transactional guarantees, distributed saga flows, and observability collectors.
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Architecture Map (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>Interactive Topology Map</span>
                </span>
                <span>Select node to inspect</span>
              </div>

              {/* Node Grid by Layer */}
              <div className="space-y-4">
                
                {/* 1. Gateway Layer */}
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    <span>Edge / Gateway Layer</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {architectureShowcase.nodes
                      .filter((n) => n.layer === 'Gateway')
                      .map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`w-full p-3.5 rounded-xl text-left transition-all duration-200 border flex items-center justify-between ${
                              isSelected
                                ? 'bg-sky-500/20 border-sky-400 ring-1 ring-sky-400/50 shadow-lg shadow-sky-500/10'
                                : 'bg-slate-850 bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                                <ShieldCheck className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">{node.name}</div>
                                <div className="text-xs font-mono text-slate-400">{node.tech}</div>
                              </div>
                            </div>
                            <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-sky-400 translate-x-1' : 'text-slate-600'}`} />
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* 2. Core Microservices Layer */}
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Domain Microservices (Decoupled)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {architectureShowcase.nodes
                      .filter((n) => n.layer === 'Core Microservices')
                      .map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`w-full p-3.5 rounded-xl text-left transition-all duration-200 border flex items-center justify-between ${
                              isSelected
                                ? 'bg-cyan-500/20 border-cyan-400 ring-1 ring-cyan-400/50 shadow-lg shadow-cyan-500/10'
                                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                                <Server className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-white">{node.name}</div>
                                <div className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">{node.tech}</div>
                              </div>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* 3. Event Bus & Storage Layer */}
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Event Streaming & Transactional Persistence</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {architectureShowcase.nodes
                      .filter((n) => n.layer === 'Event Bus & Storage')
                      .map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`w-full p-3.5 rounded-xl text-left transition-all duration-200 border flex items-center justify-between ${
                              isSelected
                                ? 'bg-emerald-500/20 border-emerald-400 ring-1 ring-emerald-400/50 shadow-lg shadow-emerald-500/10'
                                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                <Database className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">{node.name}</div>
                                <div className="text-xs font-mono text-slate-400">{node.tech}</div>
                              </div>
                            </div>
                            <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'}`} />
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* 4. Observability Layer */}
                <div>
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-400" />
                    <span>Telemetry & Observability Stack</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {architectureShowcase.nodes
                      .filter((n) => n.layer === 'Observability')
                      .map((node) => {
                        const isSelected = selectedNodeId === node.id;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNodeId(node.id)}
                            className={`w-full p-3.5 rounded-xl text-left transition-all duration-200 border flex items-center justify-between ${
                              isSelected
                                ? 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400/50 shadow-lg shadow-amber-500/10'
                                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                            }`}
                            id={`arch-node-${node.id}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                                <Activity className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-white">{node.name}</div>
                                <div className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">{node.tech}</div>
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

          {/* Detailed Inspector Panel (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold border ${layerColors[selectedNode.layer].badge}`}>
                  {selectedNode.layer}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Node: #{selectedNode.id}
                </span>
              </div>

              {/* Node Title */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {selectedNode.name}
              </h3>

              {/* Technology */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-cyan-300 mb-5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedNode.tech}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {selectedNode.description}
              </p>

              {/* Architectural Highlights / Guarantees */}
              <div className="space-y-3 pt-5 border-t border-slate-800">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Resilience & Design Guarantees</span>
                </div>
                {selectedNode.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Quick Summary Note */}
              <div className="mt-6 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Designed for zero data loss during broker failovers using transactional outbox tables and idempotent consumers.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
