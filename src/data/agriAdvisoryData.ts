export interface MandiCropRate {
  id: string;
  name: string;
  nameTe: string;
  variety: string;
  varietyTe: string;
  marketLocation: string;
  marketLocationTe: string;
  mspRate: number; // Minimum Support Price per Quintal
  currentRate: number; // Today's market rate in ₹/Quintal
  minRate: number;
  maxRate: number;
  svTradersRate: number; // Sri Venkateshwara Traders spot cash purchase rate
  trend: 'UP' | 'STEADY' | 'DOWN';
  trendPercent: string;
  lastUpdated: string;
  standardMoisture: number; // e.g. 14%
  icon: string;
}

export const mandiRatesData: MandiCropRate[] = [
  {
    id: 'paddy-bpt',
    name: 'Paddy (BPT 5204 / Sona Masoori)',
    nameTe: 'వరి (బి.పి.టి 5204 / సోనా మసూరి)',
    variety: 'Fine Grain (సన్న రకం)',
    varietyTe: 'సన్న రకం (Grade A)',
    marketLocation: 'Nagarkurnool / Jadcherla Mandi',
    marketLocationTe: 'నాగర్‌కర్నూల్ / జడ్చర్ల మార్కెట్',
    mspRate: 2320,
    currentRate: 2540,
    minRate: 2480,
    maxRate: 2600,
    svTradersRate: 2560,
    trend: 'UP',
    trendPercent: '+₹40/Qtl',
    lastUpdated: 'Today 08:30 AM',
    standardMoisture: 14,
    icon: '🌾',
  },
  {
    id: 'paddy-rnr',
    name: 'Paddy (RNR 15048 / Telangana Sona)',
    nameTe: 'వరి (ఆర్.ఎన్.ఆర్ 15048 / తెలంగాణ సోనా)',
    variety: 'Low GI Premium (షుగర్ లెస్)',
    varietyTe: 'తెలంగాణ సోనా సన్నాలు',
    marketLocation: 'Nagarkurnool Mandi',
    marketLocationTe: 'నాగర్‌కర్నూల్ మార్కెట్ యార్డ్',
    mspRate: 2320,
    currentRate: 2490,
    minRate: 2420,
    maxRate: 2520,
    svTradersRate: 2510,
    trend: 'STEADY',
    trendPercent: 'Steady',
    lastUpdated: 'Today 08:30 AM',
    standardMoisture: 14,
    icon: '🌾',
  },
  {
    id: 'cotton-kapas',
    name: 'Cotton / Kapas (పత్తి)',
    nameTe: 'పత్తి (కపాస్ - మధ్యస్థ/పొడవు పింజ)',
    variety: 'Medium & Long Staple (బి.టి పత్తి)',
    varietyTe: 'మంచి పింజ & తక్కువ తేమ',
    marketLocation: 'Badepally / Mahabubnagar Mandi',
    marketLocationTe: 'బాదేపల్లి / మహబూబ్‌నగర్ మార్కెట్',
    mspRate: 7521,
    currentRate: 7850,
    minRate: 7400,
    maxRate: 8100,
    svTradersRate: 7900,
    trend: 'UP',
    trendPercent: '+₹120/Qtl',
    lastUpdated: 'Today 08:30 AM',
    standardMoisture: 8,
    icon: '☁️',
  },
  {
    id: 'redgram-kandulu',
    name: 'Red Gram / Pigeon Pea (కందులు)',
    nameTe: 'కందులు (ఎరుపు / తెలుపు రకం)',
    variety: 'Bold Quality (ఎర్ర కందులు)',
    varietyTe: 'ఎర్ర కందులు',
    marketLocation: 'Nagarkurnool Mandi',
    marketLocationTe: 'నాగర్‌కర్నూల్ మార్కెట్',
    mspRate: 7550,
    currentRate: 10200,
    minRate: 9800,
    maxRate: 10450,
    svTradersRate: 10300,
    trend: 'UP',
    trendPercent: '+₹150/Qtl',
    lastUpdated: 'Today 08:30 AM',
    standardMoisture: 10,
    icon: '🫘',
  },
  {
    id: 'groundnut-verusenaga',
    name: 'Groundnut / Peanut (వేరుశెనగ)',
    nameTe: 'వేరుశెనగ (కాయలు - పల్లీలు)',
    variety: 'K-6 & Kadiri Varieties',
    varietyTe: 'కదిరి & గుత్తి వేరుశెనగ',
    marketLocation: 'Nagarkurnool / Wanaparthy Mandi',
    marketLocationTe: 'నాగర్‌కర్నూల్ / వనపర్తి',
    mspRate: 6783,
    currentRate: 7200,
    minRate: 6850,
    maxRate: 7400,
    svTradersRate: 7250,
    trend: 'STEADY',
    trendPercent: 'Steady',
    lastUpdated: 'Today 08:30 AM',
    standardMoisture: 8,
    icon: '🥜',
  },
  {
    id: 'maize-mokkajonna',
    name: 'Maize / Corn (మొక్కజొన్న)',
    nameTe: 'మొక్కజొన్న (హైబ్రిడ్ గింజలు)',
    variety: 'Yellow Hybrid Grain',
    varietyTe: 'పసుపు హైబ్రిడ్ గింజ',
    marketLocation: 'Jadcherla / Mahabubnagar Mandi',
    marketLocationTe: 'జడ్చర్ల మార్కెట్ యార్డ్',
    mspRate: 2225,
    currentRate: 2340,
    minRate: 2250,
    maxRate: 2400,
    svTradersRate: 2360,
    trend: 'UP',
    trendPercent: '+₹30/Qtl',
    lastUpdated: 'Today 08:30 AM',
    standardMoisture: 14,
    icon: '🌽',
  },
  {
    id: 'castor-aamudalu',
    name: 'Castor Seed (ఆముదాలు)',
    nameTe: 'ఆముదాలు (హైబ్రిడ్ రకాలు)',
    variety: 'DCH-517 / GCH-7',
    varietyTe: 'హైబ్రిడ్ ఆముదం గింజలు',
    marketLocation: 'Nagarkurnool Mandi',
    marketLocationTe: 'నాగర్‌కర్నూల్ మార్కెట్',
    mspRate: 5950,
    currentRate: 6150,
    minRate: 5900,
    maxRate: 6300,
    svTradersRate: 6200,
    trend: 'STEADY',
    trendPercent: 'Steady',
    lastUpdated: 'Today 08:30 AM',
    standardMoisture: 7,
    icon: '🌱',
  }
];

