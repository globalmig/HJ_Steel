import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Settings {
  site_name: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string;
  phone_number: string;
  contact_email: string;
  office_address: string;
  primary_color: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  image_url: string;
  created_at: string;
}

interface AppContextType {
  settings: Settings;
  posts: Post[];
  loading: boolean;
  refreshData: () => Promise<void>;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>({
    site_name: '에이치제이스틸 주식회사',
    hero_title: '엘리베이터 가이드 레일',
    hero_subtitle: '',
    hero_image_url: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F5938_000_1%2F20210115122534197_4TJWPILP5.png%2Fdh2_h_298_i1.png%3Ftype%3Dm4500_4500_fst_n&type=sc960_832',
    phone_number: '010-3305-4211',
    contact_email: 'trap4211@naver.com',
    office_address: '경기도 고양시 일산동구 백석로175',
    primary_color: '#8B5CF6'
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [settingsRes, postsRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/posts')
      ]);
      const settingsData = await settingsRes.json();
      const postsData = await postsRes.json();
      setSettings(settingsData);
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      await fetchData();
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <AppContext.Provider value={{ settings, posts, loading, refreshData: fetchData, updateSettings }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
