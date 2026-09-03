import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CONTACT, type PlotCell, type PlotStatus } from "../../data/site";
import { cn } from "../../utils/cn";
import { EASE, Icon, WhatsAppGlyph } from "../ui";

/* ------------------------------------------------------------------ */
/*  Interactive 3D plot-layout viewer                                  */
/* ------------------------------------------------------------------ */

const STATUS_COLOR: Record<PlotStatus, string> = {
  available: "#2E7D4F",
  corner: "#C9A15A",
  reserved: "#8FD398",
  sold: "#DCE3DD",
};

const STATUS_LABEL: Record<PlotStatus, string> = {
  available: "Available",
  corner: "Corner (Premium)",
  reserved: "Reserved",
  sold: "Sold",
};

function PlotBox({
  plot,
  selected,
  onSelect,
}: {
  plot: PlotCell;
  selected: boolean;
  onSelect: (p: PlotCell) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const baseY = 0.16;

  useFrame((_, dt) => {
    const target = selected ? 0.9 : hovered ? 0.38 : baseY;
    if (ref.current)
      ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, target, 10, dt);
  });

  return (
    <>
      <mesh
        ref={ref}
        position={[plot.x, baseY, plot.z]}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelect(plot);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[plot.w, 0.32, plot.d]} />
        <meshStandardMaterial
          color={STATUS_COLOR[plot.status]}
          roughness={0.5}
          metalness={0.06}
          emissive={hovered || selected ? "#0F3D23" : "#000000"}
          emissiveIntensity={hovered || selected ? 0.22 : 0}
        />
      </mesh>
      {hovered && (
        <Html position={[plot.x, 1.15, plot.z]} center zIndexRange={[40, 0]} style={{ pointerEvents: "none" }}>
          <div className="whitespace-nowrap rounded-full bg-forest-900/95 px-4 py-1.5 text-[11px] font-bold text-white shadow-xl">
            Plot {plot.label} · {plot.sqft} sq.ft ·{" "}
            <span className="text-gold-300">
              {plot.status === "corner" ? "Corner" : plot.status === "sold" ? "Sold" : "Price on Request"}
            </span>
          </div>
        </Html>
      )}
    </>
  );
}

function Park({ x, z }: { x: number; z: number }) {
  const trees = useMemo(
    () => [
      [-0.42, -0.36],
      [0.44, -0.08],
      [-0.08, 0.42],
      [0.36, 0.36],
      [-0.4, 0.14],
    ],
    [],
  );
  return (
    <group position={[x, 0, z]}>
      <mesh receiveShadow>
        <cylinderGeometry args={[1.35, 1.35, 0.14, 28]} />
        <meshStandardMaterial color="#8FD398" roughness={0.9} />
      </mesh>
      {trees.map(([tx, tz], i) => (
        <group key={i} position={[tx, 0.07, tz]}>
          <mesh castShadow position={[0, 0.36, 0]}>
            <coneGeometry args={[0.17, 0.72, 8]} />
            <meshStandardMaterial color={i % 2 ? "#2E7D4F" : "#3B8A5E"} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.035, 0.045, 0.3, 6]} />
            <meshStandardMaterial color="#8A6A3F" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Scene({
  plots,
  parks,
  selectedId,
  onSelect,
}: {
  plots: PlotCell[];
  parks: PlotCell[];
  selectedId: string | null;
  onSelect: (p: PlotCell) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.95} />
      <directionalLight
        position={[14, 18, 10]}
        intensity={1.7}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-10, 8, -8]} intensity={0.45} color="#d7f2d8" />

      {/* road base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#B6C4B6" roughness={0.95} />
      </mesh>

      {plots.map((p) => (
        <PlotBox key={p.id} plot={p} selected={selectedId === p.id} onSelect={onSelect} />
      ))}
      {parks.map((p) => (
        <Park key={p.id} x={p.x} z={p.z} />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={8}
        maxDistance={26}
        minPolarAngle={0.15}
        maxPolarAngle={1.25}
        autoRotate
        autoRotateSpeed={0.7}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  );
}

const FILTERS: { key: "all" | PlotStatus; label: string }[] = [
  { key: "all", label: "All Plots" },
  { key: "available", label: "Available" },
  { key: "corner", label: "Corner" },
  { key: "reserved", label: "Reserved" },
  { key: "sold", label: "Sold" },
];

export default function PlotViewer({
  plots,
  parks,
  name,
}: {
  plots: PlotCell[];
  parks: PlotCell[];
  name: string;
}) {
  const [selected, setSelected] = useState<PlotCell | null>(null);
  const [filter, setFilter] = useState<"all" | PlotStatus>("all");

  const shown = useMemo(
    () => (filter === "all" ? plots : plots.filter((p) => p.status === filter)),
    [plots, filter],
  );

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-forest-600/10 bg-gradient-to-b from-mint-50 to-mint-100 card-shadow">
        <div className="h-[420px] sm:h-[540px]">
          <Canvas shadows dpr={[1, 1.6]} camera={{ position: [10, 11, 13], fov: 42 }}>
            <Scene
              plots={shown}
              parks={parks}
              selectedId={selected?.id ?? null}
              onSelect={setSelected}
            />
          </Canvas>
        </div>

        {/* legend */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {(
            [
              ["available", "Available"],
              ["corner", "Corner"],
              ["reserved", "Reserved"],
              ["sold", "Sold"],
            ] as [PlotStatus, string][]
          ).map(([k, label]) => (
            <span
              key={k}
              className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-forest-800 shadow-sm backdrop-blur"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: STATUS_COLOR[k] }}
              />
              {label}
            </span>
          ))}
        </div>
        <p className="absolute right-4 top-4 hidden rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-forest-800/70 shadow-sm backdrop-blur sm:block">
          Drag to rotate · Scroll to zoom
        </p>

        {/* selected plot card */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute bottom-4 left-4 right-4 rounded-2xl border border-forest-600/10 bg-white/95 p-4 shadow-xl backdrop-blur sm:right-auto sm:w-80"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-600">
                    {name} · Plot {selected.label}
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold text-forest-800">
                    {selected.sqft.toLocaleString("en-IN")} sq.ft ·{" "}
                    {STATUS_LABEL[selected.status]}
                  </p>
                  <p className="mt-1 text-xs text-forest-900/60">
                    {selected.status === "sold" || selected.status === "reserved"
                      ? "This plot is currently unavailable."
                      : "Price on request — visit the layout or call us."}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint-100 text-forest-700 transition hover:bg-mint-200"
                  aria-label="Close"
                >
                  <Icon name="close" className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-3.5 flex gap-2.5">
                <a
                  href={CONTACT.whatsapp(
                    `Hello! I'm interested in Plot ${selected.label} (${selected.sqft} sq.ft) at ${name}. Please share details.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white transition hover:brightness-105"
                >
                  <WhatsAppGlyph className="h-4 w-4" /> Enquire
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center justify-center gap-2 rounded-full bg-forest-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-forest-700"
                >
                  <Icon name="phone" className="h-4 w-4" /> Call
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* filters */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300",
              filter === f.key
                ? "bg-forest-600 text-white shadow-lg shadow-forest-600/25"
                : "border border-forest-600/20 bg-white text-forest-700 hover:border-forest-600/50 hover:bg-mint-100/60",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-forest-900/50">
        Simplified 3D representation of the layout. Exact dimensions as per approved
        site plan.
      </p>
    </div>
  );
}