export interface CropDosagePlan {
  cropId: string;
  name: string;
  nameTe: string;
  icon: string;
  seedRatePerAcre: string;
  seedRatePerAcreTe: string;
  spacing: string;
  durationDays: string;
  basalDose: {
    dapKg: number;
    ureaKg: number;
    mopPotashKg: number;
    zincSulfateKg: number;
    organicCompostKg: number;
    instructions: string;
    instructionsTe: string;
  };
  stages: {
    stageName: string;
    stageNameTe: string;
    daysAfterSowing: string;
    fertilizerDose: string;
    fertilizerDoseTe: string;
    protectionTip: string;
    protectionTipTe: string;
    recommendedProduct: string;
  }[];
  keyPestAlert: string;
  keyPestAlertTe: string;
}

export const cropDosagePlans: CropDosagePlan[] = [
  {
    cropId: 'paddy',
    name: 'Paddy / Rice (వరి)',
    nameTe: 'వరి (వరి నాట్లు & వెదజల్లే పద్ధతి)',
    icon: '🌾',
    seedRatePerAcre: '20 - 25 kg (Fine) / 30 kg (Coarse)',
    seedRatePerAcreTe: '20 - 25 కిలోలు (సన్న రకాలు) / 30 కిలోలు (దొడ్డు)',
    spacing: '15 cm x 10 cm or 20 cm x 15 cm',
    durationDays: '125 - 145 Days',
    basalDose: {
      dapKg: 50,
      ureaKg: 25,
      mopPotashKg: 20,
      zincSulfateKg: 10,
      organicCompostKg: 1000,
      instructions: 'Apply DAP (1 Bag 50kg), MOP (20kg), and Zinc Sulfate (10kg) at the time of final puddling before transplanting.',
      instructionsTe: 'ఆఖరి దమ్ము సమయంలో ఎకరాకు 1 బస్తా DAP (50 కిలోలు), 20 కిలోల పొటాష్, 10 కిలోల జింక్ సల్ఫేట్ వేయాలి.'
    },
    stages: [
      {
        stageName: 'Tillering Stage (పిలకల దశ)',
        stageNameTe: 'పిలకలు తొడిగే దశ (20-25 రోజులు)',
        daysAfterSowing: '20 - 25 DAT',
        fertilizerDose: 'Urea 30kg + Neem Cake 10kg per acre',
        fertilizerDoseTe: 'యూరియా 30 కిలోలు + వేపపిండి 10 కిలోలు',
        protectionTip: 'Watch for Stem Borer (కాండం తొలిచే పురుగు). Apply Cartap Hydrochloride 4G granules (8kg/acre).',
        protectionTipTe: 'కాండం తొలిచే పురుగు నివారణకు కార్టాప్ హైడ్రోక్లోరైడ్ 4G గుళికలు (8 కిలోలు) చల్లండి.',
        recommendedProduct: 'Padan 4G / Caldan'
      },
      {
        stageName: 'Panicle Initiation (చిరుపొట్ట దశ)',
        stageNameTe: 'చిరుపొట్ట దశ (45-50 రోజులు)',
        daysAfterSowing: '45 - 50 DAT',
        fertilizerDose: 'Urea 25kg + MOP Potash 15kg per acre',
        fertilizerDoseTe: 'యూరియా 25 కిలోలు + పొటాష్ 15 కిలోలు',
        protectionTip: 'Spray for Neck Blast & Sheath Blight. Apply Tricyclazole + Hexaconazole.',
        protectionTipTe: 'అగ్గితెగులు మరియు పొడతెగులు నివారణకు ట్రైసైక్లాజోల్ + హెక్సాకొనాజోల్ పిచికారీ చేయాలి.',
        recommendedProduct: 'Baan / Nativo / Saaf'
      },
      {
        stageName: 'Milky & Grain Filling (గింజ పాలుపోసుకునే దశ)',
        stageNameTe: 'గింజ పాలుపోసుకునే & గట్టిపడే దశ (70-80 రోజులు)',
        daysAfterSowing: '70 - 80 DAT',
        fertilizerDose: '13-0-45 Potassium Nitrate (1kg/acre foliar spray)',
        fertilizerDoseTe: '13-0-45 పొటాషియం నైట్రేట్ (ఎకరాకు 1 కిలో పిచికారీ)',
        protectionTip: 'Prevent Brown Plant Hopper (BPH - సుడిదోమ). Maintain aeration in fields. Apply Pymetrozine / Dinotefuran.',
        protectionTipTe: 'సుడిదోమ నివారణకు పైమెట్రోజిన్ 50% WDG (120 గ్రాములు) లేదా డైనోటెఫ్యూరాన్ పిచికారీ చేయండి.',
        recommendedProduct: 'Chess / Token / Osheen'
      }
    ],
    keyPestAlert: 'High humidity increases BPH & Neck Blast risk. Do not over-apply excess Urea during cloudy weather.',
    keyPestAlertTe: 'తేమ ఎక్కువ ఉన్నప్పుడు సుడిదోమ & అగ్గితెగులు వచ్చే అవకాశం ఉంది. యూరియా మోతాదు మించకూడదు.'
  },
  {
    cropId: 'cotton',
    name: 'Cotton / Kapas (పత్తి)',
    nameTe: 'పత్తి (బి.టి హైబ్రిడ్)',
    icon: '☁️',
    seedRatePerAcre: '2 Packets (900g total with refugia)',
    seedRatePerAcreTe: '2 ప్యాకెట్లు (సుమారు 900 గ్రాములు)',
    spacing: '90 cm x 60 cm or 120 cm x 45 cm',
    durationDays: '150 - 180 Days',
    basalDose: {
      dapKg: 50,
      ureaKg: 20,
      mopPotashKg: 25,
      zincSulfateKg: 10,
      organicCompostKg: 1500,
      instructions: 'Apply 1 bag 20:20:0:13 or DAP 50kg + MOP 25kg per acre along rows at 5-7 cm depth during sowing.',
      instructionsTe: 'విత్తే సమయంలో సాలులో ఎకరాకు 1 బస్తా 20:20:0:13 లేదా DAP 50 కిలోలు + 25 కిలోల పొటాష్ వేయాలి.'
    },
    stages: [
      {
        stageName: 'Vegetative Growth (మొక్క పెరుగుదల దశ)',
        stageNameTe: 'శాఖీయ పెరుగుదల దశ (30-35 రోజులు)',
        daysAfterSowing: '30 - 35 DAS',
        fertilizerDose: 'Urea 30kg + 19-19-19 Foliar Spray (5g/L)',
        fertilizerDoseTe: 'యూరియా 30 కిలోలు + 19-19-19 స్ప్రే',
        protectionTip: 'Control Sucking Pests (Aphids, Jassids, Thrips). Spray Acetamiprid or Flonicamid.',
        protectionTipTe: 'రసం పీల్చే పురుగుల (తామర, పేనుబంక) నివారణకు ఎసిటామిప్రిడ్ లేదా ఉలాలా (ఫ్లోనికామిడ్) పిచికారీ.',
        recommendedProduct: 'Ulala / Pride / Confidor'
      },
      {
        stageName: 'Squaring & Flowering (పూత & కాత దశ)',
        stageNameTe: 'పూత & పిందె దశ (60-70 రోజులు)',
        daysAfterSowing: '60 - 70 DAS',
        fertilizerDose: 'Urea 30kg + MOP Potash 25kg + Boron 20% (1g/L spray)',
        fertilizerDoseTe: 'యూరియా 30 కిలోలు + పొటాష్ 25 కిలోలు + బోరాన్ స్ప్రే',
        protectionTip: 'Pink Bollworm (గులాబీ రంగు కాయ తొలిచే పురుగు) prevention. Spray Proclaim (Emamectin) or Ampligo.',
        protectionTipTe: 'గులాబీ రంగు పురుగు నివారణకు ప్రోక్లైమ్ (ఎమామెక్టిన్ బెంజోయేట్) లేదా ఆంప్లిగో పిచికారీ.',
        recommendedProduct: 'Ampligo / Proclaim / Coragen'
      },
      {
        stageName: 'Boll Development & Bursting (కాయ పక్వత & విచ్చుకునే దశ)',
        stageNameTe: 'కాయ పక్వత దశ (90-110 రోజులు)',
        daysAfterSowing: '90 - 110 DAS',
        fertilizerDose: '0-0-50 Sulphate of Potash + Magnesium Sulphate spray',
        fertilizerDoseTe: '0-0-50 పొటాష్ + మెగ్నీషియం సల్ఫేట్ స్ప్రే',
        protectionTip: 'Prevent leaf reddening and fungal leaf spot. Apply Propiconazole or Azoxystrobin.',
        protectionTipTe: 'ఆకు ఎరుపు మరియు మచ్చ తెగులు రాకుండా ప్రొపికొనాజోల్ పిచికారీ చేయండి.',
        recommendedProduct: 'Tilt / Amistar'
      }
    ],
    keyPestAlert: 'Install Pheromone traps (4-5 per acre) at 45 DAS to monitor Pink Bollworm moths.',
    keyPestAlertTe: '45 రోజుల వయసులో ఎకరాకు 4-5 లింగాకర్షక బుట్టలు (ఫెరమోన్ ట్రాప్స్) తప్పనిసరిగా ఏర్పాటు చేయండి.'
  },
  {
    cropId: 'redgram',
    name: 'Red Gram / Kandulu (కందులు)',
    nameTe: 'కందులు (ఎర్ర కంది / ఆశా రకం)',
    icon: '🫘',
    seedRatePerAcre: '4 - 5 kg per acre',
    seedRatePerAcreTe: '4 - 5 కిలోలు ఎకరాకు',
    spacing: '150 cm x 30 cm (Sole) / Intercrop with Cotton',
    durationDays: '160 - 180 Days',
    basalDose: {
      dapKg: 40,
      ureaKg: 10,
      mopPotashKg: 15,
      zincSulfateKg: 5,
      organicCompostKg: 800,
      instructions: 'Treat seeds with Rhizobium & Trichoderma. Apply 40kg DAP + 15kg MOP basal in furrows.',
      instructionsTe: 'రైజోబియంతో విత్తన శుద్ధి చేయండి. ఎకరాకు 40 కిలోల DAP + 15 కిలోల పొటాష్ వేయండి.'
    },
    stages: [
      {
        stageName: 'Branching Stage (కొమ్మల దశ)',
        stageNameTe: 'కొమ్మలు వేసే దశ (40-45 రోజులు)',
        daysAfterSowing: '40 - 45 DAS',
        fertilizerDose: 'Foliar spray with 19-19-19 (5g/L water)',
        fertilizerDoseTe: '19-19-19 నీటిలో కరిగే ఎరువు పిచికారీ',
        protectionTip: 'Nip terminal shoots at 45-50 days to encourage extensive side branching and flowers.',
        protectionTipTe: 'ఎక్కువ కొమ్మలు, పూత రావడం కోసం 45-50 రోజులలో పై చిగుళ్ళను తుంచాలి (Nipping).',
        recommendedProduct: 'Bio-stimulant Planofix'
      },
      {
        stageName: 'Flowering & Pod Formation (పూత & కాయ దశ)',
        stageNameTe: 'పూత & కాయ దశ (90-110 రోజులు)',
        daysAfterSowing: '90 - 110 DAS',
        fertilizerDose: '13-0-45 (10g/L) + Boron (1.5g/L)',
        fertilizerDoseTe: '13-0-45 + బోరాన్ పిచికారీ',
        protectionTip: 'Protect against Pod Borer (మరుకా & హెలికోవెర్ప). Spray Chlorantraniliprole (Coragen) or Spinetoram.',
        protectionTipTe: 'కాయతొలిచే పురుగు నివారణకు కొరాజన్ లేదా డెలిగేట్ పిచికారీ చేయండి.',
        recommendedProduct: 'Coragen / Delegate'
      }
    ],
    keyPestAlert: 'Wilt disease (ఎండు తెగులు) caution: Drench base with Carbendazim / Trichoderma if soil is waterlogged.',
    keyPestAlertTe: 'ఎండు తెగులు రాకుండా పొలంలో నీరు నిల్వ ఉండకుండా చూసుకోండి. ట్రైకోడెర్మా వాడండి.'
  },
  {
    cropId: 'groundnut',
    name: 'Groundnut / Verusenaga (వేరుశెనగ)',
    nameTe: 'వేరుశెనగ (కదిరి-6 / లేపాక్షి / ధరణి)',
    icon: '🥜',
    seedRatePerAcre: '40 - 45 kg kernels per acre',
    seedRatePerAcreTe: '40 - 45 కిలోల విత్తన గుండ్లు',
    spacing: '30 cm x 10 cm',
    durationDays: '105 - 115 Days',
    basalDose: {
      dapKg: 40,
      ureaKg: 15,
      mopPotashKg: 30,
      zincSulfateKg: 10,
      organicCompostKg: 1000,
      instructions: 'Apply 200 kg Gypsum at 40-45 days along with basal DAP & Potash for bold oil-rich pods.',
      instructionsTe: 'విత్తేప్పుడు 40 కిలోల DAP + 30 కిలోల పొటాష్ మరియు 40-45 రోజుల వద్ద ఎకరాకు 200 కిలోల జిప్సం వేయాలి.'
    },
    stages: [
      {
        stageName: 'Pegging Stage (ఊడలు దిగే దశ)',
        stageNameTe: 'ఊడలు దిగే దశ (40-45 రోజులు)',
        daysAfterSowing: '40 - 45 DAS',
        fertilizerDose: 'Apply 200 kg Gypsum per acre around plant roots and weed the field',
        fertilizerDoseTe: 'మొక్కల మొదళ్లలో ఎకరాకు 200 కిలోల జిప్సం వేసి మట్టి ఎగదోయాలి',
        protectionTip: 'Gypsum provides vital Calcium and Sulphur essential for pod formation without empty shells (పోల్ కాయలు రాకుండా).',
        protectionTipTe: 'జిప్సం కాల్షియం అందించి పోల్ కాయలు రాకుండా నిండు గింజలు ఏర్పడేలా చేస్తుంది.',
        recommendedProduct: 'Agricultural Gypsum 50kg Bags'
      },
      {
        stageName: 'Tikka Leaf Spot Control (టిక్కా ఆకుమచ్చ తెగులు)',
        stageNameTe: 'ఆకుమచ్చ & తుప్పు తెగులు (60-70 రోజులు)',
        daysAfterSowing: '60 - 70 DAS',
        fertilizerDose: 'Foliar spray 0-52-34 (5g/L)',
        fertilizerDoseTe: '0-52-34 స్ప్రే',
        protectionTip: 'Spray Mancozeb + Carbendazim (Saaf 2g/L) or Hexaconazole to keep leaves healthy till harvest.',
        protectionTipTe: 'సాఫ్ (Saaf 2 గ్రా/లీ) లేదా హెక్సాకొనాజోల్ పిచికారీ చేయండి.',
        recommendedProduct: 'Saaf / Contaf'
      }
    ],
    keyPestAlert: 'Spodoptera (లద్దె పురుగు) voracious defoliation: Spray Novaluron or Emamectin Benzoate if spotted.',
    keyPestAlertTe: 'లద్దె పురుగు ఆకులను తినకుండా ఎమామెక్టిన్ బెంజోయేట్ స్ప్రే చేయండి.'
  },
  {
    cropId: 'maize',
    name: 'Maize / Corn (మొక్కజొన్న)',
    nameTe: 'మొక్కజొన్న (హైబ్రిడ్ రకాలు)',
    icon: '🌽',
    seedRatePerAcre: '7 - 8 kg per acre',
    seedRatePerAcreTe: '7 - 8 కిలోలు ఎకరాకు',
    spacing: '60 cm x 20 cm',
    durationDays: '110 - 125 Days',
    basalDose: {
      dapKg: 50,
      ureaKg: 20,
      mopPotashKg: 20,
      zincSulfateKg: 10,
      organicCompostKg: 1000,
      instructions: 'Apply DAP 50kg, Potash 20kg, and Zinc Sulfate 10kg basal. Maize is a heavy feeder of nutrients.',
      instructionsTe: 'ఎకరాకు 1 బస్తా DAP (50 కిలోలు), 20 కిలోల పొటాష్ మరియు 10 కిలోల జింక్ వేయాలి.'
    },
    stages: [
      {
        stageName: 'Knee High Stage (మోకాలి ఎత్తు దశ)',
        stageNameTe: 'మోకాలి ఎత్తు దశ (25-30 రోజులు)',
        daysAfterSowing: '25 - 30 DAS',
        fertilizerDose: 'Urea 35kg per acre as top dressing',
        fertilizerDoseTe: 'యూరియా 35 కిలోలు పైపాటుగా వేయాలి',
        protectionTip: 'Fall Armyworm (కత్తెర పురుగు) ALERT: Drop Chlorantraniliprole / Spinetoram into the whorl (సుడులలో మందు వేయాలి).',
        protectionTipTe: 'కత్తెర పురుగు నివారణకు కొరాజన్ లేదా డెలిగేట్ ద్రావణాన్ని మొక్క సుడులలో పడేలా పిచికారీ చేయాలి.',
        recommendedProduct: 'Coragen / Delegate / Ampligo'
      },
      {
        stageName: 'Tasseling & Silking (కంకి పాలుపోసుకునే దశ)',
        stageNameTe: 'పూత & కంకి దశ (50-60 రోజులు)',
        daysAfterSowing: '50 - 60 DAS',
        fertilizerDose: 'Urea 35kg + MOP Potash 15kg per acre',
        fertilizerDoseTe: 'యూరియా 35 కిలోలు + 15 కిలోల పొటాష్',
        protectionTip: 'Ensure adequate irrigation during tasseling. Water stress reduces kernel count severely.',
        protectionTipTe: 'కంకి ఏర్పడే సమయంలో నేలలో తగినంత తేమ ఉండేలా నీటి తడులు ఇవ్వండి.',
        recommendedProduct: 'Irrigation & Micro-nutrients'
      }
    ],
    keyPestAlert: 'Fall Armyworm can devastate maize within 48 hours. Scout whorls twice a week.',
    keyPestAlertTe: 'కత్తెర పురుగు సుడిలో ఉండి ఆకులను కొట్టేస్తుంది. వారానికి రెండుసార్లు సుడులను గమనించండి.'
  }
];

