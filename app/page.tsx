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
// ==================== [M3F] 虛無歸零 ====================
      // MUR
      { id: "m3f-117-mur", nameZh: "M3F 117/080 超級基格爾德ex MUR", nameEn: "Mega Zygarde ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "117/080", rarity: "MUR", images: { large: "https://i.ibb.co/gZHNZNzL/bf34580c3dd0b0e493a03c1887c34aa7.webp" }, usdPrice: 100, priceHistory: [{ date: '3/13', usd: 90 }, { date: '3/20', usd: 110 }, { date: '3/27', usd: 100 }] },

      // SAR
      { id: "m3f-sar-111", nameZh: "M3F 111/080 超級寶石海星ex SAR", nameEn: "Mega Starmie ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "111/080", rarity: "SAR", images: { large: "https://i.ibb.co/Qvpy0jj7/cda3074dff857a12b1a9655445ab3912-a67ad611-1c4a-44af-8175-05bfab128839.webp" }, usdPrice: 61, priceHistory: [{ date: '3/13', usd: 55 }, { date: '3/20', usd: 65 }, { date: '3/27', usd: 61 }] },
      { id: "m3f-sar-112", nameZh: "M3F 112/080 超級皮可西ex SAR", nameEn: "Mega Clefable ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "112/080", rarity: "SAR", images: { large: "https://i.ibb.co/pjfHJw5T/82e2e998f7177da8956c25de0a493168-1aa81cf6-7e4e-4cf6-a6a0-5d59b544caa3.webp" }, usdPrice: 36, priceHistory: [{ date: '3/13', usd: 32 }, { date: '3/20', usd: 38 }, { date: '3/27', usd: 36 }] },
      { id: "m3f-sar-113", nameZh: "M3F 113/080 超級基格爾德ex SAR", nameEn: "Mega Zygarde ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "113/080", rarity: "SAR", images: { large: "https://i.ibb.co/YBDhTxHB/5f78768ae2fa19d1186b110fdc4b2869.webp" }, usdPrice: 36, priceHistory: [{ date: '3/13', usd: 32 }, { date: '3/20', usd: 38 }, { date: '3/27', usd: 36 }] },
      { id: "m3f-sar-114", nameZh: "M3F 114/080 喵喵ex SAR", nameEn: "Meowth ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "114/080", rarity: "SAR", images: { large: "https://i.ibb.co/m5pKTK22/c693d478afa988c1cbb79fb610fc1908.webp" }, usdPrice: 113, priceHistory: [{ date: '3/13', usd: 100 }, { date: '3/20', usd: 120 }, { date: '3/27', usd: 113 }] },
      { id: "m3f-sar-115", nameZh: "M3F 115/080 鳴依的勉勵 SAR", nameEn: "Meloetta's Encouragement", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "115/080", rarity: "SAR", images: { large: "https://i.ibb.co/Hfp5TYnR/42aa4cea0b43063b641310a89734317c.webp" }, usdPrice: 100, priceHistory: [{ date: '3/13', usd: 90 }, { date: '3/20', usd: 105 }, { date: '3/27', usd: 100 }] },
      { id: "m3f-sar-116", nameZh: "M3F 116/080 由紫 SAR", nameEn: "Yuzu", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "116/080", rarity: "SAR", images: { large: "https://i.ibb.co/FqVWRWG0/f974a90d69343f9b98fe80c4c8c590cf.webp" }, usdPrice: 23, priceHistory: [{ date: '3/13', usd: 20 }, { date: '3/20', usd: 25 }, { date: '3/27', usd: 23 }] },
      // SR（18 張）
      { id: "m3f-sr-093", nameZh: "M3F 093/080 狙射樹梟ex SR", nameEn: "Decidueye ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "093/080", rarity: "SR", images: { large: "https://i.ibb.co/W49nLWzW/c6a4d20fa110026ec6b286674580672f-921efad6-21e2-469e-b9b2-2ad6e6982d9a.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m3f-sr-094", nameZh: "M3F 094/080 焰后蜥ex SR", nameEn: "Skeledirge ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "094/080", rarity: "SR", images: { large: "https://i.ibb.co/RkF38QRF/64c663dd0d84cf1e33e3dfa8e3a37f08-0bb230ef-323f-40c3-9b2c-77fed9715056.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m3f-sr-095", nameZh: "M3F 095/080 超級寶石海星ex SR", nameEn: "Mega Starmie ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "095/080", rarity: "SR", images: { large: "https://i.ibb.co/mVC7Lx6w/30386f26e80176c92958d88b5b34a0d8-e6a8afeb-0010-4ba5-bcc8-545bb59f5605.webp" }, usdPrice: 11.5, priceHistory: [{ date: '3/13', usd: 10 }, { date: '3/20', usd: 12 }, { date: '3/27', usd: 11.5 }] },
      { id: "m3f-sr-096", nameZh: "M3F 096/080 超級皮可西ex SR", nameEn: "Mega Clefable ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "096/080", rarity: "SR", images: { large: "https://i.ibb.co/zTsjb5CB/4e191e665b30548bf2738691c2c20924-9f5ffdd4-f78a-489d-8c7d-5461b6522df8.webp" }, usdPrice: 5, priceHistory: [{ date: '3/13', usd: 4.5 }, { date: '3/20', usd: 5.5 }, { date: '3/27', usd: 5 }] },
      { id: "m3f-sr-097", nameZh: "M3F 097/080 超級基格爾德ex SR", nameEn: "Mega Zygarde ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "097/080", rarity: "SR", images: { large: "https://i.ibb.co/hRwwWsKB/27ed496e420cfaa2e099816449116855.webp" }, usdPrice: 6.4, priceHistory: [{ date: '3/13', usd: 6 }, { date: '3/20', usd: 7 }, { date: '3/27', usd: 6.4 }] },
      { id: "m3f-sr-098", nameZh: "M3F 098/080 伊裴爾塔爾ex SR", nameEn: "Yveltal ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "098/080", rarity: "SR", images: { large: "https://i.ibb.co/dsJ0NCPD/006f7dd1cf2559ba3802c23c79a3f63f.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m3f-sr-099", nameZh: "M3F 099/080 超級盔甲鳥ex SR", nameEn: "Mega Skarmory ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "099/080", rarity: "SR", images: { large: "https://i.ibb.co/rGFBGDPx/a03062ca6be346050af3756f70129530-3a000015-c683-4f5b-b203-355492f61ad3.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m3f-sr-100", nameZh: "M3F 100/080 喵喵ex SR", nameEn: "Meowth ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "100/080", rarity: "SR", images: { large: "https://i.ibb.co/RGRWPjw2/48fa64b9455cb68e1ba47fb5aa80d7d2.webp" }, usdPrice: 25.6, priceHistory: [{ date: '3/13', usd: 23 }, { date: '3/20', usd: 27 }, { date: '3/27', usd: 25.6 }] },
      { id: "m3f-sr-101", nameZh: "M3F 101/080 能量回收器 SR", nameEn: "Energy Recycler", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "101/080", rarity: "SR", images: { large: "https://i.ibb.co/RpnG2kPM/a8fb1e6832a1cf44d7cdcaa4c8132afd.webp" }, usdPrice: 6.4, priceHistory: [{ date: '3/13', usd: 6 }, { date: '3/20', usd: 7 }, { date: '3/27', usd: 6.4 }] },
      { id: "m3f-sr-102", nameZh: "M3F 102/080 聖灰 SR", nameEn: "Sacred Ash", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "102/080", rarity: "SR", images: { large: "https://i.ibb.co/zHQ9YZZ1/5611617c3a2338930ef2e501c7994dcd-40b14508-bf55-4a30-96e0-f4cb520d45bf.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m3f-sr-103", nameZh: "M3F 103/080 寶可平板 SR", nameEn: "Poké Pad", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "103/080", rarity: "SR", images: { large: "https://i.ibb.co/cSCpC51L/e96a851d60488c1bd35161574c7bfc75.webp" }, usdPrice: 19.2, priceHistory: [{ date: '3/13', usd: 18 }, { date: '3/20', usd: 20 }, { date: '3/27', usd: 19.2 }] },
      { id: "m3f-sr-104", nameZh: "M3F 104/080 奇跡修正檔 SR", nameEn: "Miracle Correction", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "104/080", rarity: "SR", images: { large: "https://i.ibb.co/bjsHp5Yv/e01d7b1d9ffcbfaef10aa3ecf47d64b9-bf561f07-ff6b-4a6a-b18e-133cacabd2f5.webp" }, usdPrice: 6.4, priceHistory: [{ date: '3/13', usd: 6 }, { date: '3/20', usd: 7 }, { date: '3/27', usd: 6.4 }] },
      { id: "m3f-sr-105", nameZh: "M3F 105/080 塔拉剛 SR", nameEn: "Tarragon", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "105/080", rarity: "SR", images: { large: "https://i.ibb.co/JjWvVzDR/349953d29e068f18711a2886e496eaf2-c213fcc4-d861-4760-b59a-fd97dbe6aad0.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m3f-sr-106", nameZh: "M3F 106/080 琵魯 SR", nameEn: "Pyro", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "106/080", rarity: "SR", images: { large: "https://i.ibb.co/TqYXpWqM/63791995c37444d20cb089447cc06650-3b145f98-f3e1-4b04-b547-8c50cd628529.webp" }, usdPrice: 7.7, priceHistory: [{ date: '3/13', usd: 7 }, { date: '3/20', usd: 8 }, { date: '3/27', usd: 7.7 }] },
      { id: "m3f-sr-107", nameZh: "M3F 107/080 鳴依的勉勵 SR", nameEn: "Meloetta's Encouragement", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "107/080", rarity: "SR", images: { large: "https://i.ibb.co/0pc54HN9/bab768784b8fd40cbb9004320ef273a8-bd2cb8a4-7245-45dd-a065-a424bf59fb11.webp" }, usdPrice: 25.6, priceHistory: [{ date: '3/13', usd: 23 }, { date: '3/20', usd: 27 }, { date: '3/27', usd: 25.6 }] },
      { id: "m3f-sr-108", nameZh: "M3F 108/080 由紫 SR", nameEn: "Yuzu", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "108/080", rarity: "SR", images: { large: "https://i.ibb.co/xqHLfLft/bfec83051e2bdb2edd91823f21632458-153d7738-6405-4d3d-9ae0-f7cd2670703d.webp" }, usdPrice: 7.7, priceHistory: [{ date: '3/13', usd: 7 }, { date: '3/20', usd: 8 }, { date: '3/27', usd: 7.7 }] },
      { id: "m3f-sr-109", nameZh: "M3F 109/080 活力森林 SR", nameEn: "Vital Forest", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "109/080", rarity: "SR", images: { large: "https://i.ibb.co/0pCYW0F1/77376f8acc0bcbbd538508a8d0b8afb0-acabeddd-13ac-45e9-9fcd-96e18d338173.webp" }, usdPrice: 7, priceHistory: [{ date: '3/13', usd: 6.5 }, { date: '3/20', usd: 7.5 }, { date: '3/27', usd: 7 }] },
      { id: "m3f-sr-110", nameZh: "M3F 110/080 密阿雷市 SR", nameEn: "Lumiose City", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "110/080", rarity: "SR", images: { large: "https://i.ibb.co/dw8kCyzw/c470d7baf4f4c84c73675a69155dd420-91a16f5e-1a4e-48a6-b275-bd90e46e4c36.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      // AR（12 張）
      { id: "m3f-ar-081", nameZh: "M3F 081/080 粉蝶蛹 AR", nameEn: "Scatterbug AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "081/080", rarity: "AR", images: { large: "https://i.ibb.co/84RyKFPX/8c8d15f6c2c5214ce1194bcf9ca80f4a.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m3f-ar-082", nameZh: "M3F 082/080 木木梟 AR", nameEn: "Rowlet AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "082/080", rarity: "AR", images: { large: "https://i.ibb.co/tTW32Spx/7fdb0594777c27f531c288e7caf09987.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m3f-ar-083", nameZh: "M3F 083/080 烈箭鷹 AR", nameEn: "Decidueye AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "083/080", rarity: "AR", images: { large: "https://i.ibb.co/kb26DPc/0e3748c93cd8cc5b625a0be576009373.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m3f-ar-084", nameZh: "M3F 084/080 冰雪巨龍 AR", nameEn: "Glaceon AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "084/080", rarity: "AR", images: { large: "https://i.ibb.co/DHM321ZG/6fc75a8b91b540482a160e99950a428f.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m3f-ar-085", nameZh: "M3F 085/080 咚咚鼠 AR", nameEn: "Bunnelby AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "085/080", rarity: "AR", images: { large: "https://i.ibb.co/0pxGKkdW/b3bbcac43f0819603b1caa3f0a75d819-82c4149f-a227-4660-b027-0b948a3e0a83.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m3f-ar-086", nameZh: "M3F 086/080 皮皮 AR", nameEn: "Clefairy AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "086/080", rarity: "AR", images: { large: "https://i.ibb.co/N2kNZZzy/342e59bc36b10fd2bbf1bbdcbd885cbb-0eba3e83-0e42-4c8f-97ce-0d22d8bf7364.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m3f-ar-087", nameZh: "M3F 087/080 妙喵 AR", nameEn: "Meowth AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "087/080", rarity: "AR", images: { large: "https://i.ibb.co/rfpRCqcf/58360ef29e010b8dfca27b0cc6750793-91f27560-492f-494e-96d8-580bc43cccfe.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m3f-ar-088", nameZh: "M3F 088/080 大朝北鼻 AR", nameEn: "Snorlax AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "088/080", rarity: "AR", images: { large: "https://i.ibb.co/ksqLGS0p/d3a27dfe54272c615d628f5626f9e7d9-e123785a-e01f-4bd3-a9d6-c1ad692de12d.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m3f-ar-089", nameZh: "M3F 089/080 寶寶暴龍 AR", nameEn: "Tyrunt AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "089/080", rarity: "AR", images: { large: "https://i.ibb.co/BK4YV9YQ/4824aa7400d831434ee8586c5d925fb4.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m3f-ar-090", nameZh: "M3F 090/080 龍王蠍 AR", nameEn: "Drapion AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "090/080", rarity: "AR", images: { large: "https://i.ibb.co/N2fY8HJX/c5164367ca0272ee03c87302e3aad775-4a6c0b74-07d8-45eb-abdc-51f20b59394b.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m3f-ar-091", nameZh: "M3F 091/080 雙劍鞘 AR", nameEn: "Doublade AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "091/080", rarity: "AR", images: { large: "https://i.ibb.co/tM8QgRZM/2e32f0aac4c655b899b744ccdde34388.webp" }, usdPrice: 3.2, priceHistory: [{ date: '3/13', usd: 3 }, { date: '3/20', usd: 3.5 }, { date: '3/27', usd: 3.2 }] },
      { id: "m3f-ar-092", nameZh: "M3F 092/080 拉達 AR", nameEn: "Raticate AR", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "092/080", rarity: "AR", images: { large: "https://i.ibb.co/fY9dNMDH/b2e197e037667272295091cf3d2e8954-1f540ce9-4ec0-4970-8554-16edaafbea8b.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      // RR
      { id: "m3f-rr-012", nameZh: "M3F 012/080 狙射樹梟ex RR", nameEn: "Decidueye ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "012/080", rarity: "RR", images: { large: "https://i.ibb.co/Wpp6rQXW/e666a32155a6bca116a8719fdc7649f1.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m3f-rr-016", nameZh: "M3F 016/080 焰后蜥ex RR", nameEn: "Skeledirge ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "016/080", rarity: "RR", images: { large: "https://i.ibb.co/PG1bp9M4/84af5191e3e1c68dc8f02caf47257a27.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m3f-rr-021", nameZh: "M3F 021/080 超級寶石海星ex RR", nameEn: "Mega Starmie ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "021/080", rarity: "RR", images: { large: "https://i.ibb.co/4whGW7Pr/78c81fb883a8bb1cdda603a4f822b654-4487e5e7-a9bd-42f4-8f75-a7cc23577e68.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.4 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m3f-rr-030", nameZh: "M3F 030/080 超級皮可西ex RR", nameEn: "Mega Clefable ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "030/080", rarity: "RR", images: { large: "https://i.ibb.co/pBGMMdzM/3af26b0f1ee9e37c2ab4112e0f3b8443.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m3f-rr-046", nameZh: "M3F 046/080 超級基格爾德ex RR", nameEn: "Mega Zygarde ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "046/080", rarity: "RR", images: { large: "https://i.ibb.co/g8cQMzY/ae1946fb67f6fb1d4a344e69f4a0f42f-671e09fd-b337-46ee-bd30-37bfe1a2d402.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m3f-rr-052", nameZh: "M3F 052/080 伊裴爾塔爾ex RR", nameEn: "Yveltal ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "052/080", rarity: "RR", images: { large: "https://i.ibb.co/LXJLcrMN/4332478db6ade514a4c5f3cea97b0d86.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m3f-rr-054", nameZh: "M3F 054/080 超級盔甲鳥ex RR", nameEn: "Mega Skarmory ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "054/080", rarity: "RR", images: { large: "https://i.ibb.co/v6Nv1k18/d8a43ac250470d33f4d4090b36369d6f.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m3f-rr-061", nameZh: "M3F 061/080 喵喵ex RR", nameEn: "Meowth ex", set: { name: "[M3F] 虛無歸零 繁中版" }, number: "061/080", rarity: "RR", images: { large: "https://i.ibb.co/MxBGSXRd/b968ffe94e72da72e26a6cc07aca6cde-5815de70-ab98-4ecb-9313-9121132cbdf4.webp" }, usdPrice: 7.7, priceHistory: [{ date: '3/13', usd: 7 }, { date: '3/20', usd: 8 }, { date: '3/27', usd: 7.7 }] },
// MUR
      { id: "m4f-120-mur", nameZh: "M4F 120/083 超級甲賀忍蛙 ex MUR", nameEn: "Mega Greninja ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "120/083", rarity: "MUR", images: { large: "https://i.ibb.co/TqRhjzMd/mur.jpg" }, usdPrice: 254, priceHistory: [{ date: '3/13', usd: 220 }, { date: '3/20', usd: 240 }, { date: '3/27', usd: 254 }] },
      // SAR
      { id: "m4f-sar-114", nameZh: "M4F 114/083 超級甲賀忍蛙 ex SAR", nameEn: "Mega Greninja ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "114/083", rarity: "SAR", images: { large: "https://i.ibb.co/Qv4wG8L0/5bb60106330a81d76d9b42e392a73a3e.webp" }, usdPrice: 190, priceHistory: [{ date: '3/13', usd: 160 }, { date: '3/20', usd: 185 }, { date: '3/27', usd: 190 }] },
      { id: "m4f-sar-115", nameZh: "M4F 115/083 超級花葉蒂 ex SAR", nameEn: "Mega Floragato ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "115/083", rarity: "SAR", images: { large: "https://i.ibb.co/Dfxh5n7W/900b2b36d4f11898ea09b594cc835f02.webp" }, usdPrice: 19, priceHistory: [{ date: '3/13', usd: 18 }, { date: '3/20', usd: 20 }, { date: '3/27', usd: 19 }] },
      { id: "m4f-sar-116", nameZh: "M4F 116/083 超級毒藻龍 ex SAR", nameEn: "Mega Dragalge ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "116/083", rarity: "SAR", images: { large: "https://i.ibb.co/gZGtDkFQ/33497104546588c9f8ddc593cc13948f-2a6fed62-9149-4f5a-a554-9a62051a07d7.webp" }, usdPrice: 25, priceHistory: [{ date: '3/13', usd: 22 }, { date: '3/20', usd: 28 }, { date: '3/27', usd: 25 }] },
      { id: "m4f-sar-117", nameZh: "M4F 117/083 超級火炎獅 ex SAR", nameEn: "Mega Pyroar ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "117/083", rarity: "SAR", images: { large: "https://i.ibb.co/VY3HW36s/c0946a13837da9fb31322615442bc7bf.webp" }, usdPrice: 22, priceHistory: [{ date: '3/13', usd: 20 }, { date: '3/20', usd: 24 }, { date: '3/27', usd: 22 }] },
      { id: "m4f-sar-118", nameZh: "M4F 118/083 M4F 118/083 AZ的平和 SAR", nameEn: "Gourgeist ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "118/083", rarity: "SAR", images: { large: "https://i.ibb.co/gFrVzBYs/fb34774b0b3118b7ccbe8b2674dbcc1e.webp" }, usdPrice: 18, priceHistory: [{ date: '3/13', usd: 16 }, { date: '3/20', usd: 20 }, { date: '3/27', usd: 18 }] },
      { id: "m4f-sar-119", nameZh: "M4F 119/083 霍米加的演奏 SAR", nameEn: "Homi's Performance", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "119/083", rarity: "SAR", images: { large: "https://i.ibb.co/hJnm6pZ7/f07d245ca4b5a76f71c68c590c181d50.webp" }, usdPrice: 19.2, priceHistory: [{ date: '3/13', usd: 17 }, { date: '3/20', usd: 19 }, { date: '3/27', usd: 19.2 }] },
      // SR（18 張，已完整加入你提供的名稱與圖片）
      { id: "m4f-sr-096", nameZh: "M4F 096/083 大針蜂ex SR", nameEn: "Mega Beedrill ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "096/083", rarity: "SR", images: { large: "https://i.ibb.co/fd8sqMc4/6f4c866a0997b6921b494d0086a39162-7e8e6cac-9d56-4925-ac7d-6fec853be865.webp" }, usdPrice: 10, priceHistory: [{ date: '3/13', usd: 9 }, { date: '3/20', usd: 11 }, { date: '3/27', usd: 10 }] },
      { id: "m4f-sr-097", nameZh: "M4F 097/083 超級火炎獅ex SR", nameEn: "Mega Pyroar ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "097/083", rarity: "SR", images: { large: "https://i.ibb.co/hxXyjQL3/a4d5138fc8e3ebd4eed14f63233053a9-2407d8af-5b1e-4d1e-93c0-e661b921dbee.webp" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
      { id: "m4f-sr-098", nameZh: "M4F 098/083 超級甲賀忍蛙ex SR", nameEn: "Mega Greninja ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "098/083", rarity: "SR", images: { large: "https://i.ibb.co/C5xMZp7F/c328be53b1c74e07e17ddcd32f87da2b.webp" }, usdPrice: 23, priceHistory: [{ date: '3/13', usd: 20 }, { date: '3/20', usd: 25 }, { date: '3/27', usd: 23 }] },
      { id: "m4f-sr-099", nameZh: "M4F 099/083 超級花葉蒂ex SR", nameEn: "Mega Floragato ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "099/083", rarity: "SR", images: { large: "https://i.ibb.co/mCpxrKj1/7cc4ecde4d4db8bbf1af682ea9e1edbe-171965a5-2b52-47b1-9c11-ee16d374782a.webp" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
      { id: "m4f-sr-100", nameZh: "M4F 100/083 南瓜怪人ex SR", nameEn: "Gourgeist ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "100/083", rarity: "SR", images: { large: "https://i.ibb.co/bg6GKgtg/998414de9524eeeba5377591fc1fc08b.webp" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
      { id: "m4f-sr-101", nameZh: "M4F 101/083 勾帕路翁ex SR", nameEn: "Cobalion ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "101/083", rarity: "SR", images: { large: "https://i.ibb.co/7xyxbtw9/b0942aa49742ca1f10b6c1ff0946e17b-fc2e5102-2d67-4713-8adf-6a38e396ce11.webp" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
      { id: "m4f-sr-102", nameZh: "M4F 102/083 超級毒藻龍ex SR", nameEn: "Mega Dragalge ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "102/083", rarity: "SR", images: { large: "https://i.ibb.co/HTB8df9D/ae9e0e3e22e59e3ca8822cfca7193ad4-350c0939-0236-4d20-b1f2-55eda920c4bb.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m4f-sr-103", nameZh: "M4F 103/083 奇諾栗鼠ex SR", nameEn: "Mega Cinccino ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "103/083", rarity: "SR", images: { large: "https://i.ibb.co/tMGsL4qP/6ce274b77b5a6bb8d3699842e7a456c7.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m4f-sr-104", nameZh: "M4F 104/083 能量超級回收 SR", nameEn: "Energy Recycle", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "104/083", rarity: "SR", images: { large: "https://i.ibb.co/4nrnNCc4/b806eefb3c12c50d7e7e62ab6616a60a.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m4f-sr-105", nameZh: "M4F 105/083 超大冰淇淋 SR", nameEn: "Big Ice Cream", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "105/083", rarity: "SR", images: { large: "https://i.ibb.co/BKcvqpN0/150417a31549f585022c3ddc10a00871-dfeb76d8-aa57-4535-924f-2d4b8da3c712.webp" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
      { id: "m4f-sr-106", nameZh: "M4F 106/083 特殊紅牌 SR", nameEn: "Special Red Card", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "106/083", rarity: "SR", images: { large: "https://i.ibb.co/1Yk6fmhJ/aa9dffb81b4e57649f83597cd0aa3d7d-a93e2f87-f4b7-42c0-b903-99be993fe4a3.webp" }, usdPrice: 15, priceHistory: [{ date: '3/13', usd: 14 }, { date: '3/20', usd: 16 }, { date: '3/27', usd: 15 }] },
      { id: "m4f-sr-107", nameZh: "M4F 107/083 道具拆除器 SR", nameEn: "Tool Remover", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "107/083", rarity: "SR", images: { large: "https://i.ibb.co/yc6W7v54/ff0e04971cd92f0b499eba0294f88a8f-5f1d98f2-0357-4328-b62f-edf555b9f57f.webp" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
      { id: "m4f-sr-108", nameZh: "M4F 108/083 AZ的平和 SR", nameEn: "AZ's Peace", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "108/083", rarity: "SR", images: { large: "https://i.ibb.co/pjGmGH4p/d3d13b06bec5c609fcf029b64f2bca77-95b7341c-2486-4b19-a096-dba39d4a7c11.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m4f-sr-109", nameZh: "M4F 109/083 吉普索 SR", nameEn: "Gypso", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "109/083", rarity: "SR", images: { large: "https://i.ibb.co/svynhrkg/d13ba579d3cfd2296937f1f2031a5490.webp" }, usdPrice: 7, priceHistory: [{ date: '3/13', usd: 6.5 }, { date: '3/20', usd: 7.5 }, { date: '3/27', usd: 7 }] },
      { id: "m4f-sr-110", nameZh: "M4F 110/083 霍米加的演奏 SR", nameEn: "Homi's Performance", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "110/083", rarity: "SR", images: { large: "https://i.ibb.co/x8GcJDm7/089aff076f0117af64c503fcab04825a-65326f16-5a11-4376-bd2a-93614c7a74b4.webp" }, usdPrice: 7, priceHistory: [{ date: '3/13', usd: 6.5 }, { date: '3/20', usd: 7.5 }, { date: '3/27', usd: 7 }] },
      { id: "m4f-sr-111", nameZh: "M4F 111/083 瑪琪艾兒 SR", nameEn: "Magearna", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "111/083", rarity: "SR", images: { large: "https://i.ibb.co/WSq5FT9/8b31e9e35aa24a1cf19f5b6d21d9d48b-512a90db-35ec-4864-a222-77edebe8643d.webp" }, usdPrice: 10, priceHistory: [{ date: '3/13', usd: 9 }, { date: '3/20', usd: 11 }, { date: '3/27', usd: 10 }] },
      { id: "m4f-sr-112", nameZh: "M4F 112/083 衝浪海灘 SR", nameEn: "Surfing Beach", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "112/083", rarity: "SR", images: { large: "https://i.ibb.co/1Y9cRzsG/402ea2a79e39c0d7cb095456f2296dcf-12d0401b-7040-40d2-b120-01175faaa433.webp" }, usdPrice: 5, priceHistory: [{ date: '3/13', usd: 4.5 }, { date: '3/20', usd: 5.5 }, { date: '3/27', usd: 5 }] },
      { id: "m4f-sr-113", nameZh: "M4F 113/083 稜鏡塔 SR", nameEn: "Prism Tower", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "113/083", rarity: "SR", images: { large: "https://i.ibb.co/S4qHX0Df/af344d7d92bfee64c9ee034b0626aefd-03610506-c764-459c-a537-dbb59211fa07.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      // AR
      { id: "m4f-ar-084", nameZh: "M4F 084/083 哈力栗 AR", nameEn: "Chespin AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "084/083", rarity: "AR", images: { large: "https://i.ibb.co/HDhyVZSJ/5e392aa15bd54ef6aa94f39274d030b3-c1621fac-38ed-4077-a919-a8d2651b72bc.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m4f-ar-085", nameZh: "M4F 085/083 火狐狸 AR", nameEn: "Fennekin AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "085/083", rarity: "AR", images: { large: "https://i.ibb.co/q3By87mg/77dc172743c97478f1c3c28d2fb0d1cf-d27f9cc7-220c-427b-a162-2fb47d11cc16.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m4f-ar-086", nameZh: "M4F 086/083 呱呱泡蛙 AR", nameEn: "Froakie AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "086/083", rarity: "AR", images: { large: "https://i.ibb.co/sp2ngjnd/5a2cc6a77da7c1a05a65a3529721a4df-e8062ae1-5865-484c-8f54-c2f6d44bc758.webp" }, usdPrice: 5.1, priceHistory: [{ date: '3/13', usd: 4.5 }, { date: '3/20', usd: 5.5 }, { date: '3/27', usd: 5.1 }] },
      { id: "m4f-ar-087", nameZh: "M4F 087/083 呱頭蛙 AR", nameEn: "Frogadier AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "087/083", rarity: "AR", images: { large: "https://i.ibb.co/Kx2kT4wD/9cb6d64f018aeb59f58a3be83fbe406c.webp" }, usdPrice: 3.8, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4 }, { date: '3/27', usd: 3.8 }] },
      { id: "m4f-ar-088", nameZh: "M4F 088/083 電龍 AR", nameEn: "Ampharos AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "088/083", rarity: "AR", images: { large: "https://i.ibb.co/VYz5Cj2c/1a374c431e21f3a65162fe31cbe4f896-4981964b-504d-464d-995d-098b8d30f18e.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m4f-ar-089", nameZh: "M4F 089/083 哲爾尼亞斯 AR", nameEn: "Xerneas AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "089/083", rarity: "AR", images: { large: "https://i.ibb.co/S9StxR7/7c07b547f047d7e96f68b515e9133aa4-cac47e80-311f-4cb2-baa8-af4e72cd2857.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m4f-ar-090", nameZh: "M4F 090/083 念力土偶 AR", nameEn: "Claydol AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "090/083", rarity: "AR", images: { large: "https://i.ibb.co/7Jw3TDsj/5566324f1750b0a22de839973df86726.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m4f-ar-091", nameZh: "M4F 091/083 叉字蝠 AR", nameEn: "Crobat AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "091/083", rarity: "AR", images: { large: "https://i.ibb.co/zTr6L0BP/925a81311e333e2b2fa232e7ae142e88-c965a4d0-567b-42a5-b9a5-a89dc12b184f.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m4f-ar-092", nameZh: "M4F 092/083 金屬怪 AR", nameEn: "Metang AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "092/083", rarity: "AR", images: { large: "https://i.ibb.co/n8M4LVfs/80857ecf90037ec96349722bcd7b0f7a-185bbff3-a27e-484f-8bf1-63375cd8bf45.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m4f-ar-093", nameZh: "M4F 093/083 黏美兒 AR", nameEn: "Goomy AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "093/083", rarity: "AR", images: { large: "https://i.ibb.co/gLSL0tJ7/842b208d43ca04349cb055fc31ba64f5-555bc350-6ace-4960-a0fe-84ac6e11fedd.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m4f-ar-094", nameZh: "M4F 094/083 肯泰羅 AR", nameEn: "Tauros AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "094/083", rarity: "AR", images: { large: "https://i.ibb.co/Q3gSzWVP/8119c29333091b4e22aa81894f14d9b5-c8451a9e-ff4c-473d-9814-4e4007ef5b23.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m4f-ar-095", nameZh: "M4F 095/083 步哨鼠 AR", nameEn: "Sentret AR", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "095/083", rarity: "AR", images: { large: "https://i.ibb.co/nMVbkvbw/e0528a9eba4f1844f9c251842f1cc739-be901533-6e50-4b2f-8aa6-939a0148b1f3.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      // RR
      { id: "m4f-rr-003", nameZh: "M4F 003/083 大針蜂ex RR", nameEn: "Beedrill ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "003/083", rarity: "RR", images: { large: "https://i.ibb.co/GfmZ20n9/tw00018423.png" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
      { id: "m4f-rr-015", nameZh: "M4F 015/083 超級火炎獅ex RR", nameEn: "Mega Pyroar ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "015/083", rarity: "RR", images: { large: "https://i.ibb.co/849F1MyY/tw00018435.png" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
      { id: "m4f-rr-022", nameZh: "M4F 022/083 超級甲賀忍蛙ex RR", nameEn: "Mega Greninja ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "022/083", rarity: "RR", images: { large: "https://i.ibb.co/nN91Z8zn/tw00018442.png" }, usdPrice: 6.4, priceHistory: [{ date: '3/13', usd: 5.5 }, { date: '3/20', usd: 7 }, { date: '3/27', usd: 6.4 }] },
      { id: "m4f-rr-035", nameZh: "M4F 035/083 超級花葉蒂ex RR", nameEn: "Mega Floragato ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "035/083", rarity: "RR", images: { large: "https://i.ibb.co/KcY5Xc7K/tw00018455.png" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
      { id: "m4f-rr-041", nameZh: "M4F 041/083 南瓜怪人ex RR", nameEn: "Gourgeist ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "041/083", rarity: "RR", images: { large: "https://i.ibb.co/XRF1Gvx/tw00018461.png" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
      { id: "m4f-rr-062", nameZh: "M4F 062/083 勾帕路翁ex RR", nameEn: "Cobalion ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "062/083", rarity: "RR", images: { large: "https://i.ibb.co/H9jdhqv/tw00018482.png" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
      { id: "m4f-rr-063", nameZh: "M4F 063/083 超級毒藻龍ex RR", nameEn: "Mega Dragalge ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "063/083", rarity: "RR", images: { large: "https://i.ibb.co/QF1j9wnv/tw00018483.png" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
      { id: "m4f-rr-071", nameZh: "M4F 071/083 奇諾栗鼠ex RR", nameEn: "Cinccino ex", set: { name: "[M4F] 忍者飛旋 繁中版" }, number: "071/083", rarity: "RR", images: { large: "https://i.ibb.co/KjrYNLZR/tw00018491.png" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },

      // ==================== [M2aF] 超級進化夢想ex ====================

      // MUR
      { id: "m2af-mur-250", nameZh: "M2aF 250/193 超級快龍ex MUR", nameEn: "Mega Dragonite ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "250/193", rarity: "MUR", images: { large: "https://i.ibb.co/Xfcmb41x/4c7ae58de90216572846fbb68b9d6d91.webp" }, usdPrice: 164, priceHistory: [{ date: '3/13', usd: 150 }, { date: '3/20', usd: 170 }, { date: '3/27', usd: 164 }] },

      // SAR (第1~17張)
      { id: "m2af-sar-233", nameZh: "M2aF 233/193 超級雪妖女ex SAR", nameEn: "Mega Froslass ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "233/193", rarity: "SAR", images: { large: "https://i.ibb.co/qL70PbcR/f05bd0552f972fc577c2d3fd42650267.webp" }, usdPrice: 25.6, priceHistory: [{ date: '3/13', usd: 24 }, { date: '3/20', usd: 27 }, { date: '3/27', usd: 25.6 }] },
      { id: "m2af-sar-234", nameZh: "M2aF 234/193 皮卡丘ex SAR", nameEn: "Pikachu ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "234/193", rarity: "SAR", images: { large: "https://i.ibb.co/N6C0YbtW/9c51c8e3a1d99481446630987f0fdf4a-f045b362-aedc-4e6f-b085-540fd5991a49.webp" }, usdPrice: 125.6, priceHistory: [{ date: '3/13', usd: 110 }, { date: '3/20', usd: 130 }, { date: '3/27', usd: 125.6 }] },
      { id: "m2af-sar-235", nameZh: "M2aF 235/193 超級麻麻鰻魚王ex SAR", nameEn: "Mega Eelektross ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "235/193", rarity: "SAR", images: { large: "https://i.ibb.co/99nzQgKg/a7a2aabdabb6ee33c90a553c24a87b5f.webp" }, usdPrice: 15.4, priceHistory: [{ date: '3/13', usd: 14 }, { date: '3/20', usd: 16 }, { date: '3/27', usd: 15.4 }] },
      { id: "m2af-sar-236", nameZh: "M2aF 236/193 奇樹的電肚蛙ex SAR", nameEn: "Bellibolt ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "236/193", rarity: "SAR", images: { large: "https://i.ibb.co/DDGksgrs/dee659d2392673b9dee78b32ab113d8b.webp" }, usdPrice: 44.9, priceHistory: [{ date: '3/13', usd: 40 }, { date: '3/20', usd: 47 }, { date: '3/27', usd: 44.9 }] },
      { id: "m2af-sar-237", nameZh: "M2aF 237/193 火箭隊的超夢ex SAR", nameEn: "Team Rocket's Mewtwo ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "237/193", rarity: "SAR", images: { large: "https://i.ibb.co/QvWNg7vV/6329645c04c3a3e1c3bff3561c48d237-27986959-189d-4503-8263-265468d6af20.webp" }, usdPrice: 61.5, priceHistory: [{ date: '3/13', usd: 55 }, { date: '3/20', usd: 65 }, { date: '3/27', usd: 61.5 }] },
      { id: "m2af-sar-238", nameZh: "M2aF 238/193 超級蒂安希ex SAR", nameEn: "Mega Diancie ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "238/193", rarity: "SAR", images: { large: "https://i.ibb.co/6cNZQGhv/ec5fd274fa337567e3a822f622515fba.webp" }, usdPrice: 35.9, priceHistory: [{ date: '3/13', usd: 32 }, { date: '3/20', usd: 38 }, { date: '3/27', usd: 35.9 }] },
      { id: "m2af-sar-239", nameZh: "M2aF 239/193 超級摔角鷹人ex SAR", nameEn: "Mega Hawlucha ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "239/193", rarity: "SAR", images: { large: "https://i.ibb.co/YTNBqdC4/77352391fbb5566d2d0114e38be10100-19484da1-3f07-44d1-90f7-fc396a100ef4.webp" }, usdPrice: 10.3, priceHistory: [{ date: '3/13', usd: 9 }, { date: '3/20', usd: 11 }, { date: '3/27', usd: 10.3 }] },
      { id: "m2af-sar-240", nameZh: "M2aF 240/193 超級耿鬼ex SAR", nameEn: "Mega Gengar ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "240/193", rarity: "SAR", images: { large: "https://i.ibb.co/7tqZQbS9/d87d1214cb24bf5d26c7addc9cfff775.webp" }, usdPrice: 125.6, priceHistory: [{ date: '3/13', usd: 110 }, { date: '3/20', usd: 130 }, { date: '3/27', usd: 125.6 }] },
      { id: "m2af-sar-241", nameZh: "M2aF 241/193 超級頭巾混混ex SAR", nameEn: "Mega Throh ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "241/193", rarity: "SAR", images: { large: "https://i.ibb.co/HTLMdVzq/ebc204aea5a25f13d5259d4456a8015d-b46e8be5-429a-4142-a30c-f932880f125a.webp" }, usdPrice: 10.3, priceHistory: [{ date: '3/13', usd: 9 }, { date: '3/20', usd: 11 }, { date: '3/27', usd: 10.3 }] },
      { id: "m2af-sar-242", nameZh: "M2aF 242/193 N的索羅亞克ex SAR", nameEn: "N's Zoroark ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "242/193", rarity: "SAR", images: { large: "https://i.ibb.co/wN3z9svL/5317ece9eb7c3b2a532890e34bfa40ee-678bc4b0-85e7-4fa7-b781-e087beb73228.webp" }, usdPrice: 61.5, priceHistory: [{ date: '3/13', usd: 55 }, { date: '3/20', usd: 65 }, { date: '3/27', usd: 61.5 }] },
      { id: "m2af-sar-243", nameZh: "M2aF 243/193 瑪俐的長毛巨魔ex SAR", nameEn: "Marnie's Grimmsnarl ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "243/193", rarity: "SAR", images: { large: "https://i.ibb.co/fPG2Vwq/7e9ab1b30a20b74afe9247b46f4a5e5b-11adf33d-1a1f-444c-8110-03ca7ca605cd.webp" }, usdPrice: 74.4, priceHistory: [{ date: '3/13', usd: 65 }, { date: '3/20', usd: 78 }, { date: '3/27', usd: 74.4 }] },
      { id: "m2af-sar-244", nameZh: "M2aF 244/193 吉雉雞ex SAR", nameEn: "Gallade ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "244/193", rarity: "SAR", images: { large: "https://i.ibb.co/NgLzjZM4/0a7fa079b1978819920423a293370afb-420c4f0a-67e0-4626-9e53-4c964486382e.webp" }, usdPrice: 61.5, priceHistory: [{ date: '3/13', usd: 55 }, { date: '3/20', usd: 65 }, { date: '3/27', usd: 61.5 }] },
      { id: "m2af-sar-245", nameZh: "M2aF 245/193 大吾的巨金怪ex SAR", nameEn: "Steven's Metagross ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "245/193", rarity: "SAR", images: { large: "https://i.ibb.co/4wQPKDG0/53d0cf306f1c006e78cbdcdd75950b72.webp" }, usdPrice: 35.9, priceHistory: [{ date: '3/13', usd: 32 }, { date: '3/20', usd: 38 }, { date: '3/27', usd: 35.9 }] },
      { id: "m2af-sar-246", nameZh: "M2aF 246/193 超級快龍ex SAR", nameEn: "Mega Dragonite ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "246/193", rarity: "SAR", images: { large: "https://i.ibb.co/G4q92v2C/72ed315f46ee69c8d0c33cee9a978ef6-bfd6f2ef-ed9b-49df-a0ec-e1b2b440939b.webp" }, usdPrice: 125.6, priceHistory: [{ date: '3/13', usd: 110 }, { date: '3/20', usd: 130 }, { date: '3/27', usd: 125.6 }] },
      { id: "m2af-sar-247", nameZh: "M2aF 247/193 艾莉絲的鬥志 SAR", nameEn: "Iris's Fighting Spirit", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "247/193", rarity: "SAR", images: { large: "https://i.ibb.co/Wvs9Rzhx/c8a3110bd3e699794a64833f035973d5.webp" }, usdPrice: 25.6, priceHistory: [{ date: '3/13', usd: 24 }, { date: '3/20', usd: 27 }, { date: '3/27', usd: 25.6 }] },
      { id: "m2af-sar-248", nameZh: "M2aF 248/193 卡娜莉 SAR", nameEn: "Korrina", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "248/193", rarity: "SAR", images: { large: "https://i.ibb.co/3y2JYDgB/5dc12ab24fb5af0d94487264eb983536-119079a4-61f4-47d0-897c-7723e0a453cb.webp" }, usdPrice: 61.5, priceHistory: [{ date: '3/13', usd: 55 }, { date: '3/20', usd: 65 }, { date: '3/27', usd: 61.5 }] },
      { id: "m2af-sar-249", nameZh: "M2aF 249/193 衝浪手 SAR", nameEn: "Surfer", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "249/193", rarity: "SAR", images: { large: "https://i.ibb.co/b5Gr0pxq/064650d2593d67f752a16cf1db42064f-88f9fd55-ded3-4cf2-8d6f-d67b7e1ca670.webp" }, usdPrice: 7.7, priceHistory: [{ date: '3/13', usd: 7 }, { date: '3/20', usd: 8 }, { date: '3/27', usd: 7.7 }] },

       // MA
      { id: "m2af-ma-223", nameZh: "M2aF 223/193 超級噴火龍Xex MA", nameEn: "Mega Charizard X ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "223/193", rarity: "MA", images: { large: "https://i.ibb.co/8gVbtfHC/4b0ef6b30c0ccee391eb7553191c87e2-6778a2f9-adeb-4fb0-a443-8391f54108ff.webp" }, usdPrice: 25.6, priceHistory: [{ date: '3/13', usd: 24 }, { date: '3/20', usd: 27 }, { date: '3/27', usd: 25.6 }] },
      { id: "m2af-ma-224", nameZh: "M2aF 224/193 超級雪妖女ex MA", nameEn: "Mega Froslass ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "224/193", rarity: "MA", images: { large: "https://i.ibb.co/ds9F0T19/6f47b6501b61e50e5010e7f419f4031d-c9ffca94-5e2a-4a19-b19f-b6adabe78edb.webp" }, usdPrice: 5.1, priceHistory: [{ date: '3/13', usd: 5 }, { date: '3/20', usd: 5.5 }, { date: '3/27', usd: 5.1 }] },
      { id: "m2af-ma-225", nameZh: "M2aF 225/193 超級麻麻鰻魚王ex MA", nameEn: "Mega Eelektross ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "225/193", rarity: "MA", images: { large: "https://i.ibb.co/chbVYhCH/f5683958ab95664064c47fd57aa717d7-cf701723-1919-40a7-86c1-5977cf4148b2.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m2af-ma-226", nameZh: "M2aF 226/193 超級沙奈朵ex MA", nameEn: "Mega Gardevoir ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "226/193", rarity: "MA", images: { large: "https://i.ibb.co/KxxjWJFg/019c39a2eb3650b39cba225f6daf26b8.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m2af-ma-227", nameZh: "M2aF 227/193 超級蒂安希ex MA", nameEn: "Mega Diancie ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "227/193", rarity: "MA", images: { large: "https://i.ibb.co/PvkqTYTq/6d5dbf5aab8d14a3ef369d997c8a0d6d.webp" }, usdPrice: 6.4, priceHistory: [{ date: '3/13', usd: 6 }, { date: '3/20', usd: 7 }, { date: '3/27', usd: 6.4 }] },
      { id: "m2af-ma-228", nameZh: "M2aF 228/193 超級路卡利歐ex MA", nameEn: "Mega Lucario ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "228/193", rarity: "MA", images: { large: "https://i.ibb.co/MDS1dqbq/5010b107bb764bc2cc047974e84fe0ed-bbf966f4-a1be-4725-97cb-d416eb77372b.webp" }, usdPrice: 10.3, priceHistory: [{ date: '3/13', usd: 9 }, { date: '3/20', usd: 11 }, { date: '3/27', usd: 10.3 }] },
      { id: "m2af-ma-229", nameZh: "M2aF 229/193 超級摔角鷹人ex MA", nameEn: "Mega Hawlucha ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "229/193", rarity: "MA", images: { large: "https://i.ibb.co/8DWkKX15/53ad74022086dac487713e5148671467-e62003a5-84c8-436e-9988-2f6dd8cc8b21.webp" }, usdPrice: 3.8, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4 }, { date: '3/27', usd: 3.8 }] },
      { id: "m2af-ma-230", nameZh: "M2aF 230/193 超級耿鬼ex MA", nameEn: "Mega Gengar ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "230/193", rarity: "MA", images: { large: "https://i.ibb.co/0yHG2RGG/73d30300971193380cde0bf27b4fb183-dd507955-eed2-447a-bc2f-23e9c4fd9a65.webp" }, usdPrice: 11.5, priceHistory: [{ date: '3/13', usd: 10 }, { date: '3/20', usd: 12 }, { date: '3/27', usd: 11.5 }] },
      { id: "m2af-ma-231", nameZh: "M2aF 231/193 超級頭巾混混ex MA", nameEn: "Mega Throh ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "231/193", rarity: "MA", images: { large: "https://i.ibb.co/n8YYXShH/9982df681d4b41075d77a5cb4c80dcd4.webp" }, usdPrice: 3.8, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4 }, { date: '3/27', usd: 3.8 }] },
      { id: "m2af-ma-232", nameZh: "M2aF 232/193 超級快龍ex MA", nameEn: "Mega Dragonite ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "232/193", rarity: "MA", images: { large: "https://i.ibb.co/NdNwdRWD/7b5313449633ec043927d81809af86b0-f15d100d-d99c-4afe-b2e9-c402a29c85a4.webp" }, usdPrice: 9, priceHistory: [{ date: '3/13', usd: 8 }, { date: '3/20', usd: 9.5 }, { date: '3/27', usd: 9 }] },

            // SR
      { id: "m2af-sr-214", nameZh: "M2aF 214/193 N的PP提升劑 SR", nameEn: "N's PP Up", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "214/193", rarity: "SR", images: { large: "https://i.ibb.co/HfxWmgv5/ab0c175a374a9a3c2d234fa0c7b0b678-e033f8a5-5553-467f-af33-76d5a3474a24.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m2af-sr-215", nameZh: "M2aF 215/193 玻璃喇叭 SR", nameEn: "Glass Trumpet", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "215/193", rarity: "SR", images: { large: "https://i.ibb.co/7xVcfhcm/7056196c01ade76fa30fbe6541bc4818-c8b41bf7-9115-4008-b3cd-5e70bd41b53a.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m2af-sr-216", nameZh: "M2aF 216/193 高級球 SR", nameEn: "Ultra Ball", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "216/193", rarity: "SR", images: { large: "https://i.ibb.co/fVKw7tFz/3f2141f9d7b626827e00aab2b6c90b4a-91c3d174-a49f-4644-8bfb-45fffce44621.webp" }, usdPrice: 15.4, priceHistory: [{ date: '3/13', usd: 14 }, { date: '3/20', usd: 16 }, { date: '3/27', usd: 15.4 }] },
      { id: "m2af-sr-217", nameZh: "M2aF 217/193 火箭隊的接收器 SR", nameEn: "Team Rocket's Receiver", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "217/193", rarity: "SR", images: { large: "https://i.ibb.co/Y41Nw4KH/0c5601c7197c91eb6fb0cfbff1d64d1b.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m2af-sr-218", nameZh: "M2aF 218/193 反擊增幅器 SR", nameEn: "Counter Booster", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "218/193", rarity: "SR", images: { large: "https://i.ibb.co/q39BLWjt/0fa22fc52715a7fc2324f52d4135ad7e-31400b58-5bfa-4648-be97-e86490ab88fd.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m2af-sr-219", nameZh: "M2aF 219/193 卡娜莉 SR", nameEn: "Korrina", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "219/193", rarity: "SR", images: { large: "https://i.ibb.co/1Y4Rm7Ph/d6068cd3c8daf81a08684a3d013ad839.webp" }, usdPrice: 19.2, priceHistory: [{ date: '3/13', usd: 18 }, { date: '3/20', usd: 20 }, { date: '3/27', usd: 19.2 }] },
      { id: "m2af-sr-220", nameZh: "M2aF 220/193 空手道王的演練 SR", nameEn: "Karate King's Training", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "220/193", rarity: "SR", images: { large: "https://i.ibb.co/jvrzZyH8/a56d1ffebfc9234528cf09aca8dbef09-77ee7dc2-3087-49d5-862e-51192c70fa05.webp" }, usdPrice: 6.4, priceHistory: [{ date: '3/13', usd: 6 }, { date: '3/20', usd: 7 }, { date: '3/27', usd: 6.4 }] },
      { id: "m2af-sr-221", nameZh: "M2aF 221/193 巴貝娜與荷蓮娜 SR", nameEn: "Bellibolt & Lilligant", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "221/193", rarity: "SR", images: { large: "https://i.ibb.co/DfFchzY7/c6314922d0ccc9d72a56944f1c8fca02-029faa15-467b-4523-a02b-9e7c539fdba5.webp" }, usdPrice: 5.1, priceHistory: [{ date: '3/13', usd: 5 }, { date: '3/20', usd: 5.5 }, { date: '3/27', usd: 5.1 }] },
      { id: "m2af-sr-222", nameZh: "M2aF 222/193 阻礙之塔 SR", nameEn: "Obstructing Tower", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "222/193", rarity: "SR", images: { large: "https://i.ibb.co/JRDSvmtX/17cbd382180177028094981a063c0e35.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },

            // AR
      { id: "m2af-ar-194", nameZh: "M2aF 194/193 狩獵鳳蝶 AR", nameEn: "Vivillon AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "194/193", rarity: "AR", images: { large: "https://i.ibb.co/Wp3DMQpw/dcc66e51aee2a4a79b721fdfa627a73e-429cc47f-667f-4a00-8780-9acbddb7ffe8.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-ar-195", nameZh: "M2aF 195/193 毒粉蛾 AR", nameEn: "Venomoth AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "195/193", rarity: "AR", images: { large: "https://i.ibb.co/FbTPP2Fh/5a0fa46963148537a633d8c43f9bdd46.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-ar-196", nameZh: "M2aF 196/193 含羞苞 AR", nameEn: "Cherubi AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "196/193", rarity: "AR", images: { large: "https://i.ibb.co/L78PyP1/545f62fe8319f027c05f6dd2a618c63c-11d7a4ab-13a4-48b0-b8a2-2d21119ca369.webp" }, usdPrice: 10.3, priceHistory: [{ date: '3/13', usd: 9 }, { date: '3/20', usd: 11 }, { date: '3/27', usd: 10.3 }] },
      { id: "m2af-ar-197", nameZh: "M2aF 197/193 阿響的熔岩蝸牛 AR", nameEn: "Slugma AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "197/193", rarity: "AR", images: { large: "https://i.ibb.co/Jjpcn3SV/74cf3a5e6534874bc8a43a0851d58bcc-cb9d046d-8726-4ab9-a83d-0118af8905f0.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-ar-198", nameZh: "M2aF 198/193 呆火駝 AR", nameEn: "Numel AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "198/193", rarity: "AR", images: { large: "https://i.ibb.co/4n0jcKHd/bca16e6a1ac1f9b00ab8e55eadabfe5e.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-ar-199", nameZh: "M2aF 199/193 可達鴨 AR", nameEn: "Psyduck AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "199/193", rarity: "AR", images: { large: "https://i.ibb.co/fd0qHsgv/30c77dfb8e877cb49ba26e0fb6a3f6c9-a8a296c6-ce46-497b-8db9-fd74ee9abc7d.webp" }, usdPrice: 9, priceHistory: [{ date: '3/13', usd: 8 }, { date: '3/20', usd: 9.5 }, { date: '3/27', usd: 9 }] },
      { id: "m2af-ar-200", nameZh: "M2aF 200/193 雪童子 AR", nameEn: "Snorunt AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "200/193", rarity: "AR", images: { large: "https://i.ibb.co/cSZHVP9g/62226c0b1a4c2bf6e72c3d849ad7c3d9-2763a4f3-0f91-4704-9772-2af1cf0c3399.webp" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
      { id: "m2af-ar-201", nameZh: "M2aF 201/193 光電傘蜥 AR", nameEn: "Heliolisk AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "201/193", rarity: "AR", images: { large: "https://i.ibb.co/Cssvm2rB/c2e7206d7e8a5083a42cca807e2be6ef-919ca6e1-b1be-4d34-9304-4d7e3c7f404e.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-ar-202", nameZh: "M2aF 202/193 夢妖 AR", nameEn: "Misdreavus AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "202/193", rarity: "AR", images: { large: "https://i.ibb.co/cSCNcfg3/2d9f448e790169f81d7afd841d8be887-7e56c51a-ecdf-4224-80a3-15ea9562333b.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-ar-203", nameZh: "M2aF 203/193 波克基斯 AR", nameEn: "Togekiss AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "203/193", rarity: "AR", images: { large: "https://i.ibb.co/BK7pZ3wv/2f89c5ac02ab1f6274cc95d3d799e614-375b267f-da82-4380-954e-2a0a24f399fc.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-ar-204", nameZh: "M2aF 204/193 赫普的朽木妖 AR", nameEn: "Hau's Trevenant AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "204/193", rarity: "AR", images: { large: "https://i.ibb.co/93gGTccB/3d8063b8173ea1b0e89fd8f012d23087.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-ar-205", nameZh: "M2aF 205/193 火箭隊的謎擬Ｑ AR", nameEn: "Team Rocket's Mimikyu AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "205/193", rarity: "AR", images: { large: "https://i.ibb.co/23N3rWP7/89a794bb39934a444f82780d5e07e628-61d8dc82-2055-433a-9ead-2986acff076c.webp" }, usdPrice: 2.6, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 2.8 }, { date: '3/27', usd: 2.6 }] },
      { id: "m2af-ar-206", nameZh: "M2aF 206/193 火箭隊的三地鼠 AR", nameEn: "Team Rocket's Dugtrio AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "206/193", rarity: "AR", images: { large: "https://i.ibb.co/DHJ3qmnQ/9a8b25e90d371a998593cce364d6b48d.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-ar-207", nameZh: "M2aF 207/193 恰雷姆 AR", nameEn: "Medicham AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "207/193", rarity: "AR", images: { large: "https://i.ibb.co/Ps7QcRLM/a480bde0723a05ff059c7fd31427206b-be999510-0c80-42ea-955d-fed37860fd10.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-ar-208", nameZh: "M2aF 208/193 竹蘭的花岩怪 AR", nameEn: "Cynthia's Spiritomb AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "208/193", rarity: "AR", images: { large: "https://i.ibb.co/js2pTCq/c68948d686655444d4a41c567a159afc-306e57c4-393b-4213-bc9d-2cccd5c3f5fe.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-ar-209", nameZh: "M2aF 209/193 伽勒爾堵攔熊 AR", nameEn: "Galarian Obstagoon AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "209/193", rarity: "AR", images: { large: "https://i.ibb.co/G4XK6Byk/2dba2ef6218afa125d9df32c34f6baf4-8a825d3d-96de-4951-86d9-752ca08d3d83.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-ar-210", nameZh: "M2aF 210/193 N的捷克羅姆 AR", nameEn: "N's Zekrom AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "210/193", rarity: "AR", images: { large: "https://i.ibb.co/x8DQG6gN/769980754cb101c1dd8f238a478eb8a8-22b47849-5c6e-4c07-8bfb-a62bb891dc1b.webp" }, usdPrice: 6.4, priceHistory: [{ date: '3/13', usd: 6 }, { date: '3/20', usd: 7 }, { date: '3/27', usd: 6.4 }] },
      { id: "m2af-ar-211", nameZh: "M2aF 211/193 多龍梅西亞 AR", nameEn: "Dracozolt AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "211/193", rarity: "AR", images: { large: "https://i.ibb.co/Mxv980kM/0e39a2d4a13af1bd953f37b5f21f940d.webp" }, usdPrice: 5.1, priceHistory: [{ date: '3/13', usd: 5 }, { date: '3/20', usd: 5.5 }, { date: '3/27', usd: 5.1 }] },
      { id: "m2af-ar-212", nameZh: "M2aF 212/193 多龍奇 AR", nameEn: "Dracovish AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "212/193", rarity: "AR", images: { large: "https://i.ibb.co/YTJt17S0/4a0077b88dc69ebb7cf7369424a76c66-07a2e639-4e85-4c6a-bbe8-ccbeff0b1b3c.webp" }, usdPrice: 6.4, priceHistory: [{ date: '3/13', usd: 6 }, { date: '3/20', usd: 7 }, { date: '3/27', usd: 6.4 }] },
      { id: "m2af-ar-213", nameZh: "M2aF 213/193 旋轉洛托姆 AR", nameEn: "Rotom AR", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "213/193", rarity: "AR", images: { large: "https://i.ibb.co/YBBw5zNJ/2825ccd887b46de0484cb19061adb86d-2e3bcf7f-2efe-4728-8d49-7ff67f067a23.webp" }, usdPrice: 3.2, priceHistory: [{ date: '3/13', usd: 3 }, { date: '3/20', usd: 3.5 }, { date: '3/27', usd: 3.2 }] },

            // RR
      { id: "m2af-rr-003", nameZh: "M2aF 003/193 遠古巨蜓ex RR", nameEn: "Yanmega ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "003/193", rarity: "RR", images: { large: "https://i.ibb.co/CKR6v1Ln/bfbef2798d2cf63b8bb92a98665d37eb-2e6ea148-b1c8-4317-8bc1-cb81db23af84.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-017", nameZh: "M2aF 017/193 厄鬼椪碧草面具ex RR", nameEn: "Ogerpon ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "017/193", rarity: "RR", images: { large: "https://i.ibb.co/RpgsHJ2W/dc190a905b8e3d29f600ce7476cfa2fe.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-021", nameZh: "M2aF 021/193 阿響的鳳王ex RR", nameEn: "Reshiram ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "021/193", rarity: "RR", images: { large: "https://i.ibb.co/CKKyPLkM/210e5cd7b5340a0dca58172972811c28-c118bfb5-f2e6-4893-a3f7-9d3ce2a79c87.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-029", nameZh: "M2aF 029/193 萊希拉姆ex RR", nameEn: "Reshiram ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "029/193", rarity: "RR", images: { large: "https://i.ibb.co/zg0bDTy/c1d8de32a0331950901be6bbde9dc6bb-a9cbf87a-b3e3-4d3a-b7a9-962932937bfb.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-031", nameZh: "M2aF 031/193 蒼炎刃鬼ex RR", nameEn: "Ceruledge ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "031/193", rarity: "RR", images: { large: "https://i.ibb.co/sp4VGcnL/dae3a7f6d764c055ffd336546c30f4ad-654f2db3-19d4-4586-b56f-f59534a6d606.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-036", nameZh: "M2aF 036/193 超級雪妖女ex RR", nameEn: "Mega Froslass ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "036/193", rarity: "RR", images: { large: "https://i.ibb.co/npFRYw3/97b3914e068cd16c8222bbbed0d03fe8.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-044", nameZh: "M2aF 044/193 皮卡丘ex RR", nameEn: "Pikachu ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "044/193", rarity: "RR", images: { large: "https://i.ibb.co/7d2Hz6LD/301f9d26c015170a3e2432862e06eaab-f5876182-12a7-4cdb-9cad-3c3a18d90f76.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-049", nameZh: "M2aF 049/193 超級麻麻鰻魚王ex RR", nameEn: "Mega Eelektross ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "049/193", rarity: "RR", images: { large: "https://i.ibb.co/0RcQmj8g/a40fe1f43104f9b6a7b4e3e631dc9d46.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-051", nameZh: "M2aF 051/193 捷克羅姆ex RR", nameEn: "Zekrom ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "051/193", rarity: "RR", images: { large: "https://i.ibb.co/PGYkB0d7/a255c7b374c17a1bce336bef2adc23f5-f5a266a3-b786-40e0-bc9e-c02e1a21ccf0.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-057", nameZh: "M2aF 057/193 奇樹的電肚蛙ex RR", nameEn: "Bellibolt ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "057/193", rarity: "RR", images: { large: "https://i.ibb.co/v4vbmz5d/410fac05fac02c742322b306f4f0a456-d5e95514-2687-4518-9683-030fcb18e87e.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-060", nameZh: "M2aF 060/193 莉莉艾的皮皮ex RR", nameEn: "Lillie's Clefairy ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "060/193", rarity: "RR", images: { large: "https://i.ibb.co/XfMLJQSN/b276eaaa5a5733f7ae412180615195bb-3328705e-1893-4a59-96d6-235ba4666a81.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-rr-063", nameZh: "M2aF 063/193 火箭隊的超夢ex RR", nameEn: "Team Rocket's Mewtwo ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "063/193", rarity: "RR", images: { large: "https://i.ibb.co/7x9N9Ykk/1ad5b7fa116c7ad8b36a0cf36036a0d4-f1209e4a-1ce5-4426-bc21-997022d16401.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-071", nameZh: "M2aF 071/193 超級沙奈朵ex RR", nameEn: "Mega Gardevoir ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "071/193", rarity: "RR", images: { large: "https://i.ibb.co/npFRYw3/97b3914e068cd16c8222bbbed0d03fe8.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-075", nameZh: "M2aF 075/193 拉帝亞斯ex RR", nameEn: "Latias ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "075/193", rarity: "RR", images: { large: "https://i.ibb.co/7d2Hz6LD/301f9d26c015170a3e2432862e06eaab-f5876182-12a7-4cdb-9cad-3c3a18d90f76.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-090", nameZh: "M2aF 090/193 竹蘭的烈咬陸鯊ex RR", nameEn: "Cynthia's Garchomp ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "090/193", rarity: "RR", images: { large: "https://i.ibb.co/0RcQmj8g/a40fe1f43104f9b6a7b4e3e631dc9d46.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-092", nameZh: "M2aF 092/193 超級路卡利歐ex RR", nameEn: "Mega Lucario ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "092/193", rarity: "RR", images: { large: "https://i.ibb.co/PGYkB0d7/a255c7b374c17a1bce336bef2adc23f5-f5a266a3-b786-40e0-bc9e-c02e1a21ccf0.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-094", nameZh: "M2aF 094/193 超級摔角鷹人ex RR", nameEn: "Mega Hawlucha ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "094/193", rarity: "RR", images: { large: "https://i.ibb.co/v4vbmz5d/410fac05fac02c742322b306f4f0a456-d5e95514-2687-4518-9683-030fcb18e87e.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-101", nameZh: "M2aF 101/193 火箭隊的叉字蝠ex RR", nameEn: "Team Rocket's Crobat ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "101/193", rarity: "RR", images: { large: "https://i.ibb.co/XfMLJQSN/b276eaaa5a5733f7ae412180615195bb-3328705e-1893-4a59-96d6-235ba4666a81.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-110", nameZh: "M2aF 110/193 超級頭巾混混ex RR", nameEn: "Mega Throh ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "110/193", rarity: "RR", images: { large: "https://i.ibb.co/7x9N9Ykk/1ad5b7fa116c7ad8b36a0cf36036a0d4-f1209e4a-1ce5-4426-bc21-997022d16401.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-112", nameZh: "M2aF 112/193 N的索羅亞克ex RR", nameEn: "N's Zoroark ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "112/193", rarity: "RR", images: { large: "https://i.ibb.co/nNbHxFR1/73ba3a87359bf835dba682c425efef1a-b21e6f62-5266-40d5-9bad-f419c9f04986.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-rr-114", nameZh: "M2aF 114/193 吉雉雞ex RR", nameEn: "Gallade ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "114/193", rarity: "RR", images: { large: "https://i.ibb.co/7d2Hz6LD/301f9d26c015170a3e2432862e06eaab-f5876182-12a7-4cdb-9cad-3c3a18d90f76.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-rr-119", nameZh: "M2aF 119/193 蓋諾賽克特ex RR", nameEn: "Genesect ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "119/193", rarity: "RR", images: { large: "https://i.ibb.co/0RcQmj8g/a40fe1f43104f9b6a7b4e3e631dc9d46.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-122", nameZh: "M2aF 122/193 鋁鋼橋龍ex RR", nameEn: "Duraludon ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "122/193", rarity: "RR", images: { large: "https://i.ibb.co/PGYkB0d7/a255c7b374c17a1bce336bef2adc23f5-f5a266a3-b786-40e0-bc9e-c02e1a21ccf0.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-123", nameZh: "M2aF 123/193 赫普的蒼響ex RR", nameEn: "Hau's Zamazenta ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "123/193", rarity: "RR", images: { large: "https://i.ibb.co/v4vbmz5d/410fac05fac02c742322b306f4f0a456-d5e95514-2687-4518-9683-030fcb18e87e.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
      { id: "m2af-rr-126", nameZh: "M2aF 126/193 超級快龍ex RR", nameEn: "Mega Dragonite ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "126/193", rarity: "RR", images: { large: "https://i.ibb.co/XfMLJQSN/b276eaaa5a5733f7ae412180615195bb-3328705e-1893-4a59-96d6-235ba4666a81.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-rr-134", nameZh: "M2aF 134/193 多龍巴魯托ex RR", nameEn: "Dragapult ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "134/193", rarity: "RR", images: { large: "https://i.ibb.co/7x9N9Ykk/1ad5b7fa116c7ad8b36a0cf36036a0d4-f1209e4a-1ce5-4426-bc21-997022d16401.webp" }, usdPrice: 1.9, priceHistory: [{ date: '3/13', usd: 1.8 }, { date: '3/20', usd: 2 }, { date: '3/27', usd: 1.9 }] },
      { id: "m2af-rr-145", nameZh: "M2aF 145/193 太樂巴戈斯ex RR", nameEn: "Terapagos ex", set: { name: "[M2aF] 超級進化夢想ex 繁中版" }, number: "145/193", rarity: "RR", images: { large: "https://i.ibb.co/npFRYw3/97b3914e068cd16c8222bbbed0d03fe8.webp" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1.2 }, { date: '3/20', usd: 1.4 }, { date: '3/27', usd: 1.3 }] },
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
                  {/* Header - 不改你喜歡的 div 行，只優化手機版 */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="mx-auto pl-6 pr-10 py-4 flex items-center justify-between">
          
          {/* 左邊：卡價通 */}
          <div className="flex items-center gap-3">
            <div className="text-3xl md:text-3xl">⚡</div>
            <div>
              <h1 className="text-2xl md:text-2xl font-bold">卡價通</h1>
              <p className="text-zinc-400 text-xs md:text-xs -mt-0.5">香港 Pokémon 卡片價格參考</p>
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