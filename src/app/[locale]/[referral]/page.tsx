import { redirect } from "next/navigation";

interface IProp {
  params: {
    referral: string;
  };
}

export default function Page({ params: { referral } }: IProp) {
  const link = `https://fluentpal.go.link?adj_t=` + referral;
  redirect(link);
}
