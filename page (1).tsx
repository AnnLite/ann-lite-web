import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { apiClient, ApiUnavailableError } from "@/lib/api-client";
import type { CharityProject } from "@/types/content";

export const metadata = { title: "Projects" };

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: "ht" | "fr" | "en" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");
  const tErr = await getTranslations("errors");

  let projects: CharityProject[] = [];
  let available = true;
  try {
    projects = await apiClient.getProjects();
  } catch (error) {
    if (error instanceof ApiUnavailableError) available = false;
    else throw error;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-blue-700">{t("projects")}</h1>
      {!available && (
        <p className="mt-4 rounded-lg bg-paper-100 p-4 text-sm text-ink-900/70">
          {tErr("backendUnavailable")}
        </p>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => {
          const pct = Math.min(
            100,
            Math.round((project.raisedAmountUsd / project.goalAmountUsd) * 100)
          );
          return (
            <Link key={project.id} href={`/projects/${project.slug}`}>
              <Card>
                <h2 className="font-display text-lg font-semibold">{project.title[locale]}</h2>
                <p className="mt-2 text-sm text-ink-900/80">{project.summary[locale]}</p>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-paper-200">
                  <div className="h-full bg-gold-500" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-2 text-xs text-ink-900/60">
                  ${project.raisedAmountUsd.toLocaleString()} / $
                  {project.goalAmountUsd.toLocaleString()}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
