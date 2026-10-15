import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'hi';

export const TRANSLATIONS = {
  en: {
    // Header & Navigation
    'brand.name': 'SARSWATI PUSTAK',
    'brand.sub': '& Sports Bhandar',
    'brand.location': 'Pachrukhi (Siwan)',
    'brand.est': 'Est. 1990',
    'nav.home': 'Home',
    'nav.shop': 'Shop All Products',
    'nav.booklist': 'School Booklists',
    'nav.sports': 'Sports Department',
    'nav.trackOrder': 'Track Order',
    'nav.wishlist': 'Wishlist',
    'nav.cart': 'Cart',
    'nav.account': 'Account',
    'nav.about': 'About Store',
    'nav.contact': 'Store Location',
    'nav.admin': 'Admin',
    'search.placeholder': 'Search NCERT Class 10, Cricket Bat, Classmate Notebooks, Pens...',
    'cat.academic': 'Academic & School Books',
    'cat.ncert': 'NCERT Textbooks (Class 6–12)',
    'cat.biharBoard': 'Bihar Board (Class 1–10 BSTBPC)',
    'cat.competitive': 'Competitive Exam Guides',
    'cat.stationery': 'Stationery & Notebooks',
    'cat.notebooks': 'Classmate Notebooks & Registers',
    'cat.sports': 'Sports Equipment',
    'cat.combos': 'Combos & School Kits',

    // Buttons & CTAs
    'btn.shopAll': 'Shop All Products',
    'btn.orderBooklist': 'Get School Booklist Ready',
    'btn.whatsapp': 'Enquire on WhatsApp',
    'btn.addToCart': 'Add to Cart',
    'btn.outOfStock': 'Out of Stock',
    'btn.added': 'Added! ✓',
    'btn.openMaps': 'Open Google Maps',
    'btn.callStore': 'Call Store',
    'btn.getDirections': 'Get Directions to Shop',
    'btn.claimDeals': 'Claim Deals Now →',
    'btn.copyCode': 'Copy',
    'btn.copied': 'Copied! ✓',
    'btn.viewCart': 'View Cart',
    'btn.quickView': 'Quick View',
    'btn.sendEnquiry': 'Send Message to Store',

    // Hero & Home Sections
    'hero.badge': 'Serving Pachrukhi & Siwan Since 1990 • 35+ Years Trust',
    'hero.title1': 'Everything You Need to',
    'hero.title2': 'Learn, Create & Play.',
    'hero.sub': 'Discover academic books, everyday stationery, school essentials, and sports equipment at Sarswati Pustak and Sports Bhandar, Pachrukhi (Siwan, Bihar).',
    'deal.title': 'Deal of the Day:',
    'deal.sub': 'Up to 25% OFF on textbooks & sports equipment! Use code:',
    'section.categories': 'Shop by Category',
    'section.categoriesSub': 'Explore school textbooks, competitive guides, stationery essentials & sports equipment.',
    'section.featured': 'Featured Products & Best-Sellers',
    'section.featuredSub': 'Authentic stock available at our Pachrukhi retail counter.',
    'section.trust': 'Why Pachrukhi Trusts Us',
    'section.trustSub': 'Local Care, Dependable Quality & Genuine Guidance since 1990.',
    'store.addressTitle': 'Store Location & Hours',
    'store.openDaily': 'Open Daily: 9:00 AM – 9:00 PM',

    // Contact & About
    'contact.badge': 'VISIT OUR STORE IN PACHRUKHI',
    'contact.title': 'Get in Touch',
    'contact.sub': 'Visit Sarswati Pustak & Sports Bhandar or reach out to us for book inquiries, stationery orders, and sports equipment.',

    // Footer
    'footer.tagline': 'Serving the students, parents, schools, and athletes of Pachrukhi & Siwan with genuine books and sports gear since 1990.',
    'footer.explore': 'Top Categories',
    'footer.quickLinks': 'Quick Navigation',
    'footer.storeCounter': 'Store Counter',
    'footer.allRights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.returns': 'Returns & Exchange',
    'footer.shipping': 'Delivery Policy'
  },
  hi: {
    // Header & Navigation
    'brand.name': 'सरस्वती पुस्तक',
    'brand.sub': 'एवं स्पोर्ट्स भण्डार',
    'brand.location': 'पचरुखी (सीवान)',
    'brand.est': 'स्था. 1990',
    'nav.home': 'होम',
    'nav.shop': 'सभी उत्पाद',
    'nav.booklist': 'स्कूल बुकलिस्ट',
    'nav.sports': 'खेल विभाग',
    'nav.trackOrder': 'ऑर्डर ट्रैक करें',
    'nav.wishlist': 'विशलिस्ट',
    'nav.cart': 'कार्ट',
    'nav.account': 'खाता',
    'nav.about': 'दुकान के बारे में',
    'nav.contact': 'दुकान का पता',
    'nav.admin': 'एडमिन',
    'search.placeholder': 'NCERT कक्षा 10, क्रिकेट बैट, क्लासमेट कॉपी, पेन खोजें...',
    'cat.academic': 'शैक्षणिक और स्कूल पुस्तकें',
    'cat.ncert': 'NCERT पुस्तकें (कक्षा 6–12)',
    'cat.biharBoard': 'बिहार बोर्ड (कक्षा 1–10 BSTBPC)',
    'cat.competitive': 'प्रतियोगी परीक्षा गाइड',
    'cat.stationery': 'स्टेशनरी और कॉपियां',
    'cat.notebooks': 'क्लासमेट कॉपियां एवं रजिस्टर्स',
    'cat.sports': 'खेलकूद और फिटनेस उपकरण',
    'cat.combos': 'कॉम्बो और स्कूल किट',

    // Buttons & CTAs
    'btn.shopAll': 'सभी उत्पाद देखें',
    'btn.orderBooklist': 'स्कूल बुकलिस्ट तैयार कराएं',
    'btn.whatsapp': 'व्हाट्सएप पर पूछें',
    'btn.addToCart': 'कार्ट में जोड़ें',
    'btn.outOfStock': 'स्टॉक समाप्त',
    'btn.added': 'जोड़ दिया गया! ✓',
    'btn.openMaps': 'गूगल मैप्स खोलें',
    'btn.callStore': 'दुकान पर कॉल करें',
    'btn.getDirections': 'दुकान का रास्ता देखें',
    'btn.claimDeals': 'ऑफर अभी पाएं →',
    'btn.copyCode': 'कॉपी',
    'btn.copied': 'कॉपी हुआ! ✓',
    'btn.viewCart': 'कार्ट देखें',
    'btn.quickView': 'क्विक व्यू',
    'btn.sendEnquiry': 'दुकान को संदेश भेजें',

    // Hero & Home Sections
    'hero.badge': '1990 से पचरुखी और सीवान की सेवा में • 35+ वर्षों का विश्वास',
    'hero.title1': 'सीखने, खेलने और आगे बढ़ने के लिए',
    'hero.title2': 'सब कुछ एक ही जगह।',
    'hero.sub': 'सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार, पचरुखी (सीवान, बिहार) में प्रामाणिक शैक्षणिक पुस्तकें, स्टेशनरी और उच्च गुणवत्ता के खेल उपकरण पाएं।',
    'deal.title': 'आज का खास ऑफर:',
    'deal.sub': 'पुस्तकों और खेल सामग्री पर 25% तक की छूट! कोड प्रयोग करें:',
    'section.categories': 'श्रेणी अनुसार खरीदें',
    'section.categoriesSub': 'स्कूल पाठ्यपुस्तकें, प्रतियोगी गाइड, स्टेशनरी और खेल सामग्री देखें।',
    'section.featured': 'प्रमुख उत्पाद एवं बेस्ट-सेलर्स',
    'section.featuredSub': 'हमारे पचरुखी काउंटर पर प्रामाणिक स्टॉक उपलब्ध है।',
    'section.trust': 'पचरुखी हम पर भरोसा क्यों करता है',
    'section.trustSub': '1990 से स्थानीय देखभाल, भरोसेमंद गुणवत्ता और उचित मार्गदर्शन।',
    'store.addressTitle': 'दुकान का पता एवं समय',
    'store.openDaily': 'प्रतिदिन खुला: सुबह 9:00 से रात 9:00 तक',

    // Contact & About
    'contact.badge': 'पचरुखी में हमारी दुकान पर पधारें',
    'contact.title': 'हमसे संपर्क करें',
    'contact.sub': 'किताबों, स्टेशनरी ऑर्डर या खेल सामग्री की जानकारी के लिए सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार से संपर्क करें।',

    // Footer
    'footer.tagline': '1990 से पचरुखी और सीवान के विद्यार्थियों, स्कूलों और खिलाड़ियों की भरोसेमंद दुकान।',
    'footer.explore': 'प्रमुख श्रेणियां',
    'footer.quickLinks': 'त्वरित लिंक',
    'footer.storeCounter': 'दुकान काउंटर',
    'footer.allRights': 'सर्वाधिकार सुरक्षित।',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'नियम व शर्तें',
    'footer.returns': 'वापसी व विनिमय',
    'footer.shipping': 'डिलीवरी नीति'
  }
};

export type TranslationKey = keyof typeof TRANSLATIONS.en;

interface AppContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('spsb_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('spsb_lang');
    if (saved === 'hi' || saved === 'en') return saved;
    return 'en';
  });

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('spsb_theme', theme);
  }, [theme]);

  // Sync language with localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('spsb_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const t = (key: TranslationKey): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        language,
        toggleTheme,
        setLanguage,
        toggleLanguage,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
