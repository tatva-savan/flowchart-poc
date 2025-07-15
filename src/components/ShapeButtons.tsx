export const ShapeButtons = ({ onAdd }: { onAdd: (type: string) => void }) => {
  const types = ["start", "process", "decision", "inputOutput", "end"];
  return (
    <div style={{ display: "flex", gap: 10, padding: 10 }}>
      {types.map((t) => (
        <button key={t} onClick={() => onAdd(t)}>
          ➕ {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
};
