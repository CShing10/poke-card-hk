'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

interface PokemonCard {
  id: string;
  nameZh: string;
  nameEn: string;
  nameJp?: string;
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
  const [rateLoading, setRateLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortOption, setSortOption] = useState<'default' | 'price-low' | 'price-high'>('default');
  const [selectedSet, setSelectedSet] = useState<string>('全部');

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
        setExchangeRate(res.data.rates.HKD);
      } catch {
        setExchangeRate(7.8);
      } finally {
        setRateLoading(false);
      }
    };
    fetchExchangeRate();
  }, []);

  const cards: PokemonCard[] = [
    {
      id: "swsh1-1",
      nameZh: "皮卡丘 V",
      nameEn: "Pikachu V",
      nameJp: "ピカチュウV",
      set: { name: "Sword & Shield" },
      number: "1",
      rarity: "Rare Holo V",
      images: { large: "https://images.pokemontcg.io/swsh1/1_hires.png" },
      usdPrice: 12.5,
      priceHistory: [{ date: '3/1', usd: 9.8 }, { date: '3/8', usd: 10.5 }, { date: '3/15', usd: 11.2 }, { date: '3/22', usd: 12.5 }, { date: '3/29', usd: 13.8 }]
    },
    {
      id: "sv1-25",
      nameZh: "噴火龍 ex",
      nameEn: "Charizard ex",
      nameJp: "リザードンex",
      set: { name: "Scarlet & Violet" },
      number: "25",
      rarity: "Double Rare",
      images: { large: "https://images.pokemontcg.io/sv1/25_hires.png" },
      usdPrice: 45.0,
      priceHistory: [{ date: '3/1', usd: 38 }, { date: '3/8', usd: 42 }, { date: '3/15', usd: 48 }, { date: '3/22', usd: 45 }, { date: '3/29', usd: 47 }]
    },
    {
      id: "swsh35-1",
      nameZh: "皮卡丘",
      nameEn: "Pikachu",
      nameJp: "ピカチュウ",
      set: { name: "Celebrations" },
      number: "1",
      rarity: "Common",
      images: { large: "https://images.pokemontcg.io/swsh35/1_hires.png" },
      usdPrice: 5.8,
      priceHistory: [{ date: '3/1', usd: 4.5 }, { date: '3/8', usd: 5.2 }, { date: '3/15', usd: 6.1 }, { date: '3/22', usd: 5.8 }, { date: '3/29', usd: 6.5 }]
    },
    {
      id: "sv3-6",
      nameZh: "夢幻 ex",
      nameEn: "Mew ex",
      nameJp: "ミュウex",
      set: { name: "Scarlet & Violet" },
      number: "6",
      rarity: "Double Rare",
      images: { large: "https://images.pokemontcg.io/sv3/6_hires.png" },
      usdPrice: 28.5,
      priceHistory: [{ date: '3/1', usd: 25 }, { date: '3/15', usd: 30 }, { date: '3/29', usd: 28.5 }]
    }
  ];

  const allSets = useMemo(() => {
    const sets = Array.from(new Set(cards.map(card => card.set.name)));
    return ['全部', ...sets.sort().reverse()]; // 最新系列傾向排前面
  }, []);

  const displayedCards = useMemo(() => {
    let result = [...cards];

    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(card =>
        card.nameZh.toLowerCase().includes(term) ||
        card.nameEn.toLowerCase().includes(term) ||
        (card.nameJp && card.nameJp.toLowerCase().includes(term))
      );
    }

    if (selectedSet !== '全部') {
      result = result.filter(card => card.set.name === selectedSet);
    }

    if (sortOption === 'price-low') {
      result.sort((a, b) => a.usdPrice - b.usdPrice);
    } else if (sortOption === 'price-high') {
      result.sort((a, b) => b.usdPrice - a.usdPrice);
    }

    if (showFavorites) {
      result = result.filter(card => favorites.includes(card.id));
    }

    return result;
  }, [cards, searchTerm, selectedSet, sortOption, showFavorites, favorites]);

  const toggleFavorite = (cardId: string) => {
    if (favorites.includes(cardId)) {
      setFavorites(favorites.filter(id => id !== cardId));
    } else {
      setFavorites([...favorites, cardId]);
    }
  };

  const calculateHKD = (usd: number) => Math.round(usd * exchangeRate);

  const openDetail = (card: PokemonCard) => setSelectedCard(card);

  const exitFavorites = () => {
    setShowFavorites(false);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* 左側系列欄 - 美化版 */}
      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 hidden lg:block overflow-y-auto">
        <div className="sticky top-6">
          <h3 className="text-xl font-semibold mb-6 text-emerald-400 flex items-center gap-2">
            📂 選擇系列
          </h3>
          <div className="space-y-1 pr-2">
            {allSets.map((setName) => (
              <button
                key={setName}
                onClick={() => setSelectedSet(setName)}
                className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-medium transition-all flex items-center gap-3 ${
                  selectedSet === setName 
                    ? 'bg-emerald-600 text-white shadow-lg' 
                    : 'hover:bg-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                {setName === '全部' ? '🌐 全部系列' : '📦 ' + setName}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 主要內容 */}
      <div className="flex-1">
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">⚡</div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">卡價通</h1>
                <p className="text-zinc-400 text-sm">香港 Pokémon 卡片價格參考</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-zinc-400">
                1 USD ≈ <span className="text-emerald-400 font-medium">{exchangeRate.toFixed(3)} HKD</span>
              </div>

              <button
                onClick={() => {
                  setShowFavorites(!showFavorites);
                  if (!showFavorites) setSearchTerm('');
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-medium transition-all ${
                  showFavorites ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
              >
                ❤️ 我的收藏 ({favorites.length})
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-12">
          {showFavorites && (
            <div className="mb-10 flex items-center gap-4">
              <button onClick={exitFavorites} className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium">
                ← 返回全部卡片
              </button>
              <h2 className="text-2xl font-semibold">我的收藏</h2>
            </div>
          )}

          {!showFavorites && (
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="搜尋卡名（支援中文、英文、日文）例如：皮卡丘、噴火龍"
                  className="w-full bg-zinc-900 border border-zinc-700 focus:border-emerald-500 rounded-3xl px-6 py-5 text-lg placeholder-zinc-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500">🔍</div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <button onClick={() => setSortOption('default')} className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${sortOption === 'default' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                  預設排序
                </button>
                <button onClick={() => setSortOption('price-low')} className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${sortOption === 'price-low' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                  價格 低 → 高
                </button>
                <button onClick={() => setSortOption('price-high')} className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${sortOption === 'price-high' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                  價格 高 → 低
                </button>
              </div>
            </div>
          )}

          {/* 卡片列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCards.length > 0 ? (
              displayedCards.map((card) => {
                const hkdPrice = calculateHKD(card.usdPrice);
                const isFavorite = favorites.includes(card.id);

                return (
                  <div 
                    key={card.id} 
                    className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-emerald-500/60 transition-all group relative hover:-translate-y-1"
                  >
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(card.id); }}
                      className="absolute top-4 right-4 z-10 text-3xl transition-all hover:scale-125 active:scale-90"
                    >
                      {isFavorite ? '❤️' : '♡'}
                    </button>

                    <div 
                      className="relative h-[400px] bg-zinc-950 flex items-center justify-center p-10 border-b border-zinc-800 cursor-pointer overflow-hidden"
                      onClick={() => openDetail(card)}
                    >
                      <Image
                        src={card.images.large}
                        alt={card.nameZh}
                        width={340}
                        height={480}
                        className="object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                      />
                    </div>

                    <div className="p-7" onClick={() => openDetail(card)}>
                      <div className="font-bold text-2xl mb-1 text-white">{card.nameZh}</div>
                      <div className="text-zinc-400 text-sm mb-6">
                        {card.set.name} ・ No.{card.number} ・ {card.rarity}
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-xs text-zinc-500">TCGPlayer</div>
                          <div className="text-3xl font-bold text-emerald-400">${card.usdPrice}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-zinc-500">香港參考價</div>
                          <div className="text-3xl font-bold text-white">HK${hkdPrice}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 text-zinc-400 text-lg">
                {showFavorites ? '你還沒有收藏任何卡片' : '該系列目前沒有卡片'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 彈出詳細視窗 - 美化版 */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60] p-4">
          <div className="bg-zinc-900 rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-auto border border-zinc-700 shadow-2xl">
            <div className="p-10">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-5xl font-bold text-white">{selectedCard.nameZh}</h2>
                  <p className="text-zinc-400 text-2xl mt-3">{selectedCard.nameEn}</p>
                </div>
                <button 
                  onClick={() => setSelectedCard(null)}
                  className="text-6xl text-zinc-500 hover:text-white transition-colors leading-none"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                <div className="flex justify-center">
                  <Image
                    src={selectedCard.images.large}
                    alt={selectedCard.nameZh}
                    width={480}
                    height={670}
                    className="rounded-3xl shadow-2xl"
                  />
                </div>

                <div className="space-y-10">
                  <div>
                    <div className="text-emerald-400 text-sm tracking-widest mb-2">TCGPLAYER 國際市價</div>
                    <div className="text-7xl font-bold text-emerald-400">${selectedCard.usdPrice}</div>
                    <div className="text-5xl font-bold text-white mt-4">
                      HK${calculateHKD(selectedCard.usdPrice)}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-white">近期價格走勢 (USD)</h3>
                    <div className="h-80 bg-zinc-950 rounded-3xl p-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={selectedCard.priceHistory}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                          <XAxis dataKey="date" stroke="#52525b" />
                          <YAxis stroke="#52525b" />
                          <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px' }} />
                          <Line type="monotone" dataKey="usd" stroke="#34d399" strokeWidth={5} dot={{ fill: '#34d399', r: 7 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}