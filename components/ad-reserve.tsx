interface AdReserveProps {
  className?: string;
}

export default function AdReserve({ className = "" }: AdReserveProps) {
  return <div className={`ad-reserve ${className}`} aria-hidden="true" />;
}
