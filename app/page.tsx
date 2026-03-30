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
    return ['全部', ...sets.sort().reverse()];
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
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">⚡</div>
            <div>
              <h1 className="text-2xl font-bold">卡價通</h1>
              <p className="text-zinc-400 text-xs">香港 Pokémon 卡片價格參考</p>
            </div>
          </div>

          <button
            onClick={() => {
              setShowFavorites(!showFavorites);
              if (!showFavorites) setSearchTerm('');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-medium text-sm transition-all ${
              showFavorites ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
          >
            ❤️ 我的收藏 ({favorites.length})
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 系列選擇 - 手機友好版 */}
        {!showFavorites && (
          <div className="mb-8">
            <select
              value={selectedSet}
              onChange={(e) => setSelectedSet(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-3.5 text-base focus:outline-none focus:border-emerald-500"
            >
              {allSets.map((setName) => (
                <option key={setName} value={setName}>
                  {setName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 搜尋框 + 排序 */}
        {!showFavorites && (
          <div className="mb-10">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="搜尋卡名（支援中文、英文、日文）"
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-emerald-500 rounded-3xl px-5 py-4 text-base placeholder-zinc-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500">🔍</div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => setSortOption('default')} className={`px-5 py-2 rounded-full text-sm transition-all ${sortOption === 'default' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                預設
              </button>
              <button onClick={() => setSortOption('price-low')} className={`px-5 py-2 rounded-full text-sm transition-all ${sortOption === 'price-low' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                低 → 高
              </button>
              <button onClick={() => setSortOption('price-high')} className={`px-5 py-2 rounded-full text-sm transition-all ${sortOption === 'price-high' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                高 → 低
              </button>
            </div>
          </div>
        )}

        {/* 返回按鈕 */}
        {showFavorites && (
          <div className="mb-8 flex items-center gap-3">
            <button onClick={exitFavorites} className="text-emerald-400 hover:text-emerald-300 font-medium">
              ← 返回全部
            </button>
            <h2 className="text-xl font-semibold">我的收藏</h2>
          </div>
        )}

        {/* 卡片列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCards.length > 0 ? (
            displayedCards.map((card) => {
              const hkdPrice = calculateHKD(card.usdPrice);
              const isFavorite = favorites.includes(card.id);

              return (
                <div 
                  key={card.id} 
                  className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-emerald-500/60 transition-all group relative"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(card.id); }}
                    className="absolute top-4 right-4 z-10 text-3xl transition-all hover:scale-125 active:scale-90"
                  >
                    {isFavorite ? '❤️' : '♡'}
                  </button>

                  <div 
                    className="relative h-[360px] bg-zinc-950 flex items-center justify-center p-8 border-b border-zinc-800 cursor-pointer"
                    onClick={() => openDetail(card)}
                  >
                    <Image
                      src={card.images.large}
                      alt={card.nameZh}
                      width={280}
                      height={400}
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6" onClick={() => openDetail(card)}>
                    <div className="font-bold text-xl mb-1">{card.nameZh}</div>
                    <div className="text-zinc-400 text-sm mb-5">
                      {card.set.name} ・ No.{card.number}
                    </div>

                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-xs text-zinc-500">TCGPlayer</div>
                        <div className="text-2xl font-bold text-emerald-400">${card.usdPrice}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-zinc-500">香港參考價</div>
                        <div className="text-2xl font-bold text-white">HK${hkdPrice}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-16 text-zinc-400">
              {showFavorites ? '你還沒有收藏任何卡片' : '目前沒有卡片'}
            </div>
          )}
        </div>
      </div>

      {/* 彈出視窗 */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60] p-4">
          <div className="bg-zinc-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto border border-zinc-700">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold">{selectedCard.nameZh}</h2>
                  <p className="text-zinc-400">{selectedCard.nameEn}</p>
                </div>
                <button onClick={() => setSelectedCard(null)} className="text-4xl text-zinc-500 hover:text-white">×</button>
              </div>

              <Image
                src={selectedCard.images.large}
                alt={selectedCard.nameZh}
                width={400}
                height={560}
                className="rounded-2xl shadow-xl mx-auto mb-8"
              />

              <div className="space-y-8">
                <div>
                  <div className="text-emerald-400 text-sm">TCGPlayer 市價</div>
                  <div className="text-5xl font-bold text-emerald-400 mt-1">${selectedCard.usdPrice}</div>
                  <div className="text-4xl font-bold text-white mt-2">HK${calculateHKD(selectedCard.usdPrice)}</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">近期價格走勢</h3>
                  <div className="h-64 bg-zinc-950 rounded-2xl p-4">
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
        </div>
      )}
    </div>
  );
}