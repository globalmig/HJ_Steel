import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, FileText, Settings as SettingsIcon, Plus, Trash2, Edit, Save, LogOut, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const { settings, posts, updateSettings, refreshData } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'settings'>('overview');
  const [editingPost, setEditingPost] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const settingsFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [settingsPreviewUrl, setSettingsPreviewUrl] = useState<string | null>(null);

  const handleDeletePost = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    refreshData();
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    // Handle file upload if a file is selected
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      setIsUploading(true);
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);
      
      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        });
        const uploadData = await uploadRes.json();
        if (uploadData.imageUrl) {
          data.image_url = uploadData.imageUrl;
        }
      } catch (error) {
        console.error('Upload failed:', error);
        alert('이미지 업로드에 실패했습니다.');
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    const method = editingPost?.id ? 'PUT' : 'POST';
    const url = editingPost?.id ? `/api/posts/${editingPost.id}` : '/api/posts';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    setEditingPost(null);
    setPreviewUrl(null);
    refreshData();
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    setIsUploading(true);

    const uploadTasks: Promise<void>[] = [];

    // Handle settings file upload (Hero Image)
    const heroFile = settingsFileInputRef.current?.files?.[0];
    if (heroFile) {
      const uploadFormData = new FormData();
      uploadFormData.append('image', heroFile);
      uploadTasks.push(
        fetch('/api/upload', { method: 'POST', body: uploadFormData })
          .then(res => res.json())
          .then(uploadData => {
            if (uploadData.imageUrl) data.hero_image_url = uploadData.imageUrl;
          })
          .catch(err => console.error('Hero upload failed:', err))
      );
    }

    await Promise.all(uploadTasks);

    setIsUploading(false);
    await updateSettings(data as any);
    alert('설정이 저장되었습니다.');
    setSettingsPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col gap-8">
        <div className="text-xl font-bold tracking-tighter text-brand">HJ Admin</div>
        <nav className="flex flex-col gap-2">
          {[
            { id: 'overview', icon: LayoutDashboard, label: '대시보드' },
            { id: 'posts', icon: FileText, label: '게시글 관리' },
            { id: 'settings', icon: SettingsIcon, label: '사이트 설정' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-brand text-white' : 'text-white/50 hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <a href="/" className="flex items-center gap-3 px-4 py-3 text-white/50 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            <span>사이트로 돌아가기</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto max-h-screen">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {activeTab === 'overview' && '시스템 현황'}
              {activeTab === 'posts' && '게시글 및 제품 관리'}
              {activeTab === 'settings' && '사이트 환경 설정'}
            </h1>
            <p className="text-white/40">관리자님, 환영합니다.</p>
          </div>
          {activeTab === 'posts' && (
            <button
              onClick={() => setEditingPost({ title: '', content: '', category: 'Product', image_url: '' })}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> 새 게시글 작성
            </button>
          )}
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="glass p-6 rounded-2xl">
                <div className="text-sm text-white/40 mb-2">총 게시글 수</div>
                <div className="text-4xl font-bold">{posts.length}</div>
              </div>
              <div className="glass p-6 rounded-2xl">
                <div className="text-sm text-white/40 mb-2">오늘 방문자</div>
                <div className="text-4xl font-bold">128</div>
              </div>
              <div className="glass p-6 rounded-2xl">
                <div className="text-sm text-white/40 mb-2">문의 대기</div>
                <div className="text-4xl font-bold">3</div>
              </div>
            </motion.div>
          )}

          {activeTab === 'posts' && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="glass rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/5">
                    <tr>
                      <th className="px-6 py-4 text-sm font-medium text-white/40">제목</th>
                      <th className="px-6 py-4 text-sm font-medium text-white/40">카테고리</th>
                      <th className="px-6 py-4 text-sm font-medium text-white/40">작성일</th>
                      <th className="px-6 py-4 text-sm font-medium text-white/40 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4 font-medium">{post.title}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-md bg-white/5 text-xs">{post.category}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/40">{new Date(post.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => setEditingPost(post)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeletePost(post.id)} className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl"
            >
              <form onSubmit={handleSaveSettings} className="glass p-8 rounded-2xl space-y-6">
                <h3 className="text-lg font-bold border-b border-white/5 pb-4">기본 정보 설정</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">사이트 이름</label>
                  <input name="site_name" defaultValue={settings.site_name} className="w-full input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">히어로 제목</label>
                  <input name="hero_title" defaultValue={settings.hero_title} className="w-full input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">히어로 부제목</label>
                  <textarea name="hero_subtitle" defaultValue={settings.hero_subtitle} className="w-full input-field min-h-[100px]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">히어로 이미지</label>
                  <div className="flex gap-2">
                    <input 
                      name="hero_image_url" 
                      defaultValue={settings.hero_image_url} 
                      className="flex-1 input-field" 
                      placeholder="https://... 또는 파일 업로드"
                    />
                    <input
                      type="file"
                      ref={settingsFileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setSettingsPreviewUrl(URL.createObjectURL(file));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => settingsFileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                  {(settingsPreviewUrl || settings.hero_image_url) && (
                    <div className="mt-2 aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/5">
                      <img 
                        src={settingsPreviewUrl || settings.hero_image_url} 
                        className="w-full h-full object-cover" 
                        alt="Hero Preview"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold border-b border-white/5 pb-4 pt-4">연락처 및 기타 설정</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">대표 번호</label>
                  <input name="phone_number" defaultValue={settings.phone_number} className="w-full input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">문의 이메일</label>
                  <input name="contact_email" defaultValue={settings.contact_email} className="w-full input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">본사 주소</label>
                  <input name="office_address" defaultValue={settings.office_address} className="w-full input-field" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">브랜드 컬러 (Hex)</label>
                  <div className="flex gap-4">
                    <input name="primary_color" type="color" defaultValue={settings.primary_color} className="h-10 w-20 bg-transparent cursor-pointer" />
                    <input name="primary_color_text" defaultValue={settings.primary_color} className="flex-1 input-field" />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2" disabled={isUploading}>
                  <Save className="w-4 h-4" /> {isUploading ? '업로드 중...' : '설정 저장하기'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Post Editor Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingPost(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass w-full max-w-2xl rounded-3xl p-8 relative z-10"
          >
            <h2 className="text-2xl font-bold mb-6">{editingPost.id ? '게시글 수정' : '새 게시글 작성'}</h2>
            <form onSubmit={handleSavePost} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">제목</label>
                <input name="title" defaultValue={editingPost.title} className="w-full input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">카테고리</label>
                  <select name="category" defaultValue={editingPost.category} className="w-full input-field">
                    <option value="Product">제품</option>
                    <option value="Notice">공지사항</option>
                    <option value="News">뉴스</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">이미지</label>
                  <div className="flex gap-2">
                    <input 
                      name="image_url" 
                      defaultValue={editingPost.image_url} 
                      className="flex-1 input-field" 
                      placeholder="https://... 또는 파일 업로드" 
                    />
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setPreviewUrl(URL.createObjectURL(file));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                  {(previewUrl || editingPost.image_url) && (
                    <div className="mt-2 aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/5">
                      <img 
                        src={previewUrl || editingPost.image_url} 
                        className="w-full h-full object-cover" 
                        alt="Preview"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60">내용</label>
                <textarea name="content" defaultValue={editingPost.content} className="w-full input-field min-h-[200px]" required />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setEditingPost(null)} className="flex-1 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all" disabled={isUploading}>취소</button>
                <button type="submit" className="flex-1 btn-primary" disabled={isUploading}>
                  {isUploading ? '업로드 중...' : '저장하기'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
