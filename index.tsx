import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Plug,
  Zap,
  Droplets,
  Toilet,
  Wallet,
  CreditCard,
  Coins,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Smartphone,
  Laptop,
  Wind,
  Scissors,
  Brush,
  Globe2,
  Luggage,
  Search,
  X,
  ChevronDown,
  Check,
  Layers,
  NotebookPen,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  COUNTRIES_DATA,
  APPLIANCES,
  AFFILIATES,
  RECOMMENDS,
  REGION_OF,
  REGION_ORDER,
  flagOf,
  voltageValue,
  plugLabel,
  judge,
  type CountryData,
  type Appliance,
  type RecommendGoods,
} from "@/data/travel";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "海外旅行インフラ判定｜変圧器・プラグ・水・決済チェック" },
      {
        name: "description",
        content:
          "渡航先の国と持っていく家電を選ぶだけで、変圧器の要否・変換プラグの種類・水道水・トイレ事情・現金/チップ/カード事情がまとめて分かる無料チェックツール。",
      },
      { property: "og:title", content: "海外旅行インフラ判定｜変圧器・プラグ・水・決済チェック" },
      {
        property: "og:description",
        content:
          "国と家電を選ぶだけ。変圧器の要否、変換プラグ、水・トイレ、現金とチップの事情を一括表示。",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const APPLIANCE_ICONS = {
  smartphone: Smartphone,
  laptop: Laptop,
  hairdryer: Wind,
  shaver: Scissors,
  toothbrush: Brush,
} as const;

const VERDICT_STYLE = {
  safe: {
    icon: CheckCircle2,
    label: "そのままOK",
    box: "border-success/40 bg-success/10",
    text: "text-success-foreground",
    chip: "bg-success text-success-foreground",
  },
  transformer: {
    icon: AlertTriangle,
    label: "変圧器が必要",
    box: "border-warning/50 bg-warning/15",
    text: "text-warning-foreground",
    chip: "bg-warning text-warning-foreground",
  },
  danger: {
    icon: ShieldAlert,
    label: "危険・非推奨",
    box: "border-destructive/40 bg-destructive/10",
    text: "text-destructive",
    chip: "bg-destructive text-destructive-foreground",
  },
} as const;

function SectionTitle({
  icon: Icon,
  title,
  step,
}: {
  icon: React.ElementType;
  title: string;
  step?: string;
}) {
  return (
    <div className="mb-3 flex min-w-0 items-center gap-2">
      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <h2 className="truncate text-base font-bold tracking-tight">{title}</h2>
      {step ? (
        <span className="ml-auto shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
          {step}
        </span>
      ) : null}
    </div>
  );
}

function StatusPill({
  tone,
  children,
}: {
  tone: "good" | "warn" | "bad";
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-bold",
        tone === "good" && "bg-success/20 text-success-foreground",
        tone === "warn" && "bg-warning/25 text-warning-foreground",
        tone === "bad" && "bg-destructive/15 text-destructive",
      )}
    >
      {children}
    </span>
  );
}

