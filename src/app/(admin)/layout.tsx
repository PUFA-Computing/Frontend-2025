export default async function AdminLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
        <div className="grid grid-cols-1 gap-4 p-4">
            {children}
        </div>
     );
}
