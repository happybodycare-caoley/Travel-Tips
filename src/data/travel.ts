export interface EmbassyInfo {
  name: string;
  address: string;
  phone: string;
  url: string;
}

export interface CountryData {
  id: string;
  nameJa: string;
  nameEn: string;
  voltage: string;
  plugTypes: string[];
  tapWaterDrinkable: boolean;
  toiletPaperFlushable: boolean;
  cashNecessity: 'high' | 'medium' | 'low';
  tippingCulture: 'required' | 'optional' | 'none';
  acceptedCards: {
    visaMaster: boolean;
    amex: boolean;
    jcb: boolean;
    unionPay: boolean;
  };
  embassy: EmbassyInfo;
  notes?: string;
}

export const COUNTRIES_DATA: CountryData[] = [
  // --- アジア ---
  {
    id: 'TH', nameJa: 'タイ', nameEn: 'Thailand',
    voltage: '220V', plugTypes: ['A', 'C', 'B3'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'medium', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: true, unionPay: true },
    embassy: {
      name: '在タイ日本国大使館',
      address: '177 Witthayu Road, Lumphini, Pathum Wan, Bangkok 10330, Thailand',
      phone: '+66-2-696-3000',
      url: 'https://www.th.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '屋台やローカル店は現金/QRのみ。高級店やショッピングモールはカード可。プラグはA/Cが主流でそのまま挿せる場所も多い。'
  },
  {
    id: 'TW', nameJa: '台湾', nameEn: 'Taiwan',
    voltage: '110V', plugTypes: ['A', 'C', 'O'],
    tapWaterDrinkable: false, toiletPaperFlushable: true,
    cashNecessity: 'medium', tippingCulture: 'none',
    acceptedCards: { visaMaster: true, amex: true, jcb: true, unionPay: true },
    embassy: {
      name: '公益財団法人日本台湾交流協会台北事務所',
      address: '台北市松山區慶城街28號 通泰商業大樓',
      phone: '+886-2-2713-8000',
      url: 'https://www.koryu.or.jp/taipei/'
    },
    notes: '夜市や個人店は現金必須。電圧は110Vのため日本の100V家電もほぼそのまま使用可。【パスポート紛失時】移民署で紛失証明を取得後、台北/高雄事務所で「帰国のための渡航書」を申請可能（最短即日発給）。本籍地入りの住民票または戸籍謄本が必要。'
  },
  {
    id: 'KR', nameJa: '韓国', nameEn: 'South Korea',
    voltage: '220V', plugTypes: ['SE', 'C'],
    tapWaterDrinkable: false, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'none',
    acceptedCards: { visaMaster: true, amex: true, jcb: true, unionPay: true },
    embassy: {
      name: '在大韓民国日本国大使館',
      address: 'Twin Tree Tower A, 6, Yulgok-ro, Jongno-gu, Seoul, Republic of Korea',
      phone: '+82-2-2170-5200',
      url: 'https://www.kr.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '完全キャッシュレス社会。古い建物では紙を流せない場所も一部あり。ホテルによってはAタイプ（日本と同じ）が挿せる場合もある。'
  },
  {
    id: 'CN', nameJa: '中国', nameEn: 'China',
    voltage: '220V', plugTypes: ['A', 'C', 'O2'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'low', tippingCulture: 'none',
    acceptedCards: { visaMaster: false, amex: false, jcb: false, unionPay: true },
    embassy: {
      name: '在中国日本国大使館',
      address: 'No.1 Liangmaqiao Dongjie, Chaoyang District, Beijing 100600, China',
      phone: '+86-10-8531-9800',
      url: 'https://www.cn.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'Visa/Masterはほぼ使えず銀聯・Alipay・WeChat Payが必須。'
  },
  {
    id: 'VN', nameJa: 'ベトナム', nameEn: 'Vietnam',
    voltage: '220V', plugTypes: ['A', 'C', 'SE'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'none',
    acceptedCards: { visaMaster: true, amex: false, jcb: true, unionPay: true },
    embassy: {
      name: '在ベトナム日本国大使館',
      address: '27 Lieu Giai Street, Ngoc Ha District, Hanoi, Viet Nam',
      phone: '+84-24-3846-3000',
      url: 'https://www.vn.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'ローカル店・交通は現金メイン。タクシーは配車アプリ決済が安全。'
  },
  {
    id: 'SG', nameJa: 'シンガポール', nameEn: 'Singapore',
    voltage: '230V', plugTypes: ['BF'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'none',
    acceptedCards: { visaMaster: true, amex: true, jcb: true, unionPay: true },
    embassy: {
      name: '在シンガポール日本国大使館',
      address: '16 Nassim Road, Singapore, 258390, Republic of Singapore',
      phone: '+65-6235-8855',
      url: 'https://www.sg.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'ホーカー（屋台街）でもタッチ決済普及。高水準のインフラ。プラグは英国式のBFタイプ。'
  },
  {
    id: 'MY', nameJa: 'マレーシア', nameEn: 'Malaysia',
    voltage: '240V', plugTypes: ['BF'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'medium', tippingCulture: 'none',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在マレーシア日本国大使館',
      address: '11, Persiaran Stonor, Off Jalan Tun Razak, 50450 Kuala Lumpur, Malaysia',
      phone: '+60-3-2177-2600',
      url: 'https://www.my.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'コンセントは英国式のBFタイプ（角型3ピン）。屋台街は現金用意が必要。'
  },
  {
    id: 'ID', nameJa: 'インドネシア（バリ島含む）', nameEn: 'Indonesia',
    voltage: '220V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: true, unionPay: true },
    embassy: {
      name: '在インドネシア日本国大使館',
      address: 'Jl. M.H. Thamrin No.24, Jakarta 10350, Indonesia',
      phone: '+62-21-3192-4308',
      url: 'https://www.id.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '観光地以外は現金文化。水当たりに注意。バリ島は在デンパサール日本国総領事館の管轄。'
  },
  {
    id: 'PH', nameJa: 'フィリピン', nameEn: 'Philippines',
    voltage: '220V', plugTypes: ['A', 'B', 'C'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: true, unionPay: true },
    embassy: {
      name: '在フィリピン日本国大使館',
      address: '2627 Roxas Boulevard, Pasay City, Metro Manila, 1300, Philippines',
      phone: '+63-2-8551-5710',
      url: 'https://www.ph.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'プラグ形状は日本と同じA型が多いが電圧は220Vなのでドライヤー要注意。'
  },
  {
    id: 'IN', nameJa: 'インド', nameEn: 'India',
    voltage: '230V', plugTypes: ['B3L', 'C'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'required',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: false },
    embassy: {
      name: '在インド日本国大使館',
      address: '50-G, Chanakyapuri, New Delhi 110021, India',
      phone: '+91-11-2687-6564',
      url: 'https://www.in.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'ミネラルウォーター必須。紙は流さず備え付けのハンドシャワーを使用。'
  },
  {
    id: 'NP', nameJa: 'ネパール', nameEn: 'Nepal',
    voltage: '230V', plugTypes: ['B3', 'C'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: false },
    embassy: {
      name: '在ネパール日本国大使館',
      address: '1253, Narayan Gopal Sadak, Panipokhari, ward No.3, Kathmandu (North), Nepal',
      phone: '+977-1-4526680',
      url: 'https://www.np.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'トレッキングエリア含めほぼ現金必須。停電対策（モバイルバッテリー）必須。'
  },
  {
    id: 'LK', nameJa: 'スリランカ', nameEn: 'Sri Lanka',
    voltage: '230V', plugTypes: ['B3', 'BF'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: true },
    embassy: {
      name: '在スリランカ日本国大使館',
      address: 'No.34, W. A. D. Ramanayake Mawatha, Colombo 2, Sri Lanka',
      phone: '+94-11-2693831',
      url: 'https://www.lk.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '大型丸3ピン（B3タイプ）が多めだが、新しい建物では英国式BFタイプも見られる。ローカル移動やローカル店は現金必須。'
  },
  {
    id: 'LA', nameJa: 'ラオス', nameEn: 'Laos',
    voltage: '230V', plugTypes: ['A', 'C', 'SE'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: true },
    embassy: {
      name: '在ラオス日本国大使館',
      address: 'Road Sisangvone, Vientiane, Lao People\'s Democratic Republic',
      phone: '+856-21-414400',
      url: 'https://www.la.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'コンセントはAタイプがそのまま挿せることが多いが電圧は230V。ローカル会計は現金必須。'
  },
  {
    id: 'UZ', nameJa: 'ウズベキスタン', nameEn: 'Uzbekistan',
    voltage: '220V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: true },
    embassy: {
      name: '在ウズベキスタン日本国大使館',
      address: '1-28, Sadyk Azimov St., Tashkent, 100047, Republic of Uzbekistan',
      phone: '+998-78-120-8060',
      url: 'https://www.uz.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '丸ピン2本のC/SEタイプ。スム現金（特に小額紙幣）が日常の支払いに不可欠。'
  },
  // --- 北中米・太平洋 ---
  {
    id: 'US', nameJa: 'アメリカ合衆国（本土）', nameEn: 'United States',
    voltage: '120V', plugTypes: ['A', 'B'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'required',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在米国日本国大使館',
      address: '2520 Massachusetts Avenue N.W., Washington D.C., 20008-2869, U.S.A.',
      phone: '+1-202-238-6700',
      url: 'https://www.us.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'チップ必須（15〜20%）。ほぼ完全キャッシュレス。Discover加盟店で銀聯/JCB使用可。'
  },
  {
    id: 'US-HI', nameJa: 'ハワイ', nameEn: 'Hawaii',
    voltage: '120V', plugTypes: ['A', 'B'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'required',
    acceptedCards: { visaMaster: true, amex: true, jcb: true, unionPay: true },
    embassy: {
      name: '在ホノルル日本国総領事館',
      address: '1742 Nuuanu Avenue, Honolulu, Hawaii 96817-3201, U.S.A.',
      phone: '+1-808-543-3111',
      url: 'https://www.honolulu.us.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '米国本土と同等のインフラ。JCBカード提示でワイキキトロリー（ピンクライン）が無料になる特典が継続中。'
  },
  {
    id: 'CA', nameJa: 'カナダ', nameEn: 'Canada',
    voltage: '120V', plugTypes: ['A', 'B'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'required',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在カナダ日本国大使館',
      address: '255 Sussex Drive, Ottawa, Ontario K1N 9E6, Canada',
      phone: '+1-613-241-8541',
      url: 'https://www.ca.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '米国同様に高いキャッシュレス率とチップ習慣あり。'
  },
  {
    id: 'MX', nameJa: 'メキシコ', nameEn: 'Mexico',
    voltage: '127V', plugTypes: ['A', 'B'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'required',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: false },
    embassy: {
      name: '在メキシコ日本国大使館',
      address: 'Paseo de la Reforma No. 243 Torre Mapfre piso 9, Col. Cuauhtemoc, C.P. 06500, Ciudad de México, México',
      phone: '+52-55-5211-0028',
      url: 'https://www.mx.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'ローカル市場やチップ用にペソ現金必須。紙はゴミ箱へ。'
  },
  {
    id: 'PR', nameJa: 'プエルトリコ', nameEn: 'Puerto Rico',
    voltage: '120V', plugTypes: ['A', 'B'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'required',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: false },
    embassy: {
      name: '在ニューヨーク日本国総領事館（プエルトリコを管轄）',
      address: '299 Park Avenue, New York, NY 10171, U.S.A.',
      phone: '+1-212-371-8222',
      url: 'https://www.ny.us.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '米国自治領のためコンセント形状・電圧・通貨（米ドル）・チップ文化は米国本土と同じ。プエルトリコに独立した公館はなく、在ニューヨーク総領事館が管轄。【パスポート紛失時】島内に公館・名誉領事はなく、原則は申請者本人の来館が必要。まず在ニューヨーク総領事館に電話で相談を（米国本土への移動が必要になる可能性あり）。'
  },
  {
    id: 'PW', nameJa: 'パラオ', nameEn: 'Palau',
    voltage: '110V', plugTypes: ['A', 'B'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'medium', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: false },
    embassy: {
      name: '在パラオ日本国大使館',
      address: 'Palau Pacific Resort, Ngerkebesang, Koror, Republic of Palau 96940',
      phone: '+680-488-6455',
      url: 'https://www.palau.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'プラグ形状（A/B）や電圧は日本・米国とほぼ共通だが水道水は飲用不可。通貨は米ドル。'
  },
  {
    id: 'FJ', nameJa: 'フィジー', nameEn: 'Fiji',
    voltage: '240V', plugTypes: ['O'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'medium', tippingCulture: 'none',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: false },
    embassy: {
      name: '在フィジー日本国大使館',
      address: 'Level 2, BSP Life Centre, Thomson Street, Suva, Fiji',
      phone: '+679-330-4633',
      url: 'https://www.fj.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '豪州・NZと同じハの字型Oタイププラグ。リゾート外ではフィジードル現金が必要。'
  },
  // --- 南米 ---
  {
    id: 'BR', nameJa: 'ブラジル', nameEn: 'Brazil',
    voltage: '127V', plugTypes: ['C', 'CB'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'medium', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: false },
    embassy: {
      name: '在ブラジル日本国大使館',
      address: 'SES Avenida das Nações, Quadra 811, Lote 39, 70425-900, Brasília, D. Federal, Brasil',
      phone: '+55-61-3442-4200',
      url: 'https://www.br.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '地域により電圧が127Vと220Vで異なるため要確認。紙はゴミ箱へ。'
  },
  {
    id: 'AR', nameJa: 'アルゼンチン', nameEn: 'Argentina',
    voltage: '220V', plugTypes: ['O', 'C'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'required',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: false },
    embassy: {
      name: '在アルゼンチン日本国大使館',
      address: 'Bouchard 547 Piso-17, Buenos Aires, Argentina',
      phone: '+54-11-4318-8200',
      url: 'https://www.ar.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'インフレの影響で現金（現地通貨/米ドル）が重宝される場合あり。'
  },
  {
    id: 'CL', nameJa: 'チリ', nameEn: 'Chile',
    voltage: '220V', plugTypes: ['C', 'L'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'medium', tippingCulture: 'required',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: false },
    embassy: {
      name: '在チリ日本国大使館',
      address: 'Av. Ricardo Lyon 520, Providencia, Santiago, Chile',
      phone: '+56-2-2232-1807',
      url: 'https://www.cl.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'イタリアと同じLタイプ（細い3本ピン）またはCタイプ。レストランでは10%程度のチップが一般的。'
  },
  {
    id: 'BO', nameJa: 'ボリビア', nameEn: 'Bolivia',
    voltage: '230V', plugTypes: ['A', 'C'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: false },
    embassy: {
      name: '在ボリビア日本国大使館',
      address: 'Calle Rosendo Gutiérrez No. 497, esq. Sanchez Lima, La Paz, Bolivia',
      phone: '+591-2-241-9110',
      url: 'https://www.bo.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'ウユニ塩湖観光などの地方部では現金（ボリビアーノ）が必須。高山病対策・防寒対策を優先。'
  },
  {
    id: 'PE', nameJa: 'ペルー', nameEn: 'Peru',
    voltage: '220V', plugTypes: ['A', 'C'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: false },
    embassy: {
      name: '在ペルー日本国大使館',
      address: 'Av. San Felipe 356, Jesus Maria, Lima, Peru',
      phone: '+51-1-219-9500',
      url: 'https://www.pe.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'A/C複合コンセントが多くそのまま挿せる場合もあるが電圧は220V。クスコやマチュピチュでは現金必須。'
  },
  // --- ヨーロッパ ---
  {
    id: 'GB', nameJa: 'イギリス', nameEn: 'United Kingdom',
    voltage: '230V', plugTypes: ['BF'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在英国日本国大使館',
      address: '101-104, Piccadilly, London, W1J 7JT, U.K.',
      phone: '+44-20-7465-6500',
      url: 'https://www.uk.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'バス・地下鉄もクレカタッチ決済。現金お断りの店舗多数。プラグは角型3ピンのBFタイプ。'
  },
  {
    id: 'FR', nameJa: 'フランス', nameEn: 'France',
    voltage: '230V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在フランス日本国大使館',
      address: '7, Avenue Hoche, 75008, Paris, France',
      phone: '+33-1-4888-6200',
      url: 'https://www.fr.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'マルシェ（市場）等を除き少額でもカード決済が一般的。'
  },
  {
    id: 'DE', nameJa: 'ドイツ', nameEn: 'Germany',
    voltage: '230V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'medium', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: true },
    embassy: {
      name: '在ドイツ日本国大使館',
      address: 'Hiroshimastr.6, 10785 Berlin, Bundesrepublik Deutschland',
      phone: '+49-30-210940',
      url: 'https://www.de.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '欧州の中では比較的現金志向が残る（個人レストラン等）。チップは端数を切り上げる程度が一般的。'
  },
  {
    id: 'IT', nameJa: 'イタリア', nameEn: 'Italy',
    voltage: '230V', plugTypes: ['C', 'L'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'medium', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在イタリア日本国大使館',
      address: 'Via Quintino Sella, 60, 00187 Roma, Italia',
      phone: '+39-06-487991',
      url: 'https://www.it.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '公衆トイレ有料（小銭が必要）の場合あり。Lタイプは独自形状なので専用プラグがあると安心。'
  },
  {
    id: 'ES', nameJa: 'スペイン', nameEn: 'Spain',
    voltage: '230V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在スペイン日本国大使館',
      address: 'Calle Serrano, 109, 28006-Madrid, España',
      phone: '+34-91-590-7600',
      url: 'https://www.es.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'バルでの小額決済もタッチ決済対応が多い。'
  },
  {
    id: 'PT', nameJa: 'ポルトガル', nameEn: 'Portugal',
    voltage: '230V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'medium', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: true },
    embassy: {
      name: '在ポルトガル日本国大使館',
      address: 'Rua Ramalho Ortigão, 51-6°, 1070-229 Lisboa, Portugal',
      phone: '+351-21-311-0560',
      url: 'https://www.pt.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '欧州標準のC/SEタイプ。個人経営のカフェやローカルショップでは少額現金があると安心。'
  },
  {
    id: 'CH', nameJa: 'スイス', nameEn: 'Switzerland',
    voltage: '230V', plugTypes: ['C', 'J'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'none',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在スイス日本国大使館',
      address: 'Engestrasse 53, 3012 Bern, Schweiz',
      phone: '+41-31-300-22-22',
      url: 'https://www.ch.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'プラグが独自のJタイプ（C型プラグも刺さる場合が多い）。物価高。'
  },
  {
    id: 'NL', nameJa: 'オランダ', nameEn: 'Netherlands',
    voltage: '230V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'none',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在オランダ日本国大使館',
      address: 'Tobias Asserlaan 5, 2517 KC, The Hague, The Netherlands',
      phone: '+31-70-346-9544',
      url: 'https://www.nl.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '完全キャッシュレス化が非常に進んでいる。'
  },
  // --- オセアニア ---
  {
    id: 'AU', nameJa: 'オーストラリア', nameEn: 'Australia',
    voltage: '240V', plugTypes: ['O'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'none',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在オーストラリア日本国大使館',
      address: '112 Empire Circuit, Yarralumla, Canberra A.C.T. 2600, Australia',
      phone: '+61-2-6273-3244',
      url: 'https://www.au.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'ハの字型のOタイププラグ。カード決済主流。'
  },
  {
    id: 'NZ', nameJa: 'ニュージーランド', nameEn: 'New Zealand',
    voltage: '230V', plugTypes: ['O'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'none',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在ニュージーランド日本国大使館',
      address: 'Level 18, Majestic Centre, 100 Willis Street, Wellington 1, New Zealand',
      phone: '+64-4-473-1540',
      url: 'https://www.nz.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'オーストラリアと同様のインフラ仕様。'
  },
  {
    id: 'PF', nameJa: 'タヒチ（仏領ポリネシア）', nameEn: 'French Polynesia',
    voltage: '220V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'medium', tippingCulture: 'none',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: false },
    embassy: {
      name: '在ヌメア領事事務所（仏領ポリネシアを管轄）',
      address: 'Immeuble Le Norwich, 11 rue Georges Baudoux, 98800 Nouméa, Nouvelle-Calédonie, France',
      phone: '+687-24-18-55',
      url: 'https://www.fr.emb-japan.go.jp/itpr_ja/noumea.html'
    },
    notes: 'フランス本国と同じC/SEタイププラグ。ミネラルウォーター推奨。タヒチに独立した公館はなく、在ヌメア領事事務所（ニューカレドニア）が管轄。【パスポート紛失時】現地でパスポート・渡航書の発給は不可。パペーテ市内は警察署、それ以外は憲兵隊（Gendarmerie）で盗難・紛失証明書を取得し、ファアア国際空港の国境警察署へ提出して出国許可を得る（日本への直行便のみ、パスポートなしでの出国が特別に認められる）。手続きに迷う場合は在ヌメア領事事務所または在パペーテ日本国名誉領事に相談可能。'
  },
  // --- 中東 ---
  {
    id: 'AE', nameJa: 'アラブ首長国連邦（ドバイ）', nameEn: 'United Arab Emirates',
    voltage: '220V', plugTypes: ['BF'],
    tapWaterDrinkable: false, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: true, jcb: true, unionPay: true },
    embassy: {
      name: '在ドバイ日本国総領事館',
      address: '28th Floor, Dubai World Trade Centre Building, Dubai, United Arab Emirates',
      phone: '+971-4-293-8888',
      url: 'https://www.dubai.uae.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '超キャッシュレス都市。ボトルウォーター推奨。英国式のBFタイプが主流。'
  },
  {
    id: 'SA', nameJa: 'サウジアラビア', nameEn: 'Saudi Arabia',
    voltage: '220V', plugTypes: ['BF'],
    tapWaterDrinkable: false, toiletPaperFlushable: true,
    cashNecessity: 'low', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: false },
    embassy: {
      name: '在サウジアラビア日本国大使館',
      address: 'A-11 Diplomatic Quarter, Riyadh, Saudi Arabia',
      phone: '+966-11-488-1100',
      url: 'https://www.ksa.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '英国式BFタイプ。近年急速にキャッシュレス化が進行中。'
  },
  {
    id: 'TR', nameJa: 'トルコ', nameEn: 'Turkey',
    voltage: '220V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'medium', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: true },
    embassy: {
      name: '在トルコ日本国大使館',
      address: 'Resit Galip Caddesi No. 81, Gaziosmanpasa, Ankara, Republic of Türkiye',
      phone: '+90-312-446-0500',
      url: 'https://www.tr.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '水道水は飲用不可。観光地やバザールでは現金があると有利。'
  },
  // --- アフリカ ---
  {
    id: 'EG', nameJa: 'エジプト', nameEn: 'Egypt',
    voltage: '220V', plugTypes: ['B3', 'C'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'required',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: false },
    embassy: {
      name: '在エジプト日本国大使館',
      address: '81 Corniche El Nil Street, Maadi, Cairo, Egypt',
      phone: '+20-2-2528-5910',
      url: 'https://www.eg.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '「バクシーシ（チップ）」文化が強い。トイレ利用時も小銭が必要。'
  },
  {
    id: 'MA', nameJa: 'モロッコ', nameEn: 'Morocco',
    voltage: '220V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: false },
    embassy: {
      name: '在モロッコ日本国大使館',
      address: '39, Avenue Ahmed Balafrej, Souissi, Rabat, Maroc',
      phone: '+212-537-63-17-82',
      url: 'https://www.ma.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '欧州と同じC/SEタイププラグ。メディナ（旧市街）や市場では現金（ディルハム）が必須。'
  },
  {
    id: 'DZ', nameJa: 'アルジェリア', nameEn: 'Algeria',
    voltage: '230V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: false },
    embassy: {
      name: '在アルジェリア日本国大使館',
      address: '1, Chemin El Bakri, Ben Aknoun, 16028, Alger, Algérie',
      phone: '+213-23-37-55-11',
      url: 'https://www.dz.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'C/SEタイプ。クレジットカードが使えない場面が多いため現金の準備が強く推奨される。'
  },
  {
    id: 'TN', nameJa: 'チュニジア', nameEn: 'Tunisia',
    voltage: '230V', plugTypes: ['C', 'SE'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: false },
    embassy: {
      name: '在チュニジア日本国大使館',
      address: '9 Rue Apollo XI, 1082 Mahrajene-Tunis, Tunisie',
      phone: '+216-71-791-251',
      url: 'https://www.tn.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'フランス式C/SEタイプ。ローカル店舗や移動用にディナール現金が必要。'
  },
  {
    id: 'SN', nameJa: 'セネガル', nameEn: 'Senegal',
    voltage: '230V', plugTypes: ['C', 'B3', 'SE', 'K'],
    tapWaterDrinkable: false, toiletPaperFlushable: false,
    cashNecessity: 'high', tippingCulture: 'optional',
    acceptedCards: { visaMaster: true, amex: false, jcb: false, unionPay: false },
    embassy: {
      name: '在セネガル日本国大使館',
      address: 'Boulevard Martin Luther King, Dakar, Sénégal',
      phone: '+221-33-849-5500',
      url: 'https://www.sn.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: 'プラグ形状が多岐にわたるためマルチ変換プラグがあると安心。Kタイプは一般的な変換プラグでは非対応の場合があるので要注意。現金主義中心。'
  },
  {
    id: 'ZA', nameJa: '南アフリカ', nameEn: 'South Africa',
    voltage: '230V', plugTypes: ['C', 'B3'],
    tapWaterDrinkable: true, toiletPaperFlushable: true,
    cashNecessity: 'medium', tippingCulture: 'required',
    acceptedCards: { visaMaster: true, amex: true, jcb: false, unionPay: true },
    embassy: {
      name: '在南アフリカ共和国日本国大使館',
      address: '259 Baines Street, corner Frans Oerder Street, Groenkloof, Pretoria 0181, Republic of South Africa',
      phone: '+27-12-452-1500',
      url: 'https://www.za.emb-japan.go.jp/itprtop_ja/index.html'
    },
    notes: '独自の大型丸3ピン（B3タイプ）が中心。一部地域はマルチ変換プラグが非対応のB3L規格なので要注意。主要都市の水道水は飲用可。近年Cタイプ導入も進んでいる。'
  }
];


// ---- 表示用の補助データ ----

export const REGION_OF: Record<string, string> = {
  TH: "アジア", TW: "アジア", KR: "アジア", CN: "アジア", VN: "アジア",
  SG: "アジア", MY: "アジア", ID: "アジア", PH: "アジア", IN: "アジア",
  NP: "アジア", LK: "アジア", LA: "アジア", UZ: "アジア",
  US: "北中米・太平洋", "US-HI": "北中米・太平洋", CA: "北中米・太平洋",
  MX: "北中米・太平洋", PR: "北中米・太平洋", PW: "北中米・太平洋", FJ: "北中米・太平洋",
  BR: "南米", AR: "南米", CL: "南米", BO: "南米", PE: "南米",
  GB: "ヨーロッパ", FR: "ヨーロッパ", DE: "ヨーロッパ", IT: "ヨーロッパ",
  ES: "ヨーロッパ", PT: "ヨーロッパ", CH: "ヨーロッパ", NL: "ヨーロッパ",
  AU: "オセアニア", NZ: "オセアニア", PF: "オセアニア",
  AE: "中東", SA: "中東", TR: "中東",
  EG: "アフリカ", MA: "アフリカ", DZ: "アフリカ", TN: "アフリカ", SN: "アフリカ", ZA: "アフリカ",
};

export const REGION_ORDER = [
  "アジア",
  "北中米・太平洋",
  "南米",
  "ヨーロッパ",
  "オセアニア",
  "中東",
  "アフリカ",
] as const;

/** 国コード（US-HI などのサブコード付きも可）から絵文字フラグを生成 */
export function flagOf(id: string): string {
  const cc = id.split("-")[0]!.toUpperCase();
  if (cc.length !== 2) return "🏳️";
  return String.fromCodePoint(...[...cc].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65));
}

export function voltageValue(voltage: string): number {
  const n = parseInt(voltage.replace(/[^0-9]/g, ""), 10);
  return Number.isFinite(n) ? n : 100;
}

export const PLUG_LABEL: Record<string, string> = {
  A: "Aタイプ（日本と同じ）",
  B: "Bタイプ（3本ピン）",
  B3: "B3タイプ（大型丸3本）",
  B3L: "B3Lタイプ（特大丸3本）",
  BF: "BFタイプ（角3本・英国式）",
  C: "Cタイプ（丸2本）",
  CB: "CBタイプ（ブラジル式）",
  SE: "SEタイプ（丸2本＋アース）",
  O: "Oタイプ（ハの字）",
  O2: "O2タイプ（ハの字＋アース）",
  J: "Jタイプ（スイス独自）",
  K: "Kタイプ（デンマーク式）",
  L: "Lタイプ（細丸3本・イタリア式）",
};

export function plugLabel(p: string): string {
  return PLUG_LABEL[p] ?? `${p}タイプ`;
}

export type Appliance = {
  id: string;
  name: string;
  desc: string;
  icon: "smartphone" | "laptop" | "hairdryer" | "kettle" | "shaver" | "toothbrush";
  dualVoltage: boolean;
  maxVoltage: number;
  watt: string;
};

export const APPLIANCES: Appliance[] = [
  {
    id: "phone",
    name: "スマートフォン充電器",
    desc: "100V-240V対応",
    icon: "smartphone",
    dualVoltage: true,
    maxVoltage: 240,
    watt: "約20W",
  },
  {
    id: "laptop",
    name: "ノートPC",
    desc: "100V-240V対応",
    icon: "laptop",
    dualVoltage: true,
    maxVoltage: 240,
    watt: "約65W",
  },
  {
    id: "dryer",
    name: "ドライヤー",
    desc: "100V専用品",
    icon: "hairdryer",
    dualVoltage: false,
    maxVoltage: 100,
    watt: "1200W級",
  },
  {
    id: "kettle",
    name: "携帯用電気ケトル（トラベルケトル）",
    desc: "100V-240V対応 / 折りたたみ式など",
    icon: "kettle",
    dualVoltage: true,
    maxVoltage: 240,
    watt: "約600W",
  },
  {
    id: "iron",
    name: "ヘアアイロン",
    desc: "100V専用品",
    icon: "hairdryer",
    dualVoltage: false,
    maxVoltage: 100,
    watt: "約40W",
  },
  {
    id: "shaver",
    name: "電気シェーバー",
    desc: "多くは100V-240V対応",
    icon: "shaver",
    dualVoltage: true,
    maxVoltage: 240,
    watt: "約10W",
  },
  {
    id: "toothbrush",
    name: "電動歯ブラシ",
    desc: "充電器は要確認",
    icon: "toothbrush",
    dualVoltage: true,
    maxVoltage: 240,
    watt: "約5W",
  },
];

export type Verdict = "safe" | "transformer" | "danger";

export function judge(country: CountryData, appliance: Appliance): {
  verdict: Verdict;
  message: string;
} {
  const v = voltageValue(country.voltage);
  if (appliance.maxVoltage >= v) {
    return { verdict: "safe", message: "変圧器不要。変換プラグのみでそのまま使えます。" };
  }
  // 100V専用家電を200V〜240V地域（タイ・欧州など）で使う場合は危険
  if (v >= 200) {
    const heavy = appliance.watt.includes("1200");
    return {
      verdict: "danger",
      message: heavy
        ? "海外対応（100V-240V表記）のヘアアイロンを購入するか、大容量変圧器が必要です。ドライヤーは消費電力が大きく対応変圧器も高額・重量級になるため、現地調達か海外対応モデルの持参を強く推奨します。変圧器なしでの使用は発熱・発煙・故障の原因になります。"
        : "海外対応（100V-240V表記）のヘアアイロンを購入するか、大容量変圧器が必要です。変圧器なしで使用すると発熱・発煙・故障の原因になります。",
    };
  }
  return {
    verdict: "transformer",
    message:
      "⚠️ 変圧器が必要です。変圧器なしで使用すると発熱・発煙・故障の原因になります。",
  };
}

export type AffiliateItem = {
  id: string;
  title: string;
  desc: string;
  icon: "plug" | "hair" | "transformer" | "kettle";
  amazonUrl: string;
  rakutenUrl: string;
};

/** 結果表示エリア内のおすすめグッズ枠（アフィリエイト用） */
export type RecommendGoods = {
  id: string;
  /** バナーのタイトル（例: 💡 この国で使えるおすすめ変換プラグ・変圧器） */
  title: string;
  /** おすすめ品目リスト */
  items: string[];
  /** 補足メッセージ */
  message: string;
  /** アフィリエイト用リンク */
  amazonUrl: string;
  rakutenUrl: string;
};

export const RECOMMENDS: Record<
  "plug" | "hygiene" | "security" | "skimming",
  RecommendGoods
> = {
  plug: {
    id: "plug",
    title: "💡 この国で使えるおすすめ変換プラグ・変圧器",
    items: ["全世界対応マルチ変換プラグ", "海外対応ヘアアイロン", "大容量変圧器（1500W級）"],
    message:
      "プラグ形状の違いはマルチ変換プラグ1つで解決。100V専用のドライヤー・ヘアアイロンを使う場合は対応ワット数の大きい変圧器か、海外対応モデルの持参がおすすめです。",
    amazonUrl: "https://www.amazon.co.jp/s?k=海外旅行+変換プラグ",
    rakutenUrl: "https://search.rakuten.co.jp/search/mall/海外旅行+変換プラグ/",
  },
  hygiene: {
    id: "hygiene",
    title: "🧻 衛生・トイレ対策グッズ",
    items: ["携帯ウォシュレット", "携帯ティッシュ・ウェットティッシュ", "折りたたみ水筒・浄水ボトル"],
    message:
      "紙が流せない・水道水が飲めない国では、携帯ウォシュレットや携帯ティッシュが1つあると旅の快適さが大きく変わります。",
    amazonUrl: "https://www.amazon.co.jp/s?k=携帯ウォシュレット",
    rakutenUrl: "https://search.rakuten.co.jp/search/mall/携帯ウォシュレット/",
  },
  security: {
    id: "security",
    title: "🔒 盗難・スリ対策グッズ",
    items: ["腹巻き型セキュリティポーチ", "隠しポケット付きベルト", "盗難防止用サブ財布"],
    message:
      "現金を持ち歩く機会が多いため、服の中に隠せるポーチ等での貴重品分散管理がおすすめです。",
    amazonUrl: "https://www.amazon.co.jp/s?k=セキュリティポーチ+海外旅行",
    rakutenUrl: "https://search.rakuten.co.jp/search/mall/セキュリティポーチ+海外旅行/",
  },
  skimming: {
    id: "skimming",
    title: "💳 スキミング防止・カード保護グッズ",
    items: ["スキミング防止カードケース", "スキミング防止パスポートカバー"],
    message:
      "カード決済が中心となるため、タッチ決済や磁気データの盗聴を防ぐケースがあると安心です。",
    amazonUrl: "https://www.amazon.co.jp/s?k=スキミング防止+カードケース",
    rakutenUrl: "https://search.rakuten.co.jp/search/mall/スキミング防止+カードケース/",
  },
};

export const AFFILIATES: Record<"plug" | "hair" | "transformer" | "kettle", AffiliateItem> = {
  plug: {
    id: "plug",
    title: "🔌 これ1つで安心！全世界対応マルチ変換プラグ",
    desc: "渡航先ごとにプラグを買い足す必要なし。USBポート付きでスマホも同時充電可能。",
    icon: "plug",
    amazonUrl: "https://www.amazon.co.jp/s?k=全世界対応+マルチ変換プラグ+USB",
    rakutenUrl: "https://search.rakuten.co.jp/search/mall/全世界対応+マルチ変換プラグ+USB/",
  },
  hair: {
    id: "hair",
    title: "💇‍♀️ 海外対応（100V-240V）ヘアアイロン",
    desc: "日本の100V専用アイロンをそのまま使うと故障や火災の原因に！現地電圧に対応したアイロンが安心です。",
    icon: "hair",
    amazonUrl: "https://www.amazon.co.jp/s?k=海外対応+ヘアアイロン+100V-240V",
    rakutenUrl: "https://search.rakuten.co.jp/search/mall/海外対応+ヘアアイロン+100V-240V/",
  },
  transformer: {
    id: "transformer",
    title: "⚡️ 日本の100V専用家電を使うなら変圧器",
    desc: "日本の100V専用電化製品（ドライヤーや美容家電等）を現地で使うための変圧器です。",
    icon: "transformer",
    amazonUrl: "https://www.amazon.co.jp/s?k=海外用+変圧器+100V",
    rakutenUrl: "https://search.rakuten.co.jp/search/mall/海外用+変圧器+100V/",
  },
  kettle: {
    id: "kettle",
    title: "☕️ 海外対応トラベルケトル",
    desc: "100V-240V対応で変圧器不要。折りたたみ式なら荷物もコンパクト。水道水が飲めない国での湯沸かしにも安心です。",
    icon: "kettle",
    amazonUrl: "https://www.amazon.co.jp/s?k=海外対応+トラベルケトル+100V-240V",
    rakutenUrl: "https://search.rakuten.co.jp/search/mall/海外対応+トラベルケトル/",
  },
};

// ============= アフィリエイトIDヘルパー =============
const AMAZON_ASSOCIATE_TAG = "caoley0c-22";
const RAKUTEN_AFFILIATE_ID = "0e5d65d2.55b03942.0e5d65d3.e0e13e40";

/**
 * Amazonアソシエイトリンクを生成する。
 * ベースURLのクエリパラメータ `tag` を `caoley0c-22` で付与・置換する。
 */
export function getAmazonAffiliateUrl(baseUrl: string): string {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("tag", AMAZON_ASSOCIATE_TAG);
    return url.toString();
  } catch {
    const sep = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${sep}tag=${AMAZON_ASSOCIATE_TAG}`;
  }
}

/**
 * 楽天アフィリエイトリンクを生成する。
 * 楽天標準形式 `https://hb.afl.rakuten.co.jp/hgc/<ID>/?pc=<encoded>&m=<encoded>` に変換する。
 */
export function getRakutenAffiliateUrl(baseUrl: string): string {
  const encoded = encodeURIComponent(baseUrl);
  return `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=${encoded}&m=${encoded}`;
}
