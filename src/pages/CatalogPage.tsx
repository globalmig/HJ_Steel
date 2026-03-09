import { motion } from "framer-motion";
import { ArrowLeft, Download, FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    class: "8K",
    type: "T78/B",
    weight: "7.67 kg/m",
    length: "5,000 mm",
    dimensions: { b1: 78, h: 56, k: 10, n: 30, c: 7, f: 8.5 },
    properties: { area: "10.9 cm²", weight: "8.55 kg/m" },
  },
  {
    class: "13K",
    type: "T89/B",
    weight: "12.04 kg/m",
    length: "5,000 mm",
    dimensions: { b1: 89, h: 62, k: 16, n: 32, c: 9.5, f: 11.5 },
    properties: { area: "16.7 cm²", weight: "13.1 kg/m" },
  },
  {
    class: "18K",
    type: "T114/B",
    weight: "16.78 kg/m",
    length: "5,000 mm",
    dimensions: { b1: 114, h: 89, k: 16, n: 38, c: 9.5, f: 11 },
    properties: { area: "22.3 cm²", weight: "17.5 kg/m" },
  },
  {
    class: "24K",
    type: "T127-2/B or BE",
    weight: "22.18 kg/m",
    length: "5,000 mm",
    dimensions: { b1: 127, h: 89, k: 16, n: 50, c: 9.5, f: 12.5 },
    properties: { area: "30.2 cm²", weight: "23.7 kg/m" },
  },
  {
    class: "30K",
    type: "T140-1/B",
    weight: "27.42 kg/m",
    length: "5,000 mm",
    dimensions: { b1: 140, h: 108, k: 19, n: 50, c: 12.7, f: 15.9 },
    properties: { area: "37.8 cm²", weight: "29.7 kg/m" },
  },
  {
    class: "High Speed 37K",
    type: "T140-2/B or BE",
    weight: "34.1 kg/m",
    length: "5,000 mm",
    dimensions: { b1: 140, h: 102, k: 28.6, n: 51, c: 17.5, f: 14.5 },
    properties: { area: "45.6 cm²", weight: "35.79 kg/m" },
  },
];

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">홈으로</span>
          </Link>
          <div className="text-xl font-bold tracking-tighter">PRODUCT CATALOG</div>
          <a
            href="/레일카달로그_에이치제이스틸주식회사260309.pdf"
            download
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-bold border border-brand/20 hover:bg-brand/20 transition-all"
          >
            <Download className="w-4 h-4" /> PDF 다운로드
          </a>
        </div>
      </header>

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Elevator Guide Rail
              <br />
              <span className="text-brand">Technical Specifications</span>
            </h1>
            <p className="text-white/40 max-w-2xl text-lg">에이치제이스틸의 고정밀 엘리베이터 가이드레일 규격서입니다. 최고의 안전성과 정밀도를 보장하는 제품 라인업을 확인하세요.</p>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-12">
            {products.map((product, idx) => (
              <motion.div
                key={product.class}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative group"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                  <FileText className="w-64 h-64" />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl font-black text-brand tracking-tighter">{product.class}</span>
                      <div className="h-12 w-px bg-white/10" />
                      <div>
                        <div className="text-sm text-white/40 uppercase tracking-widest font-bold">Type</div>
                        <div className="text-xl font-bold">{product.type}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-12">
                      <div>
                        <div className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Unit Weight</div>
                        <div className="text-2xl font-mono">{product.weight}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Standard Length</div>
                        <div className="text-2xl font-mono">{product.length}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-white/60 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-brand" /> Sectional Properties
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl">
                          <div className="text-[10px] text-white/40 uppercase mb-1">Area (cm²)</div>
                          <div className="text-lg font-mono">{product.properties.area}</div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl">
                          <div className="text-[10px] text-white/40 uppercase mb-1">Weight (kg/m)</div>
                          <div className="text-lg font-mono">{product.properties.weight}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-3xl p-8 border border-white/5">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-8">Dimensions (mm)</h4>
                    <div className="grid grid-cols-3 gap-6">
                      {Object.entries(product.dimensions).map(([key, val]) => (
                        <div key={key} className="text-center">
                          <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-3 text-brand font-bold text-xs">{key}</div>
                          <div className="text-xl font-mono">{val}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/40">Straightness (f/5m)</span>
                        <span className="font-mono">{product.class === "High Speed 37K" ? "0.5mm" : "2.0mm"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <span className="text-white/40">Twist (R)</span>
                        <span className="font-mono">{product.class === "High Speed 37K" ? "10'/m" : "30'/m"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fish Plate Section */}
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-24">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              <div className="w-10 h-1 bg-brand" /> Fish Plate Dimensions
            </h2>
            <div className="glass rounded-3xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-white/40">Class</th>
                    <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-white/40">l₁ (mm)</th>
                    <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-white/40">b₂ (mm)</th>
                    <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-white/40">t₃ (mm)</th>
                    <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-white/40">Bolt, Nut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { class: "8K", l1: 270, b2: 78, t3: 10, bolt: "M12×40" },
                    { class: "13K", l1: 280, b2: 89, t3: 14, bolt: "M12×50" },
                    { class: "18K", l1: 280, b2: 114, t3: 20, bolt: "M16×65" },
                    { class: "24K", l1: 280, b2: 127, t3: 20, bolt: "M16×65" },
                    { class: "30K", l1: 380, b2: 140, t3: 39, bolt: "M20×65" },
                    { class: "37K", l1: 380, b2: 140, t3: 39, bolt: "M20×80" },
                  ].map((item) => (
                    <tr key={item.class} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-6 font-bold text-brand">{item.class}</td>
                      <td className="px-8 py-6 font-mono">{item.l1}</td>
                      <td className="px-8 py-6 font-mono">{item.b2}</td>
                      <td className="px-8 py-6 font-mono">{item.t3}</td>
                      <td className="px-8 py-6 font-mono">{item.bolt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/40 text-sm mb-4">본 데이터는 표준 규격을 바탕으로 작성되었으며, 실제 제품과 차이가 있을 수 있습니다.</p>
          <p className="text-white/20 text-xs">© 2024 HJ Steel Technical Department</p>
        </div>
      </footer>
    </div>
  );
}