function InfoRow({
  icon: Icon,
  label,
  pill,
  note,
}: {
  icon: React.ElementType;
  label: string;
  pill: React.ReactNode;
  note: string;
}) {
  return (
    <div className="flex gap-3 py-3">
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold">{label}</p>
          {pill}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}

const MONEY_TONE = {
  good: {
    card: "border-success/40 bg-success/8",
    chip: "bg-success text-success-foreground",
  },
  warn: {
    card: "border-warning/50 bg-warning/12",
    chip: "bg-warning text-warning-foreground",
  },
  bad: {
    card: "border-destructive/50 bg-destructive/10",
    chip: "bg-destructive text-destructive-foreground",
  },
} as const;

function MoneyBadgeCard({
  icon: Icon,
  label,
  tone,
  badge,
  note,
}: {
  icon: React.ElementType;
  label: string;
  tone: "good" | "warn" | "bad";
  badge: string;
  note: string;
}) {
  const t = MONEY_TONE[tone];
  return (
    <div className={cn("rounded-xl border p-3", t.card)}>
      <div className="flex items-center gap-2">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-background text-foreground/70">
          <Icon className="size-4" />
        </span>
        <span className="truncate text-[11px] font-semibold text-muted-foreground">
          {label}
        </span>
      </div>
      <div
        className={cn(
          "mt-2 flex items-center justify-center rounded-lg px-2 py-1.5 text-sm font-black tracking-tight",
          t.chip,
        )}
      >
        {badge}
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{note}</p>
    </div>
  );
}

/** 各項目セクション直下に置くおすすめグッズ枠（Amazon/楽天アフィリエイト用） */
function RecommendCard({ goods, compact = false }: { goods: RecommendGoods; compact?: boolean }) {
  return (
    <div className="mt-3 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 truncate text-xs font-bold">{goods.title}</p>
        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          広告/PR
        </span>
      </div>
      {!compact && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {goods.items.map((item) => (
            <li
              key={item}
              className="rounded-full bg-background px-2 py-0.5 text-[11px] font-semibold text-foreground/80"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{goods.message}</p>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <Button size="sm" className="h-8 text-xs" asChild>
          <a href={goods.amazonUrl} target="_blank" rel="nofollow sponsored noopener">
            Amazonで探す
          </a>
        </Button>
        <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
          <a href={goods.rakutenUrl} target="_blank" rel="nofollow sponsored noopener">
            楽天市場で探す
          </a>
        </Button>
      </div>
    </div>
  );
}

/** 決済・チップ欄のおすすめ枠：現金が必要な国 → 盗難対策 / キャッシュレス国 → スキミング防止 */
function MoneyRecommends({ countries }: { countries: CountryData[] }) {
  const cashNeeded = countries.some((c) => c.cashNecessity !== "low");
  const cashless = countries.some((c) => c.cashNecessity === "low");
  return (
    <>
      {cashNeeded ? <RecommendCard goods={RECOMMENDS.security} /> : null}
      {cashless ? <RecommendCard goods={RECOMMENDS.skimming} /> : null}
    </>
  );
}

function CountryResult({
  country,
  appliances,
}: {
  country: CountryData;
  appliances: Appliance[];
}) {
  const cash = country.cashNecessity;
  const tip = country.tippingCulture;
  const cards = country.acceptedCards;
  const cardList = [
    cards.visaMaster && "Visa/Master",
    cards.amex && "Amex",
    cards.jcb && "JCB",
    cards.unionPay && "銀聯",
  ].filter(Boolean) as string[];

  return (
    <Card className="overflow-hidden border-border/70 p-0 shadow-sm">
      <div
        className="px-4 py-4 text-primary-foreground"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="text-2xl leading-none">{flagOf(country.id)}</span>
            <div className="min-w-0">
              <p className="truncate text-lg font-black">{country.nameJa}</p>
              <p className="truncate text-[11px] opacity-85">
                {country.nameEn}・{REGION_OF[country.id] ?? ""}
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm font-bold">{country.voltage}</p>
            <p className="text-[11px] opacity-85">日本は100V</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {country.plugTypes.map((p) => (
            <span
              key={p}
              className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold backdrop-blur"
            >
              {plugLabel(p)}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-5 p-4">
        <section>
          <SectionTitle icon={Zap} title="電源・変圧判定" />
          {appliances.length === 0 ? (
            <p className="text-xs text-muted-foreground">家電を選ぶと判定が表示されます。</p>
          ) : (
            <ul className="space-y-2">
              {appliances.map((a) => {
                const r = judge(country, a);
                const style = VERDICT_STYLE[r.verdict];
                const VIcon = style.icon;
                const AIcon = APPLIANCE_ICONS[a.icon];
                return (
                  <li
                    key={a.id}
                    className={cn("rounded-xl border p-3", style.box)}
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <AIcon className="size-4 shrink-0 text-foreground/70" />
                        <p className="truncate text-sm font-bold">{a.name}</p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold",
                          style.chip,
                        )}
                      >
                        <VIcon className="size-3" />
                        {style.label}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-foreground/80">{r.message}</p>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">
                      対応電圧 {a.dualVoltage ? `〜${a.maxVoltage}V` : "100V専用"} ・ {a.watt} ／
                      変換プラグ：{country.plugTypes.join(" / ")}タイプ
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
          <RecommendCard goods={RECOMMENDS.plug} />
        </section>

        <section className="rounded-xl border border-border/70 bg-muted/40 px-3">
          <div className="divide-y divide-border/60">
            <InfoRow
              icon={Droplets}
              label="水道水"
              pill={
                <StatusPill tone={country.tapWaterDrinkable ? "good" : "bad"}>
                  {country.tapWaterDrinkable ? "飲める" : "飲めない"}
                </StatusPill>
              }
              note={
                country.tapWaterDrinkable
                  ? "水道水は基本的に飲用可（体質が気になる方は市販の水を）。"
                  : "水道水は飲用不可。ミネラルウォーターを購入してください。"
              }
            />
            <InfoRow
              icon={Toilet}
              label="トイレットペーパー"
              pill={
                <StatusPill tone={country.toiletPaperFlushable ? "good" : "bad"}>
                  {country.toiletPaperFlushable ? "流せる" : "流せない"}
                </StatusPill>
              }
              note={
                country.toiletPaperFlushable
                  ? "そのまま流せます（一部の古い施設は除く）。"
                  : "紙は流さず備え付けのゴミ箱へ捨ててください。"
              }
            />
          </div>
          {!country.tapWaterDrinkable || !country.toiletPaperFlushable ? (
            <RecommendCard goods={RECOMMENDS.hygiene} />
          ) : null}
        </section>

        <section>
          <SectionTitle icon={Wallet} title="マネー・決済事情" />
          <div className="grid grid-cols-1 gap-2.5">
            <MoneyBadgeCard
              icon={Coins}
              label="現金の必要度"
              tone={cash === "low" ? "good" : cash === "medium" ? "warn" : "bad"}
              badge={
                cash === "low" ? "キャッシュレスOK" : cash === "medium" ? "少し必要" : "現金必須"
              }
              note={
                cash === "low"
                  ? "カード・タッチ決済でほぼ完結します。"
                  : cash === "medium"
                    ? "ローカル店や市場向けに少額の現地通貨を用意。"
                    : "現地通貨の現金が必須。小額紙幣を多めに。"
              }
            />
            <MoneyBadgeCard
              icon={Wallet}
              label="チップ"
              tone={tip === "none" ? "good" : tip === "optional" ? "warn" : "bad"}
              badge={tip === "none" ? "不要" : tip === "optional" ? "任意" : "必要"}
              note={
                tip === "none"
                  ? "チップ文化はありません。"
                  : tip === "optional"
                    ? "義務ではないが、満足時に端数を渡すと喜ばれます。"
                    : "レストランで15〜20%程度のチップが必要です。"
              }
            />
            <MoneyBadgeCard
              icon={CreditCard}
              label="使えるカード"
              tone={cards.jcb ? "good" : cards.visaMaster ? "warn" : "bad"}
              badge={
                cards.jcb
                  ? "JCB 使える"
                  : cards.visaMaster
                    ? "JCB ほぼ不可"
                    : "Visa/Master も不可"
              }
              note={
                cardList.length > 0
                  ? `利用可：${cardList.join(" / ")}${cards.amex ? "" : "（Amexは限定的）"}`
                  : "国際ブランドカードはほぼ使えません。現地決済手段を用意してください。"
              }
            />
          </div>
          <MoneyRecommends countries={[country]} />
        </section>

        {country.notes ? (
          <p className="rounded-xl bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
            {country.notes}
          </p>
        ) : null}
      </div>
    </Card>
  );
}


const AFFILIATE_ICONS = { plug: Plug, hair: Wind, transformer: Zap } as const;

// ---------- 項目別比較表示（複数選択時） ----------

const CASH_LABEL = { low: "完全キャッシュレス", medium: "現金併用", high: "現金必須" } as const;
const TIP_LABEL = { required: "チップ必須", optional: "チップ任意", none: "チップ不要" } as const;

function groupBy<T>(items: CountryData[], keyOf: (c: CountryData) => string) {
  const map = new Map<string, CountryData[]>();
  for (const c of items) {
    const k = keyOf(c);
    const arr = map.get(k);
    if (arr) arr.push(c);
    else map.set(k, [c]);
  }
  return [...map.entries()];
}

function CountryChips({ countries }: { countries: CountryData[] }) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {countries.map((c) => (
        <span
          key={c.id}
          className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-bold text-secondary-foreground"
        >
          {flagOf(c.id)} {c.nameJa}
        </span>
      ))}
    </div>
  );
}

function CompareGroup({
  label,
  tone,
  countries,
}: {
  label: string;
  tone: "good" | "warn" | "bad";
  countries: CountryData[];
}) {
  return (
    <li className="rounded-xl border border-border/70 bg-muted/30 p-3">
      <StatusPill tone={tone}>{label}</StatusPill>
      <CountryChips countries={countries} />
    </li>
  );
}

function CompareView({ countries }: { countries: CountryData[] }) {
  const power = groupBy(countries, (c) => `${c.voltage}｜${c.plugTypes.join("・")}`);
  const water = groupBy(countries, (c) => String(c.tapWaterDrinkable));
  const toilet = groupBy(countries, (c) => String(c.toiletPaperFlushable));
  const money = groupBy(countries, (c) => `${c.cashNecessity}｜${c.tippingCulture}`);
  const noted = countries.filter((c) => c.notes);

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <SectionTitle icon={Zap} title="電源・プラグ" />
        <ul className="space-y-2">
          {power.map(([key, cs]) => {
            const [v = "", plugs = ""] = key.split("｜");
            const vNum = voltageValue(v);
            return (
              <CompareGroup
                key={key}
                label={`${v} / ${plugs}タイプ`}
                tone={vNum >= 200 ? "bad" : vNum > 100 ? "warn" : "good"}
                countries={cs}
              />
            );
          })}
        </ul>
        <p className="mt-2 text-[11px] text-muted-foreground">
          日本は100V・Aタイプ。200V超の地域で100V専用家電を使うには変圧器が必要です。
        </p>
        <RecommendCard goods={RECOMMENDS.plug} />
      </Card>

      <Card className="p-4">
        <SectionTitle icon={Droplets} title="水道水" />
        <ul className="space-y-2">
          {water.map(([key, cs]) => (
            <CompareGroup
              key={key}
              label={key === "true" ? "飲用可" : "飲用不可（ミネラルウォーター推奨）"}
              tone={key === "true" ? "good" : "bad"}
              countries={cs}
            />
          ))}
        </ul>
      </Card>

      <Card className="p-4">
        <SectionTitle icon={Toilet} title="トイレ（紙）" />
        <ul className="space-y-2">
          {toilet.map(([key, cs]) => (
            <CompareGroup
              key={key}
              label={key === "true" ? "流せる" : "流せない（ゴミ箱へ）"}
              tone={key === "true" ? "good" : "bad"}
              countries={cs}
            />
          ))}
        </ul>
        {countries.some((c) => !c.tapWaterDrinkable || !c.toiletPaperFlushable) ? (
          <RecommendCard goods={RECOMMENDS.hygiene} />
        ) : null}
      </Card>

      <Card className="p-4">
        <SectionTitle icon={Wallet} title="決済・チップ" />
        <ul className="space-y-2">
          {money.map(([key, cs]) => {
            const [cash, tip] = key.split("｜") as [
              keyof typeof CASH_LABEL,
              keyof typeof TIP_LABEL,
            ];
            return (
              <CompareGroup
                key={key}
                label={`${CASH_LABEL[cash]} / ${TIP_LABEL[tip]}`}
                tone={cash === "low" ? "good" : cash === "medium" ? "warn" : "bad"}
                countries={cs}
              />
            );
          })}
        </ul>
        <MoneyRecommends countries={countries} />
      </Card>

      {noted.length > 0 ? (
        <Card className="p-4">
          <SectionTitle icon={NotebookPen} title="メモ" />
          <ul className="space-y-2">
            {noted.map((c) => (
              <li key={c.id} className="rounded-xl bg-muted/60 p-3">
                <p className="text-xs font-bold">
                  {flagOf(c.id)} {c.nameJa}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.notes}</p>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}

function Index() {
  const [countryIds, setCountryIds] = useState<string[]>(["TH"]);
  const [applianceIds, setApplianceIds] = useState<string[]>(["phone", "dryer"]);
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<"compare" | "country">("compare");
  // PC（768px以上）は「アジア」のみ開く、スマホは全閉じ
  const [openRegions, setOpenRegions] = useState<string[]>([]);

  useEffect(() => {
    setOpenRegions(window.innerWidth >= 768 ? ["アジア"] : []);
  }, []);

  const searching = query.trim().length > 0;

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    return REGION_ORDER.map((region) => ({
      region,
      countries: COUNTRIES_DATA.filter(
        (c) =>
          REGION_OF[c.id] === region &&
          (!q ||
            c.nameJa.toLowerCase().includes(q) ||
            c.nameEn.toLowerCase().includes(q)),
      ),
    })).filter((g) => g.countries.length > 0);
  }, [query]);

  const isRegionOpen = (region: string) => searching || openRegions.includes(region);
  const toggleRegion = (region: string) =>
    setOpenRegions((p) =>
      p.includes(region) ? p.filter((r) => r !== region) : [...p, region],
    );

  const selectedCountries = useMemo(
    () => COUNTRIES_DATA.filter((c) => countryIds.includes(c.id)),
    [countryIds],
  );
  const selectedAppliances = useMemo(
    () => APPLIANCES.filter((a) => applianceIds.includes(a.id)),
    [applianceIds],
  );

  // 100V以外の電圧の国が選択されている場合、ヘアアイロン・変圧器カードを表示
  const needsTransformer = useMemo(
    () => selectedCountries.some((c) => voltageValue(c.voltage) !== 100),
    [selectedCountries],
  );

  const affiliates = useMemo(() => {
    const list = [AFFILIATES.plug];
    if (needsTransformer) {
      list.push(AFFILIATES.hair);
      list.push(AFFILIATES.transformer);
    }
    return list;
  }, [needsTransformer]);

  const toggle = (arr: string[], id: string) =>
    arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];

  return (
    <main className="min-h-screen bg-background pb-16">
      <header
        className="px-4 pb-8 pt-9 text-primary-foreground"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto w-full max-w-xl">
          <Badge className="mb-3 border-0 bg-white/20 text-[11px] font-semibold text-primary-foreground backdrop-blur">
            <Luggage className="mr-1 size-3" /> 渡航前チェック
          </Badge>
          <h1 className="text-2xl font-black leading-snug tracking-tight sm:text-3xl">
            海外の電源・水・お金を
            <br />
            出発前に丸ごと確認
          </h1>
          <p className="mt-2 text-sm leading-relaxed opacity-90">
            渡航先と持っていく家電を選ぶだけ。変圧器の要否、変換プラグ、水道水、トイレ、現金・チップ事情がひと目で分かります。
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-xl space-y-6 px-4 py-6">
        <Card className="p-4">
          <SectionTitle icon={Globe2} title="渡航先を選ぶ" step="STEP 1" />

          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="国名で検索（例：タイ / Thailand）"
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            {query ? (
              <button
                type="button"
                aria-label="検索をクリア"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-muted"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </div>

          {countryIds.length > 0 ? (
            <div className="mb-3 rounded-xl border border-primary/30 bg-primary/5 p-2.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-bold text-muted-foreground">
                  選択中の国（{countryIds.length}ヶ国）
                </p>
                <button
                  type="button"
                  onClick={() => setCountryIds([])}
                  className="shrink-0 text-[11px] font-bold text-primary hover:underline"
                >
                  一括クリア
                </button>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {selectedCountries.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-primary-foreground"
                  >
                    {flagOf(c.id)} {c.nameJa}
                    <button
                      type="button"
                      aria-label={`${c.nameJa}の選択を解除`}
                      onClick={() => setCountryIds((p) => toggle(p, c.id))}
                      className="grid size-4 place-items-center rounded-full hover:bg-white/25"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {grouped.length === 0 ? (
            <p className="py-4 text-center text-xs text-muted-foreground">
              「{query}」に一致する国が見つかりませんでした。
            </p>
          ) : (
            <div className="space-y-2">
              {grouped.map((g) => {
                const open = isRegionOpen(g.region);
                const selectedInRegion = g.countries.filter((c) =>
                  countryIds.includes(c.id),
                ).length;
                return (
                  <div key={g.region} className="overflow-hidden rounded-xl border border-border">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => toggleRegion(g.region)}
                      className="flex w-full items-center gap-2 bg-muted/50 px-3 py-2.5 text-left transition-colors hover:bg-muted"
                    >
                      <ChevronDown
                        className={cn(
                          "size-4 shrink-0 text-muted-foreground transition-transform",
                          !open && "-rotate-90",
                        )}
                      />
                      <span className="min-w-0 flex-1 truncate text-xs font-bold">
                        {g.region}
                      </span>
                      {selectedInRegion > 0 ? (
                        <span className="shrink-0 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                          {selectedInRegion}
                        </span>
                      ) : null}
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {g.countries.length}ヶ国
                      </span>
                    </button>
                    {open ? (
                      <div className="grid grid-cols-2 gap-1.5 p-2 md:grid-cols-3 md:gap-2">
                        {g.countries.map((c) => {
                          const active = countryIds.includes(c.id);
                          return (
                            <button
                              key={c.id}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setCountryIds((p) => toggle(p, c.id))}
                              className={cn(
                                "relative flex min-w-0 items-center gap-1.5 rounded-lg border px-2 py-1.5 text-left transition-colors",
                                active
                                  ? "border-primary bg-primary/10 ring-1 ring-primary/40"
                                  : "border-border bg-card hover:bg-muted",
                              )}
                            >
                              <span className="shrink-0 text-base leading-none">{flagOf(c.id)}</span>
                              <span className="min-w-0 flex-1 text-xs font-bold leading-tight">
                                {c.nameJa}
                              </span>
                              {active ? (
                                <span className="grid size-4 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                                  <Check className="size-2.5" />
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card className="p-4">
          <SectionTitle icon={Plug} title="持っていく家電" step="STEP 2" />
          <ul className="space-y-2">
            {APPLIANCES.map((a) => {
              const Icon = APPLIANCE_ICONS[a.icon];
              const active = applianceIds.includes(a.id);
              return (
                <li key={a.id}>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors",
                      active ? "border-accent bg-accent/10" : "border-border bg-card",
                    )}
                  >
                    <Checkbox
                      checked={active}
                      onCheckedChange={() => setApplianceIds((p) => toggle(p, a.id))}
                      className="shrink-0"
                    />
                    <Icon className="size-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{a.name}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {a.desc}・{a.watt}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </Card>

        <section className="space-y-4">
          <SectionTitle icon={CheckCircle2} title="判定結果" step="STEP 3" />
          {selectedCountries.length === 0 ? (
            <Card className="p-6 text-center text-sm text-muted-foreground">
              渡航先を1つ以上選んでください。
            </Card>
          ) : selectedCountries.length === 1 ? (
            selectedCountries.map((c) => (
              <CountryResult key={c.id} country={c} appliances={selectedAppliances} />
            ))
          ) : (
            <div className="space-y-4">
              <div
                role="tablist"
                aria-label="結果の表示方法"
                className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1"
              >
                {(
                  [
                    { id: "compare", label: "項目別に比較", icon: Layers },
                    { id: "country", label: "国別に表示", icon: Globe2 },
                  ] as const
                ).map((t) => {
                  const active = viewMode === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setViewMode(t.id)}
                      className={cn(
                        "flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-colors",
                        active
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <t.icon className="size-3.5" />
                      {t.label}
                    </button>
                  );
                })}
              </div>
              {viewMode === "compare" ? (
                <CompareView countries={selectedCountries} />
              ) : (
                selectedCountries.map((c) => (
                  <CountryResult key={c.id} country={c} appliances={selectedAppliances} />
                ))
              )}
            </div>
          )}
        </section>

        <section>
          <SectionTitle icon={Luggage} title="出発前に揃えたいアイテム" />
          <div className="space-y-3">
            {affiliates.map((item) => {
              const Icon = AFFILIATE_ICONS[item.icon];
              return (
                <Card key={item.id} className="border-border/70 p-4">
                  <div className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <p className="text-sm font-bold leading-snug">{item.title}</p>
                        <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          おすすめ（PR）
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Button size="sm" className="h-8 text-xs" asChild>
                          <a href={item.amazonUrl} target="_blank" rel="nofollow sponsored noopener">
                            Amazonで探す
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                          <a href={item.rakutenUrl} target="_blank" rel="nofollow sponsored noopener">
                            楽天市場で探す
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
            ※
            掲載情報は目安です。渡航前に最新の公的情報をご確認ください。リンクにはプロモーションが含まれる場合があります。
          </p>
        </section>
      </div>
    </main>
  );
}
