"use client";

import { LegalNotice } from "./LegalNotice";
import { useLanguage } from "./LanguageProvider";

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <LegalNotice compact>
      <p>{t("disclaimer.short")}</p>
    </LegalNotice>
  );
}
