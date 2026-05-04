import { iconPositions } from "@/utils/iconPosition";

type Props = {
  icon: string;
};

export default function WeatherIcon({ icon }: Props) {
    
    
  return (
    <div
      className="w-12 h-12 bg-no-repeat"
      style={{
         backgroundImage: "url('/icons/index.png')",
        backgroundPosition: iconPositions[icon] ,
        backgroundSize: "250px 250px", // depends on your sprite size
      }}
    />
  );
}