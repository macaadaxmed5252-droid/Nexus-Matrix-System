import React, { useState } from 'react';

export default function NexusMatrixSystem() {
  // --- 1. STATE & ARCHITECTURE LAYER ---
  const [currentPage, setCurrentPage] = useState('terminal'); // 'terminal' ama 'registry'
  const [nodes, setNodes] = useState([
    { id: "node-alpha.lax1", type: "Core Edge", status: "Operational", memory: 45, secure: true },
    { id: "node-beta.fra2", type: "Compute Cluster", status: "Operational", memory: 89, secure: true }
  ]);
  
  // Form States
  const [nodeId, setNodeId] = useState('');
  const [clusterType, setClusterType] = useState('Tier-01 Infrastructure Core');
  const [securityManifest, setSecurityManifest] = useState('');
  const [bypassHandshake, setBypassHandshake] = useState(false);
  const [systemAlert, setSystemAlert] = useState(null);

  // --- 2. BUSINESS LOGIC ENGINE ---
  const handleProvisionNode = (e) => {
    e.preventDefault();

    // Senior-Level Validation Guard Clauses
    if (!nodeId.trim() || !securityManifest.trim()) {
      setSystemAlert({
        type: 'danger',
        title: 'Security Validation Failure',
        message: 'Cryptographic payload configuration manifest cannot be empty.'
      });
      return;
    }

    if (securityManifest.length < 15) {
      setSystemAlert({
        type: 'warning',
        title: 'Weak Encryption Protocol',
        message: 'The injected manifest array sequence requires a minimum of 15 parameters.'
      });
      return;
    }

    // Abuurista Node cusub oo ammaan ah (Mutation)
    const newNode = {
      id: `${nodeId.toLowerCase().replace(/\s+/g, '-')}.sec`,
      type: clusterType,
      status: 'Deploying',
      memory: Math.floor(Math.random() * 30) + 10, // Simulated memory load
      secure: !bypassHandshake
    };

    setNodes([newNode, ...nodes]);
    
    // Nidaamka Alert-ka oo si guul leh u shaqeeyay
    setSystemAlert({
      type: 'success',
      title: 'Infrastructure Node Initialized',
      message: `Asset ${newNode.id} has been securely cryptographed and pushed to pipeline.`
    });

    // Reset Forms
    setNodeId('');
    setSecurityManifest('');
  };

  const terminateNode = (id) => {
    setNodes(nodes.filter(node => node.id !== id));
    setSystemAlert({
      type: 'danger',
      title: 'Asset Deprovisioned',
      message: `Cluster connection for ${id} was instantly severed from network map.`
    });
  };

  return (
    <div className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* ==================== GLOBAL APP HEADER ==================== */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 px-8 py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3 group">
            <div className="h-10 w-10 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <svg className="w-5 h-5 text-black font-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a13 13 0 002.28 7.68L5 9V5a2 2 0 012-2h2a2 2 0 012 2v10l3 3m3-3v3m0 0h3m-3 0h-3" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-widest bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              NEXUS <span className="text-cyan-400 font-light text-xs font-mono border border-cyan-500/30 px-2 py-0.5 rounded bg-cyan-950/40">OPS TERMINAL</span>
            </span>
          </div>
          
          {/* NAVIGATION TABS (PAGE ROUTER SWITCH) */}
          <div className="flex space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setCurrentPage('terminal')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${currentPage === 'terminal' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/10' : 'text-slate-400 hover:text-white'}`}
            >
              01. Provision Engine
            </button>
            <button 
              onClick={() => setCurrentPage('registry')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all relative ${currentPage === 'registry' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/10' : 'text-slate-400 hover:text-white'}`}
            >
              02. Infrastructure Map
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border-2 border-slate-900">{nodes.length}</span>
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-3 text-xs">
          <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-slate-400 font-mono">SECURE MATRIX: BALANCED</span>
        </div>
      </nav>

      {/* ==================== REALTIME NOTIFICATION LAYER ==================== */}
      {systemAlert && (
        <div className="max-w-[1600px] w-full mx-auto px-6 pt-6">
          <div className={`border rounded-xl p-4 flex items-start justify-between shadow-2xl transition-all animate-fadeIn ${
            systemAlert.type === 'success' ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' :
            systemAlert.type === 'warning' ? 'bg-amber-950/40 border-amber-500/30 text-amber-300' :
            'bg-rose-950/40 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex space-x-3">
              <span className="text-lg mt-0.5">
                {systemAlert.type === 'success' ? '✓' : '⚠'}
              </span>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider">{systemAlert.title}</h4>
                <p className="text-xs opacity-80 mt-1 font-mono">{systemAlert.message}</p>
              </div>
            </div>
            <button onClick={() => setSystemAlert(null)} className="text-xs font-bold hover:opacity-60 uppercase tracking-widest font-mono">Dismiss</button>
          </div>
        </div>
      )}

      {/* ==================== CORE ROUTER BODY ==================== */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6">
        
        {/* ---------------- BOGGA 1AAD: TERMINAL PROVISIONING ---------------- */}
        {currentPage === 'terminal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* INJECT CONTROL FORM CONTAINER */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
              <div>
                <h2 className="text-xl font-black tracking-tight text-white">Cryptographic Node Deployment</h2>
                <p className="text-xs text-slate-400 mt-1">Geli macluumaadka si loo abuuro daris ammaan ah oo lagu daro shabakadda dhexe.</p>
              </div>

              <form onSubmit={handleProvisionNode} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Node Host Identifier</label>
                    <input 
                      type="text"
                      value={nodeId}
                      onChange={(e) => setNodeId(e.target.value)}
                      placeholder="e.g. edge-router-uk"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Network Segment Tier</label>
                    <select 
                      value={clusterType}
                      onChange={(e) => setClusterType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"
                    >
                      <option>Tier-01 Infrastructure Core</option>
                      <option>Tier-02 Secondary Compute Cluster</option>
                      <option>Tier-03 Edge Isolated Vault</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Cryptographic Policy Manifest Payload</label>
                  <textarea 
                    rows="4"
                    value={securityManifest}
                    onChange={(e) => setSecurityManifest(e.target.value)}
                    placeholder="Paste secure SHA-256 initialization hex arrays here..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-cyan-400 placeholder-slate-700 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all font-mono"
                  ></textarea>
                </div>

                {/* CHECKBOX SYSTEM LINKED TO WORKFLOW */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-300">Bypass Hardened TLS Handshake</h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">Ma ku xiri kartaa iyada oo aan la hubin borotokoolka amniga?</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={bypassHandshake}
                      onChange={(e) => setBypassHandshake(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 peer-checked:after:bg-black after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-400"></div>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-lg shadow-cyan-500/10 active:scale-[0.99] transition-all"
                >
                  Execute Cryptographic Provisioning
                </button>
              </form>
            </div>

            {/* LIVE TELEMETRY OVERVIEW SUMMARY SIDEBAR */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center"><span className="h-2 w-2 bg-cyan-400 rounded-full mr-2"></span>Current Deployment Metrics</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-slate-400">Global Cluster Allocation</span>
                      <span className="font-mono font-bold text-cyan-400">{(nodes.length * 12.5).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div className="bg-cyan-400 h-full transition-all duration-500" style={{ width: `${nodes.length * 12.5}%` }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between"><span className="text-slate-500">Total Monitored Nodes:</span><span className="text-white font-bold">{nodes.length}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">System Integration Status:</span><span className="text-emerald-400 font-bold uppercase font-mono text-[10px]">Stable Core</span></div>
                  </div>
                </div>
              </div>

              {/* ACTION QUICK SHIFT CARD */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ready to Monitor?</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">U gudub bogga map-ka si aad u aragto telemetry-ga.</p>
                </div>
                <button 
                  onClick={() => setCurrentPage('registry')}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 font-bold text-xs px-4 py-2 rounded-xl transition-all"
                >
                  View Network Map →
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ---------------- BOGGA 2AAD: INFRASTRUCTURE REGISTRY (MAP) ---------------- */}
        {currentPage === 'registry' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-black tracking-tight text-white">Active Infrastructure Network Map</h2>
                <p className="text-xs text-slate-400 mt-1">Jadwalka rasmiga ah ee maamulaya dhammaan dhuumaha (pipelines) ee hadda shaqaynaya.</p>
              </div>
              <button 
                onClick={() => setCurrentPage('terminal')}
                className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
              >
                + Add Cluster Asset
              </button>
            </div>

            {/* PRODUCTION GRADE DATA TABLE */}
            <div className="overflow-hidden border border-slate-800 rounded-xl bg-slate-950">
              {nodes.length === 0 ? (
                <div className="p-12 text-center text-slate-500 text-xs font-mono">
                  No active server clusters registered in this matrix region.
                </div>
              ) : (
                <table className="min-w-full divide-y divide-slate-800 text-left text-xs">
                  <thead className="bg-slate-900/50 font-bold uppercase text-slate-400 tracking-wider text-[10px]">
                    <tr>
                      <th className="px-6 py-4">Node Anchor Link</th>
                      <th className="px-6 py-4">Classification Layer</th>
                      <th className="px-6 py-4">Memory Buffer Capacity</th>
                      <th className="px-6 py-4">Security Handshake</th>
                      <th className="px-6 py-4 text-right">Emergency Vector</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    {nodes.map((node) => (
                      <tr key={node.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="px-6 py-4 font-bold text-white text-sm">{node.id}</td>
                        <td className="px-6 py-4 text-slate-400 text-xs font-sans">{node.type}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3 w-32">
                            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                              <div className={`h-full ${node.memory > 75 ? 'bg-rose-500' : 'bg-cyan-400'}`} style={{ width: `${node.memory}%` }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">{node.memory}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-medium text-[10px] uppercase border ${
                            node.secure ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          }`}>
                            {node.secure ? 'Hardened TLS' : 'Unverified Bypass'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => terminateNode(node.id)}
                            className="text-rose-400 hover:text-rose-300 font-bold hover:underline font-sans text-xs"
                          >
                            Sever Connection
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ==================== FOOTER PLATFORM MATRIX ==================== */}
      <footer className="bg-slate-900 text-slate-500 py-6 px-8 border-t border-slate-800 text-xs">
        <div className="max-w-[1600px] w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-white font-black tracking-widest text-sm">NEXUS HYPER-OS</span>
            <span className="text-slate-700">|</span>
            <span className="font-mono">Production Engine React Context</span>
          </div>
          <div className="text-slate-600 font-mono">&copy; 2026 Enterprise Core Pipeline Execution Framework.</div>
        </div>
      </footer>

    </div>
  );
}