import { FilterProvider } from '@/components/adventures/FilterContext';

export default function AdventuresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FilterProvider>
      {children}
    </FilterProvider>
  );
}