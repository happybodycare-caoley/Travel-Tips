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
  Coffee,
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
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  getAmazonAffiliateUrl,
  getRakutenAffiliateUrl,
  type CountryData,
  type Appliance,
  type RecommendGoods,
} from "@/data/travel";



function passportNoteOf(notes?: string): string | null {
  if (!notes) return null;
  if (!notes.includes("【パスポート紛失時】")) return null;
  return "【パスポート紛失時】" + notes.split("【パスポート紛失時】")[1];
}

function EmbassyAccordion({ country }: { country: CountryData }) {
  const [open, setOpen] = useState(false);
  const e = country.embassy;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${e.name} ${e.address}`,
  )}`;
  const passportNote = passportNoteOf(country.notes);
  return (
    <Card className="overflow-hidden border-destructive/30 bg-destructive/5">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left"
      >
        <span className="text-base leading-none">🚨</span>
        <span className="min-w-0 flex-1 text-sm font-bold">
          緊急連絡先・注意事項
          <span className="ml-1 font-semibold text-muted-foreground">
            {flagOf(country.id)} {country.nameJa}
          </span>
        </span>
        <ChevronDown
          className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? (
        <div className="space-y-3 border-t border-destructive/20 px-4 py-4">
          {passportNote ? (
            <div className="flex items-start gap-2 rounded-lg border border-warning/40 bg-warning/15 px-3 py-2.5">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning-foreground" />
              <p className="text-xs leading-relaxed text-foreground/80">{passportNote}</p>
            </div>
          ) : null}
          <p className="text-sm font-bold">{e.name}</p>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground underline-offset-2 hover:underline"
          >
            <MapPin className="mt-0.5 size-3.5 shrink-0" />
            <span>{e.address}</span>
          </a>
          <a
            href={`tel:${e.phone.replace(/[^\d+]/g, "")}`}
            className="flex items-center gap-2 text-sm font-semibold underline-offset-2 hover:underline"
          >
            <Phone className="size-3.5 shrink-0" />
            {e.phone}
          </a>
          <Button size="sm" variant="outline" className="h-8 w-full text-xs" asChild>
            <a href={e.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-3.5" />
              公式Webサイトを開く
            </a>
          </Button>
        </div>
      ) : null}
    </Card>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "海外渡航準備チェッカー｜電圧・プラグ・水・決済・大使館" },
      {
        name: "description",
        content:
          "国を選ぶだけで電圧・変換プラグ・水道水・トイレ・チップ事情・日本大使館の連絡先まで一目で分かる海外渡航準備チェックツール。",
      },
      { property: "og:title", content: "海外渡航準備チェッカー｜電圧・プラグ・水・決済・大使館" },
      {
        property: "og:description",
        content:
          "国を選ぶだけで電圧・変換プラグ・水道水・トイレ・チップ事情・日本大使館の連絡先まで一目で分かる海外渡航準備チェックツール。",
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
  kettle: Coffee,
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
      <p className="min-w-0 truncate text-xs font-bold">{goods.title}</p>
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
          <a href={getAmazonAffiliateUrl(goods.amazonUrl)} target="_blank" rel="noopener noreferrer sponsored">
            Amazonで探す
          </a>
        </Button>
        <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
          <a href={getRakutenAffiliateUrl(goods.rakutenUrl)} target="_blank" rel="noopener noreferrer sponsored">
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

      </div>
    </Card>
  );
}


