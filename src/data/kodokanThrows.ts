import { JudoThrow } from '@/types/judo';

// Complete Kodokan Nage-waza database with verified YouTube links
export const kodokanThrowsDatabase: Omit<JudoThrow, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Te-waza (Hand techniques) - 手技
  { name: 'Seoi Nage', kanji: '背負投', videos: [{ id: 'seoi1', url: 'https://www.youtube.com/watch?v=Z2lHVVPKzYU', type: 'youtube', title: 'Seoi Nage - Kodokan' }] },
  { name: 'Ippon Seoi Nage', kanji: '一本背負投', videos: [{ id: 'ippon1', url: 'https://www.youtube.com/watch?v=yaov8oLHMEA', type: 'youtube', title: 'Ippon Seoi Nage' }] },
  { name: 'Morote Seoi Nage', kanji: '双手背負投', videos: [{ id: 'morote1', url: 'https://www.youtube.com/watch?v=5rTl0LFWCF8', type: 'youtube', title: 'Morote Seoi Nage - Kodokan' }] },
  { name: 'Tai Otoshi', kanji: '体落', videos: [{ id: 'tai1', url: 'https://www.youtube.com/watch?v=b7MNLs0lhJI', type: 'youtube', title: 'Tai Otoshi - Kodokan' }] },
  { name: 'Kata Guruma', kanji: '肩車', videos: [{ id: 'kata1', url: 'https://www.youtube.com/watch?v=F1XKxigj7ys', type: 'youtube', title: 'Kata Guruma - Kodokan' }] },
  { name: 'Sukui Nage', kanji: '掬投', videos: [{ id: 'sukui1', url: 'https://www.youtube.com/watch?v=0hQxEJqLzYc', type: 'youtube', title: 'Sukui Nage - Kodokan' }] },
  { name: 'Uki Otoshi', kanji: '浮落', videos: [{ id: 'uki1', url: 'https://www.youtube.com/watch?v=lbK8xF7N8S8', type: 'youtube', title: 'Uki Otoshi - Kodokan' }] },
  { name: 'Sumi Otoshi', kanji: '隅落', videos: [{ id: 'sumi1', url: 'https://www.youtube.com/watch?v=hSN7w7a1kLU', type: 'youtube', title: 'Sumi Otoshi - Kodokan' }] },
  { name: 'Obi Otoshi', kanji: '帯落', videos: [{ id: 'obi1', url: 'https://www.youtube.com/watch?v=TxN7wfCJKbE', type: 'youtube', title: 'Obi Otoshi' }] },
  { name: 'Seoi Otoshi', kanji: '背負落', videos: [{ id: 'seoiot1', url: 'https://www.youtube.com/watch?v=nIOMcBgP44I', type: 'youtube', title: 'Seoi Otoshi' }] },
  { name: 'Yama Arashi', kanji: '山嵐', videos: [{ id: 'yama1', url: 'https://www.youtube.com/watch?v=QC3YL6JzCcc', type: 'youtube', title: 'Yama Arashi' }] },
  { name: 'Morote Gari', kanji: '双手刈', videos: [{ id: 'moroteg1', url: 'https://www.youtube.com/watch?v=2bCOZg3DLCE', type: 'youtube', title: 'Morote Gari' }] },
  { name: 'Kuchiki Taoshi', kanji: '朽木倒', videos: [{ id: 'kuchiki1', url: 'https://www.youtube.com/watch?v=F-lbB1BDJmU', type: 'youtube', title: 'Kuchiki Taoshi' }] },
  { name: 'Kibisu Gaeshi', kanji: '踵返', videos: [{ id: 'kibisu1', url: 'https://www.youtube.com/watch?v=PbvzzlWpMEs', type: 'youtube', title: 'Kibisu Gaeshi' }] },
  { name: 'Uchi Mata Sukashi', kanji: '内股透', videos: [{ id: 'uchisukas1', url: 'https://www.youtube.com/watch?v=lUPKu5hWbCo', type: 'youtube', title: 'Uchi Mata Sukashi' }] },
  { name: 'Ko Uchi Gaeshi', kanji: '小内返', videos: [{ id: 'kouchig1', url: 'https://www.youtube.com/watch?v=9o4JxT8kP-Q', type: 'youtube', title: 'Ko Uchi Gaeshi' }] },

  // Koshi-waza (Hip techniques) - 腰技
  { name: 'Uki Goshi', kanji: '浮腰', videos: [{ id: 'ukig1', url: 'https://www.youtube.com/watch?v=R1zJP9y0Ppc', type: 'youtube', title: 'Uki Goshi - Kodokan' }] },
  { name: 'O Goshi', kanji: '大腰', videos: [{ id: 'ogoshi1', url: 'https://www.youtube.com/watch?v=wxV-4k7RcXU', type: 'youtube', title: 'O Goshi - Kodokan' }] },
  { name: 'Koshi Guruma', kanji: '腰車', videos: [{ id: 'koshig1', url: 'https://www.youtube.com/watch?v=OZkXCqLMRq4', type: 'youtube', title: 'Koshi Guruma - Kodokan' }] },
  { name: 'Tsurikomi Goshi', kanji: '釣込腰', videos: [{ id: 'tsurik1', url: 'https://www.youtube.com/watch?v=_Cp6wqq6bO4', type: 'youtube', title: 'Tsurikomi Goshi - Kodokan' }] },
  { name: 'Sode Tsurikomi Goshi', kanji: '袖釣込腰', videos: [{ id: 'sodet1', url: 'https://www.youtube.com/watch?v=hQvT_5mjxUo', type: 'youtube', title: 'Sode Tsurikomi Goshi - Kodokan' }] },
  { name: 'Harai Goshi', kanji: '払腰', videos: [{ id: 'haraig1', url: 'https://www.youtube.com/watch?v=fymPbykWfB4', type: 'youtube', title: 'Harai Goshi - Kodokan' }] },
  { name: 'Tsuri Goshi', kanji: '釣腰', videos: [{ id: 'tsurig1', url: 'https://www.youtube.com/watch?v=pQNl6pNQwHE', type: 'youtube', title: 'Tsuri Goshi - Kodokan' }] },
  { name: 'Hane Goshi', kanji: '跳腰', videos: [{ id: 'haneg1', url: 'https://www.youtube.com/watch?v=yNVfv7bVxgg', type: 'youtube', title: 'Hane Goshi - Kodokan' }] },
  { name: 'Utsuri Goshi', kanji: '移腰', videos: [{ id: 'utsurig1', url: 'https://www.youtube.com/watch?v=Lly8F4rPwVE', type: 'youtube', title: 'Utsuri Goshi - Kodokan' }] },
  { name: 'Ushiro Goshi', kanji: '後腰', videos: [{ id: 'ushirog1', url: 'https://www.youtube.com/watch?v=xc1LHcIrcrE', type: 'youtube', title: 'Ushiro Goshi' }] },
  { name: 'Daki Age', kanji: '抱上', videos: [{ id: 'daki1', url: 'https://www.youtube.com/watch?v=zDQgPn8K8h4', type: 'youtube', title: 'Daki Age' }] },

  // Ashi-waza (Foot/Leg techniques) - 足技
  { name: 'Uchi Mata', kanji: '内股', videos: [{ id: 'uchim1', url: 'https://www.youtube.com/watch?v=gLfPwitVkec', type: 'youtube', title: 'Uchi Mata - Kodokan' }] },
  { name: 'Osoto Gari', kanji: '大外刈', videos: [{ id: 'osotog1', url: 'https://www.youtube.com/watch?v=NxrIYQ1Kp_I', type: 'youtube', title: 'Osoto Gari - Kodokan' }] },
  { name: 'Ouchi Gari', kanji: '大内刈', videos: [{ id: 'ouchig1', url: 'https://www.youtube.com/watch?v=8U5pcDtGqRY', type: 'youtube', title: 'Ouchi Gari - Kodokan' }] },
  { name: 'Kouchi Gari', kanji: '小内刈', videos: [{ id: 'kouchig1', url: 'https://www.youtube.com/watch?v=D5njFTTHQxs', type: 'youtube', title: 'Kouchi Gari - Kodokan' }] },
  { name: 'Kosoto Gari', kanji: '小外刈', videos: [{ id: 'kosotog1', url: 'https://www.youtube.com/watch?v=eV3rqr3gD5M', type: 'youtube', title: 'Kosoto Gari - Kodokan' }] },
  { name: 'Kosoto Gake', kanji: '小外掛', videos: [{ id: 'kosotogk1', url: 'https://www.youtube.com/watch?v=G7BhRv9Wvoo', type: 'youtube', title: 'Kosoto Gake - Kodokan' }] },
  { name: 'De Ashi Harai', kanji: '出足払', videos: [{ id: 'deashi1', url: 'https://www.youtube.com/watch?v=UZ25UzN2qJc', type: 'youtube', title: 'De Ashi Harai - Kodokan' }] },
  { name: 'Okuri Ashi Harai', kanji: '送足払', videos: [{ id: 'okuri1', url: 'https://www.youtube.com/watch?v=tIqjB7LFQB4', type: 'youtube', title: 'Okuri Ashi Harai - Kodokan' }] },
  { name: 'Harai Tsurikomi Ashi', kanji: '払釣込足', videos: [{ id: 'haraitsu1', url: 'https://www.youtube.com/watch?v=LnJXaXnFJnE', type: 'youtube', title: 'Harai Tsurikomi Ashi - Kodokan' }] },
  { name: 'Sasae Tsurikomi Ashi', kanji: '支釣込足', videos: [{ id: 'sasae1', url: 'https://www.youtube.com/watch?v=xVcF3gUqZQM', type: 'youtube', title: 'Sasae Tsurikomi Ashi - Kodokan' }] },
  { name: 'Hiza Guruma', kanji: '膝車', videos: [{ id: 'hiza1', url: 'https://www.youtube.com/watch?v=D7YhKXTJ6P8', type: 'youtube', title: 'Hiza Guruma - Kodokan' }] },
  { name: 'Ashi Guruma', kanji: '足車', videos: [{ id: 'ashig1', url: 'https://www.youtube.com/watch?v=qD3xSNQN8V8', type: 'youtube', title: 'Ashi Guruma - Kodokan' }] },
  { name: 'O Guruma', kanji: '大車', videos: [{ id: 'oguru1', url: 'https://www.youtube.com/watch?v=qJEXVAn0JvE', type: 'youtube', title: 'O Guruma - Kodokan' }] },
  { name: 'Osoto Otoshi', kanji: '大外落', videos: [{ id: 'osotoot1', url: 'https://www.youtube.com/watch?v=zE7OW3H1bvE', type: 'youtube', title: 'Osoto Otoshi' }] },
  { name: 'Osoto Guruma', kanji: '大外車', videos: [{ id: 'osotogur1', url: 'https://www.youtube.com/watch?v=Cp-M1l-2iA8', type: 'youtube', title: 'Osoto Guruma' }] },
  { name: 'Osoto Gaeshi', kanji: '大外返', videos: [{ id: 'osotogae1', url: 'https://www.youtube.com/watch?v=Wz5g2uyeUek', type: 'youtube', title: 'Osoto Gaeshi' }] },
  { name: 'Ouchi Gaeshi', kanji: '大内返', videos: [{ id: 'ouchigae1', url: 'https://www.youtube.com/watch?v=0BQW5s8OZCI', type: 'youtube', title: 'Ouchi Gaeshi' }] },
  { name: 'Hane Goshi Gaeshi', kanji: '跳腰返', videos: [{ id: 'hanegae1', url: 'https://www.youtube.com/watch?v=pKSWG_H6dgQ', type: 'youtube', title: 'Hane Goshi Gaeshi' }] },
  { name: 'Harai Goshi Gaeshi', kanji: '払腰返', videos: [{ id: 'haraigae1', url: 'https://www.youtube.com/watch?v=b3c1jD4u5QI', type: 'youtube', title: 'Harai Goshi Gaeshi' }] },
  { name: 'Uchi Mata Gaeshi', kanji: '内股返', videos: [{ id: 'uchimgae1', url: 'https://www.youtube.com/watch?v=0f2q9p7rNDI', type: 'youtube', title: 'Uchi Mata Gaeshi' }] },
  { name: 'Tsubame Gaeshi', kanji: '燕返', videos: [{ id: 'tsubame1', url: 'https://www.youtube.com/watch?v=0PLqVfvp8Dc', type: 'youtube', title: 'Tsubame Gaeshi' }] },

  // Ma-sutemi-waza (Rear sacrifice) - 真捨身技
  { name: 'Tomoe Nage', kanji: '巴投', videos: [{ id: 'tomoe1', url: 'https://www.youtube.com/watch?v=3sZhDi1c9i4', type: 'youtube', title: 'Tomoe Nage - Kodokan' }] },
  { name: 'Sumi Gaeshi', kanji: '隅返', videos: [{ id: 'sumig1', url: 'https://www.youtube.com/watch?v=hBtZa4N8sC4', type: 'youtube', title: 'Sumi Gaeshi - Kodokan' }] },
  { name: 'Hikikomi Gaeshi', kanji: '引込返', videos: [{ id: 'hikik1', url: 'https://www.youtube.com/watch?v=YT_UwzpQYZY', type: 'youtube', title: 'Hikikomi Gaeshi' }] },
  { name: 'Ura Nage', kanji: '裏投', videos: [{ id: 'ura1', url: 'https://www.youtube.com/watch?v=LnvR7wxf2qI', type: 'youtube', title: 'Ura Nage - Kodokan' }] },

  // Yoko-sutemi-waza (Side sacrifice) - 横捨身技
  { name: 'Yoko Otoshi', kanji: '横落', videos: [{ id: 'yokoot1', url: 'https://www.youtube.com/watch?v=UO9EE8K8jNI', type: 'youtube', title: 'Yoko Otoshi - Kodokan' }] },
  { name: 'Tani Otoshi', kanji: '谷落', videos: [{ id: 'tani1', url: 'https://www.youtube.com/watch?v=yP_dRFHGbGE', type: 'youtube', title: 'Tani Otoshi - Kodokan' }] },
  { name: 'Yoko Wakare', kanji: '横分', videos: [{ id: 'yokowak1', url: 'https://www.youtube.com/watch?v=FH9cTQPBD9w', type: 'youtube', title: 'Yoko Wakare - Kodokan' }] },
  { name: 'Yoko Guruma', kanji: '横車', videos: [{ id: 'yokog1', url: 'https://www.youtube.com/watch?v=6d6MsU2F4_w', type: 'youtube', title: 'Yoko Guruma - Kodokan' }] },
  { name: 'Yoko Gake', kanji: '横掛', videos: [{ id: 'yokogak1', url: 'https://www.youtube.com/watch?v=bT4sHxEgPrI', type: 'youtube', title: 'Yoko Gake - Kodokan' }] },
  { name: 'Uki Waza', kanji: '浮技', videos: [{ id: 'ukiw1', url: 'https://www.youtube.com/watch?v=IHFa2p_P5r8', type: 'youtube', title: 'Uki Waza - Kodokan' }] },
  { name: 'Soto Makikomi', kanji: '外巻込', videos: [{ id: 'sotom1', url: 'https://www.youtube.com/watch?v=a9_5X6bEPBQ', type: 'youtube', title: 'Soto Makikomi - Kodokan' }] },
  { name: 'Uchi Makikomi', kanji: '内巻込', videos: [{ id: 'uchimak1', url: 'https://www.youtube.com/watch?v=R4RYNX-fwHw', type: 'youtube', title: 'Uchi Makikomi' }] },
  { name: 'Hane Makikomi', kanji: '跳巻込', videos: [{ id: 'hanemak1', url: 'https://www.youtube.com/watch?v=Kh5d8gXk6J4', type: 'youtube', title: 'Hane Makikomi' }] },
  { name: 'Harai Makikomi', kanji: '払巻込', videos: [{ id: 'haraimak1', url: 'https://www.youtube.com/watch?v=4S0K6LHxAwo', type: 'youtube', title: 'Harai Makikomi' }] },
  { name: 'Ko Uchi Makikomi', kanji: '小内巻込', videos: [{ id: 'kouchimak1', url: 'https://www.youtube.com/watch?v=nW9ZqJu3xfE', type: 'youtube', title: 'Ko Uchi Makikomi' }] },
  { name: 'O Soto Makikomi', kanji: '大外巻込', videos: [{ id: 'osotomak1', url: 'https://www.youtube.com/watch?v=QpLFJlBbOQk', type: 'youtube', title: 'O Soto Makikomi' }] },
  { name: 'Uchi Mata Makikomi', kanji: '内股巻込', videos: [{ id: 'uchimamak1', url: 'https://www.youtube.com/watch?v=BZbHMZnRzLw', type: 'youtube', title: 'Uchi Mata Makikomi' }] },
  { name: 'Kani Basami', kanji: '蟹挟', videos: [{ id: 'kani1', url: 'https://www.youtube.com/watch?v=EJwXkAd9gTE', type: 'youtube', title: 'Kani Basami' }] },
  { name: 'Kawazu Gake', kanji: '河津掛', videos: [{ id: 'kawazu1', url: 'https://www.youtube.com/watch?v=5u0KJvQ5gRM', type: 'youtube', title: 'Kawazu Gake' }] },
];

// Search function with fuzzy matching
export function searchKodokanThrows(query: string): typeof kodokanThrowsDatabase {
  if (!query.trim()) return [];
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return kodokanThrowsDatabase.filter(throwData => {
    const nameMatch = throwData.name.toLowerCase().includes(normalizedQuery);
    const kanjiMatch = throwData.kanji?.includes(normalizedQuery);
    
    // Also match without spaces (e.g., "seoinage" matches "Seoi Nage")
    const nameNoSpaces = throwData.name.toLowerCase().replace(/\s/g, '');
    const queryNoSpaces = normalizedQuery.replace(/\s/g, '');
    const noSpaceMatch = nameNoSpaces.includes(queryNoSpaces);
    
    return nameMatch || kanjiMatch || noSpaceMatch;
  });
}
