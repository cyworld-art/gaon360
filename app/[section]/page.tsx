import Site from "@/components/Site";
export function generateStaticParams() { return ['brand','about','npu','firmware','healthcare','hardware','inference','integration','projects','notes','login','account','admin','privacy'].map(section=>({section})); }
export default async function Section({ params }: { params: Promise<{section:string}>}) { const { section } = await params; return <Site section={section}/>; }
