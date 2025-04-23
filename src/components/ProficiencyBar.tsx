interface ProficiencyBarProps {
    value: number;      // actual proficiency (1–10)
    max?: number;       // optional maximum (defaults to 10)
  }
  
  /**
   * Renders a horizontal bar whose width is value/max,
   * and whose color is:
   *   - red if <4
   *   - yellow if <7
   *   - green otherwise
   */
  export default function ProficiencyBar({
    value,
    max = 10,
  }: ProficiencyBarProps) {
    // avoid overflow
    const clamped = Math.min(Math.max(value, 0), max);
    const pct = (clamped / max) * 100;
  
    // pick a color
    let colorClass = "bg-red-500";
    if (clamped >= 7) {
      colorClass = "bg-green-500";
    } else if (clamped >= 4) {
      colorClass = "bg-yellow-400";
    }
  
    return (
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
        <div
          className={`${colorClass} h-full rounded-full`}
          style={{ width: `${pct}%`, transition: "width 0.3s ease" }}
        />
      </div>
    );
  }
  