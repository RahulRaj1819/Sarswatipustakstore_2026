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
    'nav.faq': 'FAQ',
    'nav.shippingPolicy': 'Delivery Policy',
    'nav.sportsCategories': 'Sports Categories',
    'nav.booksStationery': 'Books & Stationery',
    'nav.customerCare': 'Customer Care & Store',
    'nav.timing': 'Store Timing',
    'nav.call': 'Call Store',
    'search.placeholder': 'Search NCERT Class 10, Cricket Bat, Classmate Notebooks, Pens...',
    'search.matching': 'Matching Products',
    'search.viewAll': 'View All Search Results for',
    'search.noMatches': 'No exact matches found for',
    'search.storeNote': 'We might still have it physically in our Pachrukhi store!',
    'search.askWa': 'Ask Availability on WhatsApp',
    'search.popular': 'Popular in Pachrukhi & Siwan',
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
    'btn.buyNow': 'Buy Now',
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
    'btn.clearCart': 'Clear Cart',
    'btn.checkout': 'Proceed to Checkout',
    'btn.apply': 'Apply',
    'btn.remove': 'Remove',
    'btn.submit': 'Submit',
    'btn.cancel': 'Cancel',

    // Hero & Home Sections
    'hero.badge': 'Serving Pachrukhi & Siwan Since 1990 • 35+ Years Trust',
    'hero.title1': 'Everything You Need to',
    'hero.title2': 'Learn, Create & Play.',
    'hero.sub': 'Discover academic books, everyday stationery, school essentials, and sports equipment at Sarswati Pustak and Sports Bhandar, Pachrukhi (Siwan, Bihar).',
    'hero.cta.shop': 'Shop All Products',
    'hero.cta.booklist': 'Get School Booklist Ready',
    'hero.cta.whatsapp': 'Enquire on WhatsApp',
    'hero.feat.genuine': '100% Genuine Books',
    'hero.feat.pickup': 'Store Pickup Available',
    'hero.feat.discount': 'Best Local Discounts',
    'hero.feat.guidance': 'Guidance by Trusted Staff',
    'deal.title': 'Deal of the Day:',
    'deal.sub': 'Up to 25% OFF on textbooks & sports equipment! Use code:',
    'deal.claim': 'Claim Deals Now →',
    'section.categories': 'Shop by Category',
    'section.categoriesSub': 'Explore school textbooks, competitive guides, stationery essentials & sports equipment.',
    'catSection.tag': 'Curated Collections',
    'catSection.all': 'View All Categories →',
    'acad.session': 'Academic Session 2026–2027',
    'acad.title': 'Academic Essentials for Students & Parents',
    'acad.desc': 'Official NCERT textbooks, Bihar Board BSTBPC guides, R.D. Sharma reference books, and Classmate registers all at genuine government MRP & discounted retail prices.',
    'acad.findBooklist': 'Find Your School Books',
    'acad.browseAll': 'Browse All Books →',
    'sportsSec.badge': 'Pachrukhi Sports & Fitness Destination',
    'sportsSec.title': 'Gear Up. Train Hard. Win Tournaments.',
    'sportsSec.sub': 'Authentic match-grade bats, official footballs, volleyball nets, badminton sets & school tournament equipment.',
    'sportsSec.viewAll': 'Explore Full Sports Department →',
    'sportsSec.bulkBtn': 'Request Bulk Tournament Quotation',
    'section.featured': 'Featured Products & Best-Sellers',
    'section.featuredSub': 'Authentic stock available at our Pachrukhi retail counter.',
    'section.trust': 'Why Pachrukhi Trusts Us',
    'section.trustSub': 'Local Care, Dependable Quality & Genuine Guidance since 1990.',
    'store.addressTitle': 'Store Location & Hours',
    'store.openDaily': 'Open Daily: 9:00 AM – 9:00 PM',

    // Product Request Modal
    'reqModal.title': "Can't Find a Book or Product?",
    'reqModal.sub': "We'll source it for you from Patna / Varanasi distributors!",
    'reqModal.bookLabel': 'Book Title / Stationery / Sports Item *',
    'reqModal.bookPh': 'e.g. BPSC TRE Hindi Practice Set / Class 11 Biology Guide',
    'reqModal.authorLabel': 'Author, Publisher, or Brand (Optional)',
    'reqModal.authorPh': 'e.g. Kiran Publications / R.S. Aggarwal / Cosco',
    'reqModal.nameLabel': 'Your Name *',
    'reqModal.namePh': 'e.g. Rahul Kumar',
    'reqModal.phoneLabel': 'Phone / WhatsApp *',
    'reqModal.phonePh': '10-digit mobile number',
    'reqModal.submit': 'Submit Request',
    'reqModal.cancel': 'Cancel',
    'reqModal.successTitle': 'Request Recorded!',
    'reqModal.successDesc': 'We have registered your request for unlisted items. We will check with our publishing distributors and contact you via call or WhatsApp.',
    'reqModal.askWa': 'Ask Store on WhatsApp',

    // Sports Bulk Modal
    'sportsModal.title': 'Bulk Sports & Tournament Quotation',
    'sportsModal.sub': 'Special institutional pricing for Schools, Academies & Village Clubs in Siwan',
    'sportsModal.guaranteeTitle': 'Direct Store Pricing Guarantee:',
    'sportsModal.guaranteeDesc': 'We supply 100% genuine SG, Nivia, Cosco, Yonex & Stag equipment with bulk school discounts, GST invoice, and direct delivery across Siwan & Pachrukhi.',
    'sportsModal.teamLabel': 'School / Club / Academy Name *',
    'sportsModal.teamPh': 'e.g. DAV Public School / Pachrukhi CC',
    'sportsModal.personLabel': 'Contact Person Name & Title *',
    'sportsModal.personPh': 'e.g. Ramesh Singh (PE Master / Captain)',
    'sportsModal.phoneLabel': 'Phone Number (Calling) *',
    'sportsModal.phonePh': '10-digit mobile number',
    'sportsModal.whatsappLabel': 'WhatsApp Number (For Quotation PDF)',
    'sportsModal.whatsappPh': 'Same as calling or enter WhatsApp',
    'sportsModal.selectSports': 'Select Sports Required *',
    'sportsModal.selected': 'selected',
    'sportsModal.quantitiesLabel': 'Estimated Quantities / Items Needed',
    'sportsModal.quantitiesPh': 'e.g. 4 Nivia Footballs, 2 Volleyball Nets, 8 Relay Batons, 20 Cones...',
    'sportsModal.budgetLabel': 'Estimated Budget Range',
    'sportsModal.dateLabel': 'Required By Date',
    'sportsModal.locationLabel': 'Delivery Location in Siwan / Pachrukhi',
    'sportsModal.locationPh': 'e.g. Near Pachrukhi Railway Station, Siwan',
    'sportsModal.notesLabel': 'Special Requirements / Notes (Optional)',
    'sportsModal.notesPh': 'Any specific brand requirements, tournament dates, or customized jerseys...',
    'sportsModal.submit': 'Request Wholesale Quotation',
    'sportsModal.successTitle': 'Quotation Request Received!',
    'sportsModal.successDesc': 'Our sports department manager will prepare an itemized quote with institutional discounts within 2–4 hours.',
    'sportsModal.refText': 'Quotation Ref:',
    'sportsModal.waAction': 'Send Quotation via WhatsApp',

    // Cart Drawer
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptySub': "Looks like you haven't added any textbooks, stationery, or sports gear yet.",
    'cart.explore': 'Explore Products',
    'cart.freeUnlocked': 'You have unlocked FREE Delivery to Pachrukhi / Siwan!',
    'cart.addMore': 'Add',
    'cart.forFree': 'more for FREE Delivery',
    'cart.couponPrompt': 'Have a coupon code?',
    'cart.couponPh': 'Enter SARSWATI10',
    'cart.apply': 'Apply',
    'cart.remove': 'Remove',
    'cart.subtotal': 'Subtotal',
    'cart.discount': 'Discount',
    'cart.delivery': 'Store Pickup / Delivery',
    'cart.free': 'FREE',
    'cart.total': 'Estimated Total',
    'cart.waOrder': 'Order via WhatsApp',
    'cart.checkout': 'Proceed to Checkout',
    'cart.clear': 'Clear Cart',

    // Mobile Bottom Nav
    'mobileNav.home': 'Home',
    'mobileNav.shop': 'Shop',
    'mobileNav.search': 'Search',
    'mobileNav.wishlist': 'Wishlist',
    'mobileNav.cart': 'Cart',

    // Product Card & Modal
    'prod.inStock': 'In Stock',
    'prod.onlyLeft': 'left',
    'prod.askStore': 'Ask Store for Stock',
    'prod.quickView': 'Quick View',
    'prod.addToCart': 'Add to Cart',
    'prod.buyNow': 'Buy Now',
    'prod.added': 'Added! ✓',
    'prod.genuine': '100% Genuine Guaranteed',
    'prod.pickup': 'Pachrukhi Store Counter Pickup Available',
    'prod.mrp': 'MRP',
    'prod.price': 'Price',
    'prod.quantity': 'Quantity',

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
    'footer.shipping': 'Delivery Policy',

    // UI Labels
    'ui.language': 'Language',
    'ui.theme': 'Theme',
    'ui.light': 'Light',
    'ui.dark': 'Dark',
    'ui.english': 'English',
    'ui.hindi': 'हिंदी',

    // Booklist Wizard
    'booklist.modalTitle': 'Get Your School Booklist Ready',
    'booklist.modalSubtitle': 'Guaranteed NCERT & Syllabus Textbooks in Pachrukhi, Siwan',
    'booklist.step1': 'School & Class',
    'booklist.step2': 'View Booklist',
    'booklist.step3': 'Your Contact',
    'booklist.selectSchoolLabel': '1. Select School (Pachrukhi & Siwan)',
    'booklist.configuredBadge': 'Configured',
    'booklist.otherSchool': 'Other School / College in Bihar',
    'booklist.otherSchoolSub': 'Upload or describe your school booklist',
    'booklist.enterSchoolPlaceholder': 'Enter School Name & Location...',
    'booklist.classGradeLabel': 'Class / Grade',
    'booklist.academicSessionLabel': 'Academic Session',
    'booklist.continueToBooklist': 'Continue to Booklist',
    'booklist.configuredSyllabus': 'Configured Textbook Syllabus',
    'booklist.approxTotal': 'Approx Total:',
    'booklist.noPreset': 'No pre-set booklist for this grade yet',
    'booklist.noPresetSub': 'No problem! Please upload a photo or PDF of your school\'s booklist slip below, or specify in notes.',
    'booklist.uploadTitle': 'Upload School Booklist Photo / PDF (Optional)',
    'booklist.uploadSubtitle': 'Click to browse from phone camera or gallery',
    'booklist.notesLabel': 'Additional Notes (Specific editions, extra notebooks, stationery combo needed)',
    'booklist.notesPlaceholder': 'e.g. Please add R.D. Sharma maths book and 6 classmate long registers...',
    'booklist.back': 'Back',
    'booklist.nextContact': 'Next: Contact Details',
    'booklist.contactNote': 'Please provide your contact info so the Sarswati Pustak store team can verify book availability and send you the exact quotation & pickup notice.',
    'booklist.parentNameLabel': 'Parent / Student Name',
    'booklist.parentNamePlaceholder': 'e.g. Rameshwar Kumar',
    'booklist.mobileNumberLabel': 'Mobile Number',
    'booklist.mobilePlaceholder': 'e.g. 9835012345',
    'booklist.whatsappLabel': 'WhatsApp Number',
    'booklist.whatsappPlaceholder': 'Same as mobile or WhatsApp',
    'booklist.localityLabel': 'Locality / Village / Town (Siwan / Pachrukhi area)',
    'booklist.localityPlaceholder': 'e.g. Pachrukhi Bazaar, Siwan',
    'booklist.policyText': 'Honest Store Policy: Submitting this request checks real physical store inventory. No fake claims. We will confirm exact editions and prepare the book bundle for store pickup or delivery.',
    'booklist.submitBtn': 'Submit Booklist Enquiry',
    'booklist.successTitle': 'Booklist Request Successfully Created!',
    'booklist.refNumber': 'Reference Number',
    'booklist.successSub': 'Your booklist request has been submitted to the shop owner at Sarswati Pustak and Sports Bhandar, Pachrukhi.',
    'booklist.sendWhatsApp': 'Send Reference to Shop WhatsApp Now',
    'booklist.closeWindow': 'Close Window',
    'booklist.school': 'School',
    'booklist.classSession': 'Class & Session',
    'booklist.parentName': 'Parent Name',
    'booklist.estimatedPrice': 'Estimated Booklist Price',
    'booklist.change': 'Change'
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
    'nav.faq': 'सामान्य प्रश्न',
    'nav.shippingPolicy': 'डिलीवरी नीति',
    'nav.sportsCategories': 'खेल श्रेणियां',
    'nav.booksStationery': 'किताबें और स्टेशनरी',
    'nav.customerCare': 'ग्राहक सेवा एवं दुकान',
    'nav.timing': 'दुकान का समय',
    'nav.call': 'दुकान पर कॉल करें',
    'search.placeholder': 'NCERT कक्षा 10, क्रिकेट बैट, क्लासमेट कॉपी, पेन खोजें...',
    'search.matching': 'संबंधित उत्पाद',
    'search.viewAll': 'इसके लिए सभी परिणाम देखें:',
    'search.noMatches': 'कोई सटीक परिणाम नहीं मिला:',
    'search.storeNote': 'यह सामग्री हमारे पचरुखी स्टोर में उपलब्ध हो सकती है!',
    'search.askWa': 'व्हाट्सएप पर उपलब्धता पूछें',
    'search.popular': 'पचरुखी और सीवान में लोकप्रिय',
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
    'btn.buyNow': 'अभी खरीदें',
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
    'btn.clearCart': 'कार्ट खाली करें',
    'btn.checkout': 'चेकआउट के लिए आगे बढ़ें',
    'btn.apply': 'लागू करें',
    'btn.remove': 'हटाएं',
    'btn.submit': 'जमा करें',
    'btn.cancel': 'रद्द करें',

    // Hero & Home Sections
    'hero.badge': '1990 से पचरुखी और सीवान की सेवा में • 35+ वर्षों का विश्वास',
    'hero.title1': 'सीखने, खेलने और आगे बढ़ने के लिए',
    'hero.title2': 'सब कुछ एक ही जगह।',
    'hero.sub': 'सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार, पचरुखी (सीवान, बिहार) में प्रामाणिक शैक्षणिक पुस्तकें, स्टेशनरी और उच्च गुणवत्ता के खेल उपकरण पाएं।',
    'hero.cta.shop': 'सभी उत्पाद देखें',
    'hero.cta.booklist': 'स्कूल बुकलिस्ट तैयार कराएं',
    'hero.cta.whatsapp': 'व्हाट्सएप पर पूछें',
    'hero.feat.genuine': '100% प्रामाणिक पुस्तकें',
    'hero.feat.pickup': 'काउंटर पिकअप सुविधा उपलब्ध',
    'hero.feat.discount': 'सर्वश्रेष्ठ स्थानीय छूट',
    'hero.feat.guidance': 'विश्वसनीय सलाह एवं सहायता',
    'deal.title': 'आज का खास ऑफर:',
    'deal.sub': 'पुस्तकों और खेल सामग्री पर 25% तक की छूट! कोड प्रयोग करें:',
    'deal.claim': 'ऑफर अभी पाएं →',
    'section.categories': 'श्रेणी अनुसार खरीदें',
    'section.categoriesSub': 'स्कूल पाठ्यपुस्तकें, प्रतियोगी गाइड, स्टेशनरी और खेल सामग्री देखें।',
    'catSection.tag': 'विशेष संग्रह',
    'catSection.all': 'सभी श्रेणियां देखें →',
    'acad.session': 'शैक्षणिक सत्र 2026–2027',
    'acad.title': 'विद्यार्थियों और अभिभावकों के लिए आवश्यक पुस्तकें',
    'acad.desc': 'सरकारी MRP एवं रियायती मूल्यों पर आधिकारिक NCERT पुस्तकें, बिहार बोर्ड BSTBPC गाइड, आर.डी. शर्मा और क्लासमेट रजिस्टर्स उपलब्ध हैं।',
    'acad.findBooklist': 'अपनी स्कूल पुस्तकें खोजें',
    'acad.browseAll': 'सभी पुस्तकें देखें →',
    'sportsSec.badge': 'पचरुखी का मुख्य खेल और फिटनेस स्टोर',
    'sportsSec.title': 'तैयार हों। मेहनत करें। मैच जीतें।',
    'sportsSec.sub': 'SG, Nivia, Cosco, Yonex के प्रामाणिक बैट, मैच फुटबॉल, वॉलीबॉल नेट, बैडमिंटन सेट और स्कूल टूर्नामेंट सामग्री।',
    'sportsSec.viewAll': 'संपूर्ण खेल विभाग देखें →',
    'sportsSec.bulkBtn': 'टूर्नामेंट के लिए थोक कोटेशन मांगें',
    'section.featured': 'प्रमुख उत्पाद एवं बेस्ट-सेलर्स',
    'section.featuredSub': 'हमारे पचरुखी काउंटर पर प्रामाणिक स्टॉक उपलब्ध है।',
    'section.trust': 'पचरुखी हम पर भरोसा क्यों करता है',
    'section.trustSub': '1990 से स्थानीय देखभाल, भरोसेमंद गुणवत्ता और उचित मार्गदर्शन।',
    'store.addressTitle': 'दुकान का पता एवं समय',
    'store.openDaily': 'प्रतिदिन खुला: सुबह 9:00 से रात 9:00 तक',

    // Product Request Modal
    'reqModal.title': 'किताब या सामान नहीं मिल रहा?',
    'reqModal.sub': 'हम आपके लिए पटना या वाराणसी के वितरकों से मंगवा देंगे!',
    'reqModal.bookLabel': 'किताब का नाम / स्टेशनरी / खेल सामान *',
    'reqModal.bookPh': 'उदा. BPSC TRE हिंदी प्रैक्टिस सेट / कक्षा 11 बायोलॉजी गाइड',
    'reqModal.authorLabel': 'लेखक, प्रकाशक या ब्रांड (वैकल्पिक)',
    'reqModal.authorPh': 'उदा. किरण पब्लिकेशन / आर.एस. अग्रवाल / कॉस्को',
    'reqModal.nameLabel': 'आपका नाम *',
    'reqModal.namePh': 'उदा. राहुल कुमार',
    'reqModal.phoneLabel': 'फोन / व्हाट्सएप नंबर *',
    'reqModal.phonePh': '10 अंकों का मोबाइल नंबर',
    'reqModal.submit': 'अनुरोध भेजें',
    'reqModal.cancel': 'रद्द करें',
    'reqModal.successTitle': 'अनुरोध दर्ज हो गया!',
    'reqModal.successDesc': 'आपका अनुरोध दर्ज कर लिया गया है। हम वितरकों से जांच कर आपको फोन या व्हाट्सएप पर सूचित करेंगे।',
    'reqModal.askWa': 'व्हाट्सएप पर स्टोर से पूछें',

    // Sports Bulk Modal
    'sportsModal.title': 'थोक खेल एवं टूर्नामेंट कोटेशन',
    'sportsModal.sub': 'सीवान के स्कूलों, अकादमियों एवं ग्रामीण क्लबों के लिए विशेष संस्थागत मूल्य',
    'sportsModal.guaranteeTitle': 'डायरेक्ट स्टोर मूल्य गारंटी:',
    'sportsModal.guaranteeDesc': 'हम SG, Nivia, Cosco, Yonex एवं Stag के प्रामाणिक सामान स्कूल छूट, GST बिल और सीवान-पचरुखी में सीधी डिलीवरी के साथ उपलब्ध कराते हैं।',
    'sportsModal.teamLabel': 'स्कूल / क्लब / अकादमी का नाम *',
    'sportsModal.teamPh': 'उदा. डीएवी पब्लिक स्कूल / पचरुखी क्रिकेट क्लब',
    'sportsModal.personLabel': 'संपर्क व्यक्ति का नाम एवं पद *',
    'sportsModal.personPh': 'उदा. रमेश सिंह (पीटी शिक्षक / टीम कैप्टन)',
    'sportsModal.phoneLabel': 'फोन नंबर (कॉलिंग) *',
    'sportsModal.phonePh': '10 अंकों का मोबाइल नंबर',
    'sportsModal.whatsappLabel': 'व्हाट्सएप नंबर (कोटेशन पीडीएफ के लिए)',
    'sportsModal.whatsappPh': 'कॉलिंग नंबर समान या व्हाट्सएप नंबर लिखें',
    'sportsModal.selectSports': 'आवश्यक खेल चुनें *',
    'sportsModal.selected': 'चुने गए',
    'sportsModal.quantitiesLabel': 'अनुमानित मात्रा / आवश्यक सामग्री',
    'sportsModal.quantitiesPh': 'उदा. 4 निविआ फुटबॉल, 2 वॉलीबॉल नेट, 8 रिले बैटन, 20 कोन्स...',
    'sportsModal.budgetLabel': 'अनुमानित बजट सीमा',
    'sportsModal.dateLabel': 'कब तक सामग्री चाहिए',
    'sportsModal.locationLabel': 'डिलीवरी का स्थान (सीवान / पचरुखी)',
    'sportsModal.locationPh': 'उदा. पचरुखी स्टेशन रोड, सीवान',
    'sportsModal.notesLabel': 'विशेष निर्देश / नोट्स (वैकल्पिक)',
    'sportsModal.notesPh': 'कोई विशेष ब्रांड, मैच की तारीख या जर्सी साइज...',
    'sportsModal.submit': 'थोक कोटेशन का अनुरोध करें',
    'sportsModal.successTitle': 'कोटेशन अनुरोध प्राप्त हुआ!',
    'sportsModal.successDesc': 'हमारे खेल विभाग प्रबंधक 2–4 घंटों के भीतर संस्थागत छूट के साथ विस्तृत कोटेशन तैयार कर आपसे संपर्क करेंगे।',
    'sportsModal.refText': 'कोटेशन संदर्भ:',
    'sportsModal.waAction': 'व्हाट्सएप पर कोटेशन भेजें',

    // Cart Drawer
    'cart.title': 'आपकी शॉपिंग कार्ट',
    'cart.empty': 'आपकी कार्ट खाली है',
    'cart.emptySub': 'ऐसा लगता है कि आपने अभी तक कोई पुस्तक, स्टेशनरी या खेल सामग्री नहीं जोड़ी है।',
    'cart.explore': 'उत्पाद देखें',
    'cart.freeUnlocked': 'पचरुखी / सीवान के लिए मुफ्त डिलीवरी उपलब्ध!',
    'cart.addMore': 'मुफ्त डिलीवरी के लिए',
    'cart.forFree': 'का और सामान जोड़ें',
    'cart.couponPrompt': 'कूपन कोड है?',
    'cart.couponPh': 'SARSWATI10 दर्ज करें',
    'cart.apply': 'लागू करें',
    'cart.remove': 'हटाएं',
    'cart.subtotal': 'उप-कुल',
    'cart.discount': 'छूट',
    'cart.delivery': 'स्टोर पिकअप / डिलीवरी',
    'cart.free': 'मुफ्त',
    'cart.total': 'कुल अनुमानित राशि',
    'cart.waOrder': 'व्हाट्सएप पर ऑर्डर करें',
    'cart.checkout': 'चेकआउट के लिए आगे बढ़ें',
    'cart.clear': 'कार्ट खाली करें',

    // Mobile Bottom Nav
    'mobileNav.home': 'होम',
    'mobileNav.shop': 'शॉप',
    'mobileNav.search': 'खोजें',
    'mobileNav.wishlist': 'विशलिस्ट',
    'mobileNav.cart': 'कार्ट',

    // Product Card & Modal
    'prod.inStock': 'उपलब्ध है',
    'prod.onlyLeft': 'बचे हैं',
    'prod.askStore': 'दुकान से पूछें',
    'prod.quickView': 'क्विक व्यू',
    'prod.addToCart': 'कार्ट में जोड़ें',
    'prod.buyNow': 'अभी खरीदें',
    'prod.added': 'जोड़ दिया गया! ✓',
    'prod.genuine': '100% प्रामाणिक गारंटी',
    'prod.pickup': 'पचरुखी काउंटर से पिकअप सुविधा',
    'prod.mrp': 'MRP',
    'prod.price': 'मूल्य',
    'prod.quantity': 'मात्रा',

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
    'footer.shipping': 'डिलीवरी नीति',

    // UI Labels
    'ui.language': 'भाषा',
    'ui.theme': 'थीम',
    'ui.light': 'लाइट',
    'ui.dark': 'डार्क',
    'ui.english': 'English',
    'ui.hindi': 'हिंदी',

    // Booklist Wizard
    'booklist.modalTitle': 'अपनी स्कूल बुकलिस्ट तैयार कराएं',
    'booklist.modalSubtitle': 'पचरुखी, सीवान में 100% प्रामाणिक NCERT व सिलेबस पुस्तकें',
    'booklist.step1': 'स्कूल व कक्षा',
    'booklist.step2': 'बुकलिस्ट देखें',
    'booklist.step3': 'संपर्क विवरण',
    'booklist.selectSchoolLabel': '1. स्कूल चुनें (पचरुखी और सीवान)',
    'booklist.configuredBadge': 'उपलब्ध',
    'booklist.otherSchool': 'बिहार का अन्य स्कूल / कॉलेज',
    'booklist.otherSchoolSub': 'अपनी स्कूल बुकलिस्ट अपलोड या दर्ज करें',
    'booklist.enterSchoolPlaceholder': 'स्कूल का नाम एवं स्थान दर्ज करें...',
    'booklist.classGradeLabel': 'कक्षा / ग्रेड',
    'booklist.academicSessionLabel': 'शैक्षणिक सत्र',
    'booklist.continueToBooklist': 'बुकलिस्ट देखें',
    'booklist.configuredSyllabus': 'निर्धारित पाठ्यपुस्तक सूची',
    'booklist.approxTotal': 'अनुमानित कुल योग:',
    'booklist.noPreset': 'इस कक्षा के लिए अभी पूर्व-निर्धारित सूची नहीं है',
    'booklist.noPresetSub': 'कोई बात नहीं! कृपया अपने स्कूल की बुकलिस्ट पर्ची की फोटो या PDF अपलोड करें, या नीचे लिखें।',
    'booklist.uploadTitle': 'स्कूल बुकलिस्ट फोटो / PDF अपलोड करें (वैकल्पिक)',
    'booklist.uploadSubtitle': 'फोन कैमरा या गैलरी से चुनने के लिए क्लिक करें',
    'booklist.notesLabel': 'अतिरिक्त विवरण (विशेष किताबें, क्लासमेट कॉपियां, स्टेशनरी कॉम्बो)',
    'booklist.notesPlaceholder': 'जैसे: R.D. शर्मा गणित की किताब और 6 क्लासमेट रजिस्टर भी जोड़ें...',
    'booklist.back': 'पीछे',
    'booklist.nextContact': 'आगे: संपर्क विवरण',
    'booklist.contactNote': 'कृपया अपना संपर्क विवरण दें ताकि सरस्वती पुस्तक भंडार की टीम पुस्तकों की उपलब्धता जांच कर सटीक कोटेशन और पिकअप सूचना भेज सके।',
    'booklist.parentNameLabel': 'अभिभावक / छात्र का नाम',
    'booklist.parentNamePlaceholder': 'जैसे: रामेश्वर कुमार',
    'booklist.mobileNumberLabel': 'मोबाइल नंबर',
    'booklist.mobilePlaceholder': 'जैसे: 9835012345',
    'booklist.whatsappLabel': 'व्हाट्सएप नंबर',
    'booklist.whatsappPlaceholder': 'मोबाइल नंबर या अलग व्हाट्सएप नंबर',
    'booklist.localityLabel': 'मोहल्ला / गांव / कस्बा (पचरुखी / सीवान क्षेत्र)',
    'booklist.localityPlaceholder': 'जैसे: पचरुखी बाजार, सीवान',
    'booklist.policyText': 'ईमानदार दुकान नीति: यह अनुरोध हमारे स्टोर इन्वेंट्री में वास्तविक स्टॉक जांचता है। हम किताबों की पुष्टि कर बंडल तैयार करेंगे।',
    'booklist.submitBtn': 'बुकलिस्ट अनुरोध भेजें',
    'booklist.successTitle': 'बुकलिस्ट अनुरोध सफलतापूर्वक दर्ज हुआ!',
    'booklist.refNumber': 'रेफरेंस नंबर',
    'booklist.successSub': 'आपका बुकलिस्ट अनुरोध सरस्वती पुस्तक एवं स्पोर्ट्स भण्डार, पचरुखी को प्राप्त हो गया है।',
    'booklist.sendWhatsApp': 'दुकान के व्हाट्सएप पर अभी भेजें',
    'booklist.closeWindow': 'विंडो बंद करें',
    'booklist.school': 'स्कूल',
    'booklist.classSession': 'कक्षा व सत्र',
    'booklist.parentName': 'अभिभावक का नाम',
    'booklist.estimatedPrice': 'अनुमानित बुकलिस्ट मूल्य',
    'booklist.change': 'बदलें'
  }
};

export type TranslationKey = keyof typeof TRANSLATIONS.en;

interface AppContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
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
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] as Record<string, string> | undefined;
    const enDict = TRANSLATIONS.en as Record<string, string>;
    if (dict && dict[key]) {
      return dict[key];
    }
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return key;
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
