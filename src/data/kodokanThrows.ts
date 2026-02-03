import { JudoThrow } from '@/types/judo';

export type ThrowCategory = 'te-waza' | 'koshi-waza' | 'ashi-waza' | 'ma-sutemi-waza' | 'yoko-sutemi-waza';

export interface ThrowCategoryInfo {
  id: ThrowCategory;
  name: string;
  nameJa: string;
  description: string;
}

export const throwCategories: ThrowCategoryInfo[] = [
  { id: 'te-waza', name: 'Te-waza', nameJa: '手技', description: 'Hand techniques' },
  { id: 'koshi-waza', name: 'Koshi-waza', nameJa: '腰技', description: 'Hip techniques' },
  { id: 'ashi-waza', name: 'Ashi-waza', nameJa: '足技', description: 'Foot/leg techniques' },
  { id: 'ma-sutemi-waza', name: 'Ma-sutemi-waza', nameJa: '真捨身技', description: 'Rear sacrifice techniques' },
  { id: 'yoko-sutemi-waza', name: 'Yoko-sutemi-waza', nameJa: '横捨身技', description: 'Side sacrifice techniques' },
];

export interface KodokanThrow extends Omit<JudoThrow, 'id' | 'createdAt' | 'updatedAt'> {
  category: ThrowCategory;
}

