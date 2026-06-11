import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, Droplet, Sun, Wind, Battery, Radio, Anchor, Send, AlertTriangle, 
  AlertCircle, CheckCircle, Bell, Zap, Crosshair, RefreshCw, Gauge, 
  Compass, Eye, Thermometer, Shield, Navigation, ArrowRight, Play, Square, List
} from 'lucide-react';

const projectToVehicle = (projectId) => {
  switch (projectId) {
    case 'farming-rover':
      return 'rover';
    case 'joljan':
      return 'joljan';
    case 'hexacopter':
      return 'hexacopter';
    default:
      return 'rover';
  }
};

export default function Dashboard({ activeProject, onNavigateProject }) {
  const [activeVehicle, setActiveVehicle] = useState(projectToVehicle(activeProject)); // 'rover', 'joljan', 'hexacopter'

  useEffect(() => {
    if (activeProject) {
      setActiveVehicle(projectToVehicle(activeProject));
    }
  }, [activeProject]);

  // Common Notification State
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'Farming Rover calibration sequence complete.', time: '02:10 AM' },
    { id: 2, type: 'warning', message: 'JolJan ASV detects rising water levels in Sector D (Sylhet).', time: '02:14 AM' },
    { id: 3, type: 'success', message: 'Hexacopter successfully completed spray run in Sector F.', time: '02:15 AM' }
  ]);

  const addNotification = (type, message) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setNotifications(prev => [{ id: Date.now(), type, message, time }, ...prev.slice(0, 4)]);
  };

  return (
    <div className="bg-black min-h-screen pt-20 text-white font-sans selection:bg-white selection:text-black">
      {/* HUD Scanlines / Grid lines overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-10" />

      {/* Top Banner / Dashboard Navigation */}
      <section className="border-b border-white/10 bg-neutral-950/80 backdrop-blur-md sticky top-16 z-30 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo / Status */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </div>
            <div>
              <span className="font-serif text-[11px] md:text-[12px] uppercase tracking-[0.3em] text-white/40 block">DREAMERS INNOVATOR LABS</span>
              <h1 className="text-2xl md:text-3xl font-serif tracking-widest uppercase text-white">AI COMMAND CENTER</h1>
            </div>
          </div>

          {/* Vehicle Tabs */}
          <div className="flex border border-white/10 rounded-sm overflow-hidden p-0.5 bg-black/60">
            <button
              onClick={() => setActiveVehicle('rover')}
              className={`px-5 py-2.5 font-serif text-[12px] md:text-[13px] uppercase tracking-widest transition-all duration-300 ${
                activeVehicle === 'rover' 
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold' 
                  : 'text-white/45 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              Farming Rover
            </button>
            <button
              onClick={() => setActiveVehicle('joljan')}
              className={`px-5 py-2.5 font-serif text-[12px] md:text-[13px] uppercase tracking-widest transition-all duration-300 ${
                activeVehicle === 'joljan' 
                  ? 'bg-sky-500/10 border border-sky-500/30 text-sky-400 font-semibold' 
                  : 'text-white/45 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              JolJan ASV
            </button>
            <button
              onClick={() => setActiveVehicle('hexacopter')}
              className={`px-5 py-2.5 font-serif text-[12px] md:text-[13px] uppercase tracking-widest transition-all duration-300 ${
                activeVehicle === 'hexacopter' 
                  ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold' 
                  : 'text-white/45 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              Hexacopter Drone
            </button>
          </div>
        </div>
      </section>

      {/* Main Command Dashboard */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 relative z-20">
        
        {/* Render vehicle-specific layout */}
        {activeVehicle === 'rover' && (
          <RoverDashboard addNotification={addNotification} notifications={notifications} onNavigateProject={onNavigateProject} />
        )}
        {activeVehicle === 'joljan' && (
          <JoljanDashboard addNotification={addNotification} notifications={notifications} onNavigateProject={onNavigateProject} />
        )}
        {activeVehicle === 'hexacopter' && (
          <HexacopterDashboard addNotification={addNotification} notifications={notifications} onNavigateProject={onNavigateProject} />
        )}

      </main>
    </div>
  );
}

/* =========================================================================
   1. FARMING ROVER SUB-DASHBOARD
   ========================================================================= */
function RoverDashboard({ addNotification, notifications, onNavigateProject }) {
  // Rover States
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState(null);
  const [isDeployingProbe, setIsDeployingProbe] = useState(false);
  const [probeProgress, setProbeProgress] = useState(0);

  // Crop & Nutrient Data
  const [soilNPK, setSoilNPK] = useState({ N: 42, P: 18, K: 35 });
  const [soilPH, setSoilPH] = useState(6.2);
  const [soilMoisture, setSoilMoisture] = useState(38);
  const [selectedCrop, setSelectedCrop] = useState('Rice');

  // Simulated crop grids for Growth Stages & Harvesting notifications
  const [cropSectors, setCropSectors] = useState([
    { id: 'Sector A', crop: 'Rice', stage: 'Vegetative', growth: 72, harvestingAgeDays: 120, currentAgeDays: 86 },
    { id: 'Sector B', crop: 'Rice', stage: 'Mature', growth: 99, harvestingAgeDays: 120, currentAgeDays: 119 },
    { id: 'Sector C', crop: 'Jute', stage: 'Flowering', growth: 84, harvestingAgeDays: 140, currentAgeDays: 118 },
    { id: 'Sector D', crop: 'Wheat', stage: 'Seedling', growth: 18, harvestingAgeDays: 110, currentAgeDays: 20 }
  ]);

  // Handle Harvesting Notification Banner
  const [showHarvestAlert, setShowHarvestAlert] = useState(true);

  // Trigger simulated harvest warning on initial mount or load
  useEffect(() => {
    // Check if any sector has reached mature stage or near harvest age
    const readySector = cropSectors.find(sec => sec.growth >= 99);
    if (readySector && showHarvestAlert) {
      addNotification('warning', `HARVEST ALERT: Crop in ${readySector.id} (${readySector.crop}) has reached harvesting age!`);
    }
  }, []);

  // Increment growth rate slowly to simulate real-time simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCropSectors(prev => prev.map(sec => {
        let nextGrowth = sec.growth + (Math.random() * 0.1);
        let nextAge = sec.currentAgeDays + (Math.random() * 0.05);
        let nextStage = sec.stage;

        if (nextGrowth >= 100) {
          nextGrowth = 100;
          nextStage = 'Mature';
          if (sec.growth < 99.9) {
            addNotification('warning', `HARVEST WARNING: ${sec.id} (${sec.crop}) is fully mature and ready for harvest!`);
          }
        } else if (nextGrowth > 85) {
          nextStage = 'Mature';
        } else if (nextGrowth > 50) {
          nextStage = 'Flowering';
        } else if (nextGrowth > 20) {
          nextStage = 'Vegetative';
        }

        return {
          ...sec,
          growth: parseFloat(nextGrowth.toFixed(1)),
          currentAgeDays: parseFloat(nextAge.toFixed(1)),
          stage: nextStage
        };
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Action: Deploy Hydraulic Probe
  const handleDeployProbe = () => {
    if (isDeployingProbe || isScanning) return;
    setIsDeployingProbe(true);
    setProbeProgress(0);
    addNotification('info', 'Activating hydraulic actuators. Deploying soil spectrometer probe...');

    const interval = setInterval(() => {
      setProbeProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDeployingProbe(false);
            // Generate new simulated soil metrics
            const newN = Math.floor(25 + Math.random() * 30);
            const newP = Math.floor(10 + Math.random() * 20);
            const newK = Math.floor(20 + Math.random() * 25);
            const newPH = parseFloat((5.5 + Math.random() * 1.8).toFixed(1));
            const newMoist = Math.floor(30 + Math.random() * 25);
            setSoilNPK({ N: newN, P: newP, K: newK });
            setSoilPH(newPH);
            setSoilMoisture(newMoist);

            addNotification('success', `Soil analysis complete: N:${newN} P:${newP} K:${newK} ppm | pH: ${newPH}`);
          }, 800);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  // Action: AI Leaf Diagnostic Scan
  const handleLeafScan = () => {
    if (isScanning || isDeployingProbe) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);
    addNotification('info', 'Calibrating multispectral camera feed for leaf nutrient scans...');

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            // Generate random scan result
            const deficiencies = [
              { element: 'Nitrogen (N)', severity: 'High', color: 'border-amber-400 bg-amber-500/5', desc: 'Yellowing from leaf tip extending down midrib.', solution: 'Apply Urea (46% N) at 55kg/hectare, or organic manure.' },
              { element: 'Phosphorus (P)', severity: 'Moderate', color: 'border-purple-400 bg-purple-500/5', desc: 'Purplish tinting on lower leaves and stems, stunted roots.', solution: 'Apply Triple Superphosphate (TSP) or bone meal.' },
              { element: 'Potassium (K)', severity: 'Low', color: 'border-yellow-400 bg-yellow-500/5', desc: 'Chlorosis and marginal leaf scorching on older leaves.', solution: 'Incorporate Muriate of Potash (MOP) or composted wood ash.' },
              { element: 'None (Healthy)', severity: 'Stable', color: 'border-emerald-500 bg-emerald-500/5', desc: 'Optimal chlorophyll content, broad leaf texture.', solution: 'Maintain current irrigation schedules and organic compost blankets.' }
            ];
            const chosen = deficiencies[Math.floor(Math.random() * deficiencies.length)];
            setScanResults(chosen);
            addNotification('success', `AI vision check completed: Detected deficiency: ${chosen.element}`);
          }, 800);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  // Target values for fertilizer calculations
  const getNPKTargets = () => {
    switch (selectedCrop) {
      case 'Rice': return { N: 60, P: 20, K: 45, maxN: 80, maxP: 30, maxK: 60 };
      case 'Jute': return { N: 70, P: 25, K: 50, maxN: 90, maxP: 35, maxK: 70 };
      case 'Wheat': return { N: 55, P: 18, K: 40, maxN: 70, maxP: 25, maxK: 55 };
      case 'Tea': return { N: 80, P: 30, K: 60, maxN: 100, maxP: 40, maxK: 80 };
      default: return { N: 60, P: 20, K: 45, maxN: 80, maxP: 30, maxK: 60 };
    }
  };

  const targets = getNPKTargets();
  const nDiff = Math.max(0, targets.N - soilNPK.N);
  const pDiff = Math.max(0, targets.P - soilNPK.P);
  const kDiff = Math.max(0, targets.K - soilNPK.K);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm md:text-base">
      
      {/* Harvest Warning Alert banner */}
      {showHarvestAlert && cropSectors.some(sec => sec.growth >= 99) && (
        <div className="col-span-12 glass-panel border-amber-500/40 bg-amber-500/5 p-5 rounded-sm flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
            <div className="font-serif text-xs md:text-sm uppercase tracking-wider text-white">
              <strong className="text-amber-400">Harvesting Stage Reached:</strong> Sector B {selectedCrop} is at 99.4% maturity. Autonomous monitoring recommends starting harvest operations immediately.
            </div>
          </div>
          <button 
            onClick={() => setShowHarvestAlert(false)} 
            className="text-xs uppercase tracking-widest text-white/60 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded-sm"
          >
            Acknowledge
          </button>
        </div>
      )}

      {/* Crop Selector Panel */}
      <div className="col-span-12 glass-panel p-5 border-white/5 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-900/20">
        <div>
          <h2 className="font-serif text-sm md:text-base uppercase tracking-wider text-white">AI-Powered Crop Monitoring & Analysis</h2>
          <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Select crop type to adjust vision systems, NPK sensor thresholds, and fertilizer calculations.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="font-serif text-xs uppercase tracking-widest text-white/50 whitespace-nowrap">Active Crop:</span>
          <select 
            value={selectedCrop} 
            onChange={(e) => {
              const cropVal = e.target.value;
              setSelectedCrop(cropVal);
              addNotification('info', `VISION ENGINE: Recalibrating spectral bands for ${cropVal.toUpperCase()} crop profiles.`);
              
              if (cropVal === 'Rice') {
                setSoilNPK({ N: 42, P: 18, K: 35 });
                setSoilPH(6.2);
                setSoilMoisture(38);
              } else if (cropVal === 'Jute') {
                setSoilNPK({ N: 55, P: 22, K: 41 });
                setSoilPH(6.8);
                setSoilMoisture(52);
              } else if (cropVal === 'Wheat') {
                setSoilNPK({ N: 38, P: 14, K: 32 });
                setSoilPH(6.5);
                setSoilMoisture(28);
              } else if (cropVal === 'Tea') {
                setSoilNPK({ N: 61, P: 24, K: 48 });
                setSoilPH(5.4);
                setSoilMoisture(65);
              }
            }}
            className="bg-black border border-white/15 px-4 py-2 font-serif text-xs uppercase tracking-wider text-white rounded-sm focus:outline-none focus:border-emerald-500 w-full md:w-48"
          >
            <option value="Rice">Rice (ধান)</option>
            <option value="Jute">Jute (পাট)</option>
            <option value="Wheat">Wheat (গম)</option>
            <option value="Tea">Tea (চা)</option>
          </select>
        </div>
      </div>

      {/* LEFT COLUMN: CAMERA FEED & ACTIVE DIAGNOSTICS */}
      <div className="lg:col-span-7 space-y-6">
        {/* HUD Camera Feed Screen */}
        <div className="relative border border-emerald-500/20 rounded-sm aspect-video bg-black overflow-hidden group hover:border-emerald-500/40 transition-all duration-500">
          
          {/* Main camera backdrop image */}
          <img 
            src="/rover_feed.png" 
            alt="Farming Rover Ground Feed" 
            className="absolute inset-0 w-full h-full object-cover opacity-85 filter contrast-125 saturate-75 brightness-75"
          />

          {/* AI scan box indicators if scanning or done */}
          {isScanning && (
            <div className="absolute inset-0 flex flex-col justify-between p-8 z-10 pointer-events-none">
              <div className="w-full flex justify-between">
                <div className="w-10 h-10 border-t-2 border-l-2 border-emerald-500" />
                <div className="w-10 h-10 border-t-2 border-r-2 border-emerald-500" />
              </div>
              {/* Scan grid laser effect */}
              <div className="h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-full animate-bounce shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
              <div className="w-full flex justify-between">
                <div className="w-10 h-10 border-b-2 border-l-2 border-emerald-500" />
                <div className="w-10 h-10 border-b-2 border-r-2 border-emerald-500" />
              </div>
            </div>
          )}

          {scanResults && !isScanning && (
            <div className="absolute inset-0 p-8 z-10 pointer-events-none">
              {/* Deficient crop leaf highlight circle */}
              {scanResults.element !== 'None (Healthy)' ? (
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed border-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-5 h-5 bg-red-500 rounded-full" />
                  <span className="absolute -top-7 bg-red-600 text-[10px] md:text-xs uppercase tracking-widest px-2.5 py-1 rounded-sm border border-red-400 font-serif text-white font-bold shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                    DEFICIENCY SPOT: {scanResults.element.toUpperCase()}
                  </span>
                </div>
              ) : (
                <div className="absolute top-1/4 left-1/3 w-40 h-40 border border-dashed border-emerald-500 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="absolute -top-7 bg-emerald-600 text-[10px] md:text-xs uppercase tracking-widest px-2.5 py-1 rounded-sm border border-emerald-400 font-serif text-white font-semibold">
                    OPTIMAL HEALTH CHECK
                  </span>
                </div>
              )}
            </div>
          )}

          {/* HUD Telemetry HUD Layout Overlays */}
          <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/85 to-transparent flex justify-between items-start text-[10px] md:text-xs font-serif tracking-widest text-emerald-400/90 uppercase z-10">
            <div>
              <span>CAM FEED: ROVER_CAM_01 [MONITORING]</span>
              <br />
              <span className="text-white/50">RESOLUTION: 1920x1080 // FPS: 30</span>
            </div>
            <div className="text-right">
              <span className="flex items-center gap-1.5 text-emerald-400 justify-end">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                ROVER ONLINE // AUTO-MODE
              </span>
              <span className="text-white/50">SECTOR: AGRI-09A // CROP: {selectedCrop.toUpperCase()}</span>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 to-transparent flex justify-between items-end z-10">
            <div className="text-[10px] md:text-xs font-serif tracking-widest text-white/60 uppercase">
              <span>LAT: 23.8103° N // LON: 90.4125° E</span>
              <br />
              <span>ALTITUDE: 1.2M // GROUND COMPACTION: STABLE</span>
            </div>

            {/* Probe deployment progress */}
            {isDeployingProbe && (
              <div className="w-56 bg-black/80 border border-emerald-500/30 p-2.5 rounded-sm space-y-1.5">
                <div className="flex justify-between text-[9px] md:text-xs font-serif tracking-widest text-emerald-400">
                  <span>HYDRAULIC PROBE DEPLOYING</span>
                  <span>{probeProgress}%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-150" style={{ width: `${probeProgress}%` }} />
                </div>
              </div>
            )}

            {isScanning && (
              <div className="w-56 bg-black/80 border border-emerald-500/30 p-2.5 rounded-sm space-y-1.5">
                <div className="flex justify-between text-[9px] md:text-xs font-serif tracking-widest text-emerald-400">
                  <span>AI SPECTRAL ANALYZER RUNNING</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-150" style={{ width: `${scanProgress}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Rover Controls & Manual Triggers */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              Rover Hardware Diagnostics & Steer Controls
            </h3>
            <span className="font-serif text-[10px] tracking-widest text-emerald-400 bg-emerald-500/5 px-2.5 py-1 rounded-sm border border-emerald-500/10">SYSTEMS READY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Control Panel Actions */}
            <div className="space-y-4">
              <p className="text-xs font-serif uppercase tracking-widest text-white/50">Spectroscopy Controls</p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleDeployProbe}
                  disabled={isDeployingProbe || isScanning}
                  className="w-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 px-4 py-3.5 font-serif text-[11px] md:text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-emerald-500 hover:text-black hover:border-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-500/5 disabled:hover:text-emerald-400 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isDeployingProbe ? 'animate-spin' : ''}`} />
                  Deploy Soil Probe
                </button>
                <button
                  onClick={handleLeafScan}
                  disabled={isScanning || isDeployingProbe}
                  className="w-full border border-white/10 bg-white/5 text-white px-4 py-3.5 font-serif text-[11px] md:text-xs uppercase tracking-[0.2em] rounded-sm hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-40 disabled:hover:bg-white/5 disabled:hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Crosshair className={`w-4 h-4 ${isScanning ? 'animate-ping' : ''}`} />
                  AI Vision Leaf Diagnostic
                </button>
              </div>
            </div>

            {/* Steer controls */}
            <div className="flex flex-col items-center">
              <p className="text-xs font-serif uppercase tracking-widest text-white/50 mb-3 text-left w-full">Rover Manual Steering</p>
              <div className="grid grid-cols-3 gap-2 w-40">
                <div />
                <button className="border border-white/10 bg-white/5 hover:border-white/40 p-3.5 flex items-center justify-center rounded-sm font-serif text-xs md:text-sm text-white">W</button>
                <div />
                <button className="border border-white/10 bg-white/5 hover:border-white/40 p-3.5 flex items-center justify-center rounded-sm font-serif text-xs md:text-sm text-white">A</button>
                <button className="border border-white/10 bg-white/5 hover:border-white/40 p-3.5 flex items-center justify-center rounded-sm font-serif text-xs md:text-sm text-white">S</button>
                <button className="border border-white/10 bg-white/5 hover:border-white/40 p-3.5 flex items-center justify-center rounded-sm font-serif text-xs md:text-sm text-white">D</button>
              </div>
              <span className="text-[9px] md:text-xs uppercase tracking-widest text-white/40 font-serif mt-3">WASD Steering (Remote Mode)</span>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: ANALYTICS, LEAF DIAGNOSTIC & FERTILIZER OPTIMIZATION */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-4.5 rounded-sm border-white/5 flex flex-col justify-between h-28">
            <span className="font-serif text-[10px] md:text-xs uppercase tracking-widest text-white/40">Soil Moisture Content</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl md:text-3xl font-serif text-white font-light">{soilMoisture}%</span>
              <Droplet className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${soilMoisture}%` }} />
            </div>
          </div>

          <div className="glass-panel p-4.5 rounded-sm border-white/5 flex flex-col justify-between h-28">
            <span className="font-serif text-[10px] md:text-xs uppercase tracking-widest text-white/40">Soil pH Scale</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl md:text-3xl font-serif text-white font-light">{soilPH}</span>
              <Gauge className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[9px] md:text-xs uppercase tracking-widest text-white/40 font-serif">
              {soilPH < 6.0 ? 'Acidic - Needs Lime' : soilPH > 7.0 ? 'Alkaline' : 'Optimal pH'}
            </span>
          </div>

          <div className="glass-panel p-4.5 rounded-sm border-white/5 flex flex-col justify-between h-28">
            <span className="font-serif text-[10px] md:text-xs uppercase tracking-widest text-white/40">Rover Battery Unit</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl md:text-3xl font-serif text-emerald-400 font-light">94%</span>
              <Battery className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[9px] md:text-xs uppercase tracking-widest text-emerald-400 font-serif">Solar charging +5.2W</span>
          </div>

          <div className="glass-panel p-4.5 rounded-sm border-white/5 flex flex-col justify-between h-28">
            <span className="font-serif text-[10px] md:text-xs uppercase tracking-widest text-white/40">Telemetry Network</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl md:text-3xl font-serif text-white font-light">LoRaWAN</span>
              <Radio className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="text-[9px] md:text-xs uppercase tracking-widest text-white/40 font-serif">RSSI: -84dBm // Stable</span>
          </div>
        </div>

        {/* Leaf Diagnostic Result Panel */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-4">
          <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white border-b border-white/5 pb-2">
            AI Crop Image Diagnostic Scan Report
          </h3>

          {scanResults ? (
            <div className={`border p-4.5 rounded-sm space-y-3.5 ${scanResults.color} transition-all duration-500`}>
              <div className="flex justify-between items-center">
                <span className="font-serif text-xs md:text-sm uppercase tracking-wider text-white">
                  Analysis Status: <strong className="text-glow text-white font-semibold">{scanResults.element}</strong>
                </span>
                <span className={`text-[9px] md:text-xs font-serif uppercase tracking-widest px-2.5 py-1 rounded-sm ${
                  scanResults.severity === 'High' ? 'bg-red-500/10 border border-red-500/30 text-red-400' :
                  scanResults.severity === 'Moderate' ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400' :
                  scanResults.severity === 'Low' ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400' :
                  'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                }`}>
                  Severity: {scanResults.severity}
                </span>
              </div>
              <p className="text-xs md:text-sm uppercase tracking-wider text-white/70 leading-relaxed font-serif">
                {scanResults.desc}
              </p>
              <div className="border-t border-white/5 pt-2.5 mt-2.5">
                <span className="text-[9px] md:text-xs uppercase tracking-widest text-white/40 font-serif block">Recommended Solution:</span>
                <p className="text-xs md:text-sm uppercase tracking-wider text-emerald-400/90 font-serif leading-relaxed mt-1">
                  {scanResults.solution}
                </p>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-white/10 p-6 rounded-sm text-center text-white/35">
              <Eye className="w-8 h-8 mx-auto opacity-30 mb-2.5" />
              <p className="font-serif text-[11px] md:text-xs uppercase tracking-[0.2em] leading-relaxed">Ready for multispectral image check. Click "AI Vision Leaf Diagnostic" to begin crop scan.</p>
            </div>
          )}
        </div>

        {/* NPK Fertilizer Optimizer */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white">
              Precision NPK Soil Analyzer & Fertilizer Recommender
            </h3>
            <span className="text-[9px] md:text-xs font-serif tracking-widest text-emerald-400 uppercase">Sector: Agri-09</span>
          </div>

          <div className="space-y-4">
            {/* Custom SVG Soil Bar Chart */}
            <div className="space-y-3">
              <span className="text-[10px] md:text-xs font-serif uppercase tracking-widest text-white/40">Detected Nutrient Concentrations (ppm)</span>
              
              <div className="space-y-3">
                {/* Nitrogen */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-serif uppercase tracking-widest">
                    <span>Nitrogen (N)</span>
                    <span className="text-white">{soilNPK.N} ppm <span className="text-amber-400 font-semibold">(Low, target: {targets.N})</span></span>
                  </div>
                  <div className="w-full bg-white/5 h-2.5 rounded-sm overflow-hidden">
                    <div className="bg-amber-400 h-full transition-all duration-750" style={{ width: `${(soilNPK.N / targets.maxN) * 100}%` }} />
                  </div>
                </div>

                {/* Phosphorus */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-serif uppercase tracking-widest">
                    <span>Phosphorus (P)</span>
                    <span className="text-white">{soilNPK.P} ppm <span className="text-emerald-400 font-semibold">(Stable, target: {targets.P})</span></span>
                  </div>
                  <div className="w-full bg-white/5 h-2.5 rounded-sm overflow-hidden">
                    <div className="bg-emerald-500 h-full transition-all duration-750" style={{ width: `${(soilNPK.P / targets.maxP) * 100}%` }} />
                  </div>
                </div>

                {/* Potassium */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-serif uppercase tracking-widest">
                    <span>Potassium (K)</span>
                    <span className="text-white">{soilNPK.K} ppm <span className="text-yellow-400 font-semibold">(Slightly Low, target: {targets.K})</span></span>
                  </div>
                  <div className="w-full bg-white/5 h-2.5 rounded-sm overflow-hidden">
                    <div className="bg-yellow-400 h-full transition-all duration-750" style={{ width: `${(soilNPK.K / targets.maxK) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Optimizer Recommendation */}
            <div className="bg-neutral-900 border border-white/5 p-4.5 rounded-sm">
              <span className="text-[9px] md:text-xs uppercase tracking-widest text-emerald-400 font-semibold block">AI Optimization Engine Formula</span>
              <p className="text-xs md:text-sm uppercase tracking-wider text-white/70 leading-relaxed font-serif mt-1.5">
                To balance the soil composition for crop type <strong className="text-white">{selectedCrop.toUpperCase()}</strong>:
                <br />
                - Inject <strong className="text-emerald-400">{(nDiff * 0.45).toFixed(1)}g Urea</strong> (Nitrogen booster)
                <br />
                - Inject <strong className="text-emerald-400">{(pDiff * 0.12).toFixed(1)}g Triple Superphosphate</strong> (Phosphorus maintenance)
                <br />
                - Inject <strong className="text-emerald-400">{(kDiff * 0.28).toFixed(1)}g Muriate of Potash</strong> (Potassium balancer)
              </p>
            </div>
          </div>
        </div>

        {/* Growth Stage Monitor List */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-4">
          <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white border-b border-white/5 pb-2">
            Field Crops Growth Stages & Harvesting Tracker
          </h3>

          <div className="space-y-3.5">
            {cropSectors.map((sector) => (
              <div key={sector.id} className="border border-white/5 p-3.5 rounded-sm space-y-2.5 hover:border-emerald-500/20 transition-all duration-300">
                <div className="flex justify-between items-center text-xs font-serif uppercase tracking-widest">
                  <span className="text-white font-medium">{sector.id} ({sector.crop})</span>
                  <span className={`px-2 py-0.5 rounded-sm text-[9px] md:text-xs font-serif ${
                    sector.stage === 'Mature' ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 animate-pulse' :
                    sector.stage === 'Flowering' ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400' :
                    sector.stage === 'Vegetative' ? 'bg-sky-500/10 border border-sky-500/30 text-sky-400' :
                    'bg-white/5 border border-white/10 text-white/50'
                  }`}>
                    {sector.stage.toUpperCase()}
                  </span>
                </div>
                
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${
                    sector.growth >= 99 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} style={{ width: `${sector.growth}%` }} />
                </div>

                <div className="flex justify-between text-[10px] md:text-xs font-serif uppercase tracking-widest text-white/50">
                  <span>Growth Progress: {sector.growth}%</span>
                  <span>Age: {sector.currentAgeDays.toFixed(0)}/{sector.harvestingAgeDays} Days</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}

/* =========================================================================
   2. JOLJAN ASV RESCUE DASHBOARD
   ========================================================================= */
function JoljanDashboard({ addNotification, notifications, onNavigateProject }) {
  // Navigation & Location States
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);
  const [isDispatched, setIsDispatched] = useState(false);
  const [transitPercent, setTransitPercent] = useState(0);
  const [etaText, setEtaText] = useState('N/A');

  // Payload release status
  const [cargoInventory, setCargoInventory] = useState({
    firstAid: 15,
    foodPackets: 25,
    medicine: 20,
    lifeJackets: 12
  });
  const [dropMessage, setDropMessage] = useState(null);

  // Environmental sensor logs
  const [waterDepth, setWaterDepth] = useState(4.2);
  const [waterTemp, setWaterTemp] = useState(24.5);
  const [turbidity, setTurbidity] = useState(12.4); // NTU
  const [dissolvedOxygen, setDissolvedOxygen] = useState(6.8); // mg/L
  const [waterWQI, setWaterWQI] = useState(78); // WQI 0-100

  // Sonar terrain array (simulated contour map)
  const [sonarData, setSonarData] = useState([12, 14, 15, 13, 11, 10, 9, 8, 11, 13, 14, 15, 12, 10, 8, 6, 7, 9, 11, 13]);

  // Rescue Alerts List
  const rescueAlerts = [
    { id: 'REC-091', region: 'Sylhet (Gowainghat)', coordinates: '25.1054° N, 91.9803° E', priority: 'CRITICAL', threat: 'Family of 5 stranded on rural rooftop', suppliesNeeded: 'Food, Medicine, 2 Life Jackets' },
    { id: 'REC-092', region: 'Sunamganj (Chatak)', coordinates: '25.0412° N, 91.6702° E', priority: 'HIGH', threat: 'Submerged market, elder isolation', suppliesNeeded: 'First Aid Kit, Food Rations' },
    { id: 'REC-093', region: 'Kurigram (Ulipur)', coordinates: '25.6810° N, 89.6540° E', priority: 'NORMAL', threat: 'Water quality inspection request & dry food', suppliesNeeded: 'Turbidity check, Medicine' }
  ];

  // Dispatch trigger animation
  const handleDispatch = () => {
    if (isDispatched) return;
    setIsDispatched(true);
    setTransitPercent(0);
    setEtaText('12 min');
    const target = rescueAlerts[activeAlertIndex];
    addNotification('warning', `DISPATCH: JolJan ASV route plotted to coordinates: [${target.coordinates}]. Heading out.`);

    const interval = setInterval(() => {
      setTransitPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setEtaText('ARRIVED');
          addNotification('success', `JolJan ASV has successfully reached rescue location [${target.region}]. Stationing for cargo drop.`);
          return 100;
        }
        // Update environmental sensors dynamically during transit
        setWaterDepth(parseFloat((3.2 + Math.random() * 2).toFixed(1)));
        setWaterTemp(parseFloat((23.8 + Math.random() * 1.5).toFixed(1)));
        setTurbidity(parseFloat((10 + Math.random() * 15).toFixed(1)));
        setDissolvedOxygen(parseFloat((5.8 + Math.random() * 2).toFixed(1)));
        setWaterWQI(Math.floor(70 + Math.random() * 18));
        
        // Update sonar contours
        setSonarData(prevSonar => {
          const next = [...prevSonar.slice(1)];
          next.push(Math.floor(5 + Math.random() * 12));
          return next;
        });

        // Set ETA based on percent
        const remainMin = Math.ceil(((100 - prev) / 100) * 12);
        setEtaText(`${remainMin} min`);

        return prev + 4;
      });
    }, 250);
  };

  // Cargo release dispatcher
  const handleReleaseCargo = (item) => {
    if (cargoInventory[item] <= 0) {
      addNotification('error', `DEPLOY ERROR: Supply of ${item} is depleted!`);
      return;
    }
    setCargoInventory(prev => ({
      ...prev,
      [item]: prev[item] - 1
    }));
    
    const labelMap = {
      firstAid: 'First Aid Kit',
      foodPackets: 'Dry Food Ration Packet',
      medicine: 'Emergency Medicine Pack',
      lifeJackets: 'Personal Flotation Device'
    };

    setDropMessage(`Releasing ${labelMap[item]}...`);
    addNotification('info', `ACTUATOR DROP: Mechanical release opened. Delivered ${labelMap[item]} to target.`);

    setTimeout(() => {
      setDropMessage(null);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm md:text-base">
      
      {/* LEFT COLUMN: SONAR, MAP, AND TRANSIT HUD */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* HUD Camera Live Feed with water overlays */}
        <div className="relative border border-sky-500/20 rounded-sm aspect-video bg-black overflow-hidden group hover:border-sky-500/40 transition-all duration-500">
          <img 
            src="/joljan_feed.png" 
            alt="JolJan ASV Bow View" 
            className="absolute inset-0 w-full h-full object-cover opacity-85 filter contrast-110 saturate-50 brightness-75"
          />

          {/* HUD Overlay Lines */}
          <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/85 to-transparent flex justify-between items-start text-[10px] md:text-xs font-serif tracking-widest text-sky-400 uppercase z-10">
            <div>
              <span>CAM FEED: BOW_CAM_02 [REC_SURVEY]</span>
              <br />
              <span className="text-white/50">DEPTH GAUGING: ACTIVE // GYRO: LEVEL</span>
            </div>
            <div className="text-right">
              <span className="flex items-center gap-1.5 text-sky-400 justify-end">
                <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
                ASV NAVIGATION ONLINE
              </span>
              <span className="text-white/50">TRANSIT STATUS: {isDispatched ? `DISPATCHED (${transitPercent}%)` : 'STANDBY'}</span>
            </div>
          </div>

          {/* Center compass/attitude indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <svg viewBox="0 0 100 100" className="w-44 h-44 stroke-sky-400 fill-none stroke-[0.5]">
              <circle cx="50" cy="50" r="45" />
              <circle cx="50" cy="50" r="30" strokeDasharray="2,2" />
              <line x1="50" y1="5" x2="50" y2="95" />
              <line x1="5" y1="50" x2="95" y2="50" />
              <text x="47" y="15" className="fill-sky-400 text-[8px] tracking-widest font-serif text-center">N</text>
              <text x="47" y="91" className="fill-sky-400 text-[8px] tracking-widest font-serif text-center">S</text>
            </svg>
          </div>

          {/* Rescue Target Lock Overlay */}
          {isDispatched && (
            <div className="absolute top-1/3 left-1/3 w-40 h-24 border border-dashed border-red-500 rounded-sm flex flex-col justify-between p-2.5 pointer-events-none animate-pulse">
              <div className="text-[8px] md:text-[9px] font-serif tracking-widest text-red-500 uppercase font-semibold">TARGET LOCK IN SIGHT</div>
              <div className="text-right text-[8px] md:text-[9px] font-serif tracking-widest text-red-400 font-bold">DIST: 82M</div>
            </div>
          )}

          {/* Drop message warning banner */}
          {dropMessage && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/75 z-10">
              <div className="border border-red-500/30 bg-red-500/10 px-8 py-5 rounded-sm text-center space-y-2 animate-bounce">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto animate-ping" />
                <span className="font-serif text-xs md:text-sm uppercase tracking-widest text-white block font-bold">{dropMessage}</span>
                <span className="text-[9px] md:text-xs uppercase tracking-wider text-red-400 font-serif block font-semibold">CARGO BAY UNLOCKED // AIRDROP ACTIVE</span>
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 to-transparent flex justify-between items-end z-10">
            <div className="text-[10px] md:text-xs font-serif tracking-widest text-white/60 uppercase">
              <span>GPS: {rescueAlerts[activeAlertIndex].coordinates}</span>
              <br />
              <span>PROPULSION: 4x THRUSTERS VECTORING // BATTERY: 88.5%</span>
            </div>

            {isDispatched && (
              <div className="w-56 bg-black/80 border border-sky-500/30 p-2.5 rounded-sm space-y-1.5 z-10">
                <div className="flex justify-between text-[9px] md:text-xs font-serif tracking-widest text-sky-400">
                  <span>ASV TRANSIT TO TARGET</span>
                  <span>{transitPercent}%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full transition-all duration-300" style={{ width: `${transitPercent}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Route Navigation Mapping Panel */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white flex items-center gap-2">
              <Anchor className="w-5 h-5 text-sky-400" />
              LiDAR NavMap & Rescue Autopilot
            </h3>
            <span className="font-serif text-[10px] tracking-widest text-sky-400 uppercase">SECTOR: FLOOD-SYLHET</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Map representation */}
            <div className="md:col-span-8 bg-neutral-950 border border-white/10 rounded-sm aspect-[2/1] relative overflow-hidden flex items-center justify-center">
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-[radial-gradient(rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              {/* Custom SVG Path representing flooded river ways */}
              <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full stroke-sky-500/20 fill-none stroke-[2]">
                <path d="M 0,20 C 40,30 80,10 120,40 S 160,80 200,60" />
                <path d="M 0,40 C 30,50 70,30 110,60 S 150,95 200,80" strokeDasharray="3,3" />
                
                {/* Station origin */}
                <circle cx="20" cy="25" r="3" className="fill-sky-500" />
                
                {/* Active alert coordinates */}
                <circle cx="130" cy="48" r="4" className="fill-red-500 animate-ping" />
                <circle cx="130" cy="48" r="2" className="fill-red-500" />
                
                {/* Traveling dot indicator */}
                {isDispatched && (
                  <circle 
                    cx={20 + (130 - 20) * (transitPercent / 100)} 
                    cy={25 + (48 - 25) * (transitPercent / 100)} 
                    r="3" 
                    className="fill-sky-400" 
                  />
                )}
              </svg>
              
              <div className="absolute top-2.5 left-2.5 text-[8px] md:text-[9px] font-serif text-white/50 tracking-wider">LIDAR RADIAL OBSTACLE CLUTTER: 4%</div>
              <div className="absolute bottom-2.5 right-2.5 text-[8px] md:text-[9px] font-serif text-sky-400/80 tracking-widest font-semibold">AUTOPILOT TRACK STABLE</div>
            </div>

            {/* Travel telemetry info */}
            <div className="md:col-span-4 space-y-4">
              <div className="border border-white/5 p-4 rounded-sm space-y-2 bg-neutral-900/50">
                <div className="text-[9px] md:text-xs font-serif text-white/45 uppercase tracking-widest">Target ETA</div>
                <div className="text-2xl md:text-3xl font-serif text-white font-light uppercase tracking-widest">{etaText}</div>
              </div>
              <button
                onClick={handleDispatch}
                disabled={isDispatched}
                className="w-full border border-sky-500/30 bg-sky-500/5 text-sky-400 px-4 py-3.5 font-serif text-[11px] md:text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-sky-500 hover:text-black hover:border-sky-500 disabled:opacity-40 disabled:hover:bg-sky-500/5 disabled:hover:text-sky-400 transition-all duration-300"
              >
                {isDispatched ? 'Autopilot Active' : 'Dispatch JolJan'}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: ALERTS LIST, ENVIRONMENT PROFILE, CARGO MONITOR */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Active Rescue Alerts list */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white">
              Emergency Flood Rescue Alerts & Mission Dispatch
            </h3>
            <Bell className="w-5 h-5 text-sky-400 shrink-0" />
          </div>

          <div className="space-y-3.5">
            {rescueAlerts.map((alert, idx) => (
              <div 
                key={alert.id}
                onClick={() => !isDispatched && setActiveAlertIndex(idx)}
                className={`border p-3.5 rounded-sm space-y-2.5 cursor-pointer transition-all duration-300 ${
                  activeAlertIndex === idx 
                    ? 'border-sky-500 bg-sky-500/5' 
                    : 'border-white/5 bg-neutral-950/20 hover:border-white/20'
                } ${isDispatched ? 'pointer-events-none opacity-80' : ''}`}
              >
                <div className="flex justify-between items-center text-xs font-serif uppercase tracking-widest">
                  <span className="font-bold text-white">{alert.region}</span>
                  <span className={`px-2 py-0.5 rounded-sm text-[9px] md:text-xs font-semibold ${
                    alert.priority === 'CRITICAL' ? 'bg-red-500/10 border border-red-500/30 text-red-400' :
                    alert.priority === 'HIGH' ? 'bg-yellow-500/10 border border-yellow-500/30 text-yellow-400' :
                    'bg-white/5 border border-white/10 text-white/50'
                  }`}>
                    {alert.priority}
                  </span>
                </div>
                
                <p className="text-xs md:text-sm uppercase tracking-wider text-white/70 font-serif leading-relaxed">
                  Threat: {alert.threat}
                </p>

                <div className="flex justify-between text-[9px] md:text-xs font-serif uppercase tracking-widest text-white/45">
                  <span>Coordinates: {alert.coordinates}</span>
                  <span>Supplies: {alert.suppliesNeeded}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Underwater Environment Profiler */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-4">
          <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white border-b border-white/5 pb-2">
            Underwater Environmental Profiler & Sonar Scan
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-white/5 p-4 rounded-sm space-y-1.5">
              <span className="text-[9px] md:text-xs font-serif text-white/45 uppercase tracking-widest block">Water Depth</span>
              <div className="text-xl md:text-2xl font-serif text-white font-medium">{waterDepth} M</div>
            </div>
            <div className="border border-white/5 p-4 rounded-sm space-y-1.5">
              <span className="text-[9px] md:text-xs font-serif text-white/45 uppercase tracking-widest block">Water Temp</span>
              <div className="text-xl md:text-2xl font-serif text-white font-medium">{waterTemp} °C</div>
            </div>
            <div className="border border-white/5 p-4 rounded-sm space-y-1.5">
              <span className="text-[9px] md:text-xs font-serif text-white/45 uppercase tracking-widest block">Turbidity (NTU)</span>
              <div className="text-xl md:text-2xl font-serif text-white font-medium">{turbidity} NTU</div>
            </div>
            <div className="border border-white/5 p-4 rounded-sm space-y-1.5">
              <span className="text-[9px] md:text-xs font-serif text-white/45 uppercase tracking-widest block">Dissolved Oxygen</span>
              <div className="text-xl md:text-2xl font-serif text-white font-medium">{dissolvedOxygen} mg/L</div>
            </div>
          </div>

          {/* Sonar rolling scanner chart */}
          <div className="space-y-2.5 border border-white/5 p-4 rounded-sm">
            <span className="text-[9px] md:text-xs font-serif text-white/45 uppercase tracking-widest block">Sonar Terrain Profile (Bottom Contour)</span>
            
            {/* Custom SVG line for bottom terrain */}
            <div className="h-20 flex items-end w-full">
              <svg viewBox="0 0 100 30" className="w-full h-full fill-none stroke-sky-400 stroke-[1]" preserveAspectRatio="none">
                <path 
                  d={`M 0,${sonarData[0]} 
                      C 10,${sonarData[2]} 20,${sonarData[4]} 30,${sonarData[6]} 
                      S 50,${sonarData[10]} 60,${sonarData[12]} 
                      S 80,${sonarData[16]} 100,${sonarData[19]}`} 
                />
                <path 
                  d={`M 0,${sonarData[0]} 
                      C 10,${sonarData[2]} 20,${sonarData[4]} 30,${sonarData[6]} 
                      S 50,${sonarData[10]} 60,${sonarData[12]} 
                      S 80,${sonarData[16]} 100,${sonarData[19]} L 100,30 L 0,30 Z`} 
                  className="fill-sky-500/5" 
                />
              </svg>
            </div>
            <div className="flex justify-between text-[8px] md:text-[9px] font-serif uppercase tracking-widest text-white/40">
              <span>SCANNER RANGE: 50M</span>
              <span>OBSTACLE CLASSIFICATION: NONE DETECTED</span>
            </div>
          </div>
        </div>

        {/* Emergency Supplies Cargo Dispatcher */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white">
              Emergency Humanitarian Cargo Payload Dispatch
            </h3>
            <span className="text-[10px] md:text-xs font-serif text-sky-400 uppercase tracking-widest">SOLENOID CONTROLS</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-white/5 p-4 rounded-sm space-y-3">
              <div className="flex justify-between text-xs font-serif uppercase tracking-widest text-white/60">
                <span>First Aid Kits</span>
                <span className="text-white font-bold">{cargoInventory.firstAid}</span>
              </div>
              <button
                onClick={() => handleReleaseCargo('firstAid')}
                className="w-full border border-white/10 bg-white/5 hover:border-sky-500/40 py-2 px-3 rounded-sm font-serif text-[10px] md:text-xs uppercase tracking-wider text-white hover:text-sky-400 transition-colors"
              >
                Release Box
              </button>
            </div>

            <div className="border border-white/5 p-4 rounded-sm space-y-3">
              <div className="flex justify-between text-xs font-serif uppercase tracking-widest text-white/60">
                <span>Food Packets</span>
                <span className="text-white font-bold">{cargoInventory.foodPackets}</span>
              </div>
              <button
                onClick={() => handleReleaseCargo('foodPackets')}
                className="w-full border border-white/10 bg-white/5 hover:border-sky-500/40 py-2 px-3 rounded-sm font-serif text-[10px] md:text-xs uppercase tracking-wider text-white hover:text-sky-400 transition-colors"
              >
                Release Box
              </button>
            </div>

            <div className="border border-white/5 p-4 rounded-sm space-y-3">
              <div className="flex justify-between text-xs font-serif uppercase tracking-widest text-white/60">
                <span>Emergency Medicine</span>
                <span className="text-white font-bold">{cargoInventory.medicine}</span>
              </div>
              <button
                onClick={() => handleReleaseCargo('medicine')}
                className="w-full border border-white/10 bg-white/5 hover:border-sky-500/40 py-2 px-3 rounded-sm font-serif text-[10px] md:text-xs uppercase tracking-wider text-white hover:text-sky-400 transition-colors"
              >
                Release Box
              </button>
            </div>

            <div className="border border-white/5 p-4 rounded-sm space-y-3">
              <div className="flex justify-between text-xs font-serif uppercase tracking-widest text-white/60">
                <span>Life Jackets</span>
                <span className="text-white font-bold">{cargoInventory.lifeJackets}</span>
              </div>
              <button
                onClick={() => handleReleaseCargo('lifeJackets')}
                className="w-full border border-white/10 bg-white/5 hover:border-sky-500/40 py-2 px-3 rounded-sm font-serif text-[10px] md:text-xs uppercase tracking-wider text-white hover:text-sky-400 transition-colors"
              >
                Release Jacket
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

/* =========================================================================
   3. MULTIPURPOSE HEXACOPTER SUB-DASHBOARD
   ========================================================================= */
function HexacopterDashboard({ addNotification, notifications, onNavigateProject }) {
  // Flight controller states
  const [isFlying, setIsFlying] = useState(false);
  const [altitude, setAltitude] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(100);
  const [isSpraying, setIsSpraying] = useState(false);
  const [sprayTankLevel, setSprayTankLevel] = useState(90); // %
  const [sprayFlowRate, setSprayFlowRate] = useState(1.2); // L/min

  // Camera settings
  const [cameraVisionMode, setCameraVisionMode] = useState('visible'); // 'visible', 'thermal', 'ndvi'

  // Radar obstacle sweeps angle
  const [radarRotation, setRadarRotation] = useState(0);
  const [detectedObstacles, setDetectedObstacles] = useState([
    { name: 'Tree Canopy', distance: 18, angle: 45 },
    { name: 'Power Line Grid', distance: 28, angle: 135 }
  ]);

  // Trigger flight simulators
  useEffect(() => {
    let timer;
    if (isFlying) {
      timer = setInterval(() => {
        setAltitude(prev => (prev < 120 ? Math.min(120, prev + 12) : 120 + Math.sin(Date.now() / 800) * 1.5));
        setSpeed(prev => (prev < 24 ? Math.min(24, prev + 2.5) : 24 + Math.sin(Date.now() / 1200) * 0.8));
        setBattery(prev => Math.max(15, prev - 0.08));
      }, 500);
    } else {
      timer = setInterval(() => {
        setAltitude(prev => Math.max(0, prev - 15));
        setSpeed(prev => Math.max(0, prev - 4));
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isFlying]);

  // Spraying depletes pesticide tank
  useEffect(() => {
    let timer;
    if (isSpraying && isFlying) {
      timer = setInterval(() => {
        setSprayTankLevel(prev => {
          if (prev <= 0) {
            setIsSpraying(false);
            addNotification('error', 'ALERT: Sprayer tank chemical supply is fully depleted!');
            return 0;
          }
          return parseFloat((prev - 0.4).toFixed(1));
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSpraying, isFlying]);

  // Rotate simulated radar sweeps
  useEffect(() => {
    const timer = setInterval(() => {
      setRadarRotation(prev => (prev + 3) % 360);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const handleTakeoffToggle = () => {
    if (!isFlying) {
      setIsFlying(true);
      addNotification('info', 'TAKEOFF SEQUENCE INITIALIZED. Starting Pixhawk vector thruster spool...');
    } else {
      setIsFlying(false);
      setIsSpraying(false);
      addNotification('warning', 'LANDING SEQUENCE INITIALIZED. Initiating vertical descent...');
    }
  };

  const handleSprayerToggle = () => {
    if (!isFlying) {
      addNotification('error', 'SPRAY ERROR: Sprayer cannot be enabled while drone is on the ground.');
      return;
    }
    if (!isSpraying) {
      setIsSpraying(true);
      addNotification('success', 'PUMP ENGAGED: Starting precision spray nozzle release.');
    } else {
      setIsSpraying(false);
      addNotification('info', 'PUMP INHIBITED: Spray nozzles closed.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-sm md:text-base">
      
      {/* LEFT COLUMN: AERIAL CAMERA HUD, FLIGHT SWITCHES */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* HUD Drone camera view container */}
        <div className="relative border border-amber-500/20 rounded-sm aspect-video bg-black overflow-hidden group hover:border-amber-500/40 transition-all duration-500">
          
          {/* Main camera feed image */}
          <img 
            src="/hexacopter_feed.png" 
            alt="Hexacopter Aerial view" 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              cameraVisionMode === 'thermal' ? 'filter saturate-200 hue-rotate-180 invert brightness-125' :
              cameraVisionMode === 'ndvi' ? 'filter saturate-150 sepia brightness-90 hue-rotate-[90deg]' :
              'opacity-90 contrast-125 saturate-75 brightness-75'
            }`}
          />

          {/* Thermal Vision Heatmarks Effect Overlay */}
          {cameraVisionMode === 'thermal' && (
            <div className="absolute inset-0 bg-red-500/10 mix-blend-color-burn pointer-events-none z-10" />
          )}

          {/* Spraying mist HUD effect */}
          {isSpraying && isFlying && (
            <div className="absolute inset-0 bg-gradient-to-t from-sky-400/10 via-transparent to-transparent pointer-events-none z-10 animate-pulse flex flex-col justify-end p-12 items-center">
              <span className="bg-sky-500 text-[10px] md:text-xs font-serif uppercase tracking-widest text-black px-3 py-1 rounded-sm font-bold shadow-[0_0_8px_rgba(14,165,233,0.5)]">
                SPRAYING ACTIVE // DISPENSING: 1.2 L/MIN
              </span>
            </div>
          )}

          {/* Flight grid lines crosshair */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 border border-white/5 rounded-full flex items-center justify-center border-double">
              <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-amber-500/80 rounded-full animate-ping" />
              </div>
            </div>
            {/* Pitch/Attitude bars */}
            <div className="absolute w-40 h-[1px] bg-white/20" />
            <div className="absolute h-40 w-[1px] bg-white/20" />
          </div>

          {/* Top HUD bar details */}
          <div className="absolute inset-x-0 top-0 p-4 bg-gradient-to-b from-black/85 to-transparent flex justify-between items-start text-[10px] md:text-xs font-serif tracking-widest text-amber-400 uppercase z-10 animate-fade">
            <div>
              <span>CAM FEED: DRONE_GIMBAL_4K [UAV_TELEM]</span>
              <br />
              <span className="text-white/50">VISION MODE: {cameraVisionMode.toUpperCase()} // RESOLUTION: 3840x2160</span>
            </div>
            <div className="text-right">
              <span className="flex items-center gap-1.5 justify-end text-amber-400 font-semibold">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                PIXHAWK MODULE ACTIVE
              </span>
              <span className="text-white/50">AIRSPEED: {speed.toFixed(1)} KT // BATTERY: {battery.toFixed(0)}%</span>
            </div>
          </div>

          {/* Bottom HUD bar details */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/95 to-transparent flex justify-between items-end z-10">
            <div className="text-[10px] md:text-xs font-serif tracking-widest text-white/60 uppercase">
              <span>LAT: 23.8504° N // LON: 90.4350° E</span>
              <br />
              <span>ALTITUDE: {altitude.toFixed(0)} FT // WIND RATE: 6.4 KT WNW</span>
            </div>
            
            <div className="text-right text-[10px] md:text-xs font-serif text-white/60 uppercase tracking-widest">
              <span>GPS LOCK: 14 SATS</span>
              <br />
              <span>RC LINK: 98% RSSI</span>
            </div>
          </div>

        </div>

        {/* Flight Mode Settings & Action Buttons */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-400 animate-pulse" />
              Companion Drone Control Dashboard
            </h3>
            <span className="text-[10px] md:text-xs font-serif text-amber-400 uppercase tracking-widest bg-amber-500/5 px-2.5 py-1 border border-amber-500/10">TELEMETRY LINK READY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Takeoff / Land commands */}
            <div className="space-y-4">
              <p className="text-xs font-serif uppercase tracking-widest text-white/50">Pixhawk Flight Commands</p>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleTakeoffToggle}
                  className={`w-full py-3.5 px-2 font-serif text-[10px] md:text-xs uppercase tracking-wider rounded-sm transition-all duration-300 flex items-center justify-center gap-1.5 ${
                    isFlying 
                      ? 'border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-black hover:border-red-500' 
                      : 'border border-amber-500/30 bg-amber-500/5 text-amber-400 hover:bg-amber-500 hover:text-black hover:border-amber-500'
                  }`}
                >
                  {isFlying ? <Square className="w-3.5 h-3.5 fill-red-400" /> : <Play className="w-3.5 h-3.5 fill-amber-400" />}
                  {isFlying ? 'Land Drone' : 'Drone Takeoff'}
                </button>
                
                <button
                  disabled={!isFlying}
                  onClick={handleSprayerToggle}
                  className={`w-full py-3.5 px-2 font-serif text-[10px] md:text-xs uppercase tracking-wider rounded-sm transition-all duration-300 disabled:opacity-40 disabled:hover:bg-white/5 disabled:hover:text-white flex items-center justify-center gap-1.5 ${
                    isSpraying 
                      ? 'border border-red-500/30 bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-black hover:border-red-500'
                      : 'border border-white/10 bg-white/5 text-white hover:border-amber-500/60 hover:bg-amber-500/10 hover:text-amber-400'
                  }`}
                >
                  <Droplet className="w-4 h-4" />
                  {isSpraying ? 'Stop Spraying' : 'Start Spraying'}
                </button>
              </div>
            </div>

            {/* Vision Mode Selects */}
            <div className="space-y-4">
              <p className="text-xs font-serif uppercase tracking-widest text-white/50">Multispectral Gimbal Camera Feed Modes</p>
              <div className="flex border border-white/10 rounded-sm overflow-hidden p-0.5 bg-black/60">
                <button
                  onClick={() => setCameraVisionMode('visible')}
                  className={`flex-1 py-1.5 px-2.5 font-serif text-[10px] md:text-xs uppercase tracking-widest transition-all ${
                    cameraVisionMode === 'visible' ? 'bg-amber-500/15 text-amber-400 font-semibold' : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  Visible
                </button>
                <button
                  onClick={() => setCameraVisionMode('thermal')}
                  className={`flex-1 py-1.5 px-2.5 font-serif text-[10px] md:text-xs uppercase tracking-widest transition-all ${
                    cameraVisionMode === 'thermal' ? 'bg-amber-500/15 text-amber-400 font-semibold' : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  Thermal
                </button>
                <button
                  onClick={() => setCameraVisionMode('ndvi')}
                  className={`flex-1 py-1.5 px-2.5 font-serif text-[10px] md:text-xs uppercase tracking-widest transition-all ${
                    cameraVisionMode === 'ndvi' ? 'bg-amber-500/15 text-amber-400 font-semibold' : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  NDVI (AI)
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: FLIGHT STATS, RADAR SWEEPS, SPRAYING ENGINE, FISHERIES */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Dynamic Flight gauges */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-4.5 rounded-sm border-white/5 flex flex-col justify-between h-28">
            <span className="font-serif text-[10px] md:text-xs uppercase tracking-widest text-white/40">Drone Altitude</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl md:text-3xl font-serif text-white font-light">{altitude.toFixed(0)} FT</span>
              <Compass className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: isFlying ? '4s' : '0s' }} />
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full transition-all duration-300" style={{ width: `${(altitude / 150) * 100}%` }} />
            </div>
          </div>

          <div className="glass-panel p-4.5 rounded-sm border-white/5 flex flex-col justify-between h-28">
            <span className="font-serif text-[10px] md:text-xs uppercase tracking-widest text-white/40">Airspeed Ground Velocity</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl md:text-3xl font-serif text-white font-light">{speed.toFixed(1)} KT</span>
              <Gauge className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-[9px] md:text-xs uppercase tracking-widest text-white/40 font-serif">GPS waypoint lock speed</span>
          </div>

          <div className="glass-panel p-4.5 rounded-sm border-white/5 flex flex-col justify-between h-28">
            <span className="font-serif text-[10px] md:text-xs uppercase tracking-widest text-white/40">UAV Battery Pack</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl md:text-3xl font-serif text-white font-light" style={{ color: battery < 20 ? '#ef4444' : '#f59e0b' }}>
                {battery.toFixed(0)}%
              </span>
              <Battery className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-[9px] md:text-xs uppercase tracking-widest text-white/40 font-serif">
              {battery < 20 ? 'LOW BATTERY WARNING' : `Est. remaining flight: ${(battery * 0.25).toFixed(0)} min`}
            </span>
          </div>

          <div className="glass-panel p-4.5 rounded-sm border-white/5 flex flex-col justify-between h-28">
            <span className="font-serif text-[10px] md:text-xs uppercase tracking-widest text-white/40">Obstacle Detection Shield</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl md:text-3xl font-serif text-white font-light">360° Radar</span>
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-[9px] md:text-xs uppercase tracking-widest text-white/40 font-serif">Sweep proximity: ACTIVE</span>
          </div>
        </div>

        {/* Radar Proximity sweep diagram */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white">
              Radar-Assisted Terrain Obstacle Detection Shield
            </h3>
            <span className="text-[9px] md:text-xs font-serif text-amber-400 uppercase tracking-widest">Active Scan</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Radar layout circle representation */}
            <div className="md:col-span-6 flex justify-center">
              <div className="relative w-40 h-40 border border-white/10 rounded-full flex items-center justify-center bg-neutral-950 overflow-hidden">
                {/* Concentric rings */}
                <div className="absolute w-32 h-32 border border-white/5 rounded-full" />
                <div className="absolute w-20 h-20 border border-white/5 rounded-full" />
                
                {/* Axis lines */}
                <div className="absolute w-full h-[1px] bg-white/10" />
                <div className="absolute h-full w-[1px] bg-white/10" />

                {/* Simulated rotating green radar beam sweep */}
                <div 
                  className="absolute inset-0 origin-center bg-gradient-to-tr from-transparent via-transparent to-amber-500/35 pointer-events-none transition-all duration-75"
                  style={{ transform: `rotate(${radarRotation}deg)` }}
                />

                {/* Radar dots (Obstacles) */}
                <div className="absolute top-1/4 left-2/3 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                <div className="absolute top-1/4 left-2/3 w-2 h-2 bg-red-500 rounded-full" />

                <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-yellow-500 rounded-full" />
                
                <span className="absolute text-[8px] md:text-[9px] font-serif text-white/45 uppercase tracking-widest top-1.5">RANGE: 50M</span>
              </div>
            </div>

            {/* Obstacles logs */}
            <div className="md:col-span-6 space-y-2">
              <span className="text-[9px] md:text-xs font-serif text-white/45 uppercase tracking-widest block">Detected Collisions (Proximity warning)</span>
              
              <div className="space-y-1.5">
                {detectedObstacles.map((obs, idx) => (
                  <div key={idx} className="border border-white/5 p-2.5 rounded-sm flex justify-between items-center text-[10px] md:text-xs font-serif uppercase tracking-widest bg-neutral-900/50">
                    <span className="text-white font-medium flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      {obs.name}
                    </span>
                    <span className="text-white/60">Range: {obs.distance}m</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Sprayer optimization panel */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-4">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white">
              Precision Chemical Nozzle Sprayer Optimization
            </h3>
            <span className="text-[9px] md:text-xs font-serif text-amber-400 uppercase tracking-widest">SPRAY STATS</span>
          </div>

          <div className="space-y-3.5">
            
            {/* Tank Capacity bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-serif uppercase tracking-widest text-white/60">
                <span>Chemical Pesticide Tank Level</span>
                <span className="text-white font-semibold">{sprayTankLevel}%</span>
              </div>
              <div className="w-full bg-white/5 h-3 rounded-sm overflow-hidden">
                <div 
                  className="bg-sky-400 h-full transition-all duration-300" 
                  style={{ width: `${sprayTankLevel}%`, backgroundColor: sprayTankLevel < 25 ? '#ef4444' : '#38bdf8' }} 
                />
              </div>
            </div>

            {/* Flow regulator slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-serif uppercase tracking-widest text-white/60">
                <span>Spray Pump Flow rate regulator</span>
                <span className="text-white font-medium">{sprayFlowRate} L/min</span>
              </div>
              <input 
                type="range" 
                min="0.2" 
                max="3.0" 
                step="0.1"
                value={sprayFlowRate} 
                onChange={(e) => setSprayFlowRate(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-white/10 rounded-lg cursor-pointer h-1.5"
              />
            </div>

            <div className="border border-white/5 p-3.5 rounded-sm text-xs uppercase tracking-wider text-white/65 leading-relaxed font-serif bg-neutral-900/40">
              <strong className="text-amber-400 font-semibold">Pesticide Formula recommendations:</strong> Recommended sprayer flow rate is <strong className="text-white">1.2 - 1.8 L/min</strong> to ensure correct micro-dose absorption. High wind velocities may cause drift.
            </div>

          </div>
        </div>

        {/* Fisheries & Water pond analytics */}
        <div className="glass-panel p-6 rounded-sm border-white/5 space-y-4">
          <h3 className="font-serif text-xs md:text-sm lg:text-base uppercase tracking-wider text-white border-b border-white/5 pb-2">
            Fisheries and Water Aquaculture Telemetry Scan
          </h3>

          <div className="grid grid-cols-2 gap-4">
            
            <div className="border border-white/5 p-4 rounded-sm space-y-1.5">
              <span className="text-[9px] md:text-xs font-serif text-white/45 uppercase tracking-widest block">Fish Activity Level</span>
              <div className="flex justify-between items-center mt-1.5">
                <span className="text-xl font-serif text-white font-medium">HIGH</span>
                <span className="text-[9px] md:text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-sm uppercase font-serif font-semibold">NORMAL</span>
              </div>
            </div>

            <div className="border border-white/5 p-4 rounded-sm space-y-1.5">
              <span className="text-[9px] md:text-xs font-serif text-white/45 uppercase tracking-widest block">Pond Algae Coefficient</span>
              <div className="flex justify-between items-center mt-1.5">
                <span className="text-xl font-serif text-white font-medium">1.8 <span className="text-[10px] text-white/40">ppm</span></span>
                <span className="text-[9px] md:text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-sm uppercase font-serif font-semibold">STABLE</span>
              </div>
            </div>

            <div className="border border-white/5 p-4 rounded-sm space-y-1.5">
              <span className="text-[9px] md:text-xs font-serif text-white/45 uppercase tracking-widest block">Pond Water Temp</span>
              <div className="flex justify-between items-center mt-1.5">
                <span className="text-xl font-serif text-white font-medium">26.8 °C</span>
                <Thermometer className="w-4 h-4 text-amber-400" />
              </div>
            </div>

            <div className="border border-white/5 p-4 rounded-sm space-y-1.5">
              <span className="text-[9px] md:text-xs font-serif text-white/45 uppercase tracking-widest block">Dissolved Oxygen</span>
              <div className="flex justify-between items-center mt-1.5">
                <span className="text-xl font-serif text-white font-medium">7.2 mg/L</span>
                <Droplet className="w-4 h-4 text-sky-400" />
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
