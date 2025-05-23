
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import "./progress.css"

interface ExtendedProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  secondaryValue?: number;
  showComparison?: boolean;
  accentColor?: string;
  secondaryColor?: string;
  animate?: boolean;
  variant?: "bar" | "circle";
  isTimeline?: boolean;
  currentTimelinePhase?: number;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ExtendedProgressProps
>(({ className, value, secondaryValue, showComparison = false, accentColor, secondaryColor, animate = false, variant = "bar", isTimeline = false, currentTimelinePhase = 0, ...props }, ref) => {
  // Determine which CSS class to use based on accentColor
  const getColorClass = (color?: string) => {
    if (!color) {
      return 'progress-blue'; // default color
    }
    
    if (color === 'bg-blue-500') return 'progress-blue';
    if (color === 'bg-red-500') return 'progress-red';
    if (color === 'bg-destructive') return 'progress-red';
    if (color === 'bg-emerald-500') return 'progress-green';
    if (color === 'bg-gray-600') return 'progress-gray';
    if (color === 'bg-orange-500') return 'progress-orange';
    
    return 'progress-blue'; // default color
  };

  const colorClass = getColorClass(accentColor);
  const strokeColor = accentColor?.startsWith('bg-') ? '' : accentColor;
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50); // Reduced delay for smoother animations
    return () => clearTimeout(timer);
  }, []);

  // Circle progress calculations
  const size = 160;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value || 0) / 100 * circumference;

  if (variant === "circle") {
    return (
      <div className="progress-circle-container">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            className="progress-circle-bg"
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          <circle
            className={`progress-circle-indicator ${colorClass} ${animate && mounted ? 'animate-circle' : ''}`}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={animate && !mounted ? circumference : strokeDashoffset}
            style={{
              stroke: strokeColor,
              '--circle-circumference': `${circumference}`,
              '--circle-target': `${strokeDashoffset}`
            } as React.CSSProperties}
          />
        </svg>
        <div className="progress-circle-text">
          <span className={animate ? "task-percent-animation" : ""}>
            {value}%
          </span>
        </div>
      </div>
    );
  }

  if (isTimeline) {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={`progress-root ${className || ''}`}
        {...props}
      >
        <div className="progress-container">
          <div 
            className={`progress-indicator timeline-indicator ${animate && mounted ? 'animate-width' : ''}`}
            style={{ 
              width: animate && !mounted ? '0%' : `${value || 0}%`,
              '--target-width': `${value || 0}%`,
              '--timeline-phase': `${currentTimelinePhase}`
            } as React.CSSProperties}
          />
        </div>
      </ProgressPrimitive.Root>
    );
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={`progress-root ${className || ''}`}
      {...props}
    >
      {/* Primary indicator */}
      <div className="progress-container">
        <div
          className={`progress-indicator ${colorClass} ${animate && mounted ? 'animate-width' : ''}`}
          style={{ 
            width: animate && !mounted ? '0%' : `${value || 0}%`,
            '--target-width': `${value || 0}%`,
            backgroundColor: accentColor?.startsWith('bg-') ? '' : accentColor
          } as React.CSSProperties}
        />
      </div>
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
