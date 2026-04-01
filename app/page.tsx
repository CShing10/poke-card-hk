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
  const [selectedSet, setSelectedSet] = useState<string>('全部');
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('pokemonFavorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const res = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        setExchangeRate(res.data.rates.HKD);
      } catch {
        setExchangeRate(7.8);
      }
    };
    fetchExchangeRate();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.pokemontcg.io/v2/cards?pageSize=100&orderBy=set.releaseDate');
        const data = await res.json();

 // M4F 忍者飛旋 MUR + SAR + SR（已修正語法錯誤）
        const formatted = data.data.map((c: any) => ({
          id: c.id,
          nameZh: c.name,
          nameEn: c.name,
          set: { name: c.set.name },
          number: c.number,
          rarity: c.rarity || 'Common',
          images: { large: c.images.large || 'https://via.placeholder.com/180x250/1f2937/ffffff?text=無圖片' },
          usdPrice: 15,
          priceHistory: [{ date: '3/1', usd: 12 }, { date: '3/15', usd: 18 }, { date: '3/29', usd: 15 }]
        }));

        // M4F 忍者飛旋 MUR + SAR + SR
        const m4fCards = [
          {
            id: "m4f-120-mur",
            nameZh: "M4F 120/083 超級甲賀忍蛙ex MUR",
            nameEn: "Mega Greninja ex",
            set: { name: "[M4F] 忍者飛旋" },
            number: "120/083",
            rarity: "MUR",
            images: { large: "https://picsum.photos/id/1015/400/560" },
            usdPrice: 254,
            priceHistory: [{ date: '3/13', usd: 220 }, { date: '3/20', usd: 240 }, { date: '3/27', usd: 254 }]
          },
          {
            id: "m4f-114-sar",
            nameZh: "M4F 114/083 超級甲賀忍蛙ex SAR",
            nameEn: "Mega Greninja ex",
            set: { name: "[M4F] 忍者飛旋" },
            number: "114/083",
            rarity: "SAR",
            images: { large: "https://picsum.photos/id/1015/400/560" },
            usdPrice: 190,
            priceHistory: [{ date: '3/13', usd: 160 }, { date: '3/20', usd: 185 }, { date: '3/27', usd: 190 }]
          },
          {
            id: "m4f-115-sar",
            nameZh: "M4F 115/083 超級花葉蒂ex SAR",
            nameEn: "Mega Floragato ex",
            set: { name: "[M4F] 忍者飛旋" },
            number: "115/083",
            rarity: "SAR",
            images: { large: "https://picsum.photos/id/1015/400/560" },
            usdPrice: 19,
            priceHistory: [{ date: '3/13', usd: 18 }, { date: '3/20', usd: 20 }, { date: '3/27', usd: 19 }]
          },
          {
            id: "m4f-116-sar",
            nameZh: "M4F 116/083 超級毒藻龍ex SAR",
            nameEn: "Mega Dragalge ex",
            set: { name: "[M4F] 忍者飛旋" },
            number: "116/083",
            rarity: "SAR",
            images: { large: "https://picsum.photos/id/1015/400/560" },
            usdPrice: 32,
            priceHistory: [{ date: '3/13', usd: 28 }, { date: '3/20', usd: 35 }, { date: '3/27', usd: 32 }]
          },
          {
            id: "m4f-117-sar",
            nameZh: "M4F 117/083 奇諾栗鼠ex SAR",
            nameEn: "Mega Cinccino ex",
            set: { name: "[M4F] 忍者飛旋" },
            number: "117/083",
            rarity: "SAR",
            images: { large: "https://picsum.photos/id/1015/400/560" },
            usdPrice: 36,
            priceHistory: [{ date: '3/13', usd: 30 }, { date: '3/20', usd: 38 }, { date: '3/27', usd: 36 }]
          },
          {
            id: "m4f-118-sar",
            nameZh: "M4F 118/083 AZ的平和 SAR",
            nameEn: "AZ's Peace",
            set: { name: "[M4F] 忍者飛旋" },
            number: "118/083",
            rarity: "SAR",
            images: { large: "https://picsum.photos/id/1015/400/560" },
            usdPrice: 13,
            priceHistory: [{ date: '3/13', usd: 12 }, { date: '3/20', usd: 14 }, { date: '3/27', usd: 13 }]
          },
          {
            id: "m4f-119-sar",
            nameZh: "M4F 119/083 霍米加的演奏 SAR",
            nameEn: "Homi's Performance",
            set: { name: "[M4F] 忍者飛旋" },
            number: "119/083",
            rarity: "SAR",
            images: { large: "https://picsum.photos/id/1015/400/560" },
            usdPrice: 19,
            priceHistory: [{ date: '3/13', usd: 18 }, { date: '3/20', usd: 20 }, { date: '3/27', usd: 19 }]
          },

          // SR（名稱已修正為你想要的格式）
          { id: "m4f-sr-096", nameZh: "M4F 096/083 大針蜂ex SR", nameEn: "Mega Beedrill ex", set: { name: "[M4F] 忍者飛旋" }, number: "096/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 10, priceHistory: [{ date: '3/13', usd: 9 }, { date: '3/20', usd: 11 }, { date: '3/27', usd: 10 }] },
          { id: "m4f-sr-097", nameZh: "M4F 097/083 超級火炎獅ex SR", nameEn: "Mega Pyroar ex", set: { name: "[M4F] 忍者飛旋" }, number: "097/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
          { id: "m4f-sr-098", nameZh: "M4F 098/083 超級甲賀忍蛙ex SR", nameEn: "Mega Greninja ex", set: { name: "[M4F] 忍者飛旋" }, number: "098/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 23, priceHistory: [{ date: '3/13', usd: 20 }, { date: '3/20', usd: 25 }, { date: '3/27', usd: 23 }] },
          { id: "m4f-sr-099", nameZh: "M4F 099/083 超級花葉蒂ex SR", nameEn: "Mega Floragato ex", set: { name: "[M4F] 忍者飛旋" }, number: "099/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
          { id: "m4f-sr-100", nameZh: "M4F 100/083 南瓜怪人ex SR", nameEn: "Gourgeist ex", set: { name: "[M4F] 忍者飛旋" }, number: "100/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
          { id: "m4f-sr-101", nameZh: "M4F 101/083 勾帕路翁ex SR", nameEn: "Cobalion ex", set: { name: "[M4F] 忍者飛旋" }, number: "101/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
          { id: "m4f-sr-102", nameZh: "M4F 102/083 超級毒藻龍ex SR", nameEn: "Mega Dragalge ex", set: { name: "[M4F] 忍者飛旋" }, number: "102/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 5, priceHistory: [{ date: '3/13', usd: 4.5 }, { date: '3/20', usd: 5.5 }, { date: '3/27', usd: 5 }] },
          { id: "m4f-sr-103", nameZh: "M4F 103/083 奇諾栗鼠ex SR", nameEn: "Mega Cinccino ex", set: { name: "[M4F] 忍者飛旋" }, number: "103/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
          { id: "m4f-sr-104", nameZh: "M4F 104/083 能量超級回收 SR", nameEn: "Energy Recycler", set: { name: "[M4F] 忍者飛旋" }, number: "104/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
          { id: "m4f-sr-105", nameZh: "M4F 105/083 超大冰淇淋 SR", nameEn: "Vanilluxe", set: { name: "[M4F] 忍者飛旋" }, number: "105/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
          { id: "m4f-sr-106", nameZh: "M4F 106/083 特殊紅牌 SR", nameEn: "Special Red Card", set: { name: "[M4F] 忍者飛旋" }, number: "106/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 15, priceHistory: [{ date: '3/13', usd: 13 }, { date: '3/20', usd: 17 }, { date: '3/27', usd: 15 }] },
          { id: "m4f-sr-107", nameZh: "M4F 107/083 道具拆除器 SR", nameEn: "Tool Remover", set: { name: "[M4F] 忍者飛旋" }, number: "107/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
          { id: "m4f-sr-108", nameZh: "M4F 108/083 AZ的平和 SR", nameEn: "AZ's Peace", set: { name: "[M4F] 忍者飛旋" }, number: "108/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
          { id: "m4f-sr-109", nameZh: "M4F 109/083 吉普索 SR", nameEn: "Gible", set: { name: "[M4F] 忍者飛旋" }, number: "109/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 7, priceHistory: [{ date: '3/13', usd: 6 }, { date: '3/20', usd: 8 }, { date: '3/27', usd: 7 }] },
          { id: "m4f-sr-110", nameZh: "M4F 110/083 霍米加的演奏 SR", nameEn: "Homi's Performance", set: { name: "[M4F] 忍者飛旋" }, number: "110/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 7, priceHistory: [{ date: '3/13', usd: 6 }, { date: '3/20', usd: 8 }, { date: '3/27', usd: 7 }] },
          { id: "m4f-sr-111", nameZh: "M4F 111/083 瑪琪艾兒 SR", nameEn: "Magearna", set: { name: "[M4F] 忍者飛旋" }, number: "111/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 10, priceHistory: [{ date: '3/13', usd: 9 }, { date: '3/20', usd: 11 }, { date: '3/27', usd: 10 }] },
          { id: "m4f-sr-112", nameZh: "M4F 112/083 衝浪海灘 SR", nameEn: "Surfing Beach", set: { name: "[M4F] 忍者飛旋" }, number: "112/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 5, priceHistory: [{ date: '3/13', usd: 4.5 }, { date: '3/20', usd: 5.5 }, { date: '3/27', usd: 5 }] },
          { id: "m4f-sr-113", nameZh: "M4F 113/083 稜鏡塔 SR", nameEn: "Prism Tower", set: { name: "[M4F] 忍者飛旋" }, number: "113/083", rarity: "SR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 3, priceHistory: [{ date: '3/13', usd: 2.5 }, { date: '3/20', usd: 3.5 }, { date: '3/27', usd: 3 }] },
        // AR（12 張，按你提供的正確資料）
          { id: "m4f-ar-084", nameZh: "M4F 084/083 哈力栗 AR", nameEn: "Chespin AR", set: { name: "[M4F] 忍者飛旋" }, number: "084/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 20, priceHistory: [{ date: '3/13', usd: 18 }, { date: '3/20', usd: 22 }, { date: '3/27', usd: 20 }] },
          { id: "m4f-ar-085", nameZh: "M4F 085/083 火狐狸 AR", nameEn: "Fennekin AR", set: { name: "[M4F] 忍者飛旋" }, number: "085/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 20, priceHistory: [{ date: '3/13', usd: 18 }, { date: '3/20', usd: 22 }, { date: '3/27', usd: 20 }] },
          { id: "m4f-ar-086", nameZh: "M4F 086/083 呱呱泡蛙 AR", nameEn: "Froakie AR", set: { name: "[M4F] 忍者飛旋" }, number: "086/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 40, priceHistory: [{ date: '3/13', usd: 35 }, { date: '3/20', usd: 45 }, { date: '3/27', usd: 40 }] },
          { id: "m4f-ar-087", nameZh: "M4F 087/083 呱頭蛙 AR", nameEn: "Frogadier AR", set: { name: "[M4F] 忍者飛旋" }, number: "087/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 30, priceHistory: [{ date: '3/13', usd: 25 }, { date: '3/20', usd: 35 }, { date: '3/27', usd: 30 }] },
          { id: "m4f-ar-088", nameZh: "M4F 088/083 電龍 AR", nameEn: "Ampharos AR", set: { name: "[M4F] 忍者飛旋" }, number: "088/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 20, priceHistory: [{ date: '3/13', usd: 18 }, { date: '3/20', usd: 22 }, { date: '3/27', usd: 20 }] },
          { id: "m4f-ar-089", nameZh: "M4F 089/083 哲爾尼亞斯 AR", nameEn: "Xerneas AR", set: { name: "[M4F] 忍者飛旋" }, number: "089/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 20, priceHistory: [{ date: '3/13', usd: 18 }, { date: '3/20', usd: 22 }, { date: '3/27', usd: 20 }] },
          { id: "m4f-ar-090", nameZh: "M4F 090/083 念力土偶 AR", nameEn: "Claydol AR", set: { name: "[M4F] 忍者飛旋" }, number: "090/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 20, priceHistory: [{ date: '3/13', usd: 18 }, { date: '3/20', usd: 22 }, { date: '3/27', usd: 20 }] },
          { id: "m4f-ar-091", nameZh: "M4F 091/083 叉字蝠 AR", nameEn: "Crobat AR", set: { name: "[M4F] 忍者飛旋" }, number: "091/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 15, priceHistory: [{ date: '3/13', usd: 13 }, { date: '3/20', usd: 17 }, { date: '3/27', usd: 15 }] },
          { id: "m4f-ar-092", nameZh: "M4F 092/083 金屬怪 AR", nameEn: "Metang AR", set: { name: "[M4F] 忍者飛旋" }, number: "092/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 15, priceHistory: [{ date: '3/13', usd: 13 }, { date: '3/20', usd: 17 }, { date: '3/27', usd: 15 }] },
          { id: "m4f-ar-093", nameZh: "M4F 093/083 黏美兒 AR", nameEn: "Goomy AR", set: { name: "[M4F] 忍者飛旋" }, number: "093/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 15, priceHistory: [{ date: '3/13', usd: 13 }, { date: '3/20', usd: 17 }, { date: '3/27', usd: 15 }] },
          { id: "m4f-ar-094", nameZh: "M4F 094/083 肯泰羅 AR", nameEn: "Tauros AR", set: { name: "[M4F] 忍者飛旋" }, number: "094/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 15, priceHistory: [{ date: '3/13', usd: 13 }, { date: '3/20', usd: 17 }, { date: '3/27', usd: 15 }] },
          { id: "m4f-ar-095", nameZh: "M4F 095/083 步哨鼠 AR", nameEn: "Sentret AR", set: { name: "[M4F] 忍者飛旋" }, number: "095/083", rarity: "AR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 15, priceHistory: [{ date: '3/13', usd: 13 }, { date: '3/20', usd: 17 }, { date: '3/27', usd: 15 }] },
       // RR（按你提供的正確名稱和 HKD 價格調整）
          { id: "m4f-rr-003", nameZh: "M4F 003/083 大針蜂ex RR", nameEn: "Mega Beedrill ex", set: { name: "[M4F] 忍者飛旋" }, number: "003/083", rarity: "RR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 4, priceHistory: [{ date: '3/13', usd: 3.5 }, { date: '3/20', usd: 4.5 }, { date: '3/27', usd: 4 }] },
          { id: "m4f-rr-015", nameZh: "M4F 015/083 超級火炎獅ex RR", nameEn: "Mega Pyroar ex", set: { name: "[M4F] 忍者飛旋" }, number: "015/083", rarity: "RR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
          { id: "m4f-rr-022", nameZh: "M4F 022/083 超級甲賀忍蛙ex RR", nameEn: "Mega Greninja ex", set: { name: "[M4F] 忍者飛旋" }, number: "022/083", rarity: "RR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 6.4, priceHistory: [{ date: '3/13', usd: 5.5 }, { date: '3/20', usd: 7 }, { date: '3/27', usd: 6.4 }] },
          { id: "m4f-rr-035", nameZh: "M4F 035/083 超級花葉蒂ex RR", nameEn: "Mega Floragato ex", set: { name: "[M4F] 忍者飛旋" }, number: "035/083", rarity: "RR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
          { id: "m4f-rr-041", nameZh: "M4F 041/083 南瓜怪人ex RR", nameEn: "Gourgeist ex", set: { name: "[M4F] 忍者飛旋" }, number: "041/083", rarity: "RR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
          { id: "m4f-rr-062", nameZh: "M4F 062/083 勾帕路翁ex RR", nameEn: "Cobalion ex", set: { name: "[M4F] 忍者飛旋" }, number: "062/083", rarity: "RR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
          { id: "m4f-rr-063", nameZh: "M4F 063/083 超級毒藻龍ex RR", nameEn: "Mega Dragalge ex", set: { name: "[M4F] 忍者飛旋" }, number: "063/083", rarity: "RR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 1.3, priceHistory: [{ date: '3/13', usd: 1 }, { date: '3/20', usd: 1.5 }, { date: '3/27', usd: 1.3 }] },
          { id: "m4f-rr-071", nameZh: "M4F 071/083 奇諾栗鼠ex RR", nameEn: "Mega Cinccino ex", set: { name: "[M4F] 忍者飛旋" }, number: "071/083", rarity: "RR", images: { large: "https://picsum.photos/id/1015/400/560" }, usdPrice: 4.5, priceHistory: [{ date: '3/13', usd: 4 }, { date: '3/20', usd: 5 }, { date: '3/27', usd: 4.5 }] },
        ];

        setCards([...m4fCards, ...formatted]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  const allSets = useMemo(() => ['全部', ...Array.from(new Set(cards.map(c => c.set.name))).sort().reverse()], [cards]);

  const displayedCards = useMemo(() => {
    let result = [...cards];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(card =>
        card.nameZh.toLowerCase().includes(term) || card.nameEn.toLowerCase().includes(term) || card.set.name.toLowerCase().includes(term)
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

  const toggleFavorite = (cardId: string) => {
    if (favorites.includes(cardId)) {
      setFavorites(favorites.filter(id => id !== cardId));
    } else {
      setFavorites([...favorites, cardId]);
    }
  };

  const calculateHKD = (usd: number) => Math.round(usd * exchangeRate);

  const openDetail = (card: PokemonCard) => setSelectedCard(card);
  const closeDetail = () => setSelectedCard(null);
  const goToHome = () => {
    setSelectedSet('全部');
    setShowFavorites(false);
    setSearchTerm('');
  };

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-2xl text-white">正在載入真實卡片資料...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* 左側系列欄 - 手機也盡量顯示 */}
      <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-6 hidden md:block overflow-y-auto">
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

      <div className="flex-1">
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">⚡</div>
              <div>
                <h1 className="text-2xl font-bold">卡價通</h1>
                <p className="text-zinc-400 text-xs">香港 Pokémon 卡片價格參考</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={goToHome} className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">首頁</button>
              <button onClick={() => setShowFavorites(!showFavorites)} className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${showFavorites ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                ❤️ 我的收藏 ({favorites.length})
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* 手機版系列選擇 */}
          <div className="md:hidden mb-8">
            <select value={selectedSet} onChange={(e) => setSelectedSet(e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-3.5 text-base">
              {allSets.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {!showFavorites && (
            <div className="mb-10">
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="即時搜尋卡名..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-3xl px-5 py-4 text-base placeholder-zinc-500 focus:border-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['default', 'price-low', 'price-high'].map(opt => (
                  <button key={opt} onClick={() => setSortOption(opt as any)} className={`px-5 py-2 rounded-full text-sm ${sortOption === opt ? 'bg-emerald-600 text-white' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                    {opt === 'default' ? '預設' : opt === 'price-low' ? '低→高' : '高→低'}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-16">
            {Object.entries(groupedCards).map(([setName, rarityGroups]) => (
              <div key={setName}>
                <h2 className="text-2xl font-bold mb-8 text-emerald-400">{setName}</h2>
                {Object.entries(rarityGroups).map(([rarity, cardsInGroup]) => (
                  <div key={rarity} className="mb-12">
                    <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-3">
                      {rarity} <span className="text-zinc-500 text-sm">({cardsInGroup.length})</span>
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">   {/* 手機版卡片更小 */}
                      {cardsInGroup.map(card => {
                        const hkdPrice = calculateHKD(card.usdPrice);
                        const isFavorite = favorites.includes(card.id);
                        return (
                          <div 
                            key={card.id}
                            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group relative cursor-pointer transition-all hover:-translate-y-1 hover:shadow-2xl hover:border-emerald-500/60"
                            onClick={() => openDetail(card)}
                          >
                            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(card.id); }} className="absolute top-3 right-3 z-10 text-2xl">
                              {isFavorite ? '❤️' : '♡'}
                            </button>
                            <div className="h-44 bg-zinc-950 flex items-center justify-center p-3 overflow-hidden relative">
  <Image
    src={card.images.large}
    alt={card.nameZh}
    fill
    sizes="(max-width: 768px) 45vw, 180px"
    className="object-contain transition-transform duration-300 group-hover:scale-110"
    onError={(e) => {
      (e.target as HTMLImageElement).src = 'https://picsum.photos/id/1015/400/560';
    }}
  />
</div>
                            <div className="p-4 pt-6">
                              <div className="font-medium text-sm leading-tight mb-3 line-clamp-2 min-h-[2.8em]">{card.nameZh}</div>
                              <div className="text-xs text-zinc-400 mb-3">No.{card.number}</div>
                              <div className="flex justify-between text-sm">
                                <div className="text-emerald-400 font-bold">${card.usdPrice}</div>
                                <div className="font-bold">HK${hkdPrice}</div>
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

      {/* 詳細彈窗 */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[60] p-4" onClick={closeDetail}>
          <div className="bg-zinc-900 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto border border-zinc-700" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold">{selectedCard.nameZh}</h2>
                  <p className="text-zinc-400">{selectedCard.nameEn}</p>
                </div>
                <button onClick={closeDetail} className="text-4xl text-zinc-500 hover:text-white">×</button>
              </div>
              <div className="relative h-[420px] bg-zinc-950 rounded-2xl mb-8 overflow-hidden">
                <Image src={selectedCard.images.large} alt={selectedCard.nameZh} fill sizes="(max-width: 768px) 90vw, 400px" className="object-contain" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x560/1f2937/ffffff?text=無圖片'; }} />
              </div>
              <div className="mb-8">
                <div className="text-emerald-400 text-sm">TCGPlayer 市價</div>
                <div className="text-5xl font-bold text-emerald-400">${selectedCard.usdPrice}</div>
                <div className="text-4xl font-bold text-white mt-2">HK${calculateHKD(selectedCard.usdPrice)}</div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">近期價格走勢 (USD)</h3>
                <div className="h-72 bg-zinc-950 rounded-2xl p-6" style={{ minHeight: '300px', width: '100%' }}>
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