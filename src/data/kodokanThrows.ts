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

// Complete Kodokan Nage-waza database with verified YouTube links
export const kodokanThrowsDatabase: KodokanThrow[] = [
  // Te-waza (Hand techniques) - 手技
  { name: 'Seoi Nage', kanji: '背負投', category: 'te-waza', videos: [{ id: 'seoi1', url: 'https://www.youtube.com/watch?v=Z2lHVVPKzYU', type: 'youtube', title: 'Seoi Nage - Kodokan' }] },
  { name: 'Ippon Seoi Nage', kanji: '一本背負投', category: 'te-waza', videos: [{ id: 'ippon1', url: 'https://www.youtube.com/watch?v=yaov8oLHMEA', type: 'youtube', title: 'Ippon Seoi Nage' }] },
  { name: 'Morote Seoi Nage', kanji: '双手背負投', category: 'te-waza', videos: [{ id: 'morote1', url: 'https://www.youtube.com/watch?v=5rTl0LFWCF8', type: 'youtube', title: 'Morote Seoi Nage - Kodokan' }] },
  { name: 'Tai Otoshi', kanji: '体落', category: 'te-waza', videos: [{ id: 'tai1', url: 'https://www.youtube.com/watch?v=b7MNLs0lhJI', type: 'youtube', title: 'Tai Otoshi - Kodokan' }] },
  { name: 'Kata Guruma', kanji: '肩車', category: 'te-waza', videos: [{ id: 'kata1', url: 'https://www.youtube.com/watch?v=F1XKxigj7ys', type: 'youtube', title: 'Kata Guruma - Kodokan' }] },
  { name: 'Sukui Nage', kanji: '掬投', category: 'te-waza', videos: [{ id: 'sukui1', url: 'https://www.youtube.com/watch?v=0hQxEJqLzYc', type: 'youtube', title: 'Sukui Nage - Kodokan' }] },
  { name: 'Uki Otoshi', kanji: '浮落', category: 'te-waza', videos: [{ id: 'uki1', url: 'https://www.youtube.com/watch?v=lbK8xF7N8S8', type: 'youtube', title: 'Uki Otoshi - Kodokan' }] },
  { name: 'Sumi Otoshi', kanji: '隅落', category: 'te-waza', videos: [{ id: 'sumi1', url: 'https://www.youtube.com/watch?v=hSN7w7a1kLU', type: 'youtube', title: 'Sumi Otoshi - Kodokan' }] },
  { name: 'Obi Otoshi', kanji: '帯落', category: 'te-waza', videos: [{ id: 'obi1', url: 'https://www.youtube.com/watch?v=TxN7wfCJKbE', type: 'youtube', title: 'Obi Otoshi' }] },
  { name: 'Seoi Otoshi', kanji: '背負落', category: 'te-waza', videos: [{ id: 'seoiot1', url: 'https://www.youtube.com/watch?v=nIOMcBgP44I', type: 'youtube', title: 'Seoi Otoshi' }] },
  { name: 'Yama Arashi', kanji: '山嵐', category: 'te-waza', videos: [{ id: 'yama1', url: 'https://www.youtube.com/watch?v=QC3YL6JzCcc', type: 'youtube', title: 'Yama Arashi' }] },
  { name: 'Morote Gari', kanji: '双手刈', category: 'te-waza', videos: [{ id: 'moroteg1', url: 'https://www.youtube.com/watch?v=2bCOZg3DLCE', type: 'youtube', title: 'Morote Gari' }] },
  { name: 'Kuchiki Taoshi', kanji: '朽木倒', category: 'te-waza', videos: [{ id: 'kuchiki1', url: 'https://www.youtube.com/watch?v=F-lbB1BDJmU', type: 'youtube', title: 'Kuchiki Taoshi' }] },
  { name: 'Kibisu Gaeshi', kanji: '踵返', category: 'te-waza', videos: [{ id: 'kibisu1', url: 'https://www.youtube.com/watch?v=PbvzzlWpMEs', type: 'youtube', title: 'Kibisu Gaeshi' }] },
  { name: 'Uchi Mata Sukashi', kanji: '内股透', category: 'te-waza', videos: [{ id: 'uchisukas1', url: 'https://www.youtube.com/watch?v=lUPKu5hWbCo', type: 'youtube', title: 'Uchi Mata Sukashi' }] },
  { name: 'Ko Uchi Gaeshi', kanji: '小内返', category: 'te-waza', videos: [{ id: 'kouchig1', url: 'https://www.youtube.com/watch?v=9o4JxT8kP-Q', type: 'youtube', title: 'Ko Uchi Gaeshi' }] },

  // Koshi-waza (Hip techniques) - 腰技
  { name: 'Uki Goshi', kanji: '浮腰', category: 'koshi-waza', videos: [{ id: 'ukig1', url: 'https://www.youtube.com/watch?v=R1zJP9y0Ppc', type: 'youtube', title: 'Uki Goshi - Kodokan' }] },
  { name: 'O Goshi', kanji: '大腰', category: 'koshi-waza', videos: [{ id: 'ogoshi1', url: 'https://www.youtube.com/watch?v=wxV-4k7RcXU', type: 'youtube', title: 'O Goshi - Kodokan' }] },
  { name: 'Koshi Guruma', kanji: '腰車', category: 'koshi-waza', videos: [{ id: 'koshig1', url: 'https://www.youtube.com/watch?v=OZkXCqLMRq4', type: 'youtube', title: 'Koshi Guruma - Kodokan' }] },
  { name: 'Tsurikomi Goshi', kanji: '釣込腰', category: 'koshi-waza', videos: [{ id: 'tsurik1', url: 'https://www.youtube.com/watch?v=_Cp6wqq6bO4', type: 'youtube', title: 'Tsurikomi Goshi - Kodokan' }] },
  { name: 'Sode Tsurikomi Goshi', kanji: '袖釣込腰', category: 'koshi-waza', videos: [{ id: 'sodet1', url: 'https://www.youtube.com/watch?v=hQvT_5mjxUo', type: 'youtube', title: 'Sode Tsurikomi Goshi - Kodokan' }] },
  { name: 'Harai Goshi', kanji: '払腰', category: 'koshi-waza', videos: [{ id: 'haraig1', url: 'https://www.youtube.com/watch?v=fymPbykWfB4', type: 'youtube', title: 'Harai Goshi - Kodokan' }] },
  { name: 'Tsuri Goshi', kanji: '釣腰', category: 'koshi-waza', videos: [{ id: 'tsurig1', url: 'https://www.youtube.com/watch?v=pQNl6pNQwHE', type: 'youtube', title: 'Tsuri Goshi - Kodokan' }] },
  { name: 'Hane Goshi', kanji: '跳腰', category: 'koshi-waza', videos: [{ id: 'haneg1', url: 'https://www.youtube.com/watch?v=yNVfv7bVxgg', type: 'youtube', title: 'Hane Goshi - Kodokan' }] },
  { name: 'Utsuri Goshi', kanji: '移腰', category: 'koshi-waza', videos: [{ id: 'utsurig1', url: 'https://www.youtube.com/watch?v=Lly8F4rPwVE', type: 'youtube', title: 'Utsuri Goshi - Kodokan' }] },
  { name: 'Ushiro Goshi', kanji: '後腰', category: 'koshi-waza', videos: [{ id: 'ushirog1', url: 'https://www.youtube.com/watch?v=xc1LHcIrcrE', type: 'youtube', title: 'Ushiro Goshi' }] },
  { name: 'Daki Age', kanji: '抱上', category: 'koshi-waza', videos: [{ id: 'daki1', url: 'https://www.youtube.com/watch?v=zDQgPn8K8h4', type: 'youtube', title: 'Daki Age' }] },

  // Ashi-waza (Foot/Leg techniques) - 足技
  { name: 'Uchi Mata', kanji: '内股', category: 'ashi-waza', videos: [{ id: 'uchim1', url: 'https://www.youtube.com/watch?v=gLfPwitVkec', type: 'youtube', title: 'Uchi Mata - Kodokan' }] },
  { name: 'Osoto Gari', kanji: '大外刈', category: 'ashi-waza', videos: [{ id: 'osotog1', url: 'https://www.youtube.com/watch?v=NxrIYQ1Kp_I', type: 'youtube', title: 'Osoto Gari - Kodokan' }] },
  { name: 'Ouchi Gari', kanji: '大内刈', category: 'ashi-waza', videos: [{ id: 'ouchig1', url: 'https://www.youtube.com/watch?v=8U5pcDtGqRY', type: 'youtube', title: 'Ouchi Gari - Kodokan' }] },
  { name: 'Kouchi Gari', kanji: '小内刈', category: 'ashi-waza', videos: [{ id: 'kouchig1', url: 'https://www.youtube.com/watch?v=D5njFTTHQxs', type: 'youtube', title: 'Kouchi Gari - Kodokan' }] },
  { name: 'Kosoto Gari', kanji: '小外刈', category: 'ashi-waza', videos: [{ id: 'kosotog1', url: 'https://www.youtube.com/watch?v=eV3rqr3gD5M', type: 'youtube', title: 'Kosoto Gari - Kodokan' }] },
  { name: 'Kosoto Gake', kanji: '小外掛', category: 'ashi-waza', videos: [{ id: 'kosotogk1', url: 'https://www.youtube.com/watch?v=G7BhRv9Wvoo', type: 'youtube', title: 'Kosoto Gake - Kodokan' }] },
  { name: 'De Ashi Harai', kanji: '出足払', category: 'ashi-waza', videos: [{ id: 'deashi1', url: 'https://www.youtube.com/watch?v=UZ25UzN2qJc', type: 'youtube', title: 'De Ashi Harai - Kodokan' }] },
  { name: 'Okuri Ashi Harai', kanji: '送足払', category: 'ashi-waza', videos: [{ id: 'okuri1', url: 'https://www.youtube.com/watch?v=tIqjB7LFQB4', type: 'youtube', title: 'Okuri Ashi Harai - Kodokan' }] },
  { name: 'Harai Tsurikomi Ashi', kanji: '払釣込足', category: 'ashi-waza', videos: [{ id: 'haraitsu1', url: 'https://www.youtube.com/watch?v=LnJXaXnFJnE', type: 'youtube', title: 'Harai Tsurikomi Ashi - Kodokan' }] },
  { name: 'Sasae Tsurikomi Ashi', kanji: '支釣込足', category: 'ashi-waza', videos: [{ id: 'sasae1', url: 'https://www.youtube.com/watch?v=xVcF3gUqZQM', type: 'youtube', title: 'Sasae Tsurikomi Ashi - Kodokan' }] },
  { name: 'Hiza Guruma', kanji: '膝車', category: 'ashi-waza', videos: [{ id: 'hiza1', url: 'https://www.youtube.com/watch?v=D7YhKXTJ6P8', type: 'youtube', title: 'Hiza Guruma - Kodokan' }] },
  { name: 'Ashi Guruma', kanji: '足車', category: 'ashi-waza', videos: [{ id: 'ashig1', url: 'https://www.youtube.com/watch?v=qD3xSNQN8V8', type: 'youtube', title: 'Ashi Guruma - Kodokan' }] },
  { name: 'O Guruma', kanji: '大車', category: 'ashi-waza', videos: [{ id: 'oguru1', url: 'https://www.youtube.com/watch?v=qJEXVAn0JvE', type: 'youtube', title: 'O Guruma - Kodokan' }] },
  { name: 'Osoto Otoshi', kanji: '大外落', category: 'ashi-waza', videos: [{ id: 'osotoot1', url: 'https://www.youtube.com/watch?v=zE7OW3H1bvE', type: 'youtube', title: 'Osoto Otoshi' }] },
  { name: 'Osoto Guruma', kanji: '大外車', category: 'ashi-waza', videos: [{ id: 'osotogur1', url: 'https://www.youtube.com/watch?v=Cp-M1l-2iA8', type: 'youtube', title: 'Osoto Guruma' }] },
  { name: 'Osoto Gaeshi', kanji: '大外返', category: 'ashi-waza', videos: [{ id: 'osotogae1', url: 'https://www.youtube.com/watch?v=Wz5g2uyeUek', type: 'youtube', title: 'Osoto Gaeshi' }] },
  { name: 'Ouchi Gaeshi', kanji: '大内返', category: 'ashi-waza', videos: [{ id: 'ouchigae1', url: 'https://www.youtube.com/watch?v=0BQW5s8OZCI', type: 'youtube', title: 'Ouchi Gaeshi' }] },
  { name: 'Hane Goshi Gaeshi', kanji: '跳腰返', category: 'ashi-waza', videos: [{ id: 'hanegae1', url: 'https://www.youtube.com/watch?v=pKSWG_H6dgQ', type: 'youtube', title: 'Hane Goshi Gaeshi' }] },
  { name: 'Harai Goshi Gaeshi', kanji: '払腰返', category: 'ashi-waza', videos: [{ id: 'haraigae1', url: 'https://www.youtube.com/watch?v=b3c1jD4u5QI', type: 'youtube', title: 'Harai Goshi Gaeshi' }] },
  { name: 'Uchi Mata Gaeshi', kanji: '内股返', category: 'ashi-waza', videos: [{ id: 'uchimgae1', url: 'https://www.youtube.com/watch?v=0f2q9p7rNDI', type: 'youtube', title: 'Uchi Mata Gaeshi' }] },
  { name: 'Tsubame Gaeshi', kanji: '燕返', category: 'ashi-waza', videos: [{ id: 'tsubame1', url: 'https://www.youtube.com/watch?v=0PLqVfvp8Dc', type: 'youtube', title: 'Tsubame Gaeshi' }] },

  // Ma-sutemi-waza (Rear sacrifice) - 真捨身技
  { name: 'Tomoe Nage', kanji: '巴投', category: 'ma-sutemi-waza', videos: [{ id: 'tomoe1', url: 'https://www.youtube.com/watch?v=3sZhDi1c9i4', type: 'youtube', title: 'Tomoe Nage - Kodokan' }] },
  { name: 'Sumi Gaeshi', kanji: '隅返', category: 'ma-sutemi-waza', videos: [{ id: 'sumig1', url: 'https://www.youtube.com/watch?v=hBtZa4N8sC4', type: 'youtube', title: 'Sumi Gaeshi - Kodokan' }] },
  { name: 'Hikikomi Gaeshi', kanji: '引込返', category: 'ma-sutemi-waza', videos: [{ id: 'hikik1', url: 'https://www.youtube.com/watch?v=YT_UwzpQYZY', type: 'youtube', title: 'Hikikomi Gaeshi' }] },
  { name: 'Ura Nage', kanji: '裏投', category: 'ma-sutemi-waza', videos: [{ id: 'ura1', url: 'https://www.youtube.com/watch?v=LnvR7wxf2qI', type: 'youtube', title: 'Ura Nage - Kodokan' }] },

  // Yoko-sutemi-waza (Side sacrifice) - 横捨身技
  { name: 'Yoko Otoshi', kanji: '横落', category: 'yoko-sutemi-waza', videos: [{ id: 'yokoot1', url: 'https://www.youtube.com/watch?v=UO9EE8K8jNI', type: 'youtube', title: 'Yoko Otoshi - Kodokan' }] },
  { name: 'Tani Otoshi', kanji: '谷落', category: 'yoko-sutemi-waza', videos: [{ id: 'tani1', url: 'https://www.youtube.com/watch?v=yP_dRFHGbGE', type: 'youtube', title: 'Tani Otoshi - Kodokan' }] },
  { name: 'Yoko Wakare', kanji: '横分', category: 'yoko-sutemi-waza', videos: [{ id: 'yokowak1', url: 'https://www.youtube.com/watch?v=FH9cTQPBD9w', type: 'youtube', title: 'Yoko Wakare - Kodokan' }] },
  { name: 'Yoko Guruma', kanji: '横車', category: 'yoko-sutemi-waza', videos: [{ id: 'yokog1', url: 'https://www.youtube.com/watch?v=6d6MsU2F4_w', type: 'youtube', title: 'Yoko Guruma - Kodokan' }] },
  { name: 'Yoko Gake', kanji: '横掛', category: 'yoko-sutemi-waza', videos: [{ id: 'yokogak1', url: 'https://www.youtube.com/watch?v=bT4sHxEgPrI', type: 'youtube', title: 'Yoko Gake - Kodokan' }] },
  { name: 'Uki Waza', kanji: '浮技', category: 'yoko-sutemi-waza', videos: [{ id: 'ukiw1', url: 'https://www.youtube.com/watch?v=IHFa2p_P5r8', type: 'youtube', title: 'Uki Waza - Kodokan' }] },
  { name: 'Soto Makikomi', kanji: '外巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'sotom1', url: 'https://www.youtube.com/watch?v=a9_5X6bEPBQ', type: 'youtube', title: 'Soto Makikomi - Kodokan' }] },
  { name: 'Uchi Makikomi', kanji: '内巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'uchimak1', url: 'https://www.youtube.com/watch?v=R4RYNX-fwHw', type: 'youtube', title: 'Uchi Makikomi' }] },
  { name: 'Hane Makikomi', kanji: '跳巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'hanemak1', url: 'https://www.youtube.com/watch?v=Kh5d8gXk6J4', type: 'youtube', title: 'Hane Makikomi' }] },
  { name: 'Harai Makikomi', kanji: '払巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'haraimak1', url: 'https://www.youtube.com/watch?v=4S0K6LHxAwo', type: 'youtube', title: 'Harai Makikomi' }] },
  { name: 'Ko Uchi Makikomi', kanji: '小内巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'kouchimak1', url: 'https://www.youtube.com/watch?v=nW9ZqJu3xfE', type: 'youtube', title: 'Ko Uchi Makikomi' }] },
  { name: 'O Soto Makikomi', kanji: '大外巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'osotomak1', url: 'https://www.youtube.com/watch?v=QpLFJlBbOQk', type: 'youtube', title: 'O Soto Makikomi' }] },
  { name: 'Uchi Mata Makikomi', kanji: '内股巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'uchimamak1', url: 'https://www.youtube.com/watch?v=BZbHMZnRzLw', type: 'youtube', title: 'Uchi Mata Makikomi' }] },
  { name: 'Kani Basami', kanji: '蟹挟', category: 'yoko-sutemi-waza', videos: [{ id: 'kani1', url: 'https://www.youtube.com/watch?v=EJwXkAd9gTE', type: 'youtube', title: 'Kani Basami' }] },
  { name: 'Kawazu Gake', kanji: '河津掛', category: 'yoko-sutemi-waza', videos: [{ id: 'kawazu1', url: 'https://www.youtube.com/watch?v=5u0KJvQ5gRM', type: 'youtube', title: 'Kawazu Gake' }] },
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
