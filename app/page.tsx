'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface PokemonCard {
  id: string;
  nameZh: string;
  nameEn: string;
  set: { name: string };
  number: string;
  rarity: string;
  images: { large: string };
  usdPrice: number;
  priceHistory: { date: string; usd: number }[];
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number>(7.8);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortOption, setSortOption] = useState<'default' | 'price-low' | 'price-high'>('default');
  const [selectedSet, setSelectedSet] = useState<string>('[M4F] 忍者飛旋 中文版');
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSeries, setShowSeries] = useState(false);

  // 載入收藏
  useEffect(() => {
    const saved = localStorage.getItem('pokemonFavorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // 即時匯率
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const res = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setExchangeRate(res.data.rates.HKD || 7.8);
      } catch {
        setExchangeRate(7.8);
      }
    };
    fetchExchangeRate();
  }, []);

  // M4F 卡片資料（完全使用你提供的名字，SAR-119 使用 19.2 USD）
  useEffect(() => {
    const m4fCards: PokemonCard[] = [
      // MUR
      { id: "m4f-120-mur", nameZh: "M4F 120/083 超級甲賀忍蛙 ex MUR", nameEn: "Mega Greninja ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "120/083", rarity: "MUR", images: { large: "https://i.ibb.co/TqRhjzMd/mur.jpg" }, usdPrice: 254, priceHistory: [{ date: '3/13', usd: 220 }, { date: '3/20', usd: 240 }, { date: '3/27', usd: 254 }] },
      // SAR
      { id: "m4f-sar-114", nameZh: "M4F 114/083 超級甲賀忍蛙 ex SAR", nameEn: "Mega Greninja ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "114/083", rarity: "SAR", images: { large: "https://i.ibb.co/Qv4wG8L0/5bb60106330a81d76d9b42e392a73a3e.webp" }, usdPrice: 190, priceHistory: [{ date: '3/13', usd: 160 }, { date: '3/20', usd: 185 }, { date: '3/27', usd: 190 }] },
      { id: "m4f-sar-115", nameZh: "M4F 115/083 超級花葉蒂 ex SAR", nameEn: "Mega Floragato ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "115/083", rarity: "SAR", images: { large: "https://i.ibb.co/Dfxh5n7W/900b2b36d4f11898ea09b594cc835f02.webp" }, usdPrice: 19, priceHistory: [{ date: '3/13', usd: 18 }, { date: '3/20', usd: 20 }, { date: '3/27', usd: 19 }] },
      { id: "m4f-sar-116", nameZh: "M4F 116/083 超級毒藻龍 ex SAR", nameEn: "Mega Dragalge ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "116/083", rarity: "SAR", images: { large: "https://i.ibb.co/gZGtDkFQ/33497104546588c9f8ddc593cc13948f-2a6fed62-9149-4f5a-a554-9a62051a07d7.webp" }, usdPrice: 25, priceHistory: [{ date: '3/13', usd: 22 }, { date: '3/20', usd: 28 }, { date: '3/27', usd: 25 }] },
      { id: "m4f-sar-117", nameZh: "M4F 117/083 超級火炎獅 ex SAR", nameEn: "Mega Pyroar ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "117/083", rarity: "SAR", images: { large: "https://i.ibb.co/VY3HW36s/c0946a13837da9fb31322615442bc7bf.webp" }, usdPrice: 22, priceHistory: [{ date: '3/13', usd: 20 }, { date: '3/20', usd: 24 }, { date: '3/27', usd: 22 }] },
      { id: "m4f-sar-118", nameZh: "M4F 118/083 M4F 118/083 AZ的平和 SAR", nameEn: "Gourgeist ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "118/083", rarity: "SAR", images: { large: "https://i.ibb.co/gFrVzBYs/fb34774b0b3118b7ccbe8b2674dbcc1e.webp" }, usdPrice: 18, priceHistory: [{ date: '3/13', usd: 16 }, { date: '3/20', usd: 20 }, { date: '3/27', usd: 18 }] },
      { id: "m4f-sar-119", nameZh: "M4F 119/083 霍米加的演奏 SAR", nameEn: "Homi's Performance", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "119/083", rarity: "SAR", images: { large: "https://i.ibb.co/hJnm6pZ7/f07d245ca4b5a76f71c68c590c181d50.webp" }, usdPrice: 19.2, priceHistory: [{ date: '3/13', usd: 17 }, { date: '3/20', usd: 19 }, { date: '3/27', usd: 19.2 }] },
      // RR
      { id: "m4f-rr-003", nameZh: "M4F 003/083 大針蜂ex RR", nameEn: "Beedrill ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "003/083", rarity: "RR", images: { large: "https://i.ibb.co/GfmZ20n9/tw00018423.png" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
      { id: "m4f-rr-015", nameZh: "M4F 015/083 超級火炎獅ex RR", nameEn: "Mega Pyroar ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "015/083", rarity: "RR", images: { large: "https://i.ibb.co/849F1MyY/tw00018435.png" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
      { id: "m4f-rr-022", nameZh: "M4F 022/083 超級甲賀忍蛙ex RR", nameEn: "Mega Greninja ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "022/083", rarity: "RR", images: { large: "https://i.ibb.co/nN91Z8zn/tw00018442.png" }, usdPrice: 6.4, priceHistory: [{ date: '3/13', usd: 5.5 }, { date: '3/20', usd: 7 }, { date: '3/27', usd: 6.4 }] },
      { id: "m4f-rr-035", nameZh: "M4F 035/083 超級花葉蒂ex RR", nameEn: "Mega Floragato ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "035/083", rarity: "RR", images: { large: "https://i.ibb.co/KcY5Xc7K/tw00018455.png" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
      { id: "m4f-rr-041", nameZh: "M4F 041/083 南瓜怪人ex RR", nameEn: "Gourgeist ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "041/083", rarity: "RR", images: { large: "https://i.ibb.co/XRF1Gvx/tw00018461.png" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
      { id: "m4f-rr-062", nameZh: "M4F 062/083 勾帕路翁ex RR", nameEn: "Cobalion ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "062/083", rarity: "RR", images: { large: "https://i.ibb.co/H9jdhqv/tw00018482.png" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
      { id: "m4f-rr-063", nameZh: "M4F 063/083 超級毒藻龍ex RR", nameEn: "Mega Dragalge ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "063/083", rarity: "RR", images: { large: "https://i.ibb.co/QF1j9wnv/tw00018483.png" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
      { id: "m4f-rr-071", nameZh: "M4F 071/083 奇諾栗鼠ex RR", nameEn: "Cinccino ex", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "071/083", rarity: "RR", images: { large: "https://i.ibb.co/KjrYNLZR/tw00018491.png" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      // AR
      { id: "m4f-ar-084", nameZh: "M4F 084/083 哈力栗 AR", nameEn: "Chespin AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "084/083", rarity: "AR", images: { large: "https://i.ibb.co/HDhyVZSJ/5e392aa15bd54ef6aa94f39274d030b3-c1621fac-38ed-4077-a919-a8d2651b72bc.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m4f-ar-085", nameZh: "M4F 085/083 火狐狸 AR", nameEn: "Fennekin AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "085/083", rarity: "AR", images: { large: "https://i.ibb.co/q3By87mg/77dc172743c97478f1c3c28d2fb0d1cf-d27f9cc7-220c-427b-a162-2fb47d11cc16.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m4f-ar-086", nameZh: "M4F 086/083 呱呱泡蛙 AR", nameEn: "Froakie AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "086/083", rarity: "AR", images: { large: "https://i.ibb.co/sp2ngjnd/5a2cc6a77da7c1a05a65a3529721a4df-e8062ae1-5865-484c-8f54-c2f6d44bc758.webp" }, usdPrice: 5.1, priceHistory: [{ date: '3/13', usd: 4.5 }, { date: '3/20', usd: 5.5 }, { date: '3/27', usd: 5.1 }] },
      { id: "m4f-ar-087", nameZh: "M4F 087/083 呱頭蛙 AR", nameEn: "Frogadier AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "087/083", rarity: "AR", images: { large: "https://i.ibb.co/Kx2kT4wD/9cb6d64f018aeb59f58a3be83fbe406c.webp" }, usdPrice: 3.8, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4 }, { date: '3/27', usd: 3.8 }] },
      { id: "m4f-ar-088", nameZh: "M4F 088/083 電龍 AR", nameEn: "Ampharos AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "088/083", rarity: "AR", images: { large: "https://i.ibb.co/VYz5Cj2c/1a374c431e21f3a65162fe31cbe4f896-4981964b-504d-464d-995d-098b8d30f18e.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m4f-ar-089", nameZh: "M4F 089/083 哲爾尼亞斯 AR", nameEn: "Xerneas AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "089/083", rarity: "AR", images: { large: "https://i.ibb.co/S9StxR7/7c07b547f047d7e96f68b515e9133aa4-cac47e80-311f-4cb2-baa8-af4e72cd2857.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m4f-ar-090", nameZh: "M4F 090/083 念力土偶 AR", nameEn: "Claydol AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "090/083", rarity: "AR", images: { large: "https://i.ibb.co/7Jw3TDsj/5566324f1750b0a22de839973df86726.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m4f-ar-091", nameZh: "M4F 091/083 叉字蝠 AR", nameEn: "Crobat AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "091/083", rarity: "AR", images: { large: "https://i.ibb.co/zTr6L0BP/925a81311e333e2b2fa232e7ae142e88-c965a4d0-567b-42a5-b9a5-a89dc12b184f.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m4f-ar-092", nameZh: "M4F 092/083 金屬怪 AR", nameEn: "Metang AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "092/083", rarity: "AR", images: { large: "https://i.ibb.co/n8M4LVfs/80857ecf90037ec96349722bcd7b0f7a-185bbff3-a27e-484f-8bf1-63375cd8bf45.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m4f-ar-093", nameZh: "M4F 093/083 黏美兒 AR", nameEn: "Goomy AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "093/083", rarity: "AR", images: { large: "https://i.ibb.co/gLSL0tJ7/842b208d43ca04349cb055fc31ba64f5-555bc350-6ace-4960-a0fe-84ac6e11fedd.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m4f-ar-094", nameZh: "M4F 094/083 肯泰羅 AR", nameEn: "Tauros AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "094/083", rarity: "AR", images: { large: "https://i.ibb.co/Q3gSzWVP/8119c29333091b4e22aa81894f14d9b5-c8451a9e-ff4c-473d-9814-4e4007ef5b23.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m4f-ar-095", nameZh: "M4F 095/083 步哨鼠 AR", nameEn: "Sentret AR", set: { name: "[M4F] 忍者飛旋 中文版" }, number: "095/083", rarity: "AR", images: { large: "https://i.ibb.co/nMVbkvbw/e0528a9eba4f1844f9c251842f1cc739-be901533-6e50-4b2f-8aa6-939a0148b1f3.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
    ];

    setCards(m4fCards);
    setLoading(false);
  }, []);

  const calculateHKD = (usd: number) => Math.round(usd * exchangeRate);

  const toggleFavorite = (cardId: string) => {
    if (favorites.includes(cardId)) {
      setFavorites(favorites.filter(id => id !== cardId));
    } else {
      setFavorites([...favorites, cardId]);
    }
  };

  const openDetail = (card: PokemonCard) => setSelectedCard(card);
  const closeDetail = () => setSelectedCard(null);

  const displayedCards = useMemo(() => {
    let result = [...cards];
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(card =>
        card.nameZh.toLowerCase().includes(term) || card.nameEn.toLowerCase().includes(term)
      );
    }
    if (selectedSet !== '全部') {
      result = result.filter(card => card.set.name === selectedSet);
    }
    if (sortOption === 'price-low') result.sort((a, b) => a.usdPrice - b.usdPrice);
    if (sortOption === 'price-high') result.sort((a, b) => b.usdPrice - a.usdPrice);
    if (showFavorites) {
      result = result.filter(card => favorites.includes(card.id));
    }
    return result;
  }, [cards, searchTerm, selectedSet, sortOption, showFavorites, favorites]);

  const groupedCards = useMemo(() => {
    const groups: { [set: string]: { [rarity: string]: PokemonCard[] } } = {};
    displayedCards.forEach(card => {
      const setName = card.set.name;
      if (!groups[setName]) groups[setName] = {};
      if (!groups[setName][card.rarity]) groups[setName][card.rarity] = [];
      groups[setName][card.rarity].push(card);
    });
    return groups;
  }, [displayedCards]);

  const allSets = useMemo(() => ['全部', ...Array.from(new Set(cards.map(c => c.set.name))).sort()], [cards]);

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">正在載入卡片資料...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header - 強制只優化手機版，不改你喜歡的那一行 */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="mx-auto pl-6 pr-10 py-4 flex items-center justify-between">
          
          {/* 左邊：卡價通 */}
          <div className="flex items-center gap-3">
            <div className="text-3xl md:text-3xl">⚡</div>
            <div>
              <h1 className="text-[22px] md:text-2xl font-bold">卡價通</h1>
              <p className="text-zinc-400 text-[10px] md:text-xs -mt-0.5">香港 Pokémon 卡片價格參考</p>
            </div>
          </div>

          {/* 右邊：首頁 + 我的收藏 */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setSelectedSet('[M4F] 忍者飛旋 中文版');
                setShowFavorites(false);
                setSearchTerm('');
              }}
              className="text-emerald-400 hover:text-emerald-300 px-4 py-1.5 text-sm md:text-sm font-medium"
            >
              首頁
            </button>

            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-5 md:px-6 py-2 md:py-2.5 rounded-2xl text-sm md:text-sm font-medium transition-all flex items-center gap-1.5 ${showFavorites ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}
            >
              ❤️ 我的收藏 ({favorites.length})
            </button>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* 左側系列欄 - 電腦版 */}
        <div className="hidden md:block w-64 bg-zinc-900 border-r border-zinc-800 p-6 h-screen overflow-y-auto sticky top-0">
          <h3 className="text-lg font-semibold mb-6 text-emerald-400">選擇系列</h3>
          <div className="space-y-1">
            {allSets.map((setName) => (
              <button
                key={setName}
                onClick={() => setSelectedSet(setName)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all ${
                  selectedSet === setName ? 'bg-emerald-600 text-white' : 'hover:bg-zinc-800 text-zinc-300'
                }`}
              >
                {setName}
              </button>
            ))}
          </div>
        </div>

        {/* 主內容區 */}
        <div className="flex-1">
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* 手機版系列選擇 */}
            <div className="md:hidden mb-6">
              <button
                onClick={() => setShowSeries(!showSeries)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-4 text-base flex justify-between items-center"
              >
                <span>{selectedSet}</span>
                <span className="text-xl">▼</span>
              </button>
              {showSeries && (
                <div className="mt-2 bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
                  {allSets.map((setName) => (
                    <button
                      key={setName}
                      onClick={() => { setSelectedSet(setName); setShowSeries(false); }}
                      className={`w-full text-left px-5 py-4 hover:bg-zinc-800 ${selectedSet === setName ? 'text-emerald-400 font-medium' : ''}`}
                    >
                      {setName}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 搜尋與排序 */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="即時搜尋卡名..."
                className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl px-5 py-4 text-base placeholder-zinc-500 focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex flex-wrap gap-2 mt-4">
                {['default', 'price-low', 'price-high'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSortOption(opt as any)}
                    className={`px-5 py-2 rounded-full text-sm ${sortOption === opt ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}
                  >
                    {opt === 'default' ? '預設' : opt === 'price-low' ? '價格 低→高' : '價格 高→低'}
                  </button>
                ))}
              </div>
            </div>

            {/* 稀有度分類顯示 */}
            <div className="space-y-16">
              {Object.entries(groupedCards).map(([setName, rarityGroups]) => (
                <div key={setName}>
                  <h2 className="text-2xl font-bold mb-8 text-emerald-400">{setName}</h2>
                  {Object.entries(rarityGroups).map(([rarity, cardsInGroup]) => (
                    <div key={rarity} className="mb-12">
                      <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-3">
                        {rarity} <span className="text-zinc-500 text-sm">({cardsInGroup.length} 張)</span>
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {cardsInGroup.map((card) => {
                          const hkdPrice = calculateHKD(card.usdPrice);
                          return (
                      <div
                        key={card.id}
                        onClick={() => openDetail(card)}
                        className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-emerald-500 cursor-pointer transition-all hover:-translate-y-1 relative group"
                      >
                        {/* 愛心收藏按鈕 */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(card.id);
                          }}
                          className="absolute top-3 right-3 z-20 text-2xl transition-all hover:scale-125"
                        >
                          {favorites.includes(card.id) ? '❤️' : '♡'}
                        </button>

                        {/* 卡片圖片 */}
                        <div className="h-44 bg-zinc-950 relative flex items-center justify-center p-3">
                          <Image
                            src={card.images.large}
                            alt={card.nameZh}
                            fill
                            sizes="(max-width: 768px) 50vw, 180px"
                            className="object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x560/1f2937/ffffff?text=無圖片';
                            }}
                          />
                        </div>

                        {/* 卡片資訊 */}
                        <div className="p-4">
                          <div className="font-medium text-sm line-clamp-2 mb-2 min-h-[2.8em]">{card.nameZh}</div>
                          <div className="text-xs text-zinc-500 mb-3">No.{card.number}</div>
                          <div className="flex justify-between text-sm">
                            <div className="text-emerald-400 font-bold">${card.usdPrice}</div>
                            <div className="font-bold text-white">HK${calculateHKD(card.usdPrice)}</div>
                          </div>
                        </div>
                      </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 詳細彈窗 */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60] p-4" onClick={closeDetail}>
          <div className="bg-zinc-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto border border-zinc-700" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold">{selectedCard.nameZh}</h2>
                  <p className="text-zinc-400">{selectedCard.nameEn}</p>
                </div>
                <button onClick={closeDetail} className="text-4xl text-zinc-500 hover:text-white">×</button>
              </div>
              <div className="relative h-[340px] bg-zinc-950 rounded-2xl mb-8 overflow-hidden">
                <Image 
                  src={selectedCard.images.large} 
                  alt={selectedCard.nameZh} 
                  fill 
                  sizes="(max-width: 768px) 90vw, 400px" 
                  className="object-contain" 
                  onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x560/1f2937/ffffff?text=無圖片';}} 
                />
              </div>
              <div className="mb-8">
                <div className="text-emerald-400 text-sm">TCGPlayer 市價</div>
                <div className="text-5xl font-bold text-emerald-400">${selectedCard.usdPrice}</div>
                <div className="text-4xl font-bold text-white mt-2">HK${calculateHKD(selectedCard.usdPrice)}</div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">近期價格走勢 (USD)</h3>
                <div className="h-72 bg-zinc-950 rounded-2xl p-6" style={{ minHeight: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedCard.priceHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                      <XAxis dataKey="date" stroke="#52525b" />
                      <YAxis stroke="#52525b" />
                      <Tooltip />
                      <Line type="monotone" dataKey="usd" stroke="#34d399" strokeWidth={3} dot={{ fill: '#34d399', r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}