export interface CropDisease {
  id: string;
  name: string;
  nameTe: string;
  crop: string;
  cropTe: string;
  category: 'Fungal' | 'Insect Pest' | 'Sucking Pest' | 'Viral / Bacterial' | 'Nutritional';
  categoryTe: string;
  symptoms: string;
  symptomsTe: string;
  organicRemedy: string;
  organicRemedyTe: string;
  chemicalRemedy: string;
  chemicalRemedyTe: string;
  storeMedicine: string;
  dosage: string;
  dosageTe: string;
  imageUrl: string;
  severity: 'HIGH' | 'MEDIUM' | 'CRITICAL';
}

export const cropDiseasesCatalog: CropDisease[] = [
  {
    id: 'paddy-blast',
    name: 'Paddy Neck & Leaf Blast (అగ్గితెగులు)',
    nameTe: 'వరి అగ్గితెగులు & మెడవిరుపు తెగులు',
    crop: 'Paddy',
    cropTe: 'వరి',
    category: 'Fungal',
    categoryTe: 'శిలీంధ్ర తెగులు',
    symptoms: 'Spindle-shaped eye spots with brown margins and grey center on leaves; black rot at panicle neck causing chaffy empty grains.',
    symptomsTe: 'ఆకులపై కంటి ఆకారంలో ఇరువైపులా మొనదేలిన గోధుమ రంగు మచ్చలు, కంకి మెడ నల్లబడి గింజలు తాలుగా మారడం.',
    organicRemedy: 'Avoid excess nitrogen fertilizer. Spray Pseudomonas fluorescens (10g/L) or fermented sour butter milk.',
    organicRemedyTe: 'యూరియా వాడకం తగ్గించండి. సూడోమోనాస్ లేదా పులిసిన మజ్జిగ పిచికారీ చేయండి.',
    chemicalRemedy: 'Tricyclazole 75% WP or Nativo (Tebuconazole + Trifloxystrobin) or Baan 75 WP.',
    chemicalRemedyTe: 'ట్రైసైక్లాజోల్ 75% WP (0.6 గ్రా/లీ) లేదా నటివో (0.4 గ్రా/లీ) పిచికారీ చేయాలి.',
    storeMedicine: 'Baan 75 WP / Nativo / Beam',
    dosage: '0.6 g per Liter of water (120g per acre)',
    dosageTe: 'లీటర్ నీటికి 0.6 గ్రాములు (ఎకరాకు 120 గ్రాములు)',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80',
    severity: 'CRITICAL'
  },
  {
    id: 'paddy-bph',
    name: 'Brown Plant Hopper - BPH (సుడిదోమ)',
    nameTe: 'వరి సుడిదోమ (బి.పి.హెచ్)',
    crop: 'Paddy',
    cropTe: 'వరి',
    category: 'Sucking Pest',
    categoryTe: 'రసం పీల్చే పురుగు',
    symptoms: 'Circular patches of drying plants like burnt circles (Hopper burn) at plant base near water level.',
    symptomsTe: 'వరి పొలంలో అక్కడక్కడా సుడులు సుడులుగా పైరు ఎండిపోయి కాలిపోయినట్లు కనిపించడం (హాప్పర్ బర్న్).',
    organicRemedy: 'Form alleys (బాటలు తీయడం) every 2 meters for aeration and drain standing water for 2-3 days.',
    organicRemedyTe: 'పైరులో గాలి వెలుతురు కోసం ప్రతి 2 మీటర్లకు బాటలు తీయాలి. పొలంలోని నీటిని 2-3 రోజులు తీసివేయాలి.',
    chemicalRemedy: 'Pymetrozine 50% WDG (Chess) or Dinotefuran 20% SG (Token / Osheen) or Triflumuron.',
    chemicalRemedyTe: 'పైమెట్రోజిన్ 50% WDG (120 గ్రా/ఎకరా) లేదా డైనోటెఫ్యూరాన్ (100 గ్రా/ఎకరా) పిచికారీ.',
    storeMedicine: 'Chess 50 WDG / Token / Osheen',
    dosage: '0.6 g per Liter directed to base of the plant',
    dosageTe: 'మొక్కల మొదళ్ళు తడిసేలా ఎకరాకు 120 గ్రాములు పిచికారీ',
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=600&q=80',
    severity: 'CRITICAL'
  },
  {
    id: 'cotton-pink-bollworm',
    name: 'Pink Bollworm (గులాబీ రంగు కాయతొలిచే పురుగు)',
    nameTe: 'పత్తి గులాబీ రంగు కాయ తొలిచే పురుగు',
    crop: 'Cotton',
    cropTe: 'పత్తి',
    category: 'Insect Pest',
    categoryTe: 'కీటక పురుగు',
    symptoms: 'Rosette flowers (గులాబీ ఆకారపు పూత), internal feeding inside bolls, stained lint, premature opening of bolls.',
    symptomsTe: 'పూలు ముడుచుకుని రోసెట్ ఆకారంలో మారడం, కాయల లోపల గింజలను తొలిచి దూదిని నల్లగా మార్చడం.',
    organicRemedy: 'Install 5 Pheromone traps per acre. Collect and destroy rosette flowers and dropped bolls.',
    organicRemedyTe: 'ఎకరాకు 5 లింగాకర్షక బుట్టలు పెట్టండి. రాలిన పూత మరియు గులాబీ పువ్వులను ఏరి నాశనం చేయాలి.',
    chemicalRemedy: 'Emamectin Benzoate 5% SG (Proclaim) or Ampligo (Chlorantraniliprole + Lambda) or Profenofos 50% EC.',
    chemicalRemedyTe: 'ప్రోక్లైమ్ (ఎమామెక్టిన్ బెంజోయేట్ 100 గ్రా/ఎకరా) లేదా ఆంప్లిగో (100 మి.లీ/ఎకరా) పిచికారీ.',
    storeMedicine: 'Proclaim 5 SG / Ampligo / Coragen',
    dosage: '0.5 g/L or Ampligo 0.5 ml/L of water',
    dosageTe: 'లీటర్ నీటికి 0.5 గ్రాములు లేదా ఆంప్లిగో 0.5 మి.లీ',
    imageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80',
    severity: 'CRITICAL'
  },
  {
    id: 'cotton-sucking-pests',
    name: 'Sucking Pests - Thrips & Whitefly (తామర పురుగులు & తెల్లదోమ)',
    nameTe: 'పత్తి రసం పీల్చే పురుగులు (తామర & తెల్లదోమ)',
    crop: 'Cotton',
    cropTe: 'పత్తి',
    category: 'Sucking Pest',
    categoryTe: 'రసం పీల్చే పురుగు',
    symptoms: 'Cup-shaped upward curling of leaves, silvery shiny patches underneath, stunted growth, sooty mould.',
    symptomsTe: 'ఆకులు దోనెల్లాగా పైకి ముడుచుకుపోవడం, ఆకుల వెనుక భాగంలో వెండి రంగు మెరుపు, ఎదుగుదల తగ్గడం.',
    organicRemedy: 'Install yellow and blue sticky traps (10 per acre). Spray 5% Neem seed kernel extract (NSKE).',
    organicRemedyTe: 'పసుపు & నీలి రంగు జిగురు అట్టలు (ఎకరాకు 10) పెట్టాలి. 5% వేప గింజల కషాయం పిచికారీ.',
    chemicalRemedy: 'Flonicamid 50% WG (Ulala) or Diafenthiuron 50% WP (Pegasus) or Acetamiprid 20% SP.',
    chemicalRemedyTe: 'ఉలాలా (ఫ్లోనికామిడ్ 60 గ్రా/ఎకరా) లేదా పెగాసస్ (డయాఫెంథియురాన్ 200 గ్రా/ఎకరా).',
    storeMedicine: 'Ulala / Pegasus / Pride',
    dosage: '0.3 g to 1 g per Liter of water',
    dosageTe: 'లీటర్ నీటికి 0.3 గ్రాములు (ఉలాలా)',
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
    severity: 'HIGH'
  },
  {
    id: 'maize-fall-armyworm',
    name: 'Fall Armyworm (కత్తెర పురుగు)',
    nameTe: 'మొక్కజొన్న కత్తెర పురుగు (ఫాల్ ఆర్మీవార్మ్)',
    crop: 'Maize',
    cropTe: 'మొక్కజొన్న',
    category: 'Insect Pest',
    categoryTe: 'కీటక పురుగు',
    symptoms: 'Pin holes in leaves, severe skeletonization of whorl leaves with sawdust-like fecal frass in central funnel.',
    symptomsTe: 'ఆకులపై రంధ్రాలు, సుడులను కొరికేసి చెక్కపొట్టు లాంటి విసర్జన పదార్థం సుడిలో నిండి ఉండడం.',
    organicRemedy: 'Apply sand + lime (9:1 ratio) or neem cake powder into leaf whorls in early stages.',
    organicRemedyTe: 'సుడిలో ఇసుక + సున్నం మిశ్రమం లేదా వేపపిండి వేయాలి.',
    chemicalRemedy: 'Chlorantraniliprole 18.5% SC (Coragen) or Spinetoram 11.7% SC (Delegate) or Emamectin Benzoate.',
    chemicalRemedyTe: 'కొరాజన్ (0.4 మి.లీ/లీ) లేదా డెలిగేట్ (0.5 మి.లీ/లీ) సుడులలో పడేలా పిచికారీ.',
    storeMedicine: 'Coragen / Delegate / Ampligo',
    dosage: '0.4 ml per Liter with nozzle focused on whorls',
    dosageTe: 'లీటర్ నీటికి 0.4 మి.లీ (సుడులలో పడేలా)',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    severity: 'CRITICAL'
  },
  {
    id: 'groundnut-tikka',
    name: 'Tikka Leaf Spot & Rust (ఆకుమచ్చ & తుప్పు తెగులు)',
    nameTe: 'వేరుశెనగ టిక్కా ఆకుమచ్చ & తుప్పు తెగులు',
    crop: 'Groundnut',
    cropTe: 'వేరుశెనగ',
    category: 'Fungal',
    categoryTe: 'శిలీంధ్ర తెగులు',
    symptoms: 'Small dark brown circular spots with bright yellow halo on upper surface; early defoliation of leaves.',
    symptomsTe: 'ఆకుల పైభాగంలో పసుపు రంగు వలయంతో కూడిన నల్లటి గుండ్రని మచ్చలు, ఆకులు రాలిపోవడం.',
    organicRemedy: 'Intercrop with Pearl millet or Red gram to break spore dispersion. Spray sour buttermilk.',
    organicRemedyTe: 'సజ్జ లేదా కందితో అంతర పంట వేయాలి. పులిసిన మజ్జిగ పిచికారీ.',
    chemicalRemedy: 'Saaf (Mancozeb + Carbendazim) or Hexaconazole 5% EC (Contaf) or Tebuconazole.',
    chemicalRemedyTe: 'సాఫ్ (2 గ్రా/లీ) లేదా కాంటాఫ్ (హెక్సాకొనాజోల్ 2 మి.లీ/లీ) పిచికారీ.',
    storeMedicine: 'Saaf 75 WP / Contaf 5 EC',
    dosage: '2 g / 2 ml per Liter of water',
    dosageTe: 'లీటర్ నీటికి 2 గ్రాములు లేదా 2 మి.లీ',
    imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80',
    severity: 'MEDIUM'
  }
];

