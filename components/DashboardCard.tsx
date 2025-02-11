import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

type DashboardCardProps = {
  icon: React.ElementType;
  title: string;
  value: string;
  href?: string;
};

export function DashboardCard({ icon: Icon, title, value, href }: DashboardCardProps) {
  const cardContent = (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>{title}</CardTitle>
        <Icon className="w-6 h-6 text-primary" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );

  return href ? (
    <Link href={href} passHref>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
}
