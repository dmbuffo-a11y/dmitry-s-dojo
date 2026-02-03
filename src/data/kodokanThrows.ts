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

// Complete Kodokan Nage-waza database with official Kodokan × IJF Academy YouTube links
export const kodokanThrowsDatabase: KodokanThrow[] = [
  // Te-waza (Hand techniques) - 手技
  { name: 'Seoi Nage', kanji: '背負投', category: 'te-waza', videos: [{ id: 'seoi1', url: 'https://www.youtube.com/watch?v=zIq0xI0ogxk', type: 'youtube', title: 'Seoi Nage - Kodokan' }] },
  { name: 'Ippon Seoi Nage', kanji: '一本背負投', category: 'te-waza', videos: [{ id: 'ippon1', url: 'https://www.youtube.com/watch?v=FQnOlCxo4oI', type: 'youtube', title: 'Ippon Seoi Nage - Kodokan' }] },
  { name: 'Seoi Otoshi', kanji: '背負落', category: 'te-waza', videos: [{ id: 'seoiot1', url: 'https://www.youtube.com/watch?v=vu1TMVNnq34', type: 'youtube', title: 'Seoi Otoshi - Kodokan' }] },
  { name: 'Tai Otoshi', kanji: '体落', category: 'te-waza', videos: [{ id: 'tai1', url: 'https://www.youtube.com/watch?v=4x6S3Q-Ktv8', type: 'youtube', title: 'Tai Otoshi - Kodokan' }] },
  { name: 'Kata Guruma', kanji: '肩車', category: 'te-waza', videos: [{ id: 'kata1', url: 'https://www.youtube.com/watch?v=cnHRhSy8yi4', type: 'youtube', title: 'Kata Guruma - Kodokan' }] },
  { name: 'Sukui Nage', kanji: '掬投', category: 'te-waza', videos: [{ id: 'sukui1', url: 'https://www.youtube.com/watch?v=vU6aJ2kFxoI', type: 'youtube', title: 'Sukui Nage - Kodokan' }] },
  { name: 'Obi Otoshi', kanji: '帯落', category: 'te-waza', videos: [{ id: 'obi1', url: 'https://www.youtube.com/watch?v=ff8U2TVZIYI', type: 'youtube', title: 'Obi Otoshi - Kodokan' }] },
  { name: 'Uki Otoshi', kanji: '浮落', category: 'te-waza', videos: [{ id: 'uki1', url: 'https://www.youtube.com/watch?v=6H5tmncOY4Q', type: 'youtube', title: 'Uki Otoshi - Kodokan' }] },
  { name: 'Sumi Otoshi', kanji: '隅落', category: 'te-waza', videos: [{ id: 'sumi1', url: 'https://www.youtube.com/watch?v=lLU9wv52ni0', type: 'youtube', title: 'Sumi Otoshi - Kodokan' }] },
  { name: 'Yama Arashi', kanji: '山嵐', category: 'te-waza', videos: [{ id: 'yama1', url: 'https://www.youtube.com/watch?v=MGlyKmSuzdc', type: 'youtube', title: 'Yama Arashi - Kodokan' }] },
  { name: 'Morote Gari', kanji: '双手刈', category: 'te-waza', videos: [{ id: 'moroteg1', url: 'https://www.youtube.com/watch?v=BHLQS4K85bs', type: 'youtube', title: 'Morote Gari - Kodokan' }] },
  { name: 'Kuchiki Taoshi', kanji: '朽木倒', category: 'te-waza', videos: [{ id: 'kuchiki1', url: 'https://www.youtube.com/watch?v=ZNL47q1aJNY', type: 'youtube', title: 'Kuchiki Taoshi - Kodokan' }] },
  { name: 'Kibisu Gaeshi', kanji: '踵返', category: 'te-waza', videos: [{ id: 'kibisu1', url: 'https://www.youtube.com/watch?v=tJylJYfBliA', type: 'youtube', title: 'Kibisu Gaeshi - Kodokan' }] },
  { name: 'Uchi Mata Sukashi', kanji: '内股透', category: 'te-waza', videos: [{ id: 'uchisukas1', url: 'https://www.youtube.com/watch?v=V-RS3uhtVWM', type: 'youtube', title: 'Uchi Mata Sukashi - Kodokan' }] },
  { name: 'Ko Uchi Gaeshi', kanji: '小内返', category: 'te-waza', videos: [{ id: 'kouchig1', url: 'https://www.youtube.com/watch?v=_MWAdYi_LC4', type: 'youtube', title: 'Ko Uchi Gaeshi - Kodokan' }] },

  // Koshi-waza (Hip techniques) - 腰技
  { name: 'Uki Goshi', kanji: '浮腰', category: 'koshi-waza', videos: [{ id: 'ukig1', url: 'https://www.youtube.com/watch?v=bPKwtB4lyOQ', type: 'youtube', title: 'Uki Goshi - Kodokan' }] },
  { name: 'O Goshi', kanji: '大腰', category: 'koshi-waza', videos: [{ id: 'ogoshi1', url: 'https://www.youtube.com/watch?v=yhu1mfy2vJ4', type: 'youtube', title: 'O Goshi - Kodokan' }] },
  { name: 'Koshi Guruma', kanji: '腰車', category: 'koshi-waza', videos: [{ id: 'koshig1', url: 'https://www.youtube.com/watch?v=SU7Id6uVJ44', type: 'youtube', title: 'Koshi Guruma - Kodokan' }] },
  { name: 'Tsurikomi Goshi', kanji: '釣込腰', category: 'koshi-waza', videos: [{ id: 'tsurik1', url: 'https://www.youtube.com/watch?v=McfzA0yRVt4', type: 'youtube', title: 'Tsurikomi Goshi - Kodokan' }] },
  { name: 'Sode Tsurikomi Goshi', kanji: '袖釣込腰', category: 'koshi-waza', videos: [{ id: 'sodet1', url: 'https://www.youtube.com/watch?v=QsmAxpmYLOI', type: 'youtube', title: 'Sode Tsurikomi Goshi - Kodokan' }] },
  { name: 'Harai Goshi', kanji: '払腰', category: 'koshi-waza', videos: [{ id: 'haraig1', url: 'https://www.youtube.com/watch?v=qTo8HlAAkOo', type: 'youtube', title: 'Harai Goshi - Kodokan' }] },
  { name: 'Tsuri Goshi', kanji: '釣腰', category: 'koshi-waza', videos: [{ id: 'tsurig1', url: 'https://www.youtube.com/watch?v=51Htlp7xEvE', type: 'youtube', title: 'Tsuri Goshi - Kodokan' }] },
  { name: 'Hane Goshi', kanji: '跳腰', category: 'koshi-waza', videos: [{ id: 'haneg1', url: 'https://www.youtube.com/watch?v=M9_7De6A1kk', type: 'youtube', title: 'Hane Goshi - Kodokan' }] },
  { name: 'Utsuri Goshi', kanji: '移腰', category: 'koshi-waza', videos: [{ id: 'utsurig1', url: 'https://www.youtube.com/watch?v=4pQd_bEnlf0', type: 'youtube', title: 'Utsuri Goshi - Kodokan' }] },
  { name: 'Ushiro Goshi', kanji: '後腰', category: 'koshi-waza', videos: [{ id: 'ushirog1', url: 'https://www.youtube.com/watch?v=ORIYstuxYT8', type: 'youtube', title: 'Ushiro Goshi - Kodokan' }] },

  // Ashi-waza (Foot/Leg techniques) - 足技
  { name: 'De Ashi Harai', kanji: '出足払', category: 'ashi-waza', videos: [{ id: 'deashi1', url: 'https://www.youtube.com/watch?v=4BUUvqxi_Kk', type: 'youtube', title: 'De Ashi Harai - Kodokan' }] },
  { name: 'Hiza Guruma', kanji: '膝車', category: 'ashi-waza', videos: [{ id: 'hiza1', url: 'https://www.youtube.com/watch?v=JPJx9-oAVns', type: 'youtube', title: 'Hiza Guruma - Kodokan' }] },
  { name: 'Sasae Tsurikomi Ashi', kanji: '支釣込足', category: 'ashi-waza', videos: [{ id: 'sasae1', url: 'https://www.youtube.com/watch?v=699i--pvYmE', type: 'youtube', title: 'Sasae Tsurikomi Ashi - Kodokan' }] },
  { name: 'Osoto Gari', kanji: '大外刈', category: 'ashi-waza', videos: [{ id: 'osotog1', url: 'https://www.youtube.com/watch?v=c-A_nP7mKAc', type: 'youtube', title: 'Osoto Gari - Kodokan' }] },
  { name: 'Ouchi Gari', kanji: '大内刈', category: 'ashi-waza', videos: [{ id: 'ouchig1', url: 'https://www.youtube.com/watch?v=0itJFhV9pDQ', type: 'youtube', title: 'Ouchi Gari - Kodokan' }] },
  { name: 'Kosoto Gari', kanji: '小外刈', category: 'ashi-waza', videos: [{ id: 'kosotog1', url: 'https://www.youtube.com/watch?v=jeQ541ScLB4', type: 'youtube', title: 'Kosoto Gari - Kodokan' }] },
  { name: 'Kouchi Gari', kanji: '小内刈', category: 'ashi-waza', videos: [{ id: 'kouchig1', url: 'https://www.youtube.com/watch?v=3Jb3tZvr9Ng', type: 'youtube', title: 'Kouchi Gari - Kodokan' }] },
  { name: 'Okuri Ashi Harai', kanji: '送足払', category: 'ashi-waza', videos: [{ id: 'okuri1', url: 'https://www.youtube.com/watch?v=nw1ZdRjrdRI', type: 'youtube', title: 'Okuri Ashi Harai - Kodokan' }] },
  { name: 'Uchi Mata', kanji: '内股', category: 'ashi-waza', videos: [{ id: 'uchim1', url: 'https://www.youtube.com/watch?v=iUpSu5J-bgw', type: 'youtube', title: 'Uchi Mata - Kodokan' }] },
  { name: 'Kosoto Gake', kanji: '小外掛', category: 'ashi-waza', videos: [{ id: 'kosotogk1', url: 'https://www.youtube.com/watch?v=8b6kY4s4zH4', type: 'youtube', title: 'Kosoto Gake - Kodokan' }] },
  { name: 'Ashi Guruma', kanji: '足車', category: 'ashi-waza', videos: [{ id: 'ashig1', url: 'https://www.youtube.com/watch?v=ROeayhvom9U', type: 'youtube', title: 'Ashi Guruma - Kodokan' }] },
  { name: 'Harai Tsurikomi Ashi', kanji: '払釣込足', category: 'ashi-waza', videos: [{ id: 'haraitsu1', url: 'https://www.youtube.com/watch?v=gGPXvWL8VbE', type: 'youtube', title: 'Harai Tsurikomi Ashi - Kodokan' }] },
  { name: 'O Guruma', kanji: '大車', category: 'ashi-waza', videos: [{ id: 'oguru1', url: 'https://www.youtube.com/watch?v=SnZciTAY9vc', type: 'youtube', title: 'O Guruma - Kodokan' }] },
  { name: 'Osoto Guruma', kanji: '大外車', category: 'ashi-waza', videos: [{ id: 'osotogur1', url: 'https://www.youtube.com/watch?v=92KbCm6pQeI', type: 'youtube', title: 'Osoto Guruma - Kodokan' }] },
  { name: 'Osoto Otoshi', kanji: '大外落', category: 'ashi-waza', videos: [{ id: 'osotoot1', url: 'https://www.youtube.com/watch?v=2DsVvDw7b8g', type: 'youtube', title: 'Osoto Otoshi - Kodokan' }] },
  { name: 'Tsubame Gaeshi', kanji: '燕返', category: 'ashi-waza', videos: [{ id: 'tsubame1', url: 'https://www.youtube.com/watch?v=GwweWqqFB5g', type: 'youtube', title: 'Tsubame Gaeshi - Kodokan' }] },
  { name: 'Osoto Gaeshi', kanji: '大外返', category: 'ashi-waza', videos: [{ id: 'osotogae1', url: 'https://www.youtube.com/watch?v=8ZjM3X_EANo', type: 'youtube', title: 'Osoto Gaeshi - Kodokan' }] },
  { name: 'Ouchi Gaeshi', kanji: '大内返', category: 'ashi-waza', videos: [{ id: 'ouchigae1', url: 'https://www.youtube.com/watch?v=dCyZTXyjIXE', type: 'youtube', title: 'Ouchi Gaeshi - Kodokan' }] },
  { name: 'Hane Goshi Gaeshi', kanji: '跳腰返', category: 'ashi-waza', videos: [{ id: 'hanegae1', url: 'https://www.youtube.com/watch?v=9bZAZSBtnGs', type: 'youtube', title: 'Hane Goshi Gaeshi - Kodokan' }] },
  { name: 'Harai Goshi Gaeshi', kanji: '払腰返', category: 'ashi-waza', videos: [{ id: 'haraigae1', url: 'https://www.youtube.com/watch?v=4U3It-7PPsc', type: 'youtube', title: 'Harai Goshi Gaeshi - Kodokan' }] },
  { name: 'Uchi Mata Gaeshi', kanji: '内股返', category: 'ashi-waza', videos: [{ id: 'uchimgae1', url: 'https://www.youtube.com/watch?v=Sy6sLWxkWYw', type: 'youtube', title: 'Uchi Mata Gaeshi - Kodokan' }] },

  // Ma-sutemi-waza (Rear sacrifice) - 真捨身技
  { name: 'Tomoe Nage', kanji: '巴投', category: 'ma-sutemi-waza', videos: [{ id: 'tomoe1', url: 'https://www.youtube.com/watch?v=880WbHvHv6A', type: 'youtube', title: 'Tomoe Nage - Kodokan' }] },
  { name: 'Sumi Gaeshi', kanji: '隅返', category: 'ma-sutemi-waza', videos: [{ id: 'sumig1', url: 'https://www.youtube.com/watch?v=5VhduA5xkbA', type: 'youtube', title: 'Sumi Gaeshi - Kodokan' }] },
  { name: 'Hikikomi Gaeshi', kanji: '引込返', category: 'ma-sutemi-waza', videos: [{ id: 'hikik1', url: 'https://www.youtube.com/watch?v=92zUYWBp5N8', type: 'youtube', title: 'Hikikomi Gaeshi - Kodokan' }] },
  { name: 'Ura Nage', kanji: '裏投', category: 'ma-sutemi-waza', videos: [{ id: 'ura1', url: 'https://www.youtube.com/watch?v=Fgi9b8DJ5sQ', type: 'youtube', title: 'Ura Nage - Kodokan' }] },
  { name: 'Tawara Gaeshi', kanji: '俵返', category: 'ma-sutemi-waza', videos: [{ id: 'tawara1', url: 'https://www.youtube.com/watch?v=TmTWgrmViZc', type: 'youtube', title: 'Tawara Gaeshi - Kodokan' }] },

  // Yoko-sutemi-waza (Side sacrifice) - 横捨身技
  { name: 'Yoko Otoshi', kanji: '横落', category: 'yoko-sutemi-waza', videos: [{ id: 'yokoot1', url: 'https://www.youtube.com/watch?v=MnNG67pF_a0', type: 'youtube', title: 'Yoko Otoshi - Kodokan' }] },
  { name: 'Tani Otoshi', kanji: '谷落', category: 'yoko-sutemi-waza', videos: [{ id: 'tani1', url: 'https://www.youtube.com/watch?v=3b9Me3Fohpk', type: 'youtube', title: 'Tani Otoshi - Kodokan' }] },
  { name: 'Hane Makikomi', kanji: '跳巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'hanemak1', url: 'https://www.youtube.com/watch?v=6CRBGLGz9j8', type: 'youtube', title: 'Hane Makikomi - Kodokan' }] },
  { name: 'Soto Makikomi', kanji: '外巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'sotom1', url: 'https://www.youtube.com/watch?v=bWG9O1BVKtQ', type: 'youtube', title: 'Soto Makikomi - Kodokan' }] },
  { name: 'Uchi Makikomi', kanji: '内巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'uchimak1', url: 'https://www.youtube.com/watch?v=5BowcjduxVc', type: 'youtube', title: 'Uchi Makikomi - Kodokan' }] },
  { name: 'Uki Waza', kanji: '浮技', category: 'yoko-sutemi-waza', videos: [{ id: 'ukiw1', url: 'https://www.youtube.com/watch?v=weVOpJ63gII', type: 'youtube', title: 'Uki Waza - Kodokan' }] },
  { name: 'Yoko Wakare', kanji: '横分', category: 'yoko-sutemi-waza', videos: [{ id: 'yokowak1', url: 'https://www.youtube.com/watch?v=bp1tscHlePI', type: 'youtube', title: 'Yoko Wakare - Kodokan' }] },
  { name: 'Yoko Guruma', kanji: '横車', category: 'yoko-sutemi-waza', videos: [{ id: 'yokog1', url: 'https://www.youtube.com/watch?v=MehP6I5cY2c', type: 'youtube', title: 'Yoko Guruma - Kodokan' }] },
  { name: 'Yoko Gake', kanji: '横掛', category: 'yoko-sutemi-waza', videos: [{ id: 'yokogak1', url: 'https://www.youtube.com/watch?v=tP1Sj1uDfSo', type: 'youtube', title: 'Yoko Gake - Kodokan' }] },
  { name: 'Daki Wakare', kanji: '抱分', category: 'yoko-sutemi-waza', videos: [{ id: 'dakiwak1', url: 'https://www.youtube.com/watch?v=Hr0cOMGBDYo', type: 'youtube', title: 'Daki Wakare - Kodokan' }] },
  { name: 'O Soto Makikomi', kanji: '大外巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'osotomak1', url: 'https://www.youtube.com/watch?v=DGDv2oMwmas', type: 'youtube', title: 'O Soto Makikomi - Kodokan' }] },
  { name: 'Uchi Mata Makikomi', kanji: '内股巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'uchimamak1', url: 'https://www.youtube.com/watch?v=jZXENTLpJCI', type: 'youtube', title: 'Uchi Mata Makikomi - Kodokan' }] },
  { name: 'Harai Makikomi', kanji: '払巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'haraimak1', url: 'https://www.youtube.com/watch?v=VBaHzKaCXss', type: 'youtube', title: 'Harai Makikomi - Kodokan' }] },
  { name: 'Ko Uchi Makikomi', kanji: '小内巻込', category: 'yoko-sutemi-waza', videos: [{ id: 'kouchimak1', url: 'https://www.youtube.com/watch?v=_1eygIXLD_w', type: 'youtube', title: 'Ko Uchi Makikomi - Kodokan' }] },
  { name: 'Kani Basami', kanji: '蟹挟', category: 'yoko-sutemi-waza', videos: [{ id: 'kani1', url: 'https://www.youtube.com/watch?v=OR-HGHnarYc', type: 'youtube', title: 'Kani Basami - Kodokan' }] },
  { name: 'Kawazu Gake', kanji: '河津掛', category: 'yoko-sutemi-waza', videos: [{ id: 'kawazu1', url: 'https://www.youtube.com/watch?v=w6G57bWACi0', type: 'youtube', title: 'Kawazu Gake - Kodokan' }] },
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