const AFFILIATE_ICONS = { plug: Plug, hair: Wind, transformer: Zap, kettle: Coffee } as const;

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
      list.push(AFFILIATES.kettle);
    }
    return list;
  }, [needsTransformer]);

  const toggle = (arr: string[], id: string) =>
    arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];

  return (
    <>
    <main className="min-h-screen bg-background pb-16">
      <header
        className="px-4 pb-8 pt-9 text-primary-foreground"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="mx-auto w-full max-w-xl">
          <Badge className="mb-4 inline-flex items-center gap-1 border-0 bg-white/25 px-2.5 py-1 text-[11px] font-bold tracking-wide text-primary-foreground backdrop-blur">
            <Luggage className="size-3" /> トラベルTips
          </Badge>
          <h1 className="text-2xl font-black leading-snug tracking-tight sm:text-3xl">
            これ1つで安心！
            <br className="sm:hidden" />
            海外の渡航準備・現地情報チェッカー
          </h1>
          <p className="mt-3 text-sm leading-relaxed opacity-90 sm:text-base">
            国を選ぶだけで、電圧・変換プラグ・水道水・トイレ・チップ事情・日本大使館の連絡先までひと目で分かります。
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-xl space-y-6 px-4 py-6 md:max-w-6xl md:grid md:grid-cols-[minmax(0,33fr)_minmax(0,67fr)] md:items-start md:gap-6 md:space-y-0">
        <aside className="md:sticky md:top-4 md:self-start md:max-h-[calc(100vh-2rem)] md:overflow-y-auto md:pr-1">
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
                      <div className="max-h-60 overflow-y-auto p-2">
                        <div className="flex flex-col gap-1.5">
                          {g.countries.map((c) => {
                            const active = countryIds.includes(c.id);
                            return (
                              <button
                                key={c.id}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setCountryIds((p) => toggle(p, c.id))}
                                className={cn(
                                  "flex h-11 w-full items-center justify-between gap-2 rounded-lg border px-3 text-left transition-colors",
                                  active
                                    ? "border-primary bg-primary/10 ring-1 ring-primary/40"
                                    : "border-border bg-card hover:bg-muted",
                                )}
                              >
                                <span className="flex min-w-0 items-center gap-2">
                                  <span className="shrink-0 text-base leading-none">
                                    {flagOf(c.id)}
                                  </span>
                                  <span className="whitespace-nowrap text-sm font-bold leading-tight">
                                    {c.nameJa}
                                  </span>
                                </span>
                                {active ? (
                                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                                    <Check className="size-3" />
                                  </span>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </Card>
        </aside>

        <div className="space-y-6">
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

        <p className="rounded-lg bg-muted/60 px-3 py-2 text-center text-[11px] leading-relaxed text-muted-foreground">
          ※当ページにはプロモーションが含まれています
        </p>

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
          {selectedCountries.length === 1
            ? selectedCountries.map((c) => (
                <EmbassyAccordion key={c.id} country={c} />
              ))
            : null}
        </section>

        <section>
          <div className="mb-3 flex min-w-0 items-center gap-2">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Luggage className="size-4" />
            </span>
            <h2 className="truncate text-base font-bold tracking-tight">出発前に揃えたいアイテム</h2>
            <span className="ml-auto shrink-0 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-bold text-destructive">
              PR
            </span>
          </div>
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
                      <p className="mb-1 text-sm font-bold leading-snug">{item.title}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Button size="sm" className="h-8 text-xs" asChild>
                          <a href={getAmazonAffiliateUrl(item.amazonUrl)} target="_blank" rel="noopener noreferrer sponsored">
                            Amazonで探す
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                          <a href={getRakutenAffiliateUrl(item.rakutenUrl)} target="_blank" rel="noopener noreferrer sponsored">
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
        </section>
        </div>
      </div>
    </main>
      <Footer />
    </>
  );
}

const CONTACT_URL = "https://forms.gle/QrbwebJNgi2zRtnB9";

function Footer() {
  const [openPolicy, setOpenPolicy] = useState(false);
  const [openDisclaimer, setOpenDisclaimer] = useState(false);

  return (
    <footer className="mt-16 border-t border-border/60 bg-muted/30 px-4 py-8 text-center">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => setOpenPolicy(true)}
            className="underline-offset-2 hover:text-foreground hover:underline"
          >
            プライバシーポリシー
          </button>
          <span aria-hidden className="opacity-40">|</span>
          <button
            type="button"
            onClick={() => setOpenDisclaimer(true)}
            className="underline-offset-2 hover:text-foreground hover:underline"
          >
            免責事項
          </button>
          <span aria-hidden className="opacity-40">|</span>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:text-foreground hover:underline"
          >
            お問い合わせ
          </a>
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          © 2026 Travel Tips All Rights Reserved.
        </p>
      </div>

      <Dialog open={openPolicy} onOpenChange={setOpenPolicy}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>プライバシーポリシー</DialogTitle>
            <DialogDescription className="sr-only">
              プライバシーポリシー本文
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-left text-sm leading-relaxed text-muted-foreground">
            <section>
              <h3 className="mb-1 font-bold text-foreground">1. 個人情報の利用目的</h3>
              <p>
                当サイト（以下、「当サービス」）では、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。取得した個人情報は、必要な連絡のみに利用し、これらの目的以外では利用いたしません。
              </p>
            </section>
            <section>
              <h3 className="mb-1 font-bold text-foreground">2. 広告配信について（アフィリエイト・AdSense）</h3>
              <p>
                当サービスは、第三者配信の広告サービス（Google AdSense、Amazonアソシエイト・プログラム、楽天アフィリエイト等）を利用しています。
                広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サービスや他サイトへのアクセスに関する情報「Cookie」(氏名、住所、メール アドレス、電話番号は含まれません) を使用することがあります。
              </p>
              <p className="text-xs">
                ※Amazonアソシエイトに関する表記：当サービスは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
              </p>
            </section>
            <section>
              <h3 className="mb-1 font-bold text-foreground">3. アクセス解析ツールについて</h3>
              <p>
                当サービスでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
              </p>
            </section>
            <section>
              <h3 className="mb-1 font-bold text-foreground">4. 免責事項</h3>
              <p>
                当サービスの利用によって生じた、いかなるトラブル・損失・損害についても、当サービスおよび運営者は一切の責任を負いかねます。各機器の導入・購入に際しては、必ず各メーカーの取扱説明書や仕様をご確認の上、自己責任にてご判断ください。また、当サービスからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
              </p>
            </section>
            <section>
              <h3 className="mb-1 font-bold text-foreground">5. 著作権・肖像権について</h3>
              <p>
                当サービス内の文章や画像、プログラム等のコンテンツの著作権・肖像権等は各権利所有者に帰属します。無断転載・使用を禁止します。
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openDisclaimer} onOpenChange={setOpenDisclaimer}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>免責事項</DialogTitle>
            <DialogDescription className="sr-only">免責事項本文</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-left text-sm leading-relaxed text-muted-foreground">
            <p>
              当サービスの利用によって生じた、いかなるトラブル・損失・損害についても、当サービスおよび運営者は一切の責任を負いかねます。
            </p>
            <p>
              各機器の導入・購入に際しては、必ず各メーカーの取扱説明書や仕様をご確認の上、自己責任にてご判断ください。
            </p>
            <p>
              当サービスからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
            </p>
            <p>
              掲載情報（電圧・プラグ・水道水・トイレ・決済事情・大使館情報等）は目安であり、渡航前に最新の公的情報をご確認ください。
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
