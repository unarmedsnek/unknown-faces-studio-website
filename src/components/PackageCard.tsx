import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface PackageData {
  name: string;
  price: string;
  duration: string;
  description: string;
}

interface PackageCardProps {
  package: PackageData;
  className?: string;
  onClick?: () => void;
}

export const PackageCard = ({ package: pkg, className = "", onClick }: PackageCardProps) => {
  return (
    <Card 
      className={`manga-panel rounded-none cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${className}`}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold uppercase tracking-wide">{pkg.name}</CardTitle>
        <CardDescription className="text-lg font-bold text-foreground">
          {pkg.price}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="font-mono text-sm text-muted-foreground">{pkg.duration}</p>
        <p className="text-sm italic">{pkg.description}</p>
      </CardContent>
    </Card>
  );
};
