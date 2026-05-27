import type { LucideProps } from "lucide-react";

export type LucideReactType = React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>