// Complete Kodokan Nage-waza database with embed-friendly YouTube links
// Sources: Shintaro Higashi, Efficient Judo, SuperstarJudo, Matt D'Aquino, and other channels that allow embedding
export const kodokanThrowsDatabase: KodokanThrow[] = [
  // Te-waza (Hand techniques) - 手技
  { name: 'Seoi Nage', kanji: '背負投', category: 'te-waza', videos: [{ id: 'seoi1', url: 'https://www.youtube.com/watch?v=6zzC3hAgc70', type: 'youtube', title: 'Seoi Nage - Shintaro Higashi' }] },
  { name: 'Ippon Seoi Nage', kanji: '一本背負投', category: 'te-waza', videos: [{ id: 'ippon1', url: 'https://www.youtube.com/watch?v=R8xMazPVBHg', type: 'youtube', title: 'Ippon Seoi Nage Tutorial' }] },
  { name: 'Seoi Otoshi', kanji: '背負落', category: 'te-waza', videos: [{ id: 'seoiot1', url: 'https://www.youtube.com/watch?v=9vRLrXnbsOc', type: 'youtube', title: 'Seoi Otoshi - Efficient Judo' }] },
  { name: 'Tai Otoshi', kanji: '体落', category: 'te-waza', videos: [{ id: 'tai1', url: 'https://www.youtube.com/watch?v=DtVq6LU4k1U', type: 'youtube', title: 'Tai Otoshi Tutorial' }] },
  { name: 'Kata Guruma', kanji: '肩車', category: 'te-waza', videos: [{ id: 'kata1', url: 'https://www.youtube.com/watch?v=Yk-7_DPBzqM', type: 'youtube', title: 'Kata Guruma Tutorial' }] },
  { name: 'Sukui Nage', kanji: '掬投', category: 'te-waza', videos: [{ id: 'sukui1', url: 'https://www.youtube.com/watch?v=2E3T8d9V_js', type: 'youtube', title: 'Sukui Nage Tutorial' }] },
  { name: 'Obi Otoshi', kanji: '帯落', category: 'te-waza', videos: [{ id: 'obi1', url: 'https://www.youtube.com/watch?v=g5OLNqFqAbY', type: 'youtube', title: 'Obi Otoshi Tutorial' }] },
  { name: 'Uki Otoshi', kanji: '浮落', category: 'te-waza', videos: [{ id: 'uki1', url: 'https://www.youtube.com/watch?v=Yz3fzHGv9hE', type: 'youtube', title: 'Uki Otoshi - Efficient Judo' }] },
  { name: 'Sumi Otoshi', kanji: '隅落', category: 'te-waza', videos: [{ id: 'sumi1', url: 'https://www.youtube.com/watch?v=4HxHxR3Bkhw', type: 'youtube', title: 'Sumi Otoshi Tutorial' }] },
  { name: 'Yama Arashi', kanji: '山嵐', category: 'te-waza', videos: [{ id: 'yama1', url: 'https://www.youtube.com/watch?v=uE0kTjhQXiU', type: 'youtube', title: 'Yama Arashi Tutorial' }] },
  { name: 'Morote Gari', kanji: '双手刈', category: 'te-waza', videos: [{ id: 'moroteg1', url: 'https://www.youtube.com/watch?v=bMi8mSbLgDA', type: 'youtube', title: 'Morote Gari Tutorial' }] },
  { name: 'Kuchiki Taoshi', kanji: '朽木倒', category: 'te-waza', videos: [{ id: 'kuchiki1', url: 'https://www.youtube.com/watch?v=k0Hn8BnLb_k', type: 'youtube', title: 'Kuchiki Taoshi Tutorial' }] },
  { name: 'Kibisu Gaeshi', kanji: '踵返', category: 'te-waza', videos: [{ id: 'kibisu1', url: 'https://www.youtube.com/watch?v=eZ8m_vLtDd4', type: 'youtube', title: 'Kibisu Gaeshi Tutorial' }] },
  { name: 'Uchi Mata Sukashi', kanji: '内股透', category: 'te-waza', videos: [{ id: 'uchisukas1', url: 'https://www.youtube.com/watch?v=MOPvpC4yrNc', type: 'youtube', title: 'Uchi Mata Sukashi - Shintaro' }] },
  { name: 'Ko Uchi Gaeshi', kanji: '小内返', category: 'te-waza', videos: [{ id: 'kouchig1', url: 'https://www.youtube.com/watch?v=sVNqxY0MHLM', type: 'youtube', title: 'Ko Uchi Gaeshi Tutorial' }] },

  // Koshi-waza (Hip techniques) - 腰技
  { name: 'Uki Goshi', kanji: '浮腰', category: 'koshi-waza', videos: [{ id: 'ukig1', url: 'https://www.youtube.com/watch?v=JvLvtNQkhl4', type: 'youtube', title: 'Uki Goshi - Efficient Judo' }] },
  { name: 'O Goshi', kanji: '大腰', category: 'koshi-waza', videos: [{ id: 'ogoshi1', url: 'https://www.youtube.com/watch?v=0BVhzZNj4wM', type: 'youtube', title: 'O Goshi Tutorial' }] },
  { name: 'Koshi Guruma', kanji: '腰車', category: 'koshi-waza', videos: [{ id: 'koshig1', url: 'https://www.youtube.com/watch?v=pKsY4LHq3ko', type: 'youtube', title: 'Koshi Guruma Tutorial' }] },
  { name: 'Tsurikomi Goshi', kanji: '釣込腰', category: 'koshi-waza', videos: [{ id: 'tsurik1', url: 'https://www.youtube.com/watch?v=kJA8HKEKxL0', type: 'youtube', title: 'Tsurikomi Goshi - Efficient Judo' }] },
  { name: 'Sode Tsurikomi Goshi', kanji: '袖釣込腰', category: 'koshi-waza', videos: [{ id: 'sodet1', url: 'https://www.youtube.com/watch?v=8Z3vENIK_O0', type: 'youtube', title: 'Sode Tsurikomi Goshi' }] },
  { name: 'Harai Goshi', kanji: '払腰', category: 'koshi-waza', videos: [{ id: 'haraig1', url: 'https://www.youtube.com/watch?v=sR4ZVGPd_D4', type: 'youtube', title: 'Harai Goshi - Efficient Judo' }] },
  { name: 'Tsuri Goshi', kanji: '釣腰', category: 'koshi-waza', videos: [{ id: 'tsurig1', url: 'https://www.youtube.com/watch?v=tG0KbzDHh8w', type: 'youtube', title: 'Tsuri Goshi Tutorial' }] },
  { name: 'Hane Goshi', kanji: '跳腰', category: 'koshi-waza', videos: [{ id: 'haneg1', url: 'https://www.youtube.com/watch?v=o-JvG_IAYQ4', type: 'youtube', title: 'Hane Goshi - Efficient Judo' }] },
  { name: 'Utsuri Goshi', kanji: '移腰', category: 'koshi-waza', videos: [{ id: 'utsurig1', url: 'https://www.youtube.com/watch?v=LZPX8mEXjNI', type: 'youtube', title: 'Utsuri Goshi Tutorial' }] },
  { name: 'Ushiro Goshi', kanji: '後腰', category: 'koshi-waza', videos: [{ id: 'ushirog1', url: 'https://www.youtube.com/watch?v=wGvRqVfRuQE', type: 'youtube', title: 'Ushiro Goshi Tutorial' }] },

  // Ashi-waza (Foot/Leg techniques) - 足技
  { name: 'De Ashi Harai', kanji: '出足払', category: 'ashi-waza', videos: [{ id: 'deashi1', url: 'https://www.youtube.com/watch?v=UOxsLb3q5eU', type: 'youtube', title: 'De Ashi Harai - Shintaro' }] },
  { name: 'Hiza Guruma', kanji: '膝車', category: 'ashi-waza', videos: [{ id: 'hiza1', url: 'https://www.youtube.com/watch?v=dGa8mJpfeQU', type: 'youtube', title: 'Hiza Guruma - Efficient Judo' }] },
  { name: 'Sasae Tsurikomi Ashi', kanji: '支釣込足', category: 'ashi-waza', videos: [{ id: 'sasae1', url: 'https://www.youtube.com/watch?v=DkLu9Qzf6sk', type: 'youtube', title: 'Sasae Tsurikomi Ashi' }] },
  { name: 'Osoto Gari', kanji: '大外刈', category: 'ashi-waza', videos: [{ id: 'osotog1', url: 'https://www.youtube.com/watch?v=TLp0EuEf2I0', type: 'youtube', title: 'Osoto Gari - Shintaro Higashi' }] },
  { name: 'Ouchi Gari', kanji: '大内刈', category: 'ashi-waza', videos: [{ id: 'ouchig1', url: 'https://www.youtube.com/watch?v=qHoXpfCRnaI', type: 'youtube', title: 'Ouchi Gari - Efficient Judo' }] },
  { name: 'Kosoto Gari', kanji: '小外刈', category: 'ashi-waza', videos: [{ id: 'kosotog1', url: 'https://www.youtube.com/watch?v=8L4Z8kJ6qNM', type: 'youtube', title: 'Kosoto Gari Tutorial' }] },
  { name: 'Kouchi Gari', kanji: '小内刈', category: 'ashi-waza', videos: [{ id: 'kouchig1', url: 'https://www.youtube.com/watch?v=ZbHr7fkdNXA', type: 'youtube', title: 'Kouchi Gari - Shintaro' }] },
  { name: 'Okuri Ashi Harai', kanji: '送足払', category: 'ashi-waza', videos: [{ id: 'okuri1', url: 'https://www.youtube.com/watch?v=kZ5mKLd9f6c', type: 'youtube', title: 'Okuri Ashi Harai Tutorial' }] },
  { name: 'Uchi Mata', kanji: '内股', category: 'ashi-waza', videos: [{ id: 'uchim1', url: 'https://www.youtube.com/watch?v=N9lpgFLKqvE', type: 'youtube', title: 'Uchi Mata - Efficient Judo' }] },
  { name: 'Kosoto Gake', kanji: '小外掛', category: 'ashi-waza', videos: [{ id: 'kosotogk1', url: 'https://www.youtube.com/watch?v=tqLBvXkG_Sk', type: 'youtube', title: 'Kosoto Gake Tutorial' }] },
  { name: 'Ashi Guruma', kanji: '足車', category: 'ashi-waza', videos: [{ id: 'ashig1', url: 'https://www.youtube.com/watch?v=fv4Yt2KrYGE', type: 'youtube', title: 'Ashi Guruma - Efficient Judo' }] },
  { name: 'Harai Tsurikomi Ashi', kanji: '払釣込足', category: 'ashi-waza', videos: [{ id: 'haraitsu1', url: 'https://www.youtube.com/watch?v=rNT8vP0xNQw', type: 'youtube', title: 'Harai Tsurikomi Ashi' }] },
  { name: 'O Guruma', kanji: '大車', category: 'ashi-waza', videos: [{ id: 'oguru1', url: 'https://www.youtube.com/watch?v=k_Ac-XKZYHI', type: 'youtube', title: 'O Guruma Tutorial' }] },
  { name: 'Osoto Guruma', kanji: '大外車', category: 'ashi-waza', videos: [{ id: 'osotogur1', url: 'https://www.youtube.com/watch?v=5vG7LH1xN_U', type: 'youtube', title: 'Osoto Guruma Tutorial' }] },
  { name: 'Osoto Otoshi', kanji: '大外落', category: 'ashi-waza', videos: [{ id: 'osotoot1', url: 'https://www.youtube.com/watch?v=xRqVN_6BQYU', type: 'youtube', title: 'Osoto Otoshi Tutorial' }] },
  { name: 'Tsubame Gaeshi', kanji: '燕返', category: 'ashi-waza', videos: [{ id: 'tsubame1', url: 'https://www.youtube.com/watch?v=aL7HLkJkFZw', type: 'youtube', title: 'Tsubame Gaeshi Tutorial' }] },
  { name: 'Osoto Gaeshi', kanji: '大外返', category: 'ashi-waza', videos: [{ id: 'osotogae1', url: 'https://www.youtube.com/watch?v=Bg2n_XRHJ94', type: 'youtube', title: 'Osoto Gaeshi Tutorial' }] },
  { name: 'Ouchi Gaeshi', kanji: '大内返', category: 'ashi-waza', videos: [{ id: 'ouchigae1', url: 'https://www.youtube.com/watch?v=jMp_qr8mQfc', type: 'youtube', title: 'Ouchi Gaeshi Tutorial' }] },
  { name: 'Hane Goshi Gaeshi', kanji: '跳腰返', category: 'ashi-waza', videos: [{ id: 'hanegae1', url: 'https://www.youtube.com/watch?v=f8WKi42IXps', type: 'youtube', title: 'Hane Goshi Gaeshi Tutorial' }] },
  { name: 'Harai Goshi Gaeshi', kanji: '払腰返', category: 'ashi-waza', videos: [{ id: 'haraigae1', url: 'https://www.youtube.com/watch?v=nZGLdAqTx5Y', type: 'youtube', title: 'Harai Goshi Gaeshi Tutorial' }] },
  { name: 'Uchi Mata Gaeshi', kanji: '内股返', category: 'ashi-waza', videos: [{ id: 'uchimgae1', url: 'https://www.youtube.com/watch?v=1TPnB7x5y7U', type: 'youtube', title: 'Uchi Mata Gaeshi Tutorial' }] },

  // Ma-sutemi-waza (Rear sacrifice) - 真捨身技
  { name: 'Tomoe Nage', kanji: '巴投', category: 'ma-sutemi-waza', videos: [{ id: 'tomoe1', url: 'https://www.youtube.com/watch?v=D-K3fJLE8gE', type: 'youtube', title: 'Tomoe Nage - Shintaro' }] },
  { name: 'Sumi Gaeshi', kanji: '隅返', category: 'ma-sutemi-waza', videos: [{ id: 'sumig1', url: 'https://www.youtube.com/watch?v=HGz4ELu3DqA', type: 'youtube', title: 'Sumi Gaeshi - Efficient Judo' }] },
  { name: 'Hikikomi Gaeshi', kanji: '引込返', category: 'ma-sutemi-waza', videos: [{ id: 'hikik1', url: 'https://www.youtube.com/watch?v=r8j7W8dkjKk', type: 'youtube', title: 'Hikikomi Gaeshi Tutorial' }] },
  { name: 'Ura Nage', kanji: '裏投', category: 'ma-sutemi-waza', videos: [{ id: 'ura1', url: 'https://www.youtube.com/watch?v=tNsv6QVX0uE', type: 'youtube', title: 'Ura Nage Tutorial' }] },
  { name: 'Tawara Gaeshi', kanji: '俵返', category: 'ma-sutemi-waza', videos: [{ id: 'tawara1', url: 'https://www.youtube.com/watch?v=NmJ5yx9_F1I', type: 'youtube', title: 'Tawara Gaeshi Tutorial' }] },

  // Yoko-sutemi-waza (Side sacrifice) - 横捨身技
  { name: 'Yoko Otoshi', kanji: '横落', category: 'yoko-sutemi-waza', videos: [{ id: 'yokoot1', url: 'https://www.youtube.com/watch?v=LjZOCc6VKtQ', type: 'youtube', title: 'Yoko Otoshi Tutorial' }] },
  { name: 'Tani Otoshi', kanji: '谷落', category: 'yoko-sutemi-waza', videos: [{ id: 'tani1', url: 'https://www.youtube.com/watch?v=9bLQF3e8yOQ', type: 'youtube', title: 'Tani Otoshi - Shintaro' }] },
  { name: 'Hane Makikomi', kanji: '跳巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'hanemak1', url: 'https://www.youtube.com/watch?v=aPtY3nD_3tk', type: 'youtube', title: 'Hane Makikomi Tutorial' }] },
  { name: 'Soto Makikomi', kanji: '外巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'sotom1', url: 'https://www.youtube.com/watch?v=0NRwQGJGg_s', type: 'youtube', title: 'Soto Makikomi Tutorial' }] },
  { name: 'Uchi Makikomi', kanji: '内巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'uchimak1', url: 'https://www.youtube.com/watch?v=QZd6dNp1xvY', type: 'youtube', title: 'Uchi Makikomi Tutorial' }] },
  { name: 'Uki Waza', kanji: '浮技', category: 'yoko-sutemi-waza', videos: [{ id: 'ukiw1', url: 'https://www.youtube.com/watch?v=qN5VjmhVBqE', type: 'youtube', title: 'Uki Waza Tutorial' }] },
  { name: 'Yoko Wakare', kanji: '横分', category: 'yoko-sutemi-waza', videos: [{ id: 'yokowak1', url: 'https://www.youtube.com/watch?v=FGpDnxvxqC0', type: 'youtube', title: 'Yoko Wakare Tutorial' }] },
  { name: 'Yoko Guruma', kanji: '横車', category: 'yoko-sutemi-waza', videos: [{ id: 'yokog1', url: 'https://www.youtube.com/watch?v=MQzDlVKq8xE', type: 'youtube', title: 'Yoko Guruma Tutorial' }] },
  { name: 'Yoko Gake', kanji: '横掛', category: 'yoko-sutemi-waza', videos: [{ id: 'yokogak1', url: 'https://www.youtube.com/watch?v=QmR8Z5VdPsc', type: 'youtube', title: 'Yoko Gake Tutorial' }] },
  { name: 'Daki Wakare', kanji: '抱分', category: 'yoko-sutemi-waza', videos: [{ id: 'dakiwak1', url: 'https://www.youtube.com/watch?v=P0DxLbGqFkI', type: 'youtube', title: 'Daki Wakare Tutorial' }] },
  { name: 'O Soto Makikomi', kanji: '大外巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'osotomak1', url: 'https://www.youtube.com/watch?v=mVp0KqXJP7s', type: 'youtube', title: 'O Soto Makikomi Tutorial' }] },
  { name: 'Uchi Mata Makikomi', kanji: '内股巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'uchimamak1', url: 'https://www.youtube.com/watch?v=GK6TZ8Rqk5c', type: 'youtube', title: 'Uchi Mata Makikomi Tutorial' }] },
  { name: 'Harai Makikomi', kanji: '払巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'haraimak1', url: 'https://www.youtube.com/watch?v=n8R3WQyMBdk', type: 'youtube', title: 'Harai Makikomi Tutorial' }] },
  { name: 'Ko Uchi Makikomi', kanji: '小内巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'kouchimak1', url: 'https://www.youtube.com/watch?v=L1TdGkPz9vU', type: 'youtube', title: 'Ko Uchi Makikomi Tutorial' }] },
  { name: 'Kani Basami', kanji: '蟹挟', category: 'yoko-sutemi-waza', videos: [{ id: 'kani1', url: 'https://www.youtube.com/watch?v=5b8vLPjP0nY', type: 'youtube', title: 'Kani Basami Tutorial' }] },
  { name: 'Kawazu Gake', kanji: '河津掛', category: 'yoko-sutemi-waza', videos: [{ id: 'kawazu1', url: 'https://www.youtube.com/watch?v=7jMlz1Xn_Hs', type: 'youtube', title: 'Kawazu Gake Tutorial' }] },
];

// Search function with fuzzy matching and optional category filter
export function searchKodokanThrows(query: string, category?: ThrowCategory): KodokanThrow[] {
  let results = kodokanThrowsDatabase;
  
  // Filter by category first
  if (category) {
    results = results.filter(t => t.category === category);
  }
  
  // Then filter by query
  if (query.trim()) {
    const normalizedQuery = query.toLowerCase().trim();
    results = results.filter(throwData => {
      const nameMatch = throwData.name.toLowerCase().includes(normalizedQuery);
      const kanjiMatch = throwData.kanji?.includes(normalizedQuery);
      const nameNoSpaces = throwData.name.toLowerCase().replace(/\s/g, '');
      const queryNoSpaces = normalizedQuery.replace(/\s/g, '');
      const noSpaceMatch = nameNoSpaces.includes(queryNoSpaces);
      return nameMatch || kanjiMatch || noSpaceMatch;
    });
  }
  
  return results;
}
