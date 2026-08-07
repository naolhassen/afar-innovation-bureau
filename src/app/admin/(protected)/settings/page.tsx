import { prisma } from "@/lib/prisma";
import TrilingualField from "@/components/admin/TrilingualField";
import { updateSiteSettings } from "./actions";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findFirst();

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold text-emerald-900">Site Settings</h1>

      <form action={updateSiteSettings} className="mt-6 space-y-5">
        <TrilingualField
          baseName="mission"
          label="Mission"
          textarea
          defaultValues={{ af: settings?.missionAf, am: settings?.missionAm, en: settings?.missionEn }}
        />
        <TrilingualField
          baseName="vision"
          label="Vision"
          textarea
          defaultValues={{ af: settings?.visionAf, am: settings?.visionAm, en: settings?.visionEn }}
        />
        <TrilingualField
          baseName="values"
          label="Values"
          textarea
          defaultValues={{ af: settings?.valuesAf, am: settings?.valuesAm, en: settings?.valuesEn }}
        />
        <TrilingualField
          baseName="history"
          label="History"
          textarea
          defaultValues={{ af: settings?.historyAf, am: settings?.historyAm, en: settings?.historyEn }}
        />

        <fieldset className="rounded-md border border-zinc-200 p-4">
          <legend className="px-1 text-sm font-semibold text-emerald-900">Bureau Head</legend>
          <div className="mb-3">
            <label className="mb-1 block text-xs font-medium text-zinc-500">Name</label>
            <input
              name="bureauHeadName"
              defaultValue={settings?.bureauHeadName ?? ""}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <TrilingualField
            baseName="bureauHeadMsg"
            label="Message"
            textarea
            defaultValues={{
              af: settings?.bureauHeadMsgAf,
              am: settings?.bureauHeadMsgAm,
              en: settings?.bureauHeadMsgEn,
            }}
          />
        </fieldset>

        <fieldset className="rounded-md border border-zinc-200 p-4">
          <legend className="px-1 text-sm font-semibold text-emerald-900">Contact Info</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              name="phone"
              placeholder="Phone"
              defaultValue={settings?.phone ?? ""}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
            />
            <input
              name="email"
              placeholder="Email"
              defaultValue={settings?.email ?? ""}
              className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none"
            />
          </div>
          <div className="mt-3">
            <TrilingualField
              baseName="address"
              label="Address"
              defaultValues={{ af: settings?.addressAf, am: settings?.addressAm, en: settings?.addressEn }}
            />
          </div>
        </fieldset>

        <fieldset className="rounded-md border border-zinc-200 p-4">
          <legend className="px-1 text-sm font-semibold text-emerald-900">Social Media</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input name="facebookUrl" placeholder="Facebook URL" defaultValue={settings?.facebookUrl ?? ""} className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none" />
            <input name="telegramUrl" placeholder="Telegram URL" defaultValue={settings?.telegramUrl ?? ""} className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none" />
            <input name="twitterUrl" placeholder="X (Twitter) URL" defaultValue={settings?.twitterUrl ?? ""} className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none" />
            <input name="instagramUrl" placeholder="Instagram URL" defaultValue={settings?.instagramUrl ?? ""} className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none" />
            <input name="youtubeUrl" placeholder="YouTube URL" defaultValue={settings?.youtubeUrl ?? ""} className="rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none" />
          </div>
        </fieldset>

        <button
          type="submit"
          className="rounded-full bg-emerald-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