export interface TractorImplementSpec {
  id: string;
  name: string;
  nameTe: string;
  category: 'Tillage' | 'Seedbed' | 'Puddling' | 'Harvesting' | 'Transport';
  categoryTe: string;
  recommendedSoil: string;
  recommendedSoilTe: string;
  recommendedHP: string;
  hourlyRate: number; // ₹ per hour
  acreRate: number; // ₹ per acre approx
  avgHoursPerAcre: number;
  avgDieselLitersPerAcre: number;
  description: string;
  descriptionTe: string;
  icon: string;
}

export const tractorImplementsSpecs: TractorImplementSpec[] = [
  {
    id: 'mb-plough',
    name: 'Heavy Mouldboard (MB) / Disc Plough',
    nameTe: 'భారీ మోల్డ్‌బోర్డ్ / డిస్క్ నాగలి దుక్కి',
    category: 'Tillage',
    categoryTe: 'లోతు దుక్కి',
    recommendedSoil: 'Black Cotton Soil & Hard Clay (నల్ల రేగడి నేలలు)',
    recommendedSoilTe: 'నల్ల రేగడి & గట్టి నేలలు',
    recommendedHP: '50 - 55 HP 4WD',
    hourlyRate: 1400,
    acreRate: 1800,
    avgHoursPerAcre: 1.25,
    avgDieselLitersPerAcre: 6.5,
    description: 'Deep inversion ploughing down to 10-12 inches to break the hard subsoil layer and bury persistent weed roots.',
    descriptionTe: 'భూమిని 10-12 అంగుళాల లోతుగా దున్ని కలుపు వేళ్లను ఎండబెట్టి, వర్షపు నీటిని నిల్వ చేసేలా చేస్తుంది.',
    icon: '🚜'
  },
  {
    id: 'rotavator',
    name: 'Heavy Duty 6-7ft Rotavator',
    nameTe: 'రోటవేటర్ (మట్టిని పొడి చేసే యంత్రం)',
    category: 'Seedbed',
    categoryTe: 'విత్తన నేల తయారీ',
    recommendedSoil: 'All Soil Types (ఎర్ర చల్క & నల్ల నేలలు)',
    recommendedSoilTe: 'అన్ని రకాల నేలలకు అనుకూలం',
    recommendedHP: '45 - 55 HP',
    hourlyRate: 1500,
    acreRate: 1600,
    avgHoursPerAcre: 1.0,
    avgDieselLitersPerAcre: 5.5,
    description: 'Pulverizes soil clods into fine tilth in a single pass, ideal for seed germination and moisture conservation.',
    descriptionTe: 'మట్టి పెల్లలను మెత్తటి పొడిగా మార్చి విత్తనాలు త్వరగా మొలకెత్తేందుకు మరియు తేమ నిలిచేందుకు తోడ్పడుతుంది.',
    icon: '⚙️'
  },
  {
    id: 'cultivator',
    name: '9-Tyne Spring Cultivator (కల్టివేటర్)',
    nameTe: '9-పారల స్ప్రింగ్ కల్టివేటర్',
    category: 'Tillage',
    categoryTe: 'సాధారణ దుక్కి',
    recommendedSoil: 'Red Chalka & Loamy Soil (ఎర్ర నేలలు)',
    recommendedSoilTe: 'ఎర్ర చల్క & ఇసుక నేలలు',
    recommendedHP: '40 - 50 HP',
    hourlyRate: 1200,
    acreRate: 1100,
    avgHoursPerAcre: 0.85,
    avgDieselLitersPerAcre: 4.2,
    description: 'Fast secondary tillage to aerate topsoil, remove post-harvest crop stubble, and prepare furrows.',
    descriptionTe: 'పై మట్టిని వదులు చేసి గాలి ఆడేలా చేయడానికి మరియు పంట వ్యర్థాలను తొలగించడానికి వేగవంతమైన దుక్కి.',
    icon: '🌱'
  },
  {
    id: 'puddler-cage',
    name: 'Paddy Puddler & Cage Wheels (దమ్ము చేయడం)',
    nameTe: 'వరి పొలం దమ్ము & కేజ్ వీల్స్',
    category: 'Puddling',
    categoryTe: 'వరి దమ్ము పనులు',
    recommendedSoil: 'Wet Clay & Paddy Fields (వరి మాగాణి నేలలు)',
    recommendedSoilTe: 'వరి మాగాణి & బురద నేలలు',
    recommendedHP: '45 - 55 HP 4WD',
    hourlyRate: 1600,
    acreRate: 1900,
    avgHoursPerAcre: 1.2,
    avgDieselLitersPerAcre: 6.0,
    description: 'Puddling and soft bed preparation for paddy transplanting with minimal water percolation loss.',
    descriptionTe: 'వరి నాట్లకు అనుకూలంగా బురద దమ్ము చేసి నీరు ఇంకిపోకుండా సమతుల్యంగా ఉంచుతుంది.',
    icon: '🌾'
  },
  {
    id: 'laser-leveler',
    name: 'Laser Land Leveler (లేజర్ లెవలర్)',
    nameTe: 'లేజర్ భూమి చదును యంత్రం',
    category: 'Seedbed',
    categoryTe: 'చదును చేయడం',
    recommendedSoil: 'Irrigated Fields & New Land (బోరు & బావి ఆయకట్టు)',
    recommendedSoilTe: 'బోరు & కాలువ ఆయకట్టు భూములు',
    recommendedHP: '55 HP',
    hourlyRate: 1800,
    acreRate: 2200,
    avgHoursPerAcre: 1.3,
    avgDieselLitersPerAcre: 7.0,
    description: 'Millimeter-precise laser guided topography leveling to save up to 30% irrigation water and ensure uniform crop growth.',
    descriptionTe: 'లేజర్ సాంకేతికతతో పొలాన్ని సమానంగా చదును చేసి 30% నీటిని ఆదా చేస్తుంది.',
    icon: '📐'
  },
  {
    id: 'harvester',
    name: 'Combine Harvester (వరి & ధాన్యం కోత యంత్రం)',
    nameTe: 'కంబైన్ హార్వెస్టర్ (వరి కోత & నూర్పిడి)',
    category: 'Harvesting',
    categoryTe: 'పంట కోత',
    recommendedSoil: 'Dry/Semi-dry Paddy Fields (వరి పొలాలు)',
    recommendedSoilTe: 'వరి పొలాలు',
    recommendedHP: 'Chain / Wheel Harvester',
    hourlyRate: 2600,
    acreRate: 2800,
    avgHoursPerAcre: 1.1,
    avgDieselLitersPerAcre: 8.5,
    description: 'Simultaneous harvesting, threshing, and cleaning of paddy with minimal grain loss.',
    descriptionTe: 'వరి పంటను ఏకకాలంలో కోయడం, నూర్చడం మరియు శుభ్రపరిచే పూర్తి యంత్రం.',
    icon: '🌾'
  }
];
