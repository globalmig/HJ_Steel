import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ArrowRight, Shield, Zap, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { settings, posts } = useApp();

  return (
    <div className="min-h-screen bg-dark">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <span className="text-white font-black">H</span>
            </div>
            {settings.site_name}
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#about" className="hover:text-brand transition-colors">회사소개</a>
            <a href="#products" className="hover:text-brand transition-colors">제품정보</a>
            <a href="#contact" className="hover:text-brand transition-colors">문의하기</a>
            <a href="/admin" className="px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all">관리자</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand/20 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold tracking-widest uppercase mb-6 border border-brand/20">
              Premium Elevator Solutions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-[1.1]">
              {settings.hero_title}
            </h1>
            <p className="text-xl text-white/60 mb-10">
              {settings.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/catalog" className="px-8 py-3 rounded-lg font-semibold border border-white/10 hover:bg-white/5 transition-all text-center">
                제품 카탈로그
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand/20 blur-[80px] rounded-full -z-10" />
            <div className="glass p-4 rounded-[2rem] rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src={settings.hero_image_url || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1000"} 
                alt="Elevator Guide Rail" 
                className="w-full rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "최고의 안전성", desc: "엄격한 품질 관리를 통해 엘리베이터의 핵심 안전을 책임집니다." },
              { icon: Zap, title: "정밀한 기술력", desc: "안정된 품질로 작업의 안정성을 보장합니다." },
              { icon: Globe, title: "최근 적용 추세", desc: "최근 반도체공장 자동화설비 및 2차전지생산공장 자동화설비에 적용되고 있습니다." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-2xl"
              >
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Products Section */}
      <section id="products" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-10 md:p-16 rounded-[3rem] border border-white/5"
          >
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                <div className="w-2 h-10 bg-brand rounded-full" />
                주요취급 제품
              </h2>
            </div>

            <div className="space-y-20">
              {/* 1. 엘리베이터 레일 */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-brand">▲</span>
                  <h3 className="text-2xl font-bold">엘리베이터 레일</h3>
                </div>
                <div className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-6">
                  <p className="text-white/70 leading-relaxed">
                    최근 건물의 고층화에 따라 엘리베이터 설치에 사용되는 엘리베이터 가이드레일으로 승강기의 인승 및 용도에 따라 다양한 적용이 가능한 엘리베이터 설치 핵심 부품입니다. 
                    엘리베이터 편안하고 안전한 운행과 승객의 안전과 밀접한 비상제동장치에 직접적 영향을 미치는 중요한 부품입니다. 
                    5m를 정척으로 생산되며, 최근 다양한 수요에 맞게 길이단척 및 자동화 설비에도 적용되어 지속적인 수요가 발생하는 정밀 가공 제품 입니다.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="space-y-4">
                      <h4 className="font-bold text-brand">1) 인승용 승강기 레일</h4>
                      <p className="text-sm text-white/50">8K, 13K, 18K, 24K, 30K</p>
                      <p className="text-xs text-white/40">▶ 엘리베이터 크기 및 규모에 맞추어 다양한 조합으로 적용되고 있으며, 국내산과 중국산제품으로 현장에 적용되고 있습니다.</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-brand">2) 주차기용 엘리베이터 레일</h4>
                      <p className="text-sm text-white/50">13K, 18K, 24K, 30K</p>
                      <p className="text-xs text-white/40">▶ 인승용 승강기에 비해 단중이 높은 규격이 사용 되며, 기계식 주차기의 상하 운동의 가이드 역할을 담당하는 엘리베이터 레일 입니다.</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-brand">3) 자동화 설비용 레일 (T-RAIL)</h4>
                      <p className="text-sm text-white/50">13K, 18K, 24K, 30K</p>
                      <p className="text-xs text-white/40">▶ 최근 자동화 이동 설비 및 자동화 리프트에 적용 되는 정밀 가공 레일으로 수요가 발생하고 있습니다. 설비의 안정적인 이송을 보장함으로써 제품의 수요가 발생하고 있는 정밀가공 제품입니다. 다양한 길이와 사양의 레일을 주문생산하여 설비에 적용하고 있습니다.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. 경레일 및 레일 */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-brand">▲</span>
                  <h3 className="text-2xl font-bold">경레일 및 레일</h3>
                </div>
                <div className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-4">
                  <p className="text-white/70 leading-relaxed">
                    공장 자동화 설비 및 공장 호이스트크레인에 적용되는 레일입니다. 형상은 철도레일의 형상에 단중과 사이즈가 축소된 형태로 생산되는 압연 제품 입니다. 
                    각종 이송설비에 적용되며 수요가 발생하며, 상기제품은 모두 수입제품으로 각각의 용도에 따라 일본산과 중국산제품으로 10M 정척의 길이로 국내 시장에 유통되고 있습니다. (단 9K는 6M 정척)
                  </p>
                  <div className="inline-block px-4 py-2 rounded-lg bg-brand/10 text-brand font-mono text-sm">
                    취급 규격: 9K, 12K, 15K, 22K, 30K, 37K, 50K, 70K, 100K
                  </div>
                </div>
              </div>

              {/* 3. 일반 구조용 형강 및 파이프 */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-brand">▲</span>
                  <h3 className="text-2xl font-bold">일반 구조용 형강 및 파이프</h3>
                </div>
                <div className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-4">
                  <p className="text-white/70 leading-relaxed">
                    일반 구조물을 제작할때 사용하는 일반형강으로 H빔, 앵글, 잔넬, 사각강 등 다양한 형강을 취급하고 있습니다. 
                    일반강재 SS400재를 기본으로 각종 건축 및 설비 구조물을 제작할수 있는 일반자재로 다양한 수요가 발생하고 있습니다.
                  </p>
                </div>
              </div>

              {/* 4. 복공판(DECK PLATE) */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-brand">▲</span>
                  <h3 className="text-2xl font-bold">복공판(DECK PLATE)</h3>
                </div>
                <div className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-4">
                  <p className="text-white/70 leading-relaxed">
                    지하구조물을 설치할때 상판에 설치하는 자재로 하중 및 용도에 따라 잔넬형 복공판과, 빔복공판으로 구분되며 
                    최근에는 특수 기능에 따른 미끄럼방지 복공판등 특수 기능성 복공판을 다양하게 취급하고 있습니다.
                  </p>
                </div>
              </div>

              {/* 5. G-I BEAM (GALLERY BEAM) */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="text-2xl text-brand">▲</span>
                  <h3 className="text-2xl font-bold">G-I BEAM (GALLERY BEAM)</h3>
                </div>
                <div className="bg-white/5 p-8 rounded-2xl border border-white/5 space-y-4">
                  <p className="text-white/70 leading-relaxed">
                    광산 지보용 I 형강으로 광산 갱도 지지용 형강, 최근 자동화 이송설비에 다양하게 적용되어 사용되고 있습니다. 
                    국내산 생산이 종료됨에 따라 중국산 제품으로 대체되어 적용 및 사용되고 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-brand/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-8">제품문의</h2>
            <p className="text-white/60 mb-12 text-lg">
              에이치제이스틸은 고객사의 성공을 위해 최선을 다합니다.<br />
              지금 바로 문의하세요.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <div className="text-sm text-white/40">대표 번호</div>
                  <div className="font-semibold">{settings.phone_number}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <div className="text-sm text-white/40">이메일 문의</div>
                  <div className="font-semibold">{settings.contact_email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <div className="text-sm text-white/40">본사 위치</div>
                  <div className="font-semibold">{settings.office_address}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="glass p-10 rounded-3xl">
            <form 
              action="https://formspree.io/f/meelpezl"
              method="POST"
              className="space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">성함</label>
                  <input type="text" name="name" className="w-full input-field" placeholder="홍길동" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">회사명</label>
                  <input type="text" name="company" className="w-full input-field" placeholder="(주)에이치제이" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">이메일</label>
                <input type="email" name="email" className="w-full input-field" placeholder="example@email.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">문의 내용</label>
                <textarea name="message" className="w-full input-field min-h-[120px]" placeholder="문의하실 내용을 입력해주세요." required />
              </div>
              <button type="submit" className="w-full btn-primary">문의 보내기</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-xl font-bold tracking-tighter">{settings.site_name}</div>
          <div className="text-sm text-white/40">
            © 2024 HJ Steel. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors">이용약관</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
