import { ArrowUpRight, Megaphone, ShieldCheck } from "lucide-react";
import { Badge } from "./Badge";
import { CopyMarkdownButton } from "./CopyMarkdownButton";
import type { LaunchAsset } from "@/data/launchAssets";

const channelLabel: Record<LaunchAsset["channel"], string> = {
  homepage: "Homepage",
  linkedin: "LinkedIn",
  email: "Email",
  "direct-outreach": "Direct outreach",
  "sales-one-pager": "One-pager"
};

const channelClass: Record<LaunchAsset["channel"], string> = {
  homepage: "border-teal/20 bg-teal/10 text-teal",
  linkedin: "border-blue-200 bg-blue-50 text-blue-700",
  email: "border-violet/20 bg-violet/10 text-violet",
  "direct-outreach": "border-amber-200 bg-amber-50 text-amber-800",
  "sales-one-pager": "border-slate-200 bg-slate-50 text-slate-600"
};

const statusLabel: Record<LaunchAsset["status"], string> = {
  draft: "Draft",
  "ready-for-review": "Ready for review",
  future: "Future"
};

export function LaunchAssetLibrary({ assets }: { assets: LaunchAsset[] }) {
  const grouped = assets.reduce<Record<LaunchAsset["channel"], LaunchAsset[]>>(
    (acc, asset) => {
      acc[asset.channel].push(asset);
      return acc;
    },
    {
      homepage: [],
      linkedin: [],
      email: [],
      "direct-outreach": [],
      "sales-one-pager": []
    }
  );

  return (
    <div className="space-y-5">
      {(Object.keys(grouped) as LaunchAsset["channel"][]).map((channel) =>
        grouped[channel].length ? (
          <section key={channel} className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-teal">
                  <Megaphone className="h-4 w-4" />
                  {channelLabel[channel]}
                </div>
                <h2 className="mt-2 text-lg font-semibold text-ink">{channelLabel[channel]} launch assets</h2>
              </div>
              <Badge className={channelClass[channel]}>{grouped[channel].length} assets</Badge>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {grouped[channel].map((asset) => (
                <article key={asset.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={channelClass[asset.channel]}>{channelLabel[asset.channel]}</Badge>
                    <Badge className="border-slate-200 bg-white text-slate-600">{statusLabel[asset.status]}</Badge>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-ink">{asset.title}</h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Audience</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{asset.audience.join(", ")}</p>
                  <div className="mt-3 rounded-lg bg-white p-3 text-sm leading-6 text-slate-700">{asset.copy}</div>
                  {asset.caveat ? (
                    <div className="mt-3 flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{asset.caveat}</span>
                    </div>
                  ) : null}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <CopyMarkdownButton text={formatAsset(asset)} label="Copy asset" />
                    <a
                      href={`mailto:?subject=${encodeURIComponent(`Etica ESG launch asset - ${asset.title}`)}&body=${encodeURIComponent(formatAsset(asset))}`}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Draft email
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}

function formatAsset(asset: LaunchAsset) {
  return [
    `# ${asset.title}`,
    "",
    `Channel: ${channelLabel[asset.channel]}`,
    `Status: ${statusLabel[asset.status]}`,
    `Audience: ${asset.audience.join(", ")}`,
    "",
    asset.copy,
    "",
    asset.caveat ? `Caveat: ${asset.caveat}` : "Caveat: This launch copy supports commercial validation only. It is not legal advice, does not claim complete coverage and does not describe a live paid, automated or account-based product."
  ].join("\n");
}
