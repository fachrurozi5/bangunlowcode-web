import WidgetWrapper from "@/features/page-builder/components/widget-wrapper";

type Props = {
  params: Promise<{ path: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function BuilderPage({ params, searchParams }: Props) {
  const path = (await params).path;
  const queryStrings = await searchParams;
  return <WidgetWrapper />;
}
