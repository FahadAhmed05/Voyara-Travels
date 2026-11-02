import { Check, Clock, ShieldCheck, Stamp } from "lucide-react";
import {
  MetaItem,
  ResultCard,
  type CardActionProps,
} from "@/components/booking/ResultCard";
import { PriceTag } from "@/components/ui/PriceTag";
import { applyProcessing } from "@/lib/booking";
import { pluralise } from "@/lib/format";
import type { Processing, VisaPackage } from "@/types";

interface VisaCardProps extends CardActionProps {
  visa: VisaPackage;
  processing: Processing;
  applicants: number;
}

export function VisaCard({
  visa,
  processing,
  applicants,
  ...action
}: VisaCardProps) {
  const { days, fee } = applyProcessing(visa, processing);

  return (
    <ResultCard
      {...action}
      icon={Stamp}
      title={`${visa.country} ${visa.type} visa`}
      subtitle={`${processing} processing`}
      badge={visa.type}
      ctaLabel="Start application"
      meta={
        <>
          <MetaItem icon={Clock}>{pluralise(days, "working day")}</MetaItem>
          <MetaItem icon={ShieldCheck}>{visa.successRate}% approved</MetaItem>
        </>
      }
      price={
        <PriceTag
          amount={fee * applicants}
          suffix={`for ${pluralise(applicants, "applicant")}`}
        />
      }
    >
      <ul className="space-y-1.5 text-sm">
        {visa.requirements.map((requirement) => (
          <li key={requirement} className="flex items-start gap-2">
            <Check
              className="mt-1 size-4 shrink-0 text-teal"
              aria-hidden="true"
            />
            {requirement}
          </li>
        ))}
      </ul>
    </ResultCard>
  );
}
