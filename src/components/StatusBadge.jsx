const STYLES = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-orange-100 text-orange-700',
  Closed: 'bg-emerald-100 text-emerald-700',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${STYLES[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  );
